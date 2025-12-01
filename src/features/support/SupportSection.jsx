import React from "react";

export function SupportSection() {
    const items = [
        {
            icon: "src/assets/img/competency-1.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Добавление информации на сайт, создание новых разделов"
        },
        {
            icon: "src//assets/img/competency-2.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Разработка и оптимизация модулей сайта"
        },
        {
            icon: "src//assets/img/competency-3.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Интеграция с CRM, 1С, платежными системами, любыми веб-сервисами"
        },
        {
            icon: "src//assets/img/competency-4.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Любые доработки функционала и дизайна"
        },
        {
            icon: "src//assets/img/competency-5.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Аудит и мониторинг безопасности Drupal сайтов"
        },
        {
            icon: "src//assets/img/competency-6.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Миграция, импорт контента и апгрейд Drupal"
        },
        {
            icon: "src//assets/img/competency-7.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Оптимизация и ускорение Drupal-сайтов"
        },
        {
            icon: "src//assets/img/competency-8.svg",
            bg: "src/assets/img/icon-bg.png",
            text: "Веб-маркетинг, консультации и работы по SEO"
        }
    ];

    return (
        <div className="support">
            <h2 className="support__title">
                13 лет совершенствуем<br />компетенции в Drupal поддержке!
            </h2>

            <p className="support__subtitle">
                Разрабатываем и оптимизируем модули, расширяем функциональность сайтов, обновляем дизайн
            </p>

            <div className="support__grid">
                {items.map((item, idx) => (
                    <div key={idx} className="support__item">
                        <img src={item.icon} alt="" className="support__icon" />
                        <img src={item.bg} className="support__icon-bg" alt="" />
                        <p className="support__text">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}