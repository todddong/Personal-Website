import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware palette — flips via CSS variables in globals.css
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        sand: "rgb(var(--c-sand) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        white: "rgb(var(--c-card) / <alpha-value>)",
        stone: {
          400: "rgb(var(--c-stone-400) / <alpha-value>)",
          500: "rgb(var(--c-stone-500) / <alpha-value>)",
          600: "rgb(var(--c-stone-600) / <alpha-value>)",
          700: "rgb(var(--c-stone-700) / <alpha-value>)",
        },
        gray: {
          100: "rgb(var(--c-gray-100) / <alpha-value>)",
          200: "rgb(var(--c-gray-200) / <alpha-value>)",
        },
        // Fixed tones — photo overlays and polaroid frames stay the same in both themes
        paper: "#faf9f5",
        night: "#1f1e1d",
        clay: {
          DEFAULT: "rgb(var(--c-clay) / <alpha-value>)",
          dark: "rgb(var(--c-clay-dark) / <alpha-value>)",
        },
        cmu: "#C41230",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
