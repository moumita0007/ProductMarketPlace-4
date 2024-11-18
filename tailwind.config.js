module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        'screen-xl': '1440px', // Set the max-width to 1440px
      },
    },
  },
  plugins: [],
}
