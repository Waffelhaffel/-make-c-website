"use client";

import { SELECTED_WORK } from "@/lib/data";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { PillButton } from "@/components/ui/PillButton";
import { Swoosh } from "@/components/ui/Swoosh";
import { CaseModal } from "@/components/work/CaseModal";
import { useCaseModal } from "@/components/work/useCaseModal";
import type { CaseStudy } from "@/sanity/types";

type SelectedWorkProps = {
  caseStudies: CaseStudy[];
};

export function SelectedWork({ caseStudies }: SelectedWorkProps) {
  const { activeCase, openCase, closeCase } = useCaseModal();
  const bySlug = new Map(caseStudies.map((c) => [c.slug, c]));

  return (
    <section id="work" className="relative bg-makec-dark">
      {/* Swoosh auf der Kante Dunkel → Blau. Vorher übernahm das die Insights-Section,
          die 07/2026 entfernt wurde — ohne ihn wäre das die einzige unmarkierte Farbkante. */}
      <Swoosh className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 w-[clamp(12rem,25vw,30.5rem)] text-white" />

      {/* Blauer Auftakt, Headline überlappt das Grid (Figma 45:14) */}
      <div className="bg-makec-blue pt-28 md:pt-44 px-6">
        <MixedHeadline
          variant="display"
          part1="Selected"
          part2="Work"
          slash
          className="relative z-10 -mb-3 text-center"
        />
      </div>

      {/* Full-bleed Grid ohne Abstände (Figma 45:22–27, Kacheln ~960×538) */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {SELECTED_WORK.map((project) => {
          const doc = project.caseSlug ? bySlug.get(project.caseSlug) : undefined;

          const tile = (
            <div className="w-full overflow-hidden bg-makec-dark relative aspect-[960/538]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <p className="font-gotham text-meta uppercase tracking-[0.3em] text-white/80 mb-2">
                  {project.label}
                </p>
                <p className="font-gotham text-h4 text-white uppercase">{project.name}</p>
              </div>
            </div>
          );

          // Ohne Sanity-Case gibt es nichts zu öffnen: dann kein Button, kein
          // data-cursor="VIEW" — sonst verspricht die Kachel eine Case-Ansicht,
          // die nie aufgeht.
          return doc ? (
            <button
              key={project.name}
              type="button"
              onClick={() => openCase(doc)}
              className="block w-full text-left group relative"
              data-cursor="VIEW"
            >
              {tile}
            </button>
          ) : (
            <div key={project.name} className="block w-full group relative">
              {tile}
            </div>
          );
        })}
      </div>

      {/* Swoosh auf der Unterkante des Grids (Figma 45:28) */}
      <Swoosh className="relative z-10 mx-auto -mt-7 w-[clamp(12rem,25vw,30.5rem)] text-white" />

      {/* Weißer Pill-Button (Figma 51:4) */}
      <div className="mt-12 md:mt-16 pb-20 md:pb-28 flex justify-center px-6">
        <Magnetic strength={0.3}>
          <PillButton href="/work">Alle Referenzen anzeigen</PillButton>
        </Magnetic>
      </div>

      <CaseModal caseData={activeCase} onClose={closeCase} />
    </section>
  );
}
