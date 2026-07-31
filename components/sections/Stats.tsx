"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { Users, Play, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { LandingStats, StatIcon } from "@/lib/content/types";

type StatsProps = {
  data: LandingStats;
};

const ICON_MAP = {
  users: Users,
  play: Play,
  clock: Clock,
  mapPin: MapPin,
} as const;

function iconFor(name: StatIcon | undefined) {
  return ICON_MAP[name ?? "users"] ?? Users;
}

// Diese Glyphen sind im Figma gefüllt (schwarz auf blauem Kreis).
// clock bleibt bewusst draußen — gefüllt wäre es nur eine schwarze Scheibe.
const FILLED_ICONS = new Set<StatIcon>(["play", "mapPin"]);

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
    <MotionSection className="relative py-16 md:py-32 px-6 md:px-12 bg-makec-dark overflow-hidden">
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-16 md:mb-32">
          {data.kicker && (
            <span className="block font-gotham text-small text-white mb-4">
              {data.kicker}
            </span>
          )}

          <MixedHeadline
            part1={data.headlineLine1}
            part2={data.headlineLine2}
            className="max-w-5xl mx-auto"
          />
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
                className="flex flex-col items-center gap-7"
              >
                <div className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-full bg-makec-blue flex items-center justify-center">
                  <Icon
                    size={40}
                    strokeWidth={2}
                    className="text-black"
                    {...(FILLED_ICONS.has(stat.icon ?? "users") ? { fill: "currentColor" } : {})}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  {/* leading/text-balance: "100 feste Mitarbeiter" bricht in der
                      Spalte zweizeilig — mit lineHeight 1 aus dem Token würden
                      sich die Zeilen berühren. */}
                  <h3 className="font-gotham text-h4 leading-[1.1] text-balance text-white">
                    {[stat.number, stat.label].filter(Boolean).join(" ")}
                  </h3>
                  {stat.subtext && (
                    <p className="font-gotham text-body-lg text-white max-w-xs mx-auto">
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
