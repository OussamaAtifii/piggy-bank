/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefbf5",
          100: "#d6f5e5",
          200: "#afebcf",
          300: "#7bdab4",
          400: "#4ac397",
          500: "#23a67b",
          600: "#158663",
          700: "#116b51",
          800: "#105542",
          900: "#0e4637",
          950: "#072720",
        },
      },
    },
  },
}
