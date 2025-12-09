import React from 'react'
import reviewLogo from '../../assets/img/review-winamp-logo.png'
import reviewBgShape from '../../assets/img/review-quote-bg.svg'

export function ReviewsSection() {
    return (
        <section id="reviews" className="reviews">
            <div className="container">
                <h2 className="reviews__title">Отзывы</h2>

                <div className="reviews__wrap">
                    <div className="reviews__bg-shape" aria-hidden="true">
                        <img src={reviewBgShape} alt="" />
                    </div>

                    <div className="reviews__card-stack">
                        <div className="reviews__card reviews__card--ghost reviews__card--ghost-top" aria-hidden="true" />
                        <div className="reviews__card reviews__card--ghost" aria-hidden="true" />

                        <article className="reviews__card reviews__card--main">
                            <div className="reviews__content">
                                <img
                                    className="reviews__logo"
                                    src={reviewLogo}
                                    alt="Winamp"
                                />

                                <a className="reviews__headline" href="#">
                                    Команда Drupal Coder вызвала только положительные впечатления!
                                </a>

                                <p className="reviews__author">
                                    Нуреев Александр, менеджер проекта Winamp Russian Community
                                </p>
                            </div>

                            <div className="reviews__divider" aria-hidden="true" />

                            <div className="reviews__controls">
                                <button
                                    type="button"
                                    className="reviews__arrow reviews__arrow--prev"
                                    aria-label="Предыдущий отзыв"
                                    disabled
                                >
                                    <svg
                                        width="16"
                                        height="32"
                                        viewBox="0 0 16 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 4L4 16L12 28"
                                            stroke="#050C33"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <div className="reviews__counter">
                                    <span className="reviews__counter-current">01</span>
                                    <span className="reviews__counter-total">/ 14</span>
                                </div>

                                <button
                                    type="button"
                                    className="reviews__arrow reviews__arrow--next"
                                    aria-label="Следующий отзыв"
                                >
                                    <svg
                                        width="16"
                                        height="32"
                                        viewBox="0 0 16 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 4L12 16L4 28"
                                            stroke="#050C33"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}
