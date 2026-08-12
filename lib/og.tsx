import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * Gestaltung der OpenGraph-Bilder — eine Quelle für alle Routen.
 *
 * Warum eigene Fontdateien: `next/font/google` legt Montserrat und EB Garamond
 * so ab, dass `ImageResponse` sie nicht erreicht, und Satori kann kein WOFF2
 * und keine Variable Fonts sauber gewichten. Deshalb liegen zwei statische
 * TTF-Schnitte in `app/fonts/` (OFL-Lizenzen daneben).
 *
 * Gerendert wird das Marken-Muster aus `MixedHeadline`: erster Teil Montserrat
 * Bold uppercase, Trennstrich in Akzentblau, zweiter Teil EB Garamond
 * SemiBold Italic und etwas größer.
 */

// Nicht exportiert: die beiden OG-Routen (`app/og`, `app/leistungen/[slug]/og`)
// rufen nur die Render-Funktionen hier auf. `ImageResponse` setzt den
// Content-Type selbst — ein `OG_CONTENT_TYPE` stand hier noch aus der Zeit der
// `opengraph-image.tsx`-Dateikonvention, die 07/2026 aufgegeben wurde.
const OG_SIZE = { width: 1200, height: 630 };
export const OG_FOOTER = "Videoproduktion & Video-Marketing · Köln & Essen";

const FONT_DIR = join(process.cwd(), "app/fonts");
const montserratBold = readFileSync(join(FONT_DIR, "Montserrat-Bold.ttf"));
const garamondSemiBoldItalic = readFileSync(
  join(FONT_DIR, "EBGaramond-SemiBoldItalic.ttf"),
);

const DARK = "#14140F";
const BLUE = "#2C2CC6";

type OgImageParams = {
  /** Erster Teil der Headline — wird uppercase gesetzt. */
  part1: string;
  /** Zweiter Teil — Garamond Italic, größer. */
  part2: string;
  /** Zeile unter der Headline. */
  footer: string;
  /**
   * Trennstrich zwischen den Teilen. Gehört zu Wortpaaren (VIDEO/Strategie,
   * SHOW/REEL), **nicht** zu durchlaufenden Sätzen wie „We make video that
   * work." — dort ergäbe er ein „VIDEO/" mitten im Satz.
   */
  slash?: boolean;
};

export function ogImage({ part1, part2, footer, slash = true }: OgImageParams) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: DARK,
          padding: "64px 72px",
        }}
      >
        {/* Wortmarke */}
        <div
          style={{
            display: "flex",
            fontFamily: "Montserrat",
            fontSize: 34,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          make
          <span style={{ color: BLUE }}>/</span>c
        </div>

        {/* Headline im Marken-Muster */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Montserrat",
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            {part1}
            {slash && <span style={{ color: BLUE }}>/</span>}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "EB Garamond",
              fontStyle: "italic",
              fontSize: 116,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              // Garamond-Italic überhängt rechts — sonst schneidet die Kante ab.
              paddingRight: 24,
            }}
          >
            {part2}
          </div>
        </div>

        {/* Fußzeile mit Akzentbalken */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 64, height: 5, backgroundColor: BLUE }} />
          <div
            style={{
              display: "flex",
              fontFamily: "Montserrat",
              fontSize: 26,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {footer}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Montserrat",
          data: montserratBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "EB Garamond",
          data: garamondSemiBoldItalic,
          weight: 600,
          style: "italic",
        },
      ],
    },
  );
}

/**
 * Markenvariante — Default für alle Routen ohne eigenes Motiv. Ohne Slash:
 * „We make video that work." ist ein Satz, kein Wortpaar.
 */
export function brandOgImage() {
  return ogImage({
    part1: "We make video",
    part2: "that work.",
    footer: OG_FOOTER,
    slash: false,
  });
}
