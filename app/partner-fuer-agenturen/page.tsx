import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceBlocks } from "@/components/services/ServiceBlocks";
import { ServiceCases } from "@/components/services/ServiceCases";
import { ServiceCta } from "@/components/services/ServiceCta";
import { ServiceFacts } from "@/components/services/ServiceFacts";
import { ServiceImageBand } from "@/components/services/ServiceImageBand";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import { AGENTUR_PAGE } from "@/lib/content/agenturen";
import { getCasesBySlugs } from "@/lib/content/cases";
import { breadcrumbGraph, pageMetadata } from "@/lib/seo";

/**
 * `/partner-fuer-agenturen` — die Adresse ist **bewusst identisch mit der alten
 * WordPress-Seite**. Sie steht bis heute in Google („Warum sind wir der
 * optimale Video Partner für Eure Agentur?"), und eine Seite unter derselben
 * URL erbt das Ranking direkt, ohne den Umweg über einen Redirect.
 *
 * ⚠️ Genau deshalb darf in `next.config.ts` **keine** Regel für
 * `/partner-fuer-agenturen` stehen — `redirects()` läuft vor dem Routing und
 * würde diese Seite unerreichbar machen. Die Regel ist beim Anlegen der Seite
 * entfernt worden; nicht versehentlich wieder eintragen.
 *
 * Keine eigenen UI-Bausteine: die Seite setzt sich aus denselben Komponenten
 * zusammen wie eine Leistungsseite (`components/services/*`), die alle reine
 * Props nehmen. Der Inhalt liegt in `lib/content/agenturen.ts`.
 */

export const metadata: Metadata = pageMetadata({
  title: AGENTUR_PAGE.seo.metaTitle,
  description: AGENTUR_PAGE.seo.metaDescription,
  path: "/partner-fuer-agenturen",
  // Der metaTitle führt die Marke schon selbst — sonst stünde sie doppelt drin.
  absoluteTitle: true,
});

export default function PartnerFuerAgenturenPage() {
  const caseStudies = getCasesBySlugs([...AGENTUR_PAGE.caseSlugs]);

  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Startseite", path: "/" },
          { name: AGENTUR_PAGE.h1Plain, path: "/partner-fuer-agenturen" },
        ])}
      />

      <Header />
      <main id="main-content" className="bg-makec-dark min-h-screen text-white">
        {/* Kopf. Kein `MotionSection`: die H1 steht oberhalb des Falzes und darf
            nicht an der Hydration hängen — derselbe Grund wie in WorkGrid. */}
        <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
          <div className="mx-auto max-w-[1480px]">
            <nav aria-label="Brotkrumen" className="mb-8 md:mb-12">
              <ol className="flex flex-wrap items-center gap-2 font-gotham text-meta text-white/60">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Startseite
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">{AGENTUR_PAGE.h1Plain}</li>
              </ol>
            </nav>

            <p className="font-gotham text-meta uppercase tracking-widest text-white/60">
              {AGENTUR_PAGE.kicker}
            </p>

            {/* `stacked="mobile"`: einzeilig passt das Lockup auf keinem Handy
                ins Bild — dasselbe Muster wie SELECTED/WORK. */}
            <MixedHeadline
              as="h1"
              variant="display"
              part1={AGENTUR_PAGE.titlePart1}
              part2={AGENTUR_PAGE.titlePart2}
              slash
              stacked="mobile"
              className="mt-4"
            />

            <p className="mt-8 max-w-3xl font-gotham text-body-lg font-normal text-white/80 md:mt-12">
              {AGENTUR_PAGE.intro}
            </p>
          </div>
        </section>

        <ServiceFacts
          facts={[...AGENTUR_PAGE.facts]}
          audience={[...AGENTUR_PAGE.audience]}
        />
        <ServiceBlocks
          blocks={[...AGENTUR_PAGE.blocks]}
          image={AGENTUR_PAGE.images[0]}
        />
        <ServiceImageBand image={AGENTUR_PAGE.images[1]} />
        <ServiceCases caseStudies={caseStudies} />
        <ServiceCta cta={AGENTUR_PAGE.cta} />

        <MotionSection className="px-6 pb-24 md:px-12">
          <div className="mx-auto flex max-w-[1480px] justify-center">
            <Link
              href="/work"
              className="font-gotham text-small uppercase tracking-[0.2em] text-white transition-colors hover:text-white/70"
            >
              Zurück zu den Referenzen
            </Link>
          </div>
        </MotionSection>
      </main>
      <Footer />
    </>
  );
}
