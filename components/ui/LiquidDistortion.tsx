"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function LiquidDistortion({ children, id }: { children: React.ReactNode; id: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const baseFrequency = useMotionValue(0.00001);
  const springFreq = useSpring(baseFrequency, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isHovered) {
      baseFrequency.set(0.02);
    } else {
      baseFrequency.set(0.00001);
    }
  }, [isHovered, baseFrequency]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0">
        <filter id={`liquid-${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            result="warp"
          />
          <motion.feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={isHovered ? 40 : 0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div style={{ filter: `url(#liquid-${id})` }} className="w-full h-full transition-all duration-700 ease-out">
        {children}
      </div>
    </div>
  );
}

