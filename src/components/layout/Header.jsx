import React from 'react'
import logo from '../../assets/img/logo.png' // подправь путь/имя если другое

const navItems = [
    { href: '#services', label: 'Услуги' },
    { href: '#cases', label: 'Кейсы' },
    { href: '#team', label: 'Команда' },
]

export function Header({ onContactClick, onBurgerClick }) {
    return (
        <header className="header">
            <div className="container header__inner">
                <a href="#top" className="header__logo">
                    <img src={logo} alt="Drupal coder" />
                </a>

                <nav className="header__nav header__nav--desktop">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className="header__link">
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    className="btn header__contact-btn"
                    onClick={onContactClick}
                >
                    Связаться
                </button>

                <button
                    type="button"
                    className="header__burger"
                    onClick={onBurgerClick}
                    aria-label="Открыть меню"
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    )
}