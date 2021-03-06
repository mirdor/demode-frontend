module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Montserrat", "Verdana", "sans-serif"],
        body: ['"Open Sans"', "Verdana", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#F61313",
        secondary: "#BB0707",
        dark: "#130101",
        darkGray: "#0A0A0A",
        alterGray: "#212121",
        lightGray: "#494949",
      },
      backgroundImage: {
        "hero-img": "url('./assets/hero-img.jpg')",
      },
      animation: {
        fadeIn: "fadeIn 0.15s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1.0" },
        },
      },
    },
  },
  plugins: [],
};
