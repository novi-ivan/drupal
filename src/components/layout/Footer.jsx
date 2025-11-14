import React from 'react'

export function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__left">
                    <p className="footer__company">Drupal coder</p>
                    <p className="footer__copy">
                        © {new Date().getFullYear()} Drupal coder
                    </p>
                </div>

                <div className="footer__right">
                    <a href="mailto:info@drupalcoder.ru" className="footer__link">
                        info@drupalcoder.ru
                    </a>
                    <a href="tel:+79999999999" className="footer__link">
                        +7 (999) 999-99-99
                    </a>
                </div>
            </div>
        </footer>
    )
}