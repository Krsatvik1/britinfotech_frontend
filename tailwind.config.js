/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ejs}","./*.{html,js,ejs}"],
  theme: {
    extend: {
      fontSize: {
        header: 'clamp(2rem, 4vw, 4rem)',
        headerMd: 'clamp(1rem, 5vw, 2rem)',
      },
      colors: {
        darkBlue: '#072348',
        lightBlue: '#03CDB7',
        deepBlue: '#044D77',
        links: '#0B669D'
      },
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        crash: ['ClashDisplay', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

