import { escapeHtml } from './codec.js'

const ERROR_LABELS = {
    'contact.form.errors.nameRequired': 'Введите имя',
    'contact.form.errors.phoneInvalid': 'Введите корректный телефон',
    'contact.form.errors.emailInvalid': 'Введите корректный e-mail',
    'contact.form.errors.consentRequired': 'Нужно согласие',
}

function checked(value) {
    return value ? 'checked' : ''
}

function errorText(errors, field) {
    if (!errors?.[field]) return ''
    return `<p class="error">${escapeHtml(ERROR_LABELS[errors[field]] || errors[field])}</p>`
}

function layout(title, body) {
    return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 0; background: #05081a; color: #fff; font-family: Arial, sans-serif; }
    main { max-width: 720px; margin: 0 auto; padding: 40px 20px; }
    form { display: grid; gap: 12px; margin-top: 24px; }
    input, textarea { width: 100%; box-sizing: border-box; padding: 14px; border: 1px solid #8b8d98; border-radius: 4px; background: #080d22; color: #fff; font: inherit; }
    textarea { min-height: 120px; resize: vertical; }
    label.checkbox { display: flex; gap: 10px; align-items: center; }
    label.checkbox input { width: auto; }
    button, a.button { display: inline-block; border: 0; border-radius: 4px; background: #f14d34; color: #fff; padding: 14px 20px; text-decoration: none; cursor: pointer; }
    .error { color: #ff8a76; margin: -4px 0 4px; }
    .panel { border: 1px solid rgba(255,255,255,.25); border-radius: 6px; padding: 20px; background: rgba(255,255,255,.06); }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: 8px 14px; }
    dd { margin: 0; word-break: break-word; }
  </style>
</head>
<body>
  <main>${body}</main>
</body>
</html>`
}

export function renderCreateResult(payload) {
    const profileUrl = payload.profileUrl
    return layout(
        'Заявка создана',
        `<section class="panel">
  <h1>Заявка создана</h1>
  <p>Сохраните логин и пароль для редактирования заявки.</p>
  <dl>
    <dt>Логин</dt><dd>${escapeHtml(payload.credentials.login)}</dd>
    <dt>Пароль</dt><dd>${escapeHtml(payload.credentials.password)}</dd>
    <dt>Профиль</dt><dd><a href="${escapeHtml(profileUrl)}">${escapeHtml(profileUrl)}</a></dd>
  </dl>
  <p><a class="button" href="${escapeHtml(profileUrl)}">Открыть профиль</a></p>
</section>`,
    )
}

export function renderUpdateResult(payload) {
    return layout(
        'Заявка обновлена',
        `<section class="panel">
  <h1>Заявка обновлена</h1>
  <p>Данные профиля ${escapeHtml(payload.submission.login)} сохранены.</p>
  <p><a class="button" href="${escapeHtml(payload.profileUrl)}">Вернуться в профиль</a></p>
</section>`,
    )
}

export function renderSubmissionForm({
    title = 'Заявка',
    action = '/api/submissions',
    methodOverride = '',
    values = {},
    errors = {},
    submitLabel = 'Отправить',
} = {}) {
    return layout(
        title,
        `<h1>${escapeHtml(title)}</h1>
<form action="${escapeHtml(action)}" method="post">
  ${methodOverride ? `<input type="hidden" name="_method" value="${escapeHtml(methodOverride)}">` : ''}
  <input name="name" placeholder="Ваше имя" value="${escapeHtml(values.name)}">
  ${errorText(errors, 'name')}
  <input name="phone" placeholder="Телефон" value="${escapeHtml(values.phone)}">
  ${errorText(errors, 'phone')}
  <input name="email" placeholder="E-mail" value="${escapeHtml(values.email)}">
  ${errorText(errors, 'email')}
  <textarea name="comment" placeholder="Ваш комментарий">${escapeHtml(values.comment)}</textarea>
  <label class="checkbox">
    <input type="checkbox" name="consent" value="true" ${checked(values.consent)}>
    <span>Согласие на обработку персональных данных</span>
  </label>
  ${errorText(errors, 'consent')}
  <button type="submit">${escapeHtml(submitLabel)}</button>
</form>`,
    )
}

export function renderProfilePage(profile, basePath = '') {
    const login = profile.login
    return renderSubmissionForm({
        title: `Профиль ${login}`,
        action: `${basePath}/api/submissions/${encodeURIComponent(login)}`,
        methodOverride: 'put',
        values: profile.data,
        submitLabel: 'Сохранить',
    })
}

export function renderErrorPage(statusCode, message) {
    return layout(
        `Ошибка ${statusCode}`,
        `<section class="panel">
  <h1>Ошибка ${statusCode}</h1>
  <p>${escapeHtml(message)}</p>
</section>`,
    )
}
