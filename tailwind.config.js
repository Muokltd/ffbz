/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fbBlue: '#1877f2',
        fbGreen: '#42b72a',
        fbGray: '#f0f2f5',
      }
    },
  },
  plugins: [],
}