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
        // ⚠️ Das äußere `min(12.5vw, …)` ist die Mobil-Deckelung (13.08.2026) und
        // greift **nur unter 416 px** — darüber ist der Wert identisch mit der
        // reinen clamp()-Kurve von vorher, Desktop bleibt also unangetastet.
        // Grund: die clamp()-Untergrenze steht flach auf 52 px, weil 5,5vw erst
        // ab 945 px darüber liegt. Auf dem Handy wuchs die Schrift damit nicht
        // mit, und die längsten Lockups liefen aus dem Bild — gemessen bei
        // 390 px: „Produktion" (h1 der Leistungsseite) 8 px über den Rand, bei
        // 320 px 78 px. 12,5vw ist der größte Wert, bei dem alle Display-
        // Headlines bis hinunter zu 320 px vollständig stehen.
        display: ["min(12.5vw, clamp(3.25rem, 5.5vw, 6.5625rem))", { lineHeight: "1" }],
        // `min(10.5vw, …)` wie beim display-Token und aus demselben Grund: die
        // clamp()-Untergrenze steht flach auf 40 px, weil der vw-Anteil erst ab
        // 400 px darüber liegt. Der Garamond-Teil einer Misch-Headline ist
        // nochmal 1,2× so groß (48 px) — „die Zusammenarbeit" (ServiceSteps)
        // lief damit bei 320 px 43 px über den Rand, „Zusammenarbeit" ist ein
        // Wort und kann nicht umbrechen. Greift nur unter 381 px.
        h2: ["min(10.5vw, clamp(2.5rem, 1.9rem + 2.4vw, 4.75rem))", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "700" }],
        // Mobil-Deckelung wie bei display und h2, hier am schärfsten (7,5vw):
        // die längsten Wörter stehen in diesem Token, und sie stehen allein in
        // einer Rasterspalte — „Umsetzungsbegleitung" (ServiceSteps, Strategie)
        // lief bei 320 px 22 px über den Rand und zog die Spalte mit, weil ein
        // zu breites Kind eine Grid-Spalte aufzieht (min-width: auto). Ein
        // deutsches Kompositum kann nicht umbrechen — kleiner setzen ist der
        // einzige Weg. Greift nur unter 373 px.
        h4: ["min(7.5vw, clamp(1.75rem, 1.56rem + 0.78vw, 2.5rem))", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "700" }],
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

