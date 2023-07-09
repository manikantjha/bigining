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
      },
    },
    fontFamily: {
      display: ["Oswald", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
