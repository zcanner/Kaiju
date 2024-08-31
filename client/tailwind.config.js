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
          primary: "#e8570c",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        ghostbg: "var(--fallback-bc,oklch(var(--bc)/0.2))",
        primarybg: "#171311",
      },
    },
  },
  plugins: [daisyui],
};
