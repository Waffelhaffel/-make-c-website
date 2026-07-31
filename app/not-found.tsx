import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { PillButton } from "@/components/ui/PillButton";

// 404-Seiten werden nicht indexiert (Next liefert Status 404), der noindex ist
// hier also nur Gürtel zum Hosenträger. Kein canonical — die Seite hat keine
// eigene Adresse, sie antwortet unter jeder unbekannten URL.
export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Zur Startseite" },
  { href: "/leistungen", label: "Leistungen ansehen" },
  { href: "/work", label: "Referenzen ansehen" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex min-h-screen flex-col justify-center overflow-x-hidden bg-makec-dark px-6 pb-24 pt-40 text-white md:px-10 md:pb-32 md:pt-48"
      >
        <div className="mx-auto w-full max-w-[1480px]">
          <p className="mb-6 font-gotham text-meta uppercase tracking-[0.3em] text-white/60">
            Fehler 404
          </p>

          <MixedHeadline
            as="h1"
            variant="display"
            stacked
            slash
            part1="Seite"
            part2="nicht gefunden"
            className="pr-[0.15em]"
          />

          <p className="mt-10 max-w-2xl font-gotham text-body-lg text-white/80 md:mt-14">
            Diese Adresse gibt es nicht — vielleicht ein Tippfehler oder ein
            alter Link. Hier geht es weiter:
          </p>

          <div className="mt-12 flex flex-wrap gap-4 md:mt-16">
            {LINKS.map((link, i) => (
              <PillButton
                key={link.href}
                href={link.href}
                size={i === 0 ? "lg" : "md"}
              >
                {link.label}
              </PillButton>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
