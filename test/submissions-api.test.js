import assert from 'node:assert/strict'
import { mkdtemp } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { Readable, Writable } from 'node:stream'
import { createApp } from '../server/app.js'

const VALID_SUBMISSION = {
    name: 'Ivan Petrov',
    phone: '+7 (900) 111-22-33',
    email: 'ivan@example.com',
    comment: 'Need Drupal support',
    consent: true,
}

async function createTestApp() {
    const dir = await mkdtemp(join(tmpdir(), 'drupal-submissions-'))
    return createApp({
        dataFile: join(dir, 'submissions.json'),
        publicDir: join(dir, 'public'),
    })
}

function basic(login, password) {
    return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`
}

class MockResponse extends Writable {
    constructor(resolve) {
        super()
        this.statusCode = 200
        this.headers = {}
        this.chunks = []
        this.on('finish', () => {
            const body = Buffer.concat(this.chunks).toString('utf8')
            resolve({
                status: this.statusCode,
                headers: this.headers,
                body,
                json: () => JSON.parse(body),
            })
        })
    }

    writeHead(statusCode, headers = {}) {
        this.statusCode = statusCode
        this.headers = { ...this.headers, ...headers }
    }

    _write(chunk, _encoding, callback) {
        this.chunks.push(Buffer.from(chunk))
        callback()
    }

    end(chunk, encoding, callback) {
        if (chunk) this.chunks.push(Buffer.from(chunk, encoding))
        super.end(callback)
    }
}

function createRequest({ method = 'GET', path = '/', headers = {}, body = '' } = {}) {
    const req = Readable.from(body ? [body] : [])
    const normalizedHeaders = Object.fromEntries(
        Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
    )
    req.method = method
    req.url = path
    req.headers = {
        host: 'test.local',
        ...normalizedHeaders,
    }
    return req
}

async function request(app, options) {
    return new Promise((resolve, reject) => {
        const req = createRequest(options)
        const res = new MockResponse(resolve)
        res.on('error', reject)
        req.on('error', reject)
        app.emit('request', req, res)
    })
}

async function validatesJsonPayloads() {
    const app = await createTestApp()
    const response = await request(app, {
        method: 'POST',
        path: '/api/submissions',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ ...VALID_SUBMISSION, email: 'wrong' }),
    })

    assert.equal(response.status, 422)
    const payload = response.json()
    assert.equal(payload.errors.email, 'contact.form.errors.emailInvalid')
}

async function createsAndUpdatesWithBasicAuth() {
    const app = await createTestApp()
    const createResponse = await request(app, {
        method: 'POST',
        path: '/api/submissions',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(VALID_SUBMISSION),
    })

    assert.equal(createResponse.status, 201)
    const created = createResponse.json()
    const profilePath = new URL(created.profileUrl).pathname
    assert.match(created.credentials.login, /^user_[a-f0-9]{6}$/)
    assert.ok(created.credentials.password)
    assert.equal(created.submission.data.email, VALID_SUBMISSION.email)

    const updateWithoutAuth = await request(app, {
        method: 'PUT',
        path: profilePath,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ ...VALID_SUBMISSION, comment: 'Updated' }),
    })

    assert.equal(updateWithoutAuth.status, 401)

    const updateResponse = await request(app, {
        method: 'PUT',
        path: profilePath,
        headers: {
            Authorization: basic(created.credentials.login, created.credentials.password),
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ ...VALID_SUBMISSION, comment: 'Updated' }),
    })

    assert.equal(updateResponse.status, 200)
    const updated = updateResponse.json()
    assert.equal(updated.submission.login, created.credentials.login)
    assert.equal(updated.submission.data.comment, 'Updated')

    const profileResponse = await request(app, {
        path: profilePath,
        headers: {
            Authorization: basic(created.credentials.login, created.credentials.password),
            Accept: 'application/json',
        },
    })

    assert.equal(profileResponse.status, 200)
    const profile = profileResponse.json()
    assert.equal(profile.submission.data.comment, 'Updated')
}

async function acceptsXmlPayloads() {
    const app = await createTestApp()
    const response = await request(app, {
        method: 'POST',
        path: '/api/submissions',
        headers: {
            'Content-Type': 'application/xml',
            Accept: 'application/xml',
        },
        body: `<submission>
  <name>${VALID_SUBMISSION.name}</name>
  <phone>${VALID_SUBMISSION.phone}</phone>
  <email>${VALID_SUBMISSION.email}</email>
  <comment>${VALID_SUBMISSION.comment}</comment>
  <consent>true</consent>
</submission>`,
    })

    assert.equal(response.status, 201)
    assert.match(response.body, /<credentials>/)
    assert.match(response.body, /<profileUrl>/)
}

async function acceptsHtmlForms() {
    const app = await createTestApp()
    const form = new URLSearchParams({
        name: VALID_SUBMISSION.name,
        phone: VALID_SUBMISSION.phone,
        email: VALID_SUBMISSION.email,
        comment: VALID_SUBMISSION.comment,
        consent: 'true',
    })

    const response = await request(app, {
        method: 'POST',
        path: '/api/submissions',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/html',
        },
        body: form.toString(),
    })

    assert.equal(response.status, 201)
    assert.match(response.body, /Заявка создана/)
    assert.match(response.body, /Логин/)
    assert.match(response.body, /Пароль/)
}

async function updatesWithHtmlMethodOverride() {
    const app = await createTestApp()
    const createResponse = await request(app, {
        method: 'POST',
        path: '/api/submissions',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(VALID_SUBMISSION),
    })
    const created = createResponse.json()
    const profilePath = new URL(created.profileUrl).pathname
    const form = new URLSearchParams({
        _method: 'put',
        name: VALID_SUBMISSION.name,
        phone: VALID_SUBMISSION.phone,
        email: VALID_SUBMISSION.email,
        comment: 'Updated from HTML',
        consent: 'true',
    })

    const response = await request(app, {
        method: 'POST',
        path: profilePath,
        headers: {
            Authorization: basic(created.credentials.login, created.credentials.password),
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/html',
        },
        body: form.toString(),
    })

    assert.equal(response.status, 200)
    assert.match(response.body, /Заявка обновлена/)
}

const tests = [
    ['POST /api/submissions validates JSON payloads', validatesJsonPayloads],
    ['POST creates credentials and PUT updates with Basic Auth', createsAndUpdatesWithBasicAuth],
    ['POST accepts XML and can answer XML', acceptsXmlPayloads],
    ['POST accepts regular HTML forms for no-JS fallback', acceptsHtmlForms],
    ['POST method override updates regular HTML forms', updatesWithHtmlMethodOverride],
]

async function main() {
    for (const [name, fn] of tests) {
        try {
            await fn()
            console.log(`ok - ${name}`)
        } catch (error) {
            console.error(`not ok - ${name}`)
            console.error(error)
            process.exitCode = 1
            break
        }
    }
}

main()
