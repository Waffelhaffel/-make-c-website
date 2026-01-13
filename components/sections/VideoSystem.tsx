"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";

export function VideoSystem() {
  return (
    <MotionSection
      id="video-system"
      className="py-16 md:py-24 px-6 md:px-12 bg-black border-b border-zinc-900/60"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl text-white">
              Video ist kein Asset. <br />
              <span className="text-makec-blue">Video ist ein System.</span>
            </h2>
            <div className="h-px w-16 bg-makec-blue" />
          </div>

          <div className="flex flex-col gap-6 md:gap-7 md:border-l md:border-zinc-800 md:pl-10 text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            <p className="max-w-2xl">
              Einzelne Videos skalieren nicht. Organisationen scheitern oft an der Fragmentierung ihrer Inhalte – wenn Strategie, Produktion und Distribution nicht ineinandergreifen.
            </p>
            <p className="max-w-2xl">
              Wir denken Video deshalb nicht als einzelne Maßnahme, sondern als durchgängige Infrastruktur, die Marke, Marketing und Vertrieb nachhaltig verbindet.
            </p>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}

