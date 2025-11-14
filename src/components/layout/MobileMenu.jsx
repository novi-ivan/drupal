import React from 'react'

const navItems = [
    { href: '#services', label: 'Услуги' },
    { href: '#cases', label: 'Кейсы' },
    { href: '#team', label: 'Команда' },
]

export function MobileMenu({ isOpen, onClose, onContactClick }) {
    return (
        <div className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
            <div className="mobile-menu__backdrop" onClick={onClose} />

            <div className="mobile-menu__panel">
                <button
                    type="button"
                    className="mobile-menu__close"
                    onClick={onClose}
                    aria-label="Закрыть меню"
                >
                    ✕
                </button>

                <nav className="mobile-menu__nav">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="mobile-menu__link"
                            onClick={onClose}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    className="btn mobile-menu__contact-btn"
                    onClick={onContactClick}
                >
                    Связаться
                </button>
            </div>
        </div>
    )
}