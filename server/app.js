import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import {
    parseBody,
    preferredResponseType,
    readRequestBody,
    send,
} from './codec.js'
import { SubmissionStore } from './storage.js'
import {
    hasValidationErrors,
    validateSubmissionInput,
} from './validation.js'
import {
    renderCreateResult,
    renderErrorPage,
    renderProfilePage,
    renderSubmissionForm,
    renderUpdateResult,
} from './templates.js'

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.ttf': 'font/ttf',
}

function getRequestUrl(req) {
    return new URL(req.url, `http://${req.headers.host || 'localhost'}`)
}

function getBaseUrl(req) {
    const proto = req.headers['x-forwarded-proto'] || 'http'
    return `${proto}://${req.headers.host || 'localhost'}`
}

function submissionPayload(req, result) {
    const profilePath = `/api/submissions/${encodeURIComponent(result.submission.login)}`
    return {
        credentials: result.credentials,
        profileUrl: `${getBaseUrl(req)}${profilePath}`,
        profilePath,
        submission: result.submission,
    }
}

function parseBasicAuth(req) {
    const value = String(req.headers.authorization || '')
    if (!value.toLowerCase().startsWith('basic ')) return null

    try {
        const decoded = Buffer.from(value.slice(6), 'base64').toString('utf8')
        const separator = decoded.indexOf(':')
        if (separator < 0) return null
        return {
            login: decoded.slice(0, separator),
            password: decoded.slice(separator + 1),
        }
    } catch {
        return null
    }
}

function unauthorized(res, type) {
    const headers = { 'WWW-Authenticate': 'Basic realm="Drupal Coder"' }
    if (type === 'html') {
        send(res, 401, renderErrorPage(401, 'Нужна авторизация.'), 'html', headers)
        return
    }
    send(res, 401, { message: 'Authorization required' }, type, headers)
}

async function requireSubmissionAuth(req, res, store, login, type) {
    const credentials = parseBasicAuth(req)
    if (!credentials || credentials.login !== login) {
        unauthorized(res, type)
        return false
    }

    const ok = await store.authenticate(credentials.login, credentials.password)
    if (!ok) {
        unauthorized(res, type)
        return false
    }

    return true
}

async function bodyValues(req) {
    const rawBody = await readRequestBody(req)
    return parseBody(rawBody, req.headers['content-type'])
}

function methodWithOverride(req, values) {
    const method = req.method.toUpperCase()
    if (method === 'POST' && String(values?._method || '').toLowerCase() === 'put') {
        return 'PUT'
    }
    return method
}

function validationResponse(
    res,
    type,
    values,
    errors,
    action = '/api/submissions',
    methodOverride = '',
) {
    if (type === 'html') {
        send(
            res,
            422,
            renderSubmissionForm({
                title: 'Проверьте форму',
                action,
                methodOverride,
                values,
                errors,
                submitLabel: 'Отправить',
            }),
            'html',
        )
        return
    }

    send(res, 422, { message: 'Validation failed', values, errors }, type)
}

async function handleCreateSubmission(req, res, store, type, values) {
    const validation = validateSubmissionInput(values)
    if (hasValidationErrors(validation.errors)) {
        validationResponse(res, type, validation.values, validation.errors)
        return
    }

    const result = await store.create(validation.values)
    const payload = submissionPayload(req, result)

    if (type === 'html') {
        send(res, 201, renderCreateResult(payload), 'html')
        return
    }

    send(res, 201, payload, type)
}

async function handleUpdateSubmission(req, res, store, type, login, values) {
    const ok = await requireSubmissionAuth(req, res, store, login, type)
    if (!ok) return

    const validation = validateSubmissionInput(values)
    if (hasValidationErrors(validation.errors)) {
        validationResponse(
            res,
            type,
            validation.values,
            validation.errors,
            `/api/submissions/${encodeURIComponent(login)}`,
            'put',
        )
        return
    }

    const submission = await store.update(login, validation.values)
    if (!submission) {
        send(res, 404, type === 'html' ? renderErrorPage(404, 'Профиль не найден.') : { message: 'Not found' }, type)
        return
    }

    const payload = {
        profileUrl: `${getBaseUrl(req)}/api/submissions/${encodeURIComponent(login)}`,
        submission,
    }

    if (type === 'html') {
        send(res, 200, renderUpdateResult(payload), 'html')
        return
    }

    send(res, 200, payload, type)
}

