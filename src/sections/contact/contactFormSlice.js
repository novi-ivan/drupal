import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const SUBMISSIONS_URL = '/api/submissions'

const isValidPhone = (value) => /^\+?[0-9\s\-()]{7,}$/.test(value)
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

function validate(values) {
    const errors = { name: '', phone: '', email: '', consent: '' }

    if (!String(values.name || '').trim())
        errors.name = 'contact.form.errors.nameRequired'
    if (!isValidPhone(String(values.phone || '').trim()))
        errors.phone = 'contact.form.errors.phoneInvalid'
    if (!isValidEmail(String(values.email || '').trim()))
        errors.email = 'contact.form.errors.emailInvalid'
    if (!values.consent) errors.consent = 'contact.form.errors.consentRequired'

    return errors
}

function hasErrors(errors) {
    return Boolean(errors.name || errors.phone || errors.email || errors.consent)
}

function encodeBasicAuth(login, password) {
    return window.btoa(`${login}:${password}`)
}

async function parseResponse(res) {
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) return res.json()
    return { message: await res.text() }
}

export const submitContactForm = createAsyncThunk(
    'contactForm/submit',
    async (_, { getState, rejectWithValue }) => {
        const { values, credentials, profilePath } = getState().contactForm

        const trimmedValues = {
            name: String(values.name || '').trim(),
            phone: String(values.phone || '').trim(),
            email: String(values.email || '').trim(),
            comment: String(values.comment || '').trim(),
            consent: Boolean(values.consent),
        }

        const errors = validate(trimmedValues)
        if (hasErrors(errors)) {
            return rejectWithValue({ kind: 'validation', errors })
        }

        const isUpdate = Boolean(credentials?.login && credentials?.password && profilePath)
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        if (isUpdate) {
            headers.Authorization = `Basic ${encodeBasicAuth(credentials.login, credentials.password)}`
        }

        try {
            const res = await fetch(isUpdate ? profilePath : SUBMISSIONS_URL, {
                method: isUpdate ? 'PUT' : 'POST',
                headers,
                body: JSON.stringify({
                    name: trimmedValues.name,
                    phone: trimmedValues.phone,
                    email: trimmedValues.email,
                    comment: trimmedValues.comment,
                    consent: trimmedValues.consent,
                }),
            })

            const payload = await parseResponse(res)

            if (!res.ok) {
                if (payload?.errors) {
                    return rejectWithValue({ kind: 'validation', errors: payload.errors })
                }

                return rejectWithValue({
                    kind: 'network',
                    messageKey: 'contact.form.errors.submitFailed',
                })
            }

            return {
                ...payload,
                action: isUpdate ? 'update' : 'create',
            }
        } catch {
            return rejectWithValue({
                kind: 'network',
                messageKey: 'contact.form.errors.submitFailed',
            })
        }
    },
)

export const contactFormInitialState = {
    values: {
        name: '',
        phone: '',
        email: '',
        comment: '',
        consent: true,
    },
    credentials: null,
    profileUrl: '',
    profilePath: '',
    submission: null,
    lastAction: '',
    errors: { name: '', phone: '', email: '', consent: '' },
    status: 'idle', // idle | loading | success | error | invalid
    submitErrorMessageKey: '',
}

const contactFormSlice = createSlice({
    name: 'contactForm',
    initialState: contactFormInitialState,
    reducers: {
        setField(state, action) {
            const { field, value } = action.payload
            state.values[field] = value
            if (state.errors[field] !== undefined) state.errors[field] = ''
            if (state.status === 'success') state.status = 'idle'
        },
        setConsent(state, action) {
            state.values.consent = Boolean(action.payload)
            state.errors.consent = ''
            if (state.status === 'success') state.status = 'idle'
        },
        clearSubmitState(state) {
            state.status = 'idle'
            state.submitErrorMessageKey = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.status = 'loading'
                state.submitErrorMessageKey = ''
            })
            .addCase(submitContactForm.fulfilled, (state, action) => {
                state.status = 'success'
                state.errors = { name: '', phone: '', email: '', consent: '' }
                state.submitErrorMessageKey = ''
                state.lastAction = action.payload.action

                if (action.payload.credentials) {
                    state.credentials = action.payload.credentials
                }

                if (action.payload.profileUrl) {
                    state.profileUrl = action.payload.profileUrl
                }

                if (action.payload.profilePath) {
                    state.profilePath = action.payload.profilePath
                }

                if (action.payload.submission) {
                    state.submission = action.payload.submission
                }
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                const payload = action.payload
                if (payload?.kind === 'validation') {
                    state.status = 'invalid'
                    state.errors = payload.errors
                    state.submitErrorMessageKey = ''
                    return
                }

                state.status = 'error'
                state.submitErrorMessageKey =
                    payload?.messageKey || 'contact.form.errors.submitFailed'
            })
    },
})

export const { setField, setConsent, clearSubmitState } = contactFormSlice.actions
export const contactFormReducer = contactFormSlice.reducer
