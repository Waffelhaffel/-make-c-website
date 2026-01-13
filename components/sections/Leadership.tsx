"use client";

import { MotionSection } from "@/components/ui/MotionSection";

export function Leadership() {
  return (
    <MotionSection
      id="leadership"
      className="py-16 md:py-24 px-6 md:px-12 bg-black border-b border-zinc-900/60"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-white">
          Kommunikation dort, <br />
          wo Entscheidungen entstehen
        </h2>
        
        <p className="text-xl text-gray-300 font-light leading-relaxed mb-12">
          CEO-Kommunikation. Vision & Strategie. Leadership-Updates. <br className="hidden md:block" />
          Interne & externe Wirkung.
        </p>

        <div className="inline-block border border-zinc-800 bg-zinc-900/20 px-8 py-6 rounded-sm">
          <p className="text-lg md:text-xl font-serif italic text-white/90">
            &quot;make/c arbeitet dort, wo Haltung, Richtung und Klarheit gefragt sind.&quot;
          </p>
        </div>
      </div>
    </MotionSection>
  );
}

