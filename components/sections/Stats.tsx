"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { Users, Play, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { LandingStats, StatIcon } from "@/sanity/types";

type StatsProps = {
  data: LandingStats;
};

const ICON_MAP = {
  users: Users,
  play: Play,
  mapPin: MapPin,
} as const;

function iconFor(name: StatIcon | undefined) {
  return ICON_MAP[name ?? "users"] ?? Users;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Stats({ data }: StatsProps) {
  const stats = data.items ?? [];

  return (
    <MotionSection className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-dark overflow-hidden">
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-16 md:mb-20">
          {data.kicker && (
            <span className="block text-xs md:text-sm font-medium text-makec-blue italic tracking-widest mb-6">
              {data.kicker}
            </span>
          )}

          <h2 className="text-2xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto text-white">
            {data.headlineLine1 && (
              <span className="font-bold italic">{data.headlineLine1}</span>
            )}
            <br />
            {data.headlineLine2 && (
              <span className="font-garamond font-semibold italic">{data.headlineLine2}</span>
            )}
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center"
        >
          {stats.map((stat, idx) => {
            const Icon = iconFor(stat.icon);
            return (
              <motion.div
                key={`${stat.label ?? "stat"}-${idx}`}
                variants={item}
                className="flex flex-col items-center gap-5"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-makec-blue flex items-center justify-center">
                  <Icon size={32} strokeWidth={1.5} className="text-white" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl md:text-3xl">
                    <span className="font-bold">{stat.number}</span>{" "}
                    <span className="font-garamond italic">{stat.label}</span>
                  </h3>
                  {stat.subtext && (
                    <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                      {stat.subtext}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </MotionSection>
  );
}
