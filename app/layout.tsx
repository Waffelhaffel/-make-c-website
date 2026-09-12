import type { Metadata } from "next";
import { Montserrat, EB_Garamond } from "next/font/google";
import "./globals.css";
import { SiteEffects } from "@/components/layout/SiteEffects";
import { WebAnalytics } from "@/components/layout/WebAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  IS_INDEXABLE,
  OG_IMAGE_PATH,
  SITE_URL,
  organizationGraph,
} from "@/lib/seo";

// Kostenloser Gotham-Ersatz (geometrische Grotesk); liefert als Variable Font
// auch das Book-Gewicht 325 und Italic. Echte Gotham später via next/font/local
// unter derselben Variable einhängen — Rest der Codebase bleibt unverändert.
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-gotham",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});


export const metadata: Metadata = {
  // metadataBase macht relative canonical-/OG-Pfade in den Unterseiten absolut.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "make/c - Video Marketing & Production",
    template: "%s | make/c",
  },
  description: "make/c entwickelt und produziert Bewegtbild für Marken.",
  alternates: { canonical: "/" },
  // ⚠️ Hier steht **kein** `icons`-Feld — und das ist Absicht. Die Tab-Icons
  // laufen seit 13.08.2026 über die Next-Dateikonventionen `app/icon.png`,
  // `app/apple-icon.png` und `app/favicon.ico`; die verlinkt Next von selbst.
  // Ein `icons`-Feld in der Metadata hätte Vorrang und würde sie wieder
  // ausschalten. Vorher zeigten alle drei Einträge auf
  // `/makec-logo-icon.png` — die **Wortmarke**, 1921×1081 und schwarz auf
  // Weiß: im Tab ein weißer Balken mit unlesbarem Text. Die drei Dateien
  // baut `node scripts/build-favicon.mjs` aus genau dieser Wortmarke.
  // `/makec-logo-icon.png` bleibt richtig als Organisations-Logo in der
  // JSON-LD (`lib/seo.ts`) — dort will Google die Wortmarke, kein Signet.
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "make/c",
    url: SITE_URL,
    title: "make/c - Video Marketing & Production",
    description: "make/c entwickelt und produziert Bewegtbild für Marken.",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "make/c — Videoproduktion und Video-Marketing",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  // ⚠️ Unterseiten setzen ihre Metadata über `pageMetadata()` aus lib/seo.ts.
  // Wer hier nur `title`/`description` überschreibt, erbt das komplette
  // `openGraph` dieser Datei — Next merged es nicht feldweise.
  // Indexierung ist bis zum Go-Live aus. Freischalten über
  // NEXT_PUBLIC_SEO_INDEX=true (Build-Zeit-Variable → Redeploy nötig).
  ...(IS_INDEXABLE
    ? {}
    : {
        robots: {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
      }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `scroll-behavior: smooth` steht nur noch in globals.css (die Klasse
    // `scroll-smooth` hier war eine Dublette). `data-scroll-behavior` sagt
    // Next.js, dass es die Eigenschaft bei Routenwechseln weiterhin kurz
    // abschalten soll — ohne das Attribut warnt Next 15 und stellt es in
    // Version 16 ein.
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${ebGaramond.variable} ${montserrat.variable}`}
    >
      <body className="font-gotham bg-makec-dark text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:rounded-full focus:bg-white focus:px-6 focus:py-3 focus:font-bold focus:text-makec-dark"
        >
          Zum Inhalt springen
        </a>
        <JsonLd data={organizationGraph()} />
        <SiteEffects>{children}</SiteEffects>
        {/* Zweite Reichweitenmessung neben PostHog. Zeichnet nichts, haengt nur
            das Vercel-Skript ein — und nur, wenn kein „Do Not Track" gesetzt
            ist. Naeheres in der Komponente und in Abschnitt 6 der
            Datenschutzerklaerung. */}
        <WebAnalytics />
      </body>
    </html>
  );
}
