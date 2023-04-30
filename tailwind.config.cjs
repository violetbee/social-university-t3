/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "xxs-m": "275px",
        "xs-m": "320px",
        "sm-m": "375px",
        "md-m": "425px",
        "lg-m": "490px",
        "3xl": "1854px",
        "grid-sm": "640px",
        "grid-md": "1225px",
        "grid-lg": "1566px",
        "grid-xl": "1854px",
        "grid-xxl": "2450px",
      },
      colors: {
        background: "#f4f4f0", //#001219 dark
        primary: "#32445a", //#19212e dark
        secondary: "#334756", //#334756 dark
        accent: "#295270",
        box: "#FDFCFD",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(7deg)" },
          "20%": { transform: "rotate(-4deg)" },
          "30%": { transform: "rotate(7deg)" },
          "40%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(5.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        "waving-hand": "wave 3s linear infinite",
      },
    },
  },
  plugins: [],
};
