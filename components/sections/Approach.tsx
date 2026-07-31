"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";
import { Swoosh } from "@/components/ui/Swoosh";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { WordSlot } from "@/components/ui/WordSlot";
import type { LandingApproach } from "@/lib/content/types";

type ApproachProps = {
  data: LandingApproach;
};

export function Approach({ data }: ApproachProps) {
  const paragraphs = data.paragraphs ?? [];

  return (
    <MotionSection
      id="approach"
      className="relative pt-16 md:pt-24 pb-24 md:pb-36 px-6 md:px-12 bg-makec-blue"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start"
        >
          <div className="flex-shrink-0 lg:w-[42%]">
            {/* „make" steht kursiv wie in der Wortmarke — welches Wort, kommt aus dem CMS */}
            <MixedHeadline
              part1={
                <EmphasizedText text={data.headlineLine1} word={data.italicWord} />
              }
              part2={data.headlineLine2}
            />
          </div>

          <div className="hidden lg:block w-px bg-white self-stretch mx-12 xl:mx-16" />

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-6 text-white">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-gotham text-h4"
                      : "font-gotham text-body-lg"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
            {/* Hier stand ein optionaler `closing`-Absatz. Das Feld war im CMS
                nie gefüllt und im Code-Fallback ein Leerstring — der Block hat
                also nie gerendert und ist beim Hartcodieren entfallen. */}
          </div>
        </motion.div>

        {/* Wortmarken-Slot: bewusst groß und zentriert unter beiden Spalten.
            Größe ist so gedeckelt, dass der breiteste Zustand ("make/Communities")
            auch bei 1920px innerhalb von max-w-7xl bleibt — main hat
            overflow-x-hidden, ein Überlauf würde also still abgeschnitten. */}
        <WordSlot
          words={data.wordmarkWords}
          size="text-[clamp(1.75rem,7vw,6rem)]"
          className="mt-16 md:mt-24"
        />
      </div>

      {/* Swoosh auf der Kante Blau → Dunkel (Figma 45:12) */}
      <Swoosh className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 w-[clamp(12rem,25vw,30.5rem)] text-white" />
    </MotionSection>
  );
}
