/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1B2D',
          light: '#162236',
        },
        gold: '#C9A256',
      },
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