async function handleGetSubmission(req, res, store, type, login) {
    const ok = await requireSubmissionAuth(req, res, store, login, type)
    if (!ok) return

    const submission = await store.get(login)
    if (!submission) {
        send(res, 404, type === 'html' ? renderErrorPage(404, 'Профиль не найден.') : { message: 'Not found' }, type)
        return
    }

    if (type === 'html') {
        send(res, 200, renderProfilePage(submission), 'html')
        return
    }

    send(res, 200, { submission }, type)
}

async function handleApi(req, res, store) {
    const url = getRequestUrl(req)
    const type = preferredResponseType(req)
    const match = url.pathname.match(/^\/api\/submissions(?:\/([^/]+))?$/)

    if (!match) {
        send(res, 404, { message: 'Not found' }, type)
        return true
    }

    const login = match[1] ? decodeURIComponent(match[1]) : ''
    const needsBody = req.method === 'POST' || req.method === 'PUT'
    let values = {}
    try {
        values = needsBody ? await bodyValues(req) : {}
    } catch {
        send(res, 400, type === 'html' ? renderErrorPage(400, 'Некорректное тело запроса.') : { message: 'Invalid request body' }, type)
        return true
    }
    const method = methodWithOverride(req, values)

    if (!login && method === 'POST') {
        await handleCreateSubmission(req, res, store, type, values)
        return true
    }

    if (login && method === 'GET') {
        await handleGetSubmission(req, res, store, type, login)
        return true
    }

    if (login && method === 'PUT') {
        await handleUpdateSubmission(req, res, store, type, login, values)
        return true
    }

    send(res, 405, { message: 'Method not allowed' }, type, { Allow: login ? 'GET, PUT' : 'POST' })
    return true
}

async function serveFile(res, filePath) {
    const fileStat = await stat(filePath)
    if (!fileStat.isFile()) return false

    const type = MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type })
    createReadStream(filePath).pipe(res)
    return true
}

async function serveStatic(req, res, publicDir) {
    const url = getRequestUrl(req)
    const root = resolve(publicDir)
    const pathname = decodeURIComponent(url.pathname)
    const requested = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
    const filePath = resolve(join(root, requested === '/' ? 'index.html' : requested))

    if (!filePath.startsWith(root)) {
        send(res, 403, renderErrorPage(403, 'Доступ запрещён.'), 'html')
        return true
    }

    try {
        if (await serveFile(res, filePath)) return true
    } catch (error) {
        if (error.code !== 'ENOENT') throw error
    }

    const fallbackPath = join(root, 'index.html')
    try {
        return await serveFile(res, fallbackPath)
    } catch (error) {
        if (error.code !== 'ENOENT') throw error
    }

    return false
}

export function createApp({
    dataFile,
    publicDir = join(process.cwd(), 'build'),
    store = new SubmissionStore(dataFile),
} = {}) {
    return createServer(async (req, res) => {
        try {
            if (req.url.startsWith('/api/')) {
                await handleApi(req, res, store)
                return
            }

            if (req.method === 'GET' || req.method === 'HEAD') {
                const served = await serveStatic(req, res, publicDir)
                if (served) return
            }

            send(res, 404, renderErrorPage(404, 'Страница не найдена.'), 'html')
        } catch (error) {
            console.error(error)
            const type = preferredResponseType(req)
            send(
                res,
                500,
                type === 'html' ? renderErrorPage(500, 'Ошибка сервера.') : { message: 'Server error' },
                type,
            )
        }
    })
}
