"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { Users, Play, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  {
    id: "employees",
    icon: Users,
    number: "15+",
    label: "Mitarbeiter",
    subtext: "plus Hinweis, dass ihr Zugriff auf ein Netzwerk von ~80 weiteren Expert:innen habt.",
  },
  {
    id: "videos",
    icon: Play,
    number: "5.000+",
    label: "Videos",
    subtext: "Anzahl produzierter Videos seit der Gründung.",
  },
  {
    id: "locations",
    icon: MapPin,
    number: "2",
    label: "Standorte",
    subtext: "Köln & Essen, mitten in der Metropolregion Rhein/Ruhr.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Stats() {
  return (
    <MotionSection className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-dark overflow-hidden">

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Main Headline */}
        <div className="text-center mb-16 md:mb-20">
          <span className="block text-xs md:text-sm font-medium text-makec-blue italic tracking-widest mb-6">
            / Mehr als nur Videoproduktion /
          </span>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto text-white">
            <span className="font-bold italic">Ein Team, das skalierbare Video-Lösungen für</span>
            <br />
            <span className="font-garamond font-semibold italic">Marken, Unternehmen und Events baut.</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              className="flex flex-col items-center gap-5"
            >
              {/* Icon in blue circle */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-makec-blue flex items-center justify-center">
                <stat.icon size={32} strokeWidth={1.5} className="text-white" />
              </div>

              {/* Number and Label */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl md:text-3xl">
                  <span className="font-bold">{stat.number}</span>{" "}
                  <span className="font-garamond italic">{stat.label}</span>
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
