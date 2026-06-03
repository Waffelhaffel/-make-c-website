"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import type { LandingHero } from "@/sanity/types";

type HeroProps = {
  data: LandingHero;
};

export function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const skewValue = useTransform(scrollY, [0, 1000], [0, -15]);
  const smoothSkew = useSpring(skewValue, { damping: 20, stiffness: 100 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const lines = [data.headlineLine1, data.headlineLine2, data.headlineLine3].filter(
    Boolean
  ) as string[];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col pt-24 pb-12 px-6 md:px-12 justify-between overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="h-full w-full object-cover"
          src="/Header_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center items-start w-full max-w-7xl mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
          style={{ skewY: smoothSkew }}
        >
          <h1 className="text-[16vw] sm:text-[14vw] lg:text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase mb-4 text-white flex flex-col">
            {lines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <span className="flex">
                  {line.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {char === " " ? " " : char}
                    </motion.span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          {data.subheadline && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="text-sm md:text-base tracking-[0.2em] font-medium text-gray-400 uppercase mt-4 ml-2"
            >
              {data.subheadline}
            </motion.p>
          )}
        </motion.div>

        <div className="h-10 md:h-16" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative grid grid-cols-2 md:grid-cols-3 gap-4 text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400 mt-12 w-full max-w-7xl mx-auto z-10"
      >
        <div className="text-left">{data.cornerLeft}</div>
        <div className="hidden md:block text-center">{data.cornerCenter}</div>
        <div className="text-right">{data.cornerRight}</div>
      </motion.div>
    </section>
  );
}
