"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { BarChart3, ArrowRight } from "lucide-react";

export function InsightGeneration() {
  return (
    <MotionSection
      id="insights"
      className="py-16 md:py-24 px-6 md:px-12 bg-black border-b border-zinc-900/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-makec-blue w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.35em]">
                INSIGHTS
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-white">
              Mehr Output. Mehr Insights. <br />
              Bessere Entscheidungen.
            </h2>
            
            <div className="flex items-center gap-4 text-makec-blue mt-8 group cursor-pointer">
              <span className="uppercase tracking-widest text-sm font-medium">Video als Feedback-Loop</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="flex-1 space-y-8 text-lg text-gray-300 font-light leading-relaxed border-l border-zinc-800 pl-8 md:pl-12">
            <p>
              Häufige Video-Produktion erzeugt Daten. Diese Daten zeigen gnadenlos, was funktioniert, was nicht konvertiert und wo Kommunikation bricht.
            </p>
            <p>
              make/c nutzt diese Insights strategisch weiter. Wir betrachten Video nicht als Endprodukt, sondern als Startpunkt für bessere Entscheidungen in Marketing und Vertrieb.
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

