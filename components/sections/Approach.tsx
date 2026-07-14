"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";
import { Swoosh } from "@/components/ui/Swoosh";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import type { LandingApproach } from "@/sanity/types";

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
            <MixedHeadline part1={data.headlineLine1} part2={data.headlineLine2} />
          </div>

          <div className="hidden lg:block w-px bg-white self-stretch mx-12 xl:mx-16" />

          <div className="flex-1 flex flex-col gap-6">
            {data.kicker && (
              <span className="font-gotham text-small text-white -mt-1 lg:-mt-10">
                {data.kicker}
              </span>
            )}

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

            {data.closing && (
              <p className="font-gotham text-body-lg font-bold text-white">
                {data.closing}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Swoosh auf der Kante Blau → Dunkel (Figma 45:12) */}
      <Swoosh className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 w-[clamp(12rem,25vw,30.5rem)] text-white" />
    </MotionSection>
  );
}
