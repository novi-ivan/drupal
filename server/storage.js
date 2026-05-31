import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const EMPTY_DB = { submissions: [] }

function cloneDb(db) {
    return {
        submissions: Array.isArray(db?.submissions) ? db.submissions : [],
    }
}

async function readDb(filePath) {
    try {
        const raw = await readFile(filePath, 'utf8')
        return cloneDb(JSON.parse(raw))
    } catch (error) {
        if (error.code === 'ENOENT') return cloneDb(EMPTY_DB)
        throw error
    }
}

async function writeDb(filePath, db) {
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, `${JSON.stringify(cloneDb(db), null, 2)}\n`, 'utf8')
}

function createPasswordHash(password) {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(password, salt, 32).toString('hex')
    return { salt, hash }
}

function verifyPassword(password, salt, expectedHash) {
    const hash = scryptSync(password, salt, 32)
    const expected = Buffer.from(expectedHash, 'hex')
    return hash.length === expected.length && timingSafeEqual(hash, expected)
}

function makeLogin(existingLogins) {
    let login = ''
    do {
        login = `user_${randomBytes(3).toString('hex')}`
    } while (existingLogins.has(login))
    return login
}

function makePassword() {
    return randomBytes(6).toString('base64url')
}

function publicSubmission(record) {
    return {
        login: record.login,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        data: record.data,
    }
}

export class SubmissionStore {
    constructor(filePath) {
        this.filePath = filePath
    }

    async all() {
        const db = await readDb(this.filePath)
        return db.submissions.map(publicSubmission)
    }

    async get(login) {
        const db = await readDb(this.filePath)
        const record = db.submissions.find((item) => item.login === login)
        return record ? publicSubmission(record) : null
    }

    async create(data) {
        const db = await readDb(this.filePath)
        const existingLogins = new Set(db.submissions.map((item) => item.login))
        const login = makeLogin(existingLogins)
        const password = makePassword()
        const { salt, hash } = createPasswordHash(password)
        const now = new Date().toISOString()

        const record = {
            login,
            passwordSalt: salt,
            passwordHash: hash,
            createdAt: now,
            updatedAt: now,
            data,
        }

        db.submissions.push(record)
        await writeDb(this.filePath, db)

        return {
            credentials: { login, password },
            submission: publicSubmission(record),
        }
    }

    async update(login, data) {
        const db = await readDb(this.filePath)
        const record = db.submissions.find((item) => item.login === login)
        if (!record) return null

        record.data = data
        record.updatedAt = new Date().toISOString()
        await writeDb(this.filePath, db)

        return publicSubmission(record)
    }

    async authenticate(login, password) {
        const db = await readDb(this.filePath)
        const record = db.submissions.find((item) => item.login === login)
        if (!record) return false
        return verifyPassword(password, record.passwordSalt, record.passwordHash)
    }
}
