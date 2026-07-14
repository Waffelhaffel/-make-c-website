import type { Metadata } from "next";
import { Montserrat, EB_Garamond } from "next/font/google";
import "./globals.css";
import { SiteEffects } from "@/components/layout/SiteEffects";

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
  title: "make/c - Video Marketing & Production",
  description: "make/c entwickelt und produziert Bewegtbild für Marken.",
  icons: {
    icon: "/make:c_logo_icon.png",
    shortcut: "/make:c_logo_icon.png",
    apple: "/make:c_logo_icon.png",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`scroll-smooth ${ebGaramond.variable} ${montserrat.variable}`}>
      <body className="font-gotham bg-makec-dark text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:rounded-full focus:bg-white focus:px-6 focus:py-3 focus:font-bold focus:text-makec-dark"
        >
          Zum Inhalt springen
        </a>
        <SiteEffects>{children}</SiteEffects>
      </body>
    </html>
  );
}
