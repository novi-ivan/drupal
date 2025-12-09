import React from 'react'
import logoRosatom from '../../assets/img/logo-rosatom.png'
import logoGoznak from '../../assets/img/logo-goznak.png'
import logoGazprombank from '../../assets/img/logo-gazprombank.png'
import logoVtb from '../../assets/img/logo-vtb.png'

const logos = [
    { src: logoRosatom, alt: 'Росатом' },
    { src: logoGoznak, alt: 'Гознак' },
    { src: logoGazprombank, alt: 'Газпромбанк' },
    { src: logoVtb, alt: 'ВТБ' },
    { src: logoGoznak, alt: 'Гознак' },
    { src: logoRosatom, alt: 'Росатом' },
    { src: logoRosatom, alt: 'Росатом' },
    { src: logoVtb, alt: 'ВТБ' },
    { src: logoGoznak, alt: 'Гознак' },
    { src: logoVtb, alt: 'ВТБ' },
]

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
                    {logos.map((logo, index) => (
                        <div className="partners__card" key={`${logo.alt}-${index}`}>
                            <img className="partners__logo" src={logo.src} alt={logo.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
