/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#b7dbff',
          300: '#85c2ff',
          400: '#4ea3ff',
          500: '#1f86ff',
          600: '#0b69e6',
          700: '#084fb4',
          800: '#093f8c',
          900: '#0a356f',
        }
      }
    },
  },
  plugins: [],
}
