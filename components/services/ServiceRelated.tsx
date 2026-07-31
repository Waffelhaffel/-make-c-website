import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import { getServicePage, servicePagePath } from "@/lib/leistungen";

type ServiceRelatedProps = {
  slugs: string[];
};

/**
 * Interne Verlinkung auf zwei Schwesterleistungen. Ankertext ist immer der
 * Leistungsname plus Nutzenversprechen — nie „mehr erfahren", das trägt weder
 * für Suchmaschinen noch für Screenreader Information.
 */
export function ServiceRelated({ slugs }: ServiceRelatedProps) {
  const related = slugs
    .map((slug) => getServicePage(slug))
    .filter((page): page is NonNullable<typeof page> => page != null);

  if (related.length === 0) return null;

  return (
    <MotionSection className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1="Passt"
          part2="dazu"
          className="mb-12 md:mb-16"
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {related.map((page) => (
            <li key={page.slug}>
              <Link
                href={servicePagePath(page.slug)}
                data-cursor="VIEW"
                className="group flex h-full flex-col justify-between gap-8 border-t border-white/15 pt-6 transition-colors hover:border-white/50"
              >
                <div>
                  <h3 className="font-gotham text-h4 text-white">
                    {page.h1Plain}
                  </h3>
                  <p className="mt-4 font-gotham text-body-lg text-white/80">
                    {page.subline}
                  </p>
                </div>
                <ArrowRight
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="h-7 w-7 text-white transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
