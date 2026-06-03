"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import type { LandingQuestions } from "@/sanity/types";

type QuestionsEntryProps = {
  data: LandingQuestions;
};

export function QuestionsEntry({ data }: QuestionsEntryProps) {
  return (
    <MotionSection
      id="questions-entry"
      className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-dark"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-10 md:mb-14">
          {data.headlineLine1 && (
            <span className="font-bold text-white block">{data.headlineLine1}</span>
          )}
          {data.headlineLine2 && (
            <span className="font-garamond font-semibold italic text-white block">
              {data.headlineLine2}
            </span>
          )}
        </h2>

        {data.linkText && (
          <a
            href="#contact"
            className="inline-block text-base md:text-lg text-white font-bold italic border-b-2 border-white pb-1 hover:text-white/80 hover:border-white/80 transition-all duration-300"
          >
            {data.linkText}
          </a>
        )}
      </div>
    </MotionSection>
  );
}
