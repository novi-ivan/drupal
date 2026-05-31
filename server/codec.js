const FIELD_NAMES = ['name', 'phone', 'email', 'comment', 'consent']

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export function escapeXml(value) {
    return escapeHtml(value)
}

function decodeXml(value) {
    return String(value ?? '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
}

function parseXmlBody(rawBody) {
    const result = {}

    for (const field of FIELD_NAMES) {
        const pattern = new RegExp(
            `<${escapeRegExp(field)}\\b[^>]*>([\\s\\S]*?)<\\/${escapeRegExp(field)}>`,
            'i',
        )
        const match = rawBody.match(pattern)
        if (match) result[field] = decodeXml(match[1])
    }

    return result
}

function parseFormBody(rawBody) {
    const params = new URLSearchParams(rawBody)
    return Object.fromEntries(params.entries())
}

export async function readRequestBody(req) {
    const chunks = []
    for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    }
    return Buffer.concat(chunks).toString('utf8')
}

export function parseBody(rawBody, contentType = '') {
    if (!rawBody) return {}
    const type = contentType.split(';')[0].trim().toLowerCase()

    if (type === 'application/json') {
        return JSON.parse(rawBody)
    }

    if (type === 'application/xml' || type === 'text/xml') {
        return parseXmlBody(rawBody)
    }

    if (type === 'application/x-www-form-urlencoded') {
        return parseFormBody(rawBody)
    }

    return parseFormBody(rawBody)
}

export function preferredResponseType(req, fallback = 'json') {
    const accept = String(req.headers.accept || '').toLowerCase()
    const contentType = String(req.headers['content-type'] || '').toLowerCase()

    if (accept.includes('text/html') && !accept.includes('application/json')) return 'html'
    if (accept.includes('application/xml') || contentType.includes('application/xml')) return 'xml'
    return fallback
}

function objectToXml(value, tagName = 'response') {
    if (value === null || value === undefined) return `<${tagName} />`

    if (Array.isArray(value)) {
        return value.map((item) => objectToXml(item, tagName)).join('')
    }

    if (typeof value === 'object') {
        const inner = Object.entries(value)
            .map(([key, item]) => objectToXml(item, key))
            .join('')
        return `<${tagName}>${inner}</${tagName}>`
    }

    return `<${tagName}>${escapeXml(value)}</${tagName}>`
}

export function toXml(payload) {
    return `<?xml version="1.0" encoding="UTF-8"?>${objectToXml(payload)}`
}

export function send(res, statusCode, payload, type = 'json', headers = {}) {
    if (type === 'xml') {
        res.writeHead(statusCode, {
            'Content-Type': 'application/xml; charset=utf-8',
            ...headers,
        })
        res.end(toXml(payload))
        return
    }

    if (type === 'html') {
        res.writeHead(statusCode, {
            'Content-Type': 'text/html; charset=utf-8',
            ...headers,
        })
        res.end(String(payload))
        return
    }

    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
    })
    res.end(`${JSON.stringify(payload, null, 2)}\n`)
}
