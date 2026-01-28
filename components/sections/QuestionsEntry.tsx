"use client";

import { MotionSection } from "@/components/ui/MotionSection";

export function QuestionsEntry() {
  return (
    <MotionSection
      id="questions-entry"
      className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title with Mixed Typography */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-10 md:mb-14">
          <span className="font-bold text-white block">Der richtige Startpunkt</span>
          <span className="font-garamond font-semibold italic text-white block">sind die richtigen Fragen.</span>
        </h2>

        {/* Link */}
        <a 
          href="#contact" 
          className="inline-block text-base md:text-lg text-white font-bold italic border-b-2 border-white pb-1 hover:text-white/80 hover:border-white/80 transition-all duration-300"
        >
          Lass uns über Wirkung sprechen
        </a>
      </div>
    </MotionSection>
  );
}
