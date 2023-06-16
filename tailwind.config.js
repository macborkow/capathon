/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',          
        }
      },
      colors: {
        green: '#479442',
        beige: '#f6ead4',
        peach: '#f1c488',
        brown: '#bd7b36'
      }
    },
  },
  plugins: [],
}

