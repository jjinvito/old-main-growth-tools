/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  fontFamily: {
    "clash-display": ["ClashDisplay-Extralight", "sans-serif"],
  },
  theme: {
    extend: {
      colors: {
        light: {
          100: "#f2f2f2",
          200: "#e6e6e6",
          300: "#d9d9d9",
          400: "#cccccc",
          500: "#bfbfbf",
        },
        dark: {
          100: "#BFBFBF", // Lightest
          200: "#A6A6A6",
          300: "#7d7d7d", // Middle (You already have this)
          400: "#4A4A4A",
          500: "#212121", // Darkest
          600: "#121212",
        },
        DBlue: "#2665F8",
        muted: "#636363",
        mutedField: "#696969",
        dull: "#AFAFAF",
        acentGreen: "#219882",
        specialOrange: "#FF6B00",
        specialOrange2: "#FF912B",
        blueStart: "#164CD9",
        blueEnd: "#32AADD",
        greyColorMuted: "#494949",
        "custom-blue": "#164CD9",
        "custom-lightblue": "#32AADD",
      },
      boxShadow: {
        custom: "0px 0px 6px 2px rgba(22, 76, 217, 1)",
      },

      animation: {
        fadeOut: "fadeOut 0.2s ease-in-out",
        fadeIn: "fadeIn 0.2s ease-in-out",
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
};
