/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        watercolor: "url('/assets/background.jpg')",
      },
      screens: {
        xs: "0px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1536px",
        "2xl": "1700px",
      },
    },
    fontFamily: {
      title: ["Allura", "cursive"],
    },
  },
  plugins: [],
};
