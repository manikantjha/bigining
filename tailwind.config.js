/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primaryDarker: "#1b002a",
        primaryDark: "#4B2D87",
        primaryLight: "#692C90",
        primaryLighter: "#c6bcff",
        secondaryDark: "#C21E5C",
        secondaryLight: "#EF4581",
        accentDark: "#F37021",
        accentLight: "#FCB316",
        accentLighter: "#ffe2c1",
        bgLight: "#ffe2c1",
        bgDark: "#4B2D87",
        bgDarkLight: "#c6bcff",
        borderDark: "#4B2D87",
        borderLight: "#ffe2c1",
        textLight: "#ffe2c1",
        textDark: "#4B2D87",
      },
    },
    fontFamily: {
      display: ["Oswald", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/line-clamp")],
};
