"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If it's the mobile menu or a link inside it, we might want to hide or reset the cursor
      // or ensure it doesn't get stuck in a "magnetic" state.
      const isMobileMenu = target.closest('.fixed.inset-0.bg-black.z-\\[9999\\]');
      
      const isClickable = target.closest("a, button, [role='button']");
      setIsHovering(!!isClickable);

      // Check for specific labels
      const projectCard = target.closest("[data-cursor]");
      if (projectCard && !isMobileMenu) {
        setCursorText(projectCard.getAttribute("data-cursor") || "");
      } else {
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference hidden lg:flex"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Die Hintergrundfarbe gehört in die className, nicht in `animate`: sie
          ändert sich nie, und ohne Startwert versuchte framer-motion von der
          berechneten `rgba(0,0,0,0)` zum Schlüsselwort `white` zu tweenen —
          daher die Konsolen-Warnung „not animatable". */}
      <motion.div
        animate={{
          width: isHovering ? (cursorText ? 100 : 60) : 12,
          height: isHovering ? (cursorText ? 100 : 60) : 12,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="rounded-full bg-white flex items-center justify-center overflow-hidden"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold text-black uppercase tracking-tighter"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

