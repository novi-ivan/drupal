import React from 'react'
import logo from '../../assets/img/drupal-coder.svg'
import { contactPhone, contactPhoneHref } from '../../content/contact'
import { languageLabel, mainNavItems } from '../../content/navigation'

export function Header({
                           activeSection = 'support',
                           onNavClick,
                           onBurgerClick,
                           onLangClick,
                       }) {
    const handleNavClick = (e, item) => {
        if (onNavClick) {
            e.preventDefault()
            onNavClick(item)
        }
    }

    return (
        <header className="header">
            <div className="container header__inner">

                {/* ЛОГО СЛЕВА */}
                <div className="header__left">
                    <a href="#top" className="header__logo">
                        <img src={logo} alt="Drupal-coder" />
                    </a>
                </div>

                {/* МЕНЮ ПО ЦЕНТРУ (ДЕСКТОП) */}
                <nav className="header__nav header__nav--desktop">
                    {mainNavItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={
                                'header__link' +
                                (item.id === activeSection ? ' header__link--active' : '')
                            }
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* ПРАВО: ТЕЛЕФОН + RU + БУРГЕР */}
                <div className="header__right">
                    <a href={contactPhoneHref} className="header__phone">
                        {contactPhone}
                    </a>

                    <button
                        type="button"
                        className="header__lang"
                        onClick={onLangClick}
                    >
                        <span className="header__lang-text">{languageLabel}</span>
                        <svg
                            className="header__lang-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="6"
                            viewBox="0 0 9 6"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M0.707031 0.707092L4.20703 4.20709L7.70703 0.707092"
                                stroke="white"
                                strokeWidth="2"
                                opacity="0.24"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="header__burger"
                        aria-label="Открыть меню"
                        onClick={onBurgerClick}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    )
}
