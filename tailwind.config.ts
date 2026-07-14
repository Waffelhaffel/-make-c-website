import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "makec-blue": "#2C2CC6",
        "makec-dark": "#14140F",
      },
      fontFamily: {
        garamond: ["var(--font-garamond)", "EB Garamond", "Georgia", "serif"],
        gotham: ["var(--font-gotham)", "system-ui", "-apple-system", "Helvetica Neue", "sans-serif"],
      },
      // Typo-Scale aus den Figma-Variablen (Desktop-Referenz), responsiv via clamp:
      // H2: Gotham Bold 76/76 · H4: Gotham Bold 40/40 · Body: Book 24/36 · Small: Bold 18/26 · META: Book 14/20
      fontSize: {
        // Display-Overlap-Headlines (SHOW/REEL, SELECTED/WORK, Case-Study-Hero)
        display: ["clamp(3.25rem, 5.5vw, 6.5625rem)", { lineHeight: "1" }],
        h2: ["clamp(2.5rem, 1.9rem + 2.4vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "700" }],
        h4: ["clamp(1.75rem, 1.56rem + 0.78vw, 2.5rem)", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "700" }],
        "body-lg": ["clamp(1.125rem, 1.03rem + 0.39vw, 1.5rem)", { lineHeight: "1.5", fontWeight: "325" }],
        small: ["1.125rem", { lineHeight: "1.4444", fontWeight: "700" }],
        meta: ["0.875rem", { lineHeight: "1.4286", fontWeight: "325" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

