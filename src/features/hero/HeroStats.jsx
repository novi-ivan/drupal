import React from 'react'

const stats = [
    {
        num: '#1',
        text: 'Drupal-разработчик в России по версии Рейтинга Рунета'
    },
    {
        num: '3+',
        text: 'средний опыт специалистов более 3 лет'
    },
    {
        num: '14',
        text: 'лет опыта в сфере Drupal'
    },
    {
        num: '200+',
        text: 'модулей и тем в формате DrupalGive'
    },
    {
        num: '35 000',
        text: 'часов поддержки сайтов на Drupal'
    },
    {
        num: '200+',
        text: 'проектов на поддержке'
    }
]

export function HeroStats() {
    return (
        <div className="hero-stats">
            {stats.map((item, index) => (
                <div key={index} className="hero-stats__item">
                    <div className="hero-stats__num">{item.num}</div>
                    <div className="hero-stats__text">{item.text}</div>
                </div>
            ))}
        </div>
    )
}