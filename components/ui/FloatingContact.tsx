"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LandingContact } from "@/lib/content/types";

type FloatingContactProps = {
  data: LandingContact;
};

export function FloatingContact({ data }: FloatingContactProps) {
  const enabled = data.floatingCtaEnabled !== false;
  const [visible, setVisible] = useState(false);

  const label = data.ctaLabel;

  useEffect(() => {
    if (!enabled) return;

    // Hide the floating CTA while the real contact section is on screen,
    // so the two don't compete.
    let contactInView = false;
    const contactEl = document.getElementById("contact");
    const observer = contactEl
      ? new IntersectionObserver(
          ([entry]) => {
            contactInView = entry.isIntersecting;
            update();
          },
          { rootMargin: "0px 0px -20% 0px" }
        )
      : null;
    if (contactEl && observer) observer.observe(contactEl);

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      setVisible(pastHero && !contactInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          aria-label="Kontakt aufnehmen"
          initial={{ x: "110%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center rounded-l-full border border-white/10 border-r-0 bg-makec-dark/80 py-3.5 pl-6 pr-5 shadow-2xl backdrop-blur-md transition-colors hover:bg-makec-dark/95"
        >
          {/* Kein Portrait mehr (User-Entscheidung 08/2026) — deshalb ist der
              Text auch auf Mobile sichtbar, sonst wäre der Button leer. */}
          <span className="flex flex-col leading-tight text-right">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              {label}
            </span>
            {/* Weiß, nicht makec-blue: Dunkelblau auf dem dunklen Panel war kaum lesbar */}
            <span className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
              Kontakt
              <ArrowUpRight size={12} />
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
