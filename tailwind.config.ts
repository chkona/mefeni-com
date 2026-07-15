import type { Config } from "tailwindcss";

// ყველა ფერი და შრიფტი ცენტრალიზებულია აქ —
// დიზაინის შესაცვლელად მხოლოდ ეს ფაილი გჭირდება.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "rgb(var(--color-void) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        panel2: "rgb(var(--color-panel2) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        goldBright: "rgb(var(--color-goldBright) / <alpha-value>)",
        wine: "rgb(var(--color-wine) / <alpha-value>)",
        wineBright: "rgb(var(--color-wineBright) / <alpha-value>)",
        parchment: "rgb(var(--color-parchment) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Noto Serif Georgian'", "serif"],
        body: ["'Noto Sans Georgian'", "sans-serif"],
        num: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

