/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ejs}","./*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        darkBlue: '#072348',
        lightBlue: '#03CDB7',
        deepBlue: '#044D77',
      },
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        crash: ['ClashDisplay', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

