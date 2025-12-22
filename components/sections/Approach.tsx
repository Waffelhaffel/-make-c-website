"use client";

import { APPROACH_CONTENT } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";

export function Approach() {
  return (
    <MotionSection
      id="approach"
      className="pt-8 md:pt-12 pb-16 md:pb-28 px-6 md:px-12 bg-black border-b border-zinc-900/60"
    >
      <div className="max-w-7xl mx-auto">
        <span className="block text-xs font-bold text-gray-500 uppercase tracking-[0.35em] mb-10">
          [ APPROACH ]
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-xl">
              {APPROACH_CONTENT.headline}
            </h2>
            <div className="h-px w-16 bg-white/70" />
          </div>

          <div className="flex flex-col gap-6 md:gap-7 md:border-l md:border-zinc-800 md:pl-10 text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            {APPROACH_CONTENT.paragraphs.map((para, i) => (
              <p key={i} className="max-w-2xl">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}

