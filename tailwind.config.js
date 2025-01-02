/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to React files
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      }
    }
  },
  plugins: [],
}
