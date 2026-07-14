"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import type { LandingQuestions } from "@/sanity/types";

type QuestionsEntryProps = {
  data: LandingQuestions;
};

export function QuestionsEntry({ data }: QuestionsEntryProps) {
  return (
    <MotionSection
      id="questions-entry"
      className="relative py-16 md:py-32 px-6 md:px-12 bg-makec-dark"
    >
      <div className="max-w-7xl mx-auto">
        <MixedHeadline
          part1={data.headlineLine1}
          part2={data.headlineLine2}
          className="mb-10 md:mb-14"
        />

        {data.linkText && (
          <a
            href="#contact"
            className="inline-block font-gotham text-body-lg font-bold italic text-white border-b-2 border-white pb-1 hover:text-white/80 hover:border-white/80 transition-all duration-300"
          >
            {data.linkText}
          </a>
        )}
      </div>
    </MotionSection>
  );
}
