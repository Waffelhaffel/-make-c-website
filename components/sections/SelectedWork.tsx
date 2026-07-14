"use client";

import { SELECTED_WORK } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { PillButton } from "@/components/ui/PillButton";
import { Swoosh } from "@/components/ui/Swoosh";

export function SelectedWork() {
  return (
    <section id="work" className="relative bg-makec-dark">
      {/* Blauer Auftakt: läuft nahtlos aus der Insights-Section, Headline überlappt das Grid (Figma 45:14) */}
      <div className="bg-makec-blue pt-20 md:pt-32 px-6">
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
        {SELECTED_WORK.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="block group relative"
            data-cursor="VIEW"
          >
            <motion.div className="w-full overflow-hidden bg-makec-dark relative aspect-[960/538]">
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
                  Case Study
                </p>
                <p className="font-gotham text-h4 text-white uppercase">{project.name}</p>
                <span className="font-gotham text-meta text-white/70 mt-2">{project.year}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Swoosh auf der Unterkante des Grids (Figma 45:28) */}
      <Swoosh className="relative z-10 mx-auto -mt-7 w-[clamp(12rem,25vw,30.5rem)] text-white" />

      {/* Weißer Pill-Button (Figma 51:4) */}
      <div className="mt-12 md:mt-16 pb-20 md:pb-28 flex justify-center px-6">
        <Magnetic strength={0.3}>
          <PillButton href="/work">Alle Referenzen anzeigen</PillButton>
        </Magnetic>
      </div>
    </section>
  );
}
