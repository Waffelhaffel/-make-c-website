import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { SiteEffects } from "@/components/layout/SiteEffects";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="de" className={`scroll-smooth ${ebGaramond.variable}`}>
      <body className={`${inter.className} bg-makec-dark text-white antialiased`}>
        <SiteEffects>{children}</SiteEffects>
      </body>
    </html>
  );
}
