/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4AC397",
        "primary-hover": "#41AB84",
      },
    },
  },
  plugins: [require("daisyui")],
};
