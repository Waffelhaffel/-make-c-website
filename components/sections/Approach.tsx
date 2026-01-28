"use client";

import { APPROACH_CONTENT } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";

export function Approach() {
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
          {/* Left: Title */}
          <div className="flex-shrink-0 lg:w-[45%]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight">
              <span className="font-bold italic font-gotham block text-white">WE MAKE VIDEOS</span>
              <span className="font-garamond font-semibold italic text-white block">THAT WORK</span>
            </h2>
          </div>

          {/* Vertical Line Divider */}
          <div className="hidden lg:block w-px bg-white/50 self-stretch mx-12" />

          {/* Right: Description */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Approach Label */}
            <span className="text-xs font-medium text-white italic tracking-widest">
              / Approach /
            </span>

            {/* Description Text */}
            <div className="flex flex-col gap-6 text-base md:text-lg text-white font-light leading-relaxed">
              {APPROACH_CONTENT.paragraphs.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>

            {/* Bold Closing Statement */}
            <p className="text-sm md:text-base font-bold italic uppercase tracking-wide text-white leading-relaxed">
              UNSER TEAM ARBEITET MIT EINEM INTEGRIERTEN ANSATZ AUS STRATEGIE, KREATION UND PRODUKTION.
            </p>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
