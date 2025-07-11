/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f1f8e9',
          100: '#dcedc8',
          200: '#c5e1a5',
          300: '#aed581',
          400: '#9ccc65',
          500: '#8bc34a',
          600: '#7cb342',
          700: '#689f38',
          800: '#558b2f',
          900: '#33691e',
          950: '#1b5e20',
        },
        cream: '#FFF8E1',
        earth: '#8D6E63',
        sand: '#D7CCC8',
        wood: '#795548',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'leafSway': 'leafSway 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        leafSway: {
          '0%, 100%': {
            transform: 'rotate(43deg) scale(0.75)',
          },
          '50%': {
            transform: 'rotate(47deg) scale(0.75)',
          },
        },
      },
    },
  },
  plugins: [],
}