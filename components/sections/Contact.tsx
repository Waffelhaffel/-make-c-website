"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/ui/MotionSection";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { LandingContact } from "@/sanity/types";

type ContactProps = {
  data: LandingContact;
};

const DEFAULT_CONTACT_IMAGE = "/Kontakt_Guy.png";

export function Contact({ data }: ContactProps) {
  const locations = data.locations ?? [];

  const contactImageSrc = hasImageAsset(data.contactImage)
    ? urlFor(data.contactImage).width(900).quality(85).auto("format").url()
    : DEFAULT_CONTACT_IMAGE;

  const phoneHref = data.phone ? `tel:${data.phone.replace(/[^+\d]/g, "")}` : undefined;

  return (
    <MotionSection id="contact" className="relative py-16 md:py-32 px-6 md:px-12 bg-makec-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 md:p-10"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-10">
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={contactImageSrc}
                  alt={data.contactImage?.alt || data.contactName || "Ansprechpartner make/c"}
                  fill
                  sizes="(max-width: 640px) 160px, 208px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-4 text-center sm:text-left">
                {(data.contactName || data.contactRole) && (
                  <div>
                    {data.contactName && (
                      <p className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {data.contactName}
                      </p>
                    )}
                    {data.contactRole && (
                      <p className="text-sm md:text-base text-gray-400">{data.contactRole}</p>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {data.phone && (
                    <a
                      href={phoneHref}
                      className="text-lg md:text-xl text-white hover:text-makec-blue transition-colors"
                    >
                      {data.phone}
                    </a>
                  )}
                  {data.email && (
                    <a
                      href={`mailto:${data.email}`}
                      className="text-lg md:text-xl text-white hover:text-makec-blue transition-colors break-all"
                    >
                      {data.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-10 md:gap-14 lg:pl-8"
          >
            {data.kicker && (
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">{data.kicker}</p>
            )}

            {locations.map((loc, i) => (
              <div key={`${loc.cityLabel ?? "loc"}-${i}`}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                  {loc.headlineLineOne}
                  <br />
                  {loc.headlineLineTwo}
                </h3>
                {loc.cityLabel && <p className="text-base text-gray-400">{loc.cityLabel}</p>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
