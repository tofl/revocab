/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#74A4BC',
        'main-green': '#B6D6CC',
        'main-dark': '#151A51',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

