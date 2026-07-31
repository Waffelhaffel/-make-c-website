"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { CaseStudy } from "@/sanity/types";
import { CaseModal } from "@/components/work/CaseModal";
import { useCaseModal } from "@/components/work/useCaseModal";

type WorkGridProps = {
  caseStudies: CaseStudy[];
};

export function WorkGrid({ caseStudies }: WorkGridProps) {
  const { activeCase, openCase, closeCase } = useCaseModal();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="font-gotham text-h2 uppercase text-white">Referenzen</h1>
        <p className="font-gotham text-meta text-white/60 mt-4 tracking-widest uppercase">
          Portfolio
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {caseStudies.map((item, i) => {
          const image = item.thumbnailImage ?? item.heroImage;
          const imageUrl = hasImageAsset(image)
            ? urlFor(image).width(700).height(875).fit("crop").auto("format").url()
            : null;
          const alt = image?.alt || item.projectMeta.client;

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="group relative"
            >
              <button
                type="button"
                onClick={() => openCase(item)}
                data-cursor="VIEW"
                className="block w-full text-left aspect-[4/5] bg-white/5 border border-white/5 rounded-sm overflow-hidden relative"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-4 md:p-5">
                  <p className="font-gotham text-[10px] text-white/70 uppercase tracking-widest mb-1">
                    {item.projectMeta.client} · {item.projectMeta.year}
                  </p>
                  {/* h2, nicht h3: auf /work stehen die Kacheln direkt unter
                      der h1 „Referenzen" — es gibt keine Zwischenebene, ein h3
                      wäre eine Lücke in der Hierarchie. */}
                  <h2 className="font-gotham text-xs sm:text-sm uppercase tracking-tight leading-tight">
                    {item.project}
                  </h2>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {caseStudies.length === 0 && (
        <p className="text-center text-white/50 text-sm mt-20">
          Noch keine Case Studies veröffentlicht.
        </p>
      )}

      <CaseModal caseData={activeCase} onClose={closeCase} />
    </>
  );
}
