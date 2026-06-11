/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#FF5A1F',
          'orange-light': '#FF8A5B',
          'orange-dark': '#E03E00',
          green: '#0D7A5C',
          'green-light': '#1EB088',
          'green-dark': '#06523C',
          dark: '#0B0F19',
          gray: '#F8FAF9',
          text: '#1E293B',
          'text-light': '#64748B',
        },
      },
    },
  },
  plugins: [],
}
