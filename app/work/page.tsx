import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillButton } from "@/components/ui/PillButton";
import { WorkGrid } from "@/components/work/WorkGrid";
import { CASES } from "@/lib/content/cases";
import { breadcrumbGraph, collectionPageGraph, pageMetadata } from "@/lib/seo";

const META_DESCRIPTION =
  "Ausgewählte Video-Projekte von make/c: Imagefilme, Kampagnen, Dokumentationen und Social Content für Marken und Unternehmen.";

export const metadata: Metadata = pageMetadata({
  title: "Referenzen",
  description: META_DESCRIPTION,
  path: "/work",
});

export default function WorkPage() {
  const caseStudies = CASES;

  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Startseite", path: "/" },
          { name: "Referenzen", path: "/work" },
        ])}
      />
      <JsonLd
        data={collectionPageGraph({
          name: "Referenzen",
          description: META_DESCRIPTION,
          path: "/work",
          items: caseStudies.map((item) => ({
            name: item.project,
            description: item.summary,
          })),
        })}
      />

      <Header />
      <main id="main-content" className="bg-makec-dark min-h-screen text-white pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Brotkrumen" className="mb-8 md:mb-12">
            <ol className="flex flex-wrap items-center gap-2 font-gotham text-meta text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Startseite
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Referenzen</li>
            </ol>
          </nav>

          <WorkGrid caseStudies={caseStudies} />

          {/* Abgang für Agenturen. Box-Variante wie an „Alle Referenzen
              anzeigen" in SelectedWork.tsx — derselbe Grund (Button steht auf
              `bg-makec-dark`, aus dem die Box-Füllung abgeleitet ist). Die
              Zeile darüber ist bewusst kurz: ein Button ohne jeden Kontext
              unter 31 Kacheln liest sich wie ein Versehen. */}
          <div className="mt-24 flex flex-col items-center gap-6 text-center">
            <p className="font-gotham text-body-lg font-normal text-white/70 max-w-xl">
              Ihr seid eine Agentur und sucht einen Produktionspartner für
              Bewegtbild?
            </p>
            <Magnetic strength={0.3}>
              <PillButton href="/partner-fuer-agenturen" variant="box">
                Partner für Agenturen
              </PillButton>
            </Magnetic>
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              href="/"
              className="font-gotham text-small uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
