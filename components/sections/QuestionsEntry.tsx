"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { ArrowRight } from "lucide-react";

export function QuestionsEntry() {
  return (
    <MotionSection
      id="questions-entry"
      className="py-20 md:py-32 px-6 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="max-w-2xl">
          <span className="block text-xs font-bold text-makec-blue uppercase tracking-[0.35em] mb-8">
            STARTPUNKT
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8">
            Der richtige Startpunkt sind die richtigen Fragen.
          </h2>
          <div className="flex flex-col gap-4 text-gray-400 font-light text-lg">
            <p>Ziele vor Formaten.</p>
            <p>Wirkung vor Reichweite.</p>
            <p>Outcomes vor Assets.</p>
          </div>
        </div>

        <a 
          href="#contact" 
          className="group flex items-center gap-4 text-white text-xl md:text-2xl border-b border-white/30 pb-2 hover:border-makec-blue hover:text-makec-blue transition-all duration-300"
        >
          <span>Lass uns über Wirkung sprechen</span>
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
        </a>
      </div>
    </MotionSection>
  );
}

