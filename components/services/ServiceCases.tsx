"use client";

import Image from "next/image";

import { Magnetic } from "@/components/ui/Magnetic";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { PillButton } from "@/components/ui/PillButton";
import { CaseModal } from "@/components/work/CaseModal";
import { useCaseModal } from "@/components/work/useCaseModal";
import type { CaseStudy } from "@/lib/content/types";

type ServiceCasesProps = {
  caseStudies: CaseStudy[];
};

/**
 * Drei kuratierte Cases am Fuß der Leistungsseite. Nutzt denselben Modal-Stack
 * wie SelectedWork und WorkGrid — kein zweiter Case-Viewer.
 */
export function ServiceCases({ caseStudies }: ServiceCasesProps) {
  const { activeCase, openCase, closeCase } = useCaseModal();

  if (caseStudies.length === 0) return null;

  return (
    <section className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1="Ausgewählte"
          part2="Projekte"
          className="mb-12 md:mb-20"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => openCase(item)}
              data-cursor="VIEW"
              className="group relative block w-full text-left"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
                <Image
                  src={item.image.src}
                  alt={item.image.alt || item.client}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <p className="font-gotham text-meta uppercase tracking-[0.3em] text-white/60">
                  {item.client}
                </p>
                <h3 className="mt-2 font-gotham text-h4 uppercase text-white">
                  {item.project}
                </h3>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <Magnetic strength={0.3}>
            {/* Box-Variante wie auf der Startseite (13.08.2026, User-Vorgabe) */}
            <PillButton href="/work" size="md" variant="box">
              Alle Referenzen anzeigen
            </PillButton>
          </Magnetic>
        </div>
      </div>

      <CaseModal caseData={activeCase} onClose={closeCase} />
    </section>
  );
}
