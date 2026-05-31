const PHONE_RE = /^\+?[0-9\s\-()]{7,}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function toText(value) {
    return String(value ?? '').trim()
}

function toConsent(value) {
    if (typeof value === 'boolean') return value
    const normalized = String(value ?? '').trim().toLowerCase()
    return ['1', 'true', 'on', 'yes', 'y'].includes(normalized)
}

export function normalizeSubmissionInput(input = {}) {
    return {
        name: toText(input.name),
        phone: toText(input.phone),
        email: toText(input.email),
        comment: toText(input.comment),
        consent: toConsent(input.consent),
    }
}

export function validateSubmissionInput(input = {}) {
    const values = normalizeSubmissionInput(input)
    const errors = { name: '', phone: '', email: '', consent: '' }

    if (!values.name) errors.name = 'contact.form.errors.nameRequired'
    if (!PHONE_RE.test(values.phone)) errors.phone = 'contact.form.errors.phoneInvalid'
    if (!EMAIL_RE.test(values.email)) errors.email = 'contact.form.errors.emailInvalid'
    if (!values.consent) errors.consent = 'contact.form.errors.consentRequired'

    return { values, errors }
}

export function hasValidationErrors(errors = {}) {
    return Boolean(errors.name || errors.phone || errors.email || errors.consent)
}
