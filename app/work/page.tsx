import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkGrid } from "@/components/work/WorkGrid";
import { breadcrumbGraph, collectionPageGraph, pageMetadata } from "@/lib/seo";
import { getCaseStudies } from "@/sanity/lib/getCaseStudies";

export const revalidate = 60;

const META_DESCRIPTION =
  "Ausgewählte Video-Projekte von make/c: Imagefilme, Kampagnen, Dokumentationen und Social Content für Marken und Unternehmen.";

export const metadata: Metadata = pageMetadata({
  title: "Referenzen",
  description: META_DESCRIPTION,
  path: "/work",
});

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

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

          <div className="mt-24 flex justify-center">
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
