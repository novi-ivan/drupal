import React from 'react'
import caseImg1 from '../../assets/img/case-1.jpg'
import caseImg2 from '../../assets/img/case-2.jpg'
import caseImg3 from '../../assets/img/case-3.jpg'
import caseImg4 from '../../assets/img/case-4.jpg'
import caseImg5 from '../../assets/img/case-5.jpg'
import caseImg6 from '../../assets/img/case-6.jpg'

const CASE_TITLE = 'Настройка выгрузки YML для Яндекс.Маркета'
const CASE_DATE = '22.04.2019'
const CASE_DESCRIPTION =
    'Эти слова совершенно справедливы, однако гипнотический рифф продолжает паузный пласт.'

const cases = [
    {
        id: 1,
        variant: 'description',
        title: CASE_TITLE,
        date: CASE_DATE,
        description: CASE_DESCRIPTION,
        image: caseImg1,
    },
    {
        id: 2,
        variant: 'wide',
        title: CASE_TITLE,
        image: caseImg5,
    },
    {
        id: 3,
        variant: 'vertical',
        title: CASE_TITLE,
        date: CASE_DATE,
        image: caseImg3,
    },
    {
        id: 4,
        variant: 'vertical',
        title: CASE_TITLE,
        date: CASE_DATE,
        image: caseImg2,
    },
    {
        id: 5,
        variant: 'description',
        title: CASE_TITLE,
        date: CASE_DATE,
        description: CASE_DESCRIPTION,
        image: caseImg4,
    },
    {
        id: 6,
        variant: 'wide',
        title: CASE_TITLE,
        image: caseImg6,
    },
    {
        id: 7,
        variant: 'vertical',
        title: CASE_TITLE,
        date: CASE_DATE,
        image: caseImg5,
    },
]

export function CasesSection() {
    return (
        <section id="cases" className="cases">
            <div className="container">
                <h2 className="cases__title">Последние кейсы</h2>

                <div className="cases__grid">
                    {cases.map((caseItem, index) => {
                        if (caseItem.variant === 'wide') {
                            return (
                                <article
                                    key={caseItem.id}
                                    className="case-card case-card--image case-card--wide"
                                    style={{ gridColumn: 'span 2' }}
                                >
                                    <div className="case-card__image-wrapper">
                                        <img src={caseItem.image} alt="" className="case-card__image" />
                                        <div className="case-card__overlay case-card__overlay--wide" />
                                    </div>
                                    <div className="case-card__content case-card__content--wide">
                                        <h3 className="case-card__title">{caseItem.title}</h3>
                                    </div>
                                </article>
                            )
                        }

                        if (caseItem.variant === 'vertical') {
                            return (
                                <article
                                    key={caseItem.id}
                                    className="case-card case-card--image case-card--vertical"
                                    style={{ gridColumn: 'span 1' }}
                                >
                                    <div className="case-card__image-wrapper">
                                        <img src={caseItem.image} alt="" className="case-card__image" />
                                        <div className="case-card__overlay case-card__overlay--vertical" />
                                    </div>
                                    <div className="case-card__content case-card__content--vertical">
                                        <h3 className="case-card__title">{caseItem.title}</h3>
                                        <p className="case-card__date">{caseItem.date}</p>
                                    </div>
                                </article>
                            )
                        }

                        return (
                            <article
                                key={caseItem.id}
                                className="case-card case-card--description"
                                style={{ gridColumn: 'span 1' }}
                            >
                                <div className="case-card__image-wrapper case-card__image-wrapper--description">
                                    <img src={caseItem.image} alt="" className="case-card__image" />
                                </div>
                                <div className="case-card__content case-card__content--description">
                                    <h3 className="case-card__title case-card__title--dark">{caseItem.title}</h3>
                                    <p className="case-card__date case-card__date--dark">{caseItem.date}</p>
                                    {caseItem.description && (
                                        <p className="case-card__description case-card__description--dark">
                                            {caseItem.description}
                                        </p>
                                    )}
                                </div>
                            </article>
                        )
                    })}
                </div>

                <div className="cases__footer">
                    <button className="cases__show-more" type="button">
                        Показать ещё
                    </button>
                </div>
            </div>
        </section>
    )
}
