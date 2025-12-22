"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { Users, Play, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  {
    id: "employees",
    icon: Users,
    number: "20+",
    label: "MITARBEITER",
    subtext: "...und Zugriff auf ein Netzwerk aus 80 weiteren Experten.",
  },
  {
    id: "videos",
    icon: Play,
    number: "5.000+",
    label: "VIDEOS",
    subtext: "...haben wir seit Gründung 2015 für unsere Kunden produziert.",
  },
  {
    id: "locations",
    icon: MapPin,
    number: "2",
    label: "STANDORTE",
    subtext: "...in Köln und Essen – Mitten in der Metropolregion Rhein/Ruhr.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Stats() {
  return (
    <MotionSection className="py-16 md:py-24 px-6 md:px-12 bg-black border-b border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">
            Mehr als nur Videoproduktion
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 max-w-3xl mx-auto">
            Ein Team, das skalierbare Video-Lösungen für Marken, Unternehmen und Events baut.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 text-center"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative flex flex-col items-center gap-6 group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl bg-white/5" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white ring-1 ring-zinc-800 group-hover:bg-white group-hover:text-black group-hover:ring-white/60 transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                >
                  <stat.icon size={32} strokeWidth={1.5} />
                </motion.div>
              </div>

              <div className="flex flex-col gap-3 relative">
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
                >
                  {stat.number} {stat.label}
                </motion.h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
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


