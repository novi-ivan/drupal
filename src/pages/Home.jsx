import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function Home({ onBurgerClick, onContactClick }) {
    return (
        <>
            <Header
                onBurgerClick={onBurgerClick}
                onContactClick={onContactClick}
            />

            <main>
                <section className="section">
                    <div className="container">
                        <h1>Главная страница</h1>
                        <p className="text-muted">
                            Здесь будет Hero с видео и остальные секции.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}