/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      border: {
        'border0': '1px',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/components/image/bg.jpg')",
      },
      height:{
        '567':'600px',
        '500':'500px',
        '550':'550px',
        '450':'450px',
        '400':'400px'
      }
    },
  },
  plugins: [],
}
