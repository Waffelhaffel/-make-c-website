"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { LandingContact } from "@/sanity/types";

type FloatingContactProps = {
  data: LandingContact;
};

const DEFAULT_CONTACT_IMAGE = "/Kontakt_Guy.webp";

export function FloatingContact({ data }: FloatingContactProps) {
  const enabled = data.floatingCtaEnabled !== false;
  const [visible, setVisible] = useState(false);

  const imageSrc = hasImageAsset(data.contactImage)
    ? urlFor(data.contactImage).width(160).height(160).quality(85).auto("format").url()
    : DEFAULT_CONTACT_IMAGE;
  const label = data.ctaLabel || "Let's talk";

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
          className="group fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-3 rounded-l-full border border-white/10 border-r-0 bg-makec-dark/80 py-2 pl-4 pr-2 shadow-2xl backdrop-blur-md transition-colors hover:bg-makec-dark/95"
        >
          <span className="hidden sm:flex flex-col leading-tight text-right">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              {label}
            </span>
            <span className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-[0.2em] text-makec-blue">
              Kontakt
              <ArrowUpRight size={12} />
            </span>
          </span>

          <span className="relative h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
            <Image
              src={imageSrc}
              alt={data.contactImage?.alt || data.contactName || "Kontakt make/c"}
              fill
              sizes="56px"
              className="object-cover"
            />
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-makec-blue ring-2 ring-makec-dark" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
