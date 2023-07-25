// const defaultTheme = require();
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#9FC0D1',
        'main-green': '#CBE2DA',
        'main-dark': '#151A51',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        'sans': ['Arimo', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

