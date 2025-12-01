import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../features/hero/Hero'
import { SupportSection } from '../features/support/SupportSection'

export function Home({ onBurgerClick, onContactClick }) {
    return (
        <>
            <Header
                onBurgerClick={onBurgerClick}
                onContactClick={onContactClick}
            />

            <main>
                {/* Hero с видео */}
                <Hero />

                {/* НОВЫЙ БЛОК из фигмы: 13 лет совершенствуем компетенции */}
                <section id="support" className="section section--white">
                    <div className="container">
                        <SupportSection />
                    </div>
                </section>

                {/* дальше будут Тарифы, Наши работы и т.д. */}
            </main>

            <Footer />
        </>
    )
}