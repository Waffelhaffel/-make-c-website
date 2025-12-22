"use client";

import { TEAM_CONTENT } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, Variants } from "framer-motion";
import { PowerCounter } from "@/components/ui/PowerCounter";
import Image from "next/image";

export function AboutTeam() {
  const { about } = TEAM_CONTENT;

  const equipment: { emoji: string; label: string }[] = [
    { emoji: "🎥", label: "Cinema Kameras" },
    { emoji: "📷", label: "Foto & Hybrid" },
    { emoji: "🎚️", label: "Licht & Grip" },
    { emoji: "🎛️", label: "Regie & Live" },
  ];

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    offscreen: { y: 120, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      rotate: -3,
      transition: { type: "spring", bounce: 0.32, duration: 0.7 },
    },
  };


  return (
    <MotionSection id="team" className="py-16 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Power / Passion / Umsetzung Animation Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-32">
          <PowerCounter label="Power" duration={2} delay={0} />
          <PowerCounter label="Leidenschaft" duration={3} delay={0.2} />
          <PowerCounter label="Umsetzung" duration={4} delay={0.4} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              {about.intro}
            </h3>
            <div className="space-y-6 text-base md:text-lg text-gray-300 font-light leading-relaxed">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
              <p className="font-medium text-white pt-4">{about.claim}</p>
              <p className="font-bold text-white">{about.outro}</p>
            </div>
          </div>

          {/* Right: Team Photo Placeholder */}
          <div className="flex flex-col gap-8">
            <h2 className="text-5xl md:text-6xl font-bold uppercase text-left">
              TEAM
            </h2>
            <div className="w-full bg-zinc-800 rounded-3xl flex items-center justify-center relative overflow-hidden">
               <Image
                 src="/Team Bild1.JPG"
                 alt="Make/C Team"
                 width={800}
                 height={600}
                 className="w-full h-auto object-cover"
               />
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
