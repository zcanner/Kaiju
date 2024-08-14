/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "dark",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#16a34a",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        ghostbg: "var(--fallback-bc,oklch(var(--bc)/0.2))",
        primarybg: "#121212",
      },
    },
  },
  plugins: [daisyui],
};
