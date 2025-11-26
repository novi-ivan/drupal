import React from 'react'
import heroVideo from '/src/assets/video/video.mp4'
import druplicon from '/src/assets/img/druplicon.svg'
import { HeroStats } from './HeroStats'
export function Hero() {
    return (

        <section className="hero">
            <div className="hero__bg">
                <video
                    className="hero__video"
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <img src={druplicon} className="hero__image" />
                <div className="hero__overlay" />
            </div>

            <div className="container hero__content">
                <div className="hero__text">
                    <h1 className="hero__title">
                        Поддержка сайтов на Drupal
                    </h1>
                    <p className="hero__subtitle">
                        Сопровождение и поддержка сайтов
                        на CMS Drupal любых версий и запущенности
                    </p>

                    <div className="hero__actions">
                        <button className="btn btn--outline hero__btn-outline">
                            Тарифы
                        </button>
                    </div>
                </div>
                <HeroStats />
                {/* Здесь потом можно будет добавить блок с цифрами / логотипами клиентов */}
            </div>
        </section>
    )
}