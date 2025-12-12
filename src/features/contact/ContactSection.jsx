import React, { useState } from 'react'
import contactBgTop from '../../assets/img/D-flying.svg'
import contactBgBottom from '../../assets/img/D-flying-bottom.svg'
import contactIconPhone from '../../assets/img/contact-icon-phone.svg'
import contactIconMail from '../../assets/img/contact-icon-mail.svg'
import checkIcon from '../../assets/img/check.svg'
import {
    contactEmail,
    contactEmailHref,
    contactPhone,
    contactPhoneHref,
    consentText,
} from '../../content/contact'

const FORMCARRY_URL = 'https://formcarry.com/s/tHO8EjUKU6g'

const isValidPhone = (v) => /^\+?[0-9\s\-()]{7,}$/.test(v)
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export function ContactSection() {
    const [errors, setErrors] = useState({ name: '', phone: '', email: '', consent: '' })
    const [status, setStatus] = useState('idle')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.currentTarget
        const fd = new FormData(form)

        const name = String(fd.get('name') || '').trim()
        const phone = String(fd.get('phone') || '').trim()
        const email = String(fd.get('email') || '').trim()
        const comment = String(fd.get('comment') || '').trim()
        const consent = fd.get('consent') === 'on'

        const nextErrors = { name: '', phone: '', email: '', consent: '' }

        if (!name) nextErrors.name = 'Введите имя'
        if (!isValidPhone(phone)) nextErrors.phone = 'Введите корректный телефон'
        if (!isValidEmail(email)) nextErrors.email = 'Введите корректный e-mail'
        if (!consent) nextErrors.consent = 'Нужно согласие'

        setErrors(nextErrors)

        if (nextErrors.name || nextErrors.phone || nextErrors.email || nextErrors.consent) {
            setStatus('error')
            return
        }

        setStatus('loading')

        try {
            const res = await fetch(FORMCARRY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ name, phone, email, comment }),
            })

            if (!res.ok) throw new Error()

            setStatus('success')
            setErrors({ name: '', phone: '', email: '', consent: '' })
            form.reset()
        } catch {
            setStatus('error')
        }
    }

    return (
        <section id="contacts" className="contact">
            <div className="contact__bg contact__bg--top">
                <img src={contactBgTop} alt="" />
            </div>
            <div className="contact__bg contact__bg--bottom">
                <img src={contactBgBottom} alt="" />
            </div>

            <div className="container contact__inner">
                <div className="contact__info">
                    <h2 className="contact__title">Оставить заявку на поддержку сайта</h2>
                    <p className="contact__text">
                        Срочно нужна поддержка сайта? Ваша команда не успевает справиться
                        самостоятельно или предыдущий подрядчик не справился с работой?
                        Тогда вам точно к нам! Просто оставьте заявку и наш менеджер с вами свяжется!
                    </p>

                    <div className="contact__links">
                        <a className="contact__link contact__link--phone" href={contactPhoneHref}>
                            <img src={contactIconPhone} alt="" className="contact__icon" />
                            <span>{contactPhone}</span>
                        </a>

                        <a className="contact__link" href={contactEmailHref}>
                            <img src={contactIconMail} alt="" className="contact__icon" />
                            <span className="contact__mail">{contactEmail}</span>
                        </a>
                    </div>
                </div>

                <form className="contact__form" onSubmit={handleSubmit} noValidate>
                    <label className={`contact__field ${errors.name ? 'contact__field--error' : ''}`}>
                        <input type="text" name="name" placeholder="Ваше имя" />
                    </label>
                    {errors.name && <p className="contact__error">{errors.name}</p>}

                    <label className={`contact__field ${errors.phone ? 'contact__field--error' : ''}`}>
                        <input type="tel" name="phone" placeholder="Телефон" />
                    </label>
                    {errors.phone && <p className="contact__error">{errors.phone}</p>}

                    <label className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                        <input type="email" name="email" placeholder="E-mail" />
                    </label>
                    {errors.email && <p className="contact__error">{errors.email}</p>}

                    <label className="contact__field contact__field--textarea">
                        <textarea name="comment" rows="3" placeholder="Ваш комментарий" />
                    </label>

                    <label className={`contact__checkbox ${errors.consent ? 'contact__checkbox--error' : ''}`}>
                        <input type="checkbox" name="consent" defaultChecked />
                        <span className="contact__checkbox-box">
                            <img src={checkIcon} alt="" />
                        </span>
                        <span className="contact__checkbox-label">{consentText}</span>
                    </label>
                    {errors.consent && <p className="contact__error">{errors.consent}</p>}

                    <button type="submit" className="contact__submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Отправка…' : 'Оставить заявку!'}
                    </button>

                    {status === 'success' && <p className="contact__success">Заявка отправлена</p>}
                </form>
            </div>

            <div className="contact__footnote container">
                <p>Проект ООО «Инитлаб», Краснодар, Россия.</p>
                <p>Drupal является зарегистрированной торговой маркой Dries Buytaert.</p>
            </div>
        </section>
    )
}