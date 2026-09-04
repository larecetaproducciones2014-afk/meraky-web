/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        secondary: '#C9A96E',
        accent: '#E8D5B0',
        dark: '#0D0D0D',
        light: '#F8F6F2',
        'text-main': '#2C2C2C',
        muted: '#8A8A8A',
        silencia: '#4A7C59',
        centenario: '#8B6914',
        acacia: '#C17B4A',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

