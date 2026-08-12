import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceBlocks } from "@/components/services/ServiceBlocks";
import { ServiceCases } from "@/components/services/ServiceCases";
import { ServiceCta } from "@/components/services/ServiceCta";
import { ServiceFacts } from "@/components/services/ServiceFacts";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceImageBand } from "@/components/services/ServiceImageBand";
import { ServiceRelated } from "@/components/services/ServiceRelated";
import { ServiceSteps } from "@/components/services/ServiceSteps";
import {
  SERVICE_PAGE_SLUGS,
  getServicePage,
  servicePagePath,
} from "@/lib/leistungen";
import {
  breadcrumbGraph,
  faqGraph,
  pageMetadata,
  serviceGraph,
} from "@/lib/seo";
import { getCasesBySlugs } from "@/lib/content/cases";

export function generateStaticParams() {
  return SERVICE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const content = getServicePage(slug);
  if (!content) return {};

  // `absoluteTitle`, weil die metaTitles die Marke schon selbst führen — sonst
  // hängt `title.template` aus dem Layout ein zweites „| make/c" an.
  const path = servicePagePath(slug);
  return pageMetadata({
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
    path,
    absoluteTitle: true,
    keywords: content.seo.keywords,
    ogImage: `${path}/og`,
  });
}

export default async function ServiceDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const content = getServicePage(slug);
  if (!content) notFound();

  const caseStudies = getCasesBySlugs(content.caseSlugs);

  const path = servicePagePath(slug);

  return (
    <>
      <JsonLd
        data={serviceGraph({
          name: content.h1Plain,
          description: content.definition,
          path,
          serviceType: content.seo.keywords[0] ?? content.h1Plain,
        })}
      />
      <JsonLd
        data={breadcrumbGraph([
          { name: "Startseite", path: "/" },
          // Die Übersichtsseite /leistungen ist 08/2026 entfallen; die Ebene
          // liegt jetzt als Anker auf der Startseite. Muss zur sichtbaren
          // Brotkrume in ServiceHero.tsx passen.
          { name: "Leistungen", path: "/#service" },
          { name: content.h1Plain, path },
        ])}
      />
      <JsonLd data={faqGraph(content.faq)} />

      <Header />
      <main
        id="main-content"
        className="min-h-screen overflow-x-hidden bg-makec-dark text-white"
      >
        {/* Reihenfolge seit 12.08.2026: der Loop führt als Header (ServiceHero),
            „Für wen das passt" sitzt im blauen Eckdaten-Block, und zwischen
            Ablauf und FAQ steht ein Bildband. Neun Sektionen sind damit acht. */}
        <ServiceHero content={content} />
        <ServiceFacts facts={content.facts} audience={content.audience} />
        <ServiceBlocks blocks={content.blocks} image={content.images[0]} />
        <ServiceSteps steps={content.steps} />
        <ServiceImageBand image={content.images[1]} />
        <ServiceFaq faq={content.faq} />
        <ServiceCases caseStudies={caseStudies} />
        <ServiceRelated slugs={content.relatedSlugs} />
        <ServiceCta cta={content.cta} />
      </main>
      <Footer />
    </>
  );
}
