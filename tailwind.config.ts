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
        void: "#0a0806",
        panel: "#141009",
        panel2: "#1c1610",
        gold: "#c9a227",
        goldBright: "#eecd76",
        wine: "#5c1a1a",
        wineBright: "#8a2a2a",
        parchment: "#ece2c8",
        ink: "#e9e2d0",
        muted: "#9a8f74",
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
