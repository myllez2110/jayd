/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-black': '#0A0A0A',
        'app-gray': '#1A1A1A',
        'app-accent': '#1DB954',
      },
    },
  },
  plugins: [],
}