import React, { useState } from 'react'
import { Home } from './pages/Home'
import { MobileMenu } from './components/layout/MobileMenu'

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleBurgerClick = () => setIsMenuOpen(true)
    const handleMenuClose = () => setIsMenuOpen(false)

    const handleContactClick = () => {
        console.log('Наата кнопка "Связаться"')
    }

    return (
        <>
            <Home
                onBurgerClick={handleBurgerClick}
                onContactClick={handleContactClick}
            />

            <MobileMenu
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
                onContactClick={handleContactClick}
            />
        </>
    )
}

export default App