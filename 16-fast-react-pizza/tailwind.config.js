/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // pizza: "Roboto Mono , monospace",
      sans: "Roboto Mono , monospace",
    },
    extend: {
      colors: {
        abdo: "#fbc",
      },
      height: {
        screen: "100dvh", // for mobile
      },
    },
  },
  plugins: [],
};
