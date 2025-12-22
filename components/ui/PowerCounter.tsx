"use client";

import { animate, motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  label: string;
  duration?: number;
  delay?: number;
}

export function PowerCounter({ label, duration = 2, delay = 0 }: CounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      // easeOutCubic (or similar) feels nice for "slowing down at the end"
      const controls = animate(count, 100, { 
        duration: duration, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom easeOut for distinct slowdown
      });
      return () => controls.stop();
    } else {
      count.set(0);
    }
  }, [isInView, count, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center justify-center text-center bg-zinc-900/40 border border-zinc-800/50 rounded-3xl py-12 px-6 overflow-hidden cursor-default"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Background Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative z-10">
        <div className="text-5xl md:text-7xl font-bold tabular-nums leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          <motion.span>{rounded}</motion.span>%
        </div>
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-gray-400 group-hover:text-white transition-colors duration-300">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
