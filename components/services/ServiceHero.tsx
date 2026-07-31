import Link from "next/link";

import { MixedHeadline } from "@/components/ui/MixedHeadline";
import type { ServicePageContent } from "@/lib/leistungen";

type ServiceHeroProps = {
  content: ServicePageContent;
};

/**
 * Hero der Leistungsseite: Breadcrumb, H1 im Marken-Muster, darunter die
 * keywordtragende Subline und der GEO-Definitionsabsatz.
 *
 * Kein `overflow-hidden` auf dem Headline-Wrapper — das würde den Italic-
 * Überhang des letzten Garamond-Glyphs abschneiden (bekannte Falle).
 *
 * Bewusst ohne CTA: der Button stand hier mit identischem Label und href wie
 * in `ServiceCta` am Seitenende. Ein Ziel, zwei Buttons — der untere bleibt.
 */
export function ServiceHero({ content }: ServiceHeroProps) {
  return (
    <section className="relative bg-makec-dark pt-32 pb-16 md:pt-48 md:pb-28">
      <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-10">
        <nav aria-label="Brotkrumen" className="mb-8 md:mb-12">
          <ol className="flex flex-wrap items-center gap-2 font-gotham text-meta text-white/60">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Startseite
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/leistungen" className="hover:text-white transition-colors">
                Leistungen
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white">{content.h1Plain}</li>
          </ol>
        </nav>

        <MixedHeadline
          as="h1"
          variant="display"
          stacked
          slash
          part1={content.titlePart1}
          part2={content.titlePart2}
          className="pr-[0.15em]"
        />

        <div className="mt-10 md:mt-14 grid gap-8 md:grid-cols-12">
          <p className="md:col-span-5 font-gotham text-h4 text-white">
            {content.subline}
          </p>
          <p className="md:col-span-6 md:col-start-7 font-gotham text-body-lg text-white/80">
            {content.definition}
          </p>
        </div>
      </div>
    </section>
  );
}
