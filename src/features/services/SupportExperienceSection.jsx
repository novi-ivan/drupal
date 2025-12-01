import React from 'react'

import cardBg1 from '/src/assets/img/support1.svg'
import cardBg2 from '/src/assets/img/support2.svg'
import cardBg3 from '/src/assets/img/support3.svg'
import cardBg4 from '/src/assets/img/support4.svg'
import cardBg5 from '/src/assets/img/support5.svg'
import cardBg6 from '/src/assets/img/support6.svg'
import cardBg7 from '/src/assets/img/support7.svg'
import cardBg8 from '/src/assets/img/support8.svg'

import druplicon from '/src/assets/img/druplicon.svg'

import analyticsImg from '/src/assets/img/laptop.png'

const cards = [
    {
        num: '01.',
        title: 'Постановка задач по Email',
        text: 'Удобная и привычная модель постановки задач, при которой задачи фиксируются и никогда не теряются.',
        bg: cardBg1,
    },
    {
        num: '02.',
        title: 'Система Helpdesk – отчетность, прозрачность',
        text: 'Возможность посмотреть все задачи и работу в личном кабинете через браузер.',
        bg: cardBg2,
    },
    {
        num: '03.',
        title: 'Расширенная техническая поддержка',
        text: 'Возможность организации расширенного техподдержки с 6:00 до 22:00 без выходных.',
        bg: cardBg3,
    },
    {
        num: '04.',
        title: 'Персональный менеджер проекта',
        text: 'Ваш менеджер проекта всегда в курсе текущего состояния и готов ответить на любые вопросы.',
        bg: cardBg4,
    },
    {
        num: '05.',
        title: 'Удобные способы оплаты',
        text: 'Безналичный расчет по договору или электронные деньги: WebMoney, Яндекс.Деньги, Paypal.',
        bg: cardBg5,
    },
    {
        num: '06.',
        title: 'Работаем с SLA и NDA',
        text: 'Работаем в рамках соглашений о конфиденциальности и об уровне качества работ.',
        bg: cardBg6,
    },
    {
        num: '07.',
        title: 'Штатные специалисты',
        text: 'Надёжные штатные специалисты, никаких фрилансеров.',
        bg: cardBg7,
    },
    {
        num: '08.',
        title: 'Удобные каналы связи',
        text: 'Консультации по телефону, в мессенджерах и по почте.',
        bg: cardBg8,
    },
]

export function SupportExperienceSection() {
    return (
        <section className="section support-exp">
            <div className="container">
                <img src={druplicon} alt="" className="support-exp__bg-icon" />

                {/* верх: Поддержка от Drupal-coder */}
                <div className="support-exp__top">
                    <h2 className="support-exp__title">
                        Поддержка<br />от Drupal-coder
                    </h2>

                    <div className="support-exp__grid">
                        {cards.map((card, i) => (
                            <article key={i} className="support-exp__card">
                                <img src={card.bg} alt="" className="support-exp__card-bg" />
                                <div className="support-exp__num">{card.num}</div>
                                <h3 className="support-exp__card-title">{card.title}</h3>
                                <p className="support-exp__card-text">{card.text}</p>
                            </article>
                        ))}
                    </div>
                </div>

                {/* низ: Экспертиза в Drupal, опыт 14 лет! */}
                <div className="support-exp__bottom">
                    <div className="support-exp__image-wrap">
                        <img src={analyticsImg} alt="" className="support-exp__image" />
                    </div>

                    <div className="support-exp__info">
                        <h2 className="support-exp__info-title">
                            Экспертиза в Drupal,<br />опыт 14 лет!
                        </h2>

                        <div className="support-exp__info-grid">
                            <div className="support-exp__info-item">
                                <div className="support-exp__info-line" />
                                <p className="support-exp__info-text">
                                    Только системный подход — контроль версий, резервирование
                                    и тестирование!
                                </p>
                            </div>

                            <div className="support-exp__info-item">
                                <div className="support-exp__info-line" />
                                <p className="support-exp__info-text">
                                    Только Drupal сайты, не берём на поддержку сайты на других CMS!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}