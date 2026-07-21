"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
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
      <div className="max-w-7xl mx-auto">
        {(data.kicker || data.headlineLine1 || data.headlineLine2) && (
          <div className="mb-12 md:mb-20">
            {data.kicker && (
              <p className="font-gotham text-meta uppercase tracking-[0.18em] text-white/70 mb-6 md:mb-7">
                {data.kicker}
              </p>
            )}
            <MixedHeadline
              variant="h2"
              part1={data.headlineLine1}
              part2={data.headlineLine2}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 lg:gap-16">
          {items.map((item, i) => (
            <motion.figure
              key={item._key ?? `${item.author}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col"
            >
              {/* Großes Anführungszeichen */}
              <span
                aria-hidden
                className="font-garamond leading-[0.6] text-white/25 text-[clamp(3.5rem,6vw,5.5rem)] select-none"
              >
                &ldquo;
              </span>

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
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
