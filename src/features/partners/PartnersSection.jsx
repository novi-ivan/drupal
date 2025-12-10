import React from 'react'
import { partners } from '../../content/partners'

export function PartnersSection() {
    return (
        <section id="partners" className="partners">
            <div className="container">
                <h2 className="partners__title">С нами работают</h2>
                <p className="partners__subtitle">
                    Десятки компаний доверяют нам самое ценное, что у них есть в интернете – свои
                    сайты. Мы делаем всё, чтобы наше сотрудничество было долгим.
                </p>

                <div className="partners__grid">
                    {partners.map((logo, index) => (
                        <div className="partners__card" key={`${logo.alt}-${index}`}>
                            <img className="partners__logo" src={logo.src} alt={logo.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
