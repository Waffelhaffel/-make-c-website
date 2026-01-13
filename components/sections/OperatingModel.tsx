"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { CheckCircle2 } from "lucide-react";

export function OperatingModel() {
  const features = [
    "Wiederkehrende Formate",
    "Feste Rhythmen (Weekly / Monthly)",
    "Always-on statt Kampagnen",
    "Skalierbar für Teams & Organisationen",
    "Klar definierte Prozesse",
  ];

  return (
    <MotionSection
      id="operating-model"
      className="py-16 md:py-24 px-6 md:px-12 bg-black border-b border-zinc-900/60"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="block text-xs font-bold text-gray-500 uppercase tracking-[0.35em] mb-6">
            [ OPERATING MODEL ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-white">
            Ein Operating Model <br />
            für Bewegtbild
          </h2>
          <p className="text-lg text-gray-300 font-light leading-relaxed mb-8">
            make/c arbeitet wie ein Systempartner, nicht wie ein Projektlieferant. Wir etablieren Prozesse, die Video skalierbar und planbar machen.
          </p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 p-8 md:p-10 rounded-sm">
          <ul className="space-y-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4 text-gray-200">
                <CheckCircle2 className="w-6 h-6 text-makec-blue shrink-0" strokeWidth={1.5} />
                <span className="text-lg font-light">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionSection>
  );
}

