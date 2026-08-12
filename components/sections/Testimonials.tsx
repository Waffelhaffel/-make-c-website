"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import type { LandingTestimonials } from "@/lib/content/types";

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

        {/* Vier Zitate (12.08.2026): auf drei Spalten stünde das vierte allein in
            einer zweiten Reihe, auf vier Spalten sind die Karten so schmal, dass
            jeder Satz sechsmal umbricht. Also 2×2 ab md. Bei anderer Anzahl hier
            nachziehen — die Spaltenzahl folgt der Liste in `landing.ts`. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {items.map((item, i) => (
            <motion.figure
              key={`${item.author}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              // Eckig, kein Radius: außer den Pill-Buttons (`rounded-full`) ist
              // auf der Seite kein Kasten gerundet — Bildrahmen, Kontakt-CTA und
              // Standort-Zeilen laufen alle auf scharfe Ecken.
              className="flex h-full flex-col border border-white/10 bg-white/[0.035] p-8 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.06] md:p-10"
            >
              {/* Anführungszeichen links, Kundenlogo rechts. Seit 12.08.2026
                  dieselben weißen Dateien wie im LogoBanner (`public/logos/`);
                  das frühere `brightness-0 invert` ist damit hinfällig — es
                  kippte die alten dunklen Graustufen-PNGs nach Weiß.
                  `width`/`height` kommen aus den Daten, weil die Logos
                  unterschiedliche Seitenverhältnisse haben und `w-auto` die
                  Breite daraus rechnet. */}
              <div className="flex items-start justify-between gap-6">
                <span
                  aria-hidden
                  className="font-garamond leading-[0.6] text-white/25 text-[clamp(3rem,4.5vw,4.25rem)] select-none"
                >
                  &ldquo;
                </span>
                {item.logo && (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    className="h-12 w-auto shrink-0 object-contain opacity-70 md:h-14"
                  />
                )}
              </div>

              {/* Zitat — `flex-1 items-center` statt einfach untereinander: die
                  Karten einer Reihe sind gleich hoch (`h-full`), und ein kurzes
                  Zitat hinterließ dadurch ein Loch über der Autorenzeile. So
                  sitzt es mittig und der Rest verteilt sich oben und unten. */}
              <div className="flex flex-1 items-center py-2">
                <blockquote className="font-gotham text-body-lg leading-relaxed text-white/85">
                  {item.quote}
                </blockquote>
              </div>

              {/* Autor — mt-auto zieht die Zeile auf die Unterkante der höchsten
                  Karte, damit alle vier Namen auf einer Linie stehen */}
              <figcaption className="border-t border-white/10 pt-6 font-gotham text-meta">
                <span className="block font-semibold text-white/85">{item.author}</span>
                {item.role && <span className="mt-1 block text-white/45">{item.role}</span>}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
