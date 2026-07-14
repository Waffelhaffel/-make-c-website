"use client";

import { motion } from "framer-motion";
import { Swoosh } from "@/components/ui/Swoosh";
import { MixedText } from "@/components/ui/MixedHeadline";
import type { LandingInsight } from "@/sanity/types";

type InsightGenerationProps = {
  data: LandingInsight;
};

export function InsightGeneration({ data }: InsightGenerationProps) {
  return (
    <section id="insights" className="relative bg-makec-blue">
      {/* Swoosh auf der Kante Dunkel → Blau (Figma 45:12-Pendant, Node 25:65) */}
      <Swoosh className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 w-[clamp(12rem,25vw,30.5rem)] text-white" />

      <div className="pt-28 md:pt-44 pb-8 md:pb-14 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start"
        >
          <h2 className="text-h2 text-white">
            {data.headlineLine1 && (
              <span className="block">
                <MixedText text={data.headlineLine1} />
              </span>
            )}
            {data.headlineLine2 && (
              <span className="block">
                <MixedText text={data.headlineLine2} />
              </span>
            )}
          </h2>

          {data.body && (
            <p className="font-gotham text-body-lg text-white max-w-lg md:justify-self-end md:pt-2">
              {data.body}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
