import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
=======
import tailwindcss from '@tailwindcss/vite' // 1. Importe le plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Ajoute-le ici
>>>>>>> cee236a737145276b606efde4aea3a31729820b6
  ],
})