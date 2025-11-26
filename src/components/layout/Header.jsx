import React from 'react'
import logo from '../../assets/img/drupal-coder.svg'

const navItems = [
    { id: 'support',  href: '#support',  label: 'Поддержка сайтов' },
    { id: 'tariffs',  href: '#tariffs',  label: 'Тарифы' },
    { id: 'works',    href: '#works',    label: 'Наши работы' },
    { id: 'reviews',  href: '#reviews',  label: 'Отзывы' },
    { id: 'contacts', href: '#contacts', label: 'Контакты' },
]

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
                    {navItems.map((item) => (
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
                    <a href="tel:88002222673" className="header__phone">
                        8 800 222-26-73
                    </a>

                    <button
                        type="button"
                        className="header__lang"
                        onClick={onLangClick}
                    >
                        <span>RU</span>
                        <span className="header__lang-arrow">▾</span>
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