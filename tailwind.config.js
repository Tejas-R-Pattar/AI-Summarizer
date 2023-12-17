/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fantFamily:{
        satoshi:["Satoshi","sans-serif"],
        inter:["Inter","sans-serif"],
      }
    },
  },
  plugins: [],
}