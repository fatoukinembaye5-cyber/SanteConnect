/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        santeDark: '#003B32',     // Vert forêt (Barre latérale)
        santeActive: '#008A74',   // Vert moyen (Onglet sélectionné)
        santeTextVif: '#00C49F',  // Vert clair vif (Logo)
        santeBg: '#F7F7F4',       // Fond crème de la maquette
      },
    },
  },
  plugins: [],
}