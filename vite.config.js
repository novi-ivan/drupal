import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === 'production' ? '/drupal/' : '/',
    server: {
        proxy: {
            '/api': 'http://localhost:4173',
        },
    },
    build: {
        outDir: 'build',
    },
}))
