/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "contrast-purple": "#102135",
        "light-purple": "#0b1427",
        "dark-purple": "#000a1e",
        "light-gold": "#FFDB81",
        "light-blue": "#00EBEB",
        "primary-blue": "#00ddb3",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "10rem",
      },
    },
  },
  plugins: [],
};
