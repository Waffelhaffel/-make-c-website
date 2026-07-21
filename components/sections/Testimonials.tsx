"use client";

import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionSection";
import type { LandingTestimonials } from "@/sanity/types";

type TestimonialsProps = {
  data: LandingTestimonials;
};

export function Testimonials({ data }: TestimonialsProps) {
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <MotionSection
      id="testimonials"
      className="bg-makec-dark py-16 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 lg:gap-16">
        {items.map((item, i) => {
          const rating = Math.min(5, Math.max(0, item.rating ?? 5));
          return (
            <motion.figure
              key={item._key ?? `${item.author}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col"
            >
              {/* Kopfzeile: großes Anführungszeichen + Sterne */}
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden
                  className="font-garamond leading-[0.6] text-white/25 text-[clamp(3.5rem,6vw,5.5rem)] select-none"
                >
                  &ldquo;
                </span>
                <div className="flex items-center gap-0.5 pt-2 text-white/40" aria-label={`${rating} von 5 Sternen`}>
                  {Array.from({ length: rating }).map((_, s) => (
                    <Asterisk key={s} size={18} strokeWidth={1.5} aria-hidden />
                  ))}
                </div>
              </div>

              {/* Zitat */}
              <blockquote className="-mt-2 font-gotham text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-relaxed text-white/80">
                {item.quote}
              </blockquote>

              {/* Autor */}
              <figcaption className="mt-6 md:mt-8 font-gotham text-meta text-white/50">
                {item.author}
                {item.role && <span className="text-white/35"> · {item.role}</span>}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </MotionSection>
  );
}
