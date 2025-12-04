import React from 'react'

const tariffs = [
    {
        name: 'Стартовый',
        price: '2000',
        note: 'в час',
        features: [
            'Предоплата от 2 часов',
            'Консультации и работы по SEO',
            'Услуги дизайнера',
            'Стандартное время реакции',
            'Неиспользованные оплаченные часы переносятся на следующий месяц',
        ],
        buttonText: 'Оставить заявку!',
        type: 'basic',
    },
    {
        name: 'Бизнес',
        price: '2000',
        note: 'в час',
        features: [
            'Предоплата от 10 часов',
            'Консультации и работы по SEO',
            'Услуги дизайнера',
            'Высокое время реакции – до 2 рабочих дней',
            'Неиспользованные часы не переносятся',
        ],
        buttonText: 'Оставить заявку!',
        type: 'primary', // центральная карточка
    },
    {
        name: 'VIP',
        price: '1800',
        note: 'в час',
        features: [
            'Предоплата от 100 часов',
            'Консультации и работы по SEO',
            'Услуги дизайнера',
            'Максимальное время реакции – в день обращения',
            'Неиспользованные часы не переносятся',
        ],
        buttonText: 'Оставить заявку!',
        type: 'basic',
    },
]

export function TariffsSection() {
    return (
        <section id="tariffs" className="section tariffs">
            <div className="container">
                <h2 className="tariffs__title">Тарифы</h2>

                <div className="tariffs__cards">
                    {tariffs.map((tariff, idx) => (
                        <article
                            key={idx}
                            className={
                                'tariff-card' +
                                (tariff.type === 'primary' ? ' tariff-card--primary' : '')
                            }
                        >
                            <div className="tariff-card__header">
                                <p className="tariff-card__name">{tariff.name}</p>
                                <p className="tariff-card__price">
                  <span className="tariff-card__price-value">
                    {tariff.price}
                  </span>
                                    <span className="tariff-card__price-currency"> ₽</span>
                                </p>
                                <p className="tariff-card__note">{tariff.note}</p>
                            </div>

                            <ul className="tariff-card__list">
                                {tariff.features.map((f, i) => (
                                    <li key={i} className="tariff-card__item">
                                        <span className="tariff-card__bullet" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={
                                    'btn tariff-card__btn' +
                                    (tariff.type === 'primary' ? ' tariff-card__btn--filled' : ' btn--outline')
                                }
                            >
                                {tariff.buttonText}
                            </button>
                        </article>
                    ))}
                </div>

                <div className="tariffs__footer">
                    <p className="tariffs__footer-text">
                        Вам не подходят наши тарифы? Оставьте заявку и мы <br/>
                        предложим вам индивидуальные условия!
                    </p>
                    <button className="tariffs__footer-link">
                        получить индивидуальный тариф
                    </button>
                </div>
            </div>
        </section>
    )
}