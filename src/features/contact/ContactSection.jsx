import React from 'react'
import contactBgTop from '../../assets/img/contact-bg-top.png'
import contactBgBottom from '../../assets/img/contact-bg-bottom.png'
import contactIconPhone from '../../assets/img/contact-icon-phone.svg'
import contactIconMail from '../../assets/img/contact-icon-mail.svg'
import contactIconCheck from '../../assets/img/contact-icon-check.svg'
import {
    contactEmail,
    contactEmailHref,
    contactPhone,
    contactPhoneHref,
    consentText,
} from '../../content/contact'

export function ContactSection() {
    const handleSubmit = (event) => {
        event.preventDefault()
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

                <form className="contact__form" onSubmit={handleSubmit}>
                    <label className="contact__field">
                        <span className="visually-hidden">Ваше имя</span>
                        <input type="text" name="name" placeholder="Ваше имя" />
                    </label>
                    <label className="contact__field">
                        <span className="visually-hidden">Телефон</span>
                        <input type="tel" name="phone" placeholder="Телефон" />
                    </label>
                    <label className="contact__field">
                        <span className="visually-hidden">E-mail</span>
                        <input type="email" name="email" placeholder="E-mail" />
                    </label>
                    <label className="contact__field contact__field--textarea">
                        <span className="visually-hidden">Ваш комментарий</span>
                        <textarea name="comment" rows="3" placeholder="Ваш комментарий" />
                    </label>

                    <label className="contact__checkbox">
                        <input type="checkbox" defaultChecked />
                        <span className="contact__checkbox-box">
                            <img src={contactIconCheck} alt="" />
                        </span>
                        <span className="contact__checkbox-label">
                            {consentText}
                        </span>
                    </label>

                    <button type="submit" className="contact__submit">
                        Оставить заявку!
                    </button>
                </form>
            </div>

            <div className="contact__footnote container">
                <p>Проект ООО «Инитлаб», Краснодар, Россия.</p>
                <p>Drupal является зарегистрированной торговой маркой Dries Buytaert.</p>
            </div>
        </section>
    )
}
