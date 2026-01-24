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
      const controls = animate(count, 100, { 
        duration: duration, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      });
      return () => controls.stop();
    } else {
      count.set(0);
    }
  }, [isInView, count, duration, delay]);

  return (
    <div className="flex flex-col items-center">
      {/* Blue Circle */}
      <motion.div
        ref={ref}
        className="w-32 h-32 md:w-40 md:h-40 bg-makec-blue rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
          <motion.span>{rounded}</motion.span>%
        </div>
      </motion.div>
      
      {/* Label below */}
      <p className="mt-4 text-sm md:text-base text-white/80 italic">
        / {label} /
      </p>
    </div>
  );
}
