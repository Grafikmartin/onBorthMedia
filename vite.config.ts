import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mkv'],
  // GitHub Pages: /onBorthMedia/ — Vercel: Root /
  base: process.env.VERCEL ? '/' : '/onBorthMedia/',
  server: {
    port: 5173,
  },
})

