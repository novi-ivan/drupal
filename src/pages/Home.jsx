import React from 'react'
import { Header } from '../components/layout/Header'
import { Hero } from '../features/hero/Hero'
import { SupportSection } from '../features/support/SupportSection'
import { SupportExperienceSection } from '../features/services/SupportExperienceSection'
import { TariffsSection } from '../features/tariffs/TariffsSection'
import { CasesSection } from '../features/cases/CasesSection'
import { TeamSection } from '../features/team/TeamSection'
import { ReviewsSection } from '../features/reviews/ReviewsSection'
import { PartnersSection } from '../features/partners/PartnersSection'
import { ContactSection } from '../features/contact/ContactSection'
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
                <SupportExperienceSection />
                <TariffsSection />
                <CasesSection />
                <TeamSection />
                <ReviewsSection />
                <PartnersSection />
                <ContactSection />
            </main>
        </>
    )
}
