import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCta } from "@/components/services/ServiceCta";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import { SERVICE_PAGES, servicePagePath } from "@/lib/leistungen";
import { ORG, absoluteUrl, breadcrumbGraph, pageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/content/services";
import { ServiceList } from "@/components/sections/ServiceList";

// Kein `revalidate`: diese Seite liest kein CMS mehr, sie ist vollständig statisch.

const META_TITLE = "Leistungen: Videoproduktion & Video-Marketing | make/c";
const META_DESCRIPTION =
  "Sechs Leistungen von make/c: Videostrategie, Videoproduktion, Motion Design, Event Content, KI-Video und Studiobau — aus Köln und Essen.";

export const metadata: Metadata = pageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: "/leistungen",
  absoluteTitle: true,
});

export default function LeistungenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Startseite", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Leistungen von make/c",
          itemListElement: SERVICE_PAGES.map((page, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: page.h1Plain,
            url: absoluteUrl(servicePagePath(page.slug)),
          })),
        }}
      />

      <Header />
      <main
        id="main-content"
        className="min-h-screen overflow-x-hidden bg-makec-dark text-white"
      >
        <section className="relative bg-makec-dark pt-32 pb-16 md:pt-48 md:pb-28">
          <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-10">
            <nav aria-label="Brotkrumen" className="mb-8 md:mb-12">
              <ol className="flex flex-wrap items-center gap-2 font-gotham text-meta text-white/60">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Startseite
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">Leistungen</li>
              </ol>
            </nav>

            <MixedHeadline
              as="h1"
              variant="display"
              stacked
              slash
              part1="Unsere"
              part2="Leistungen"
              className="pr-[0.15em]"
            />

            <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
              <p className="font-gotham text-h4 text-white md:col-span-5">
                Sechs Leistungen, die aufeinander aufbauen — von der Strategie
                bis zum eigenen Studio.
              </p>
              <p className="font-gotham text-body-lg text-white/80 md:col-span-6 md:col-start-7">
                {ORG.name} arbeitet von {ORG.locations[0].city} und{" "}
                {ORG.locations[1].city} aus für Unternehmen in ganz Deutschland.
                Die meisten Projekte beginnen mit einer der sechs Leistungen und
                wachsen von dort weiter: Wer eine Strategie entwickelt, produziert
                anschließend nach Formatbaukasten. Wer regelmäßig produziert,
                spart mit einem eigenen Studio. Jede Leistung funktioniert für
                sich — zusammen ergeben sie ein System.
              </p>
            </div>
          </div>
        </section>

        {/* Dieselben Kacheln wie auf der Startseite, hier unter einer H1 → h2 */}
        <ServiceList services={SERVICES} headingLevel="h2" />

        <MotionSection className="bg-makec-dark py-16 md:py-32">
          <div className="max-w-[1480px] mx-auto px-6 md:px-10">
            <MixedHeadline
              part1="Im"
              part2="Überblick"
              className="mb-12 md:mb-16"
            />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICE_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={servicePagePath(page.slug)}
                    data-cursor="VIEW"
                    className="group flex h-full flex-col border-t border-white/15 pt-6 transition-colors hover:border-white/50"
                  >
                    <h3 className="font-gotham text-h4 text-white">
                      {page.h1Plain}
                    </h3>
                    <p className="mt-4 font-gotham text-body-lg text-white/80">
                      {page.subline}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>

        <ServiceCta
          cta={{
            headline: "Noch unsicher, was ihr braucht?",
            body: "Erzähl uns, was ihr vorhabt — wir sagen dir, welche Leistung dafür die richtige ist. Auch wenn es keine von uns ist.",
            buttonText: "Gespräch vereinbaren",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
