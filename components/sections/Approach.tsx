"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";
import type { LandingApproach } from "@/sanity/types";

type ApproachProps = {
  data: LandingApproach;
};

export function Approach({ data }: ApproachProps) {
  const paragraphs = data.paragraphs ?? [];

  return (
    <MotionSection
      id="approach"
      className="pt-16 md:pt-24 pb-20 md:pb-32 px-6 md:px-12 bg-makec-blue"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start"
        >
          <div className="flex-shrink-0 lg:w-[45%]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight">
              {data.headlineLine1 && (
                <span className="font-bold italic font-gotham block text-white">
                  {data.headlineLine1}
                </span>
              )}
              {data.headlineLine2 && (
                <span className="font-garamond font-semibold italic text-white block">
                  {data.headlineLine2}
                </span>
              )}
            </h2>
          </div>

          <div className="hidden lg:block w-px bg-white/50 self-stretch mx-12" />

          <div className="flex-1 flex flex-col gap-6">
            {data.kicker && (
              <span className="text-xs font-medium text-white italic tracking-widest">
                {data.kicker}
              </span>
            )}

            <div className="flex flex-col gap-6 text-base md:text-lg text-white font-light leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {data.closing && (
              <p className="text-sm md:text-base font-bold italic uppercase tracking-wide text-white leading-relaxed">
                {data.closing}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
