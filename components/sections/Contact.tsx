"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { SquiggleUnderline } from "@/components/ui/SquiggleUnderline";
import type { LandingContact } from "@/lib/content/types";

type ContactProps = {
  data: LandingContact;
};

// Statische Stadt→Icon-Zuordnung (Assets im "icon /"-Ordner; Trailing-Space im
// Pfad ist gewollt — bekannter Projekt-Fallstrick).
const LOCATION_ICONS: { match: string; src: string }[] = [
  { match: "koln", src: "/icon /Dom_Icon.png" },
  { match: "essen", src: "/icon /Zeche_Icon.png" },
];

function iconForCity(city?: string): string | null {
  if (!city) return null;
  const norm = city.toLowerCase().replace(/ö/g, "o").replace(/[^a-z]/g, "");
  return LOCATION_ICONS.find((i) => norm.includes(i.match))?.src ?? null;
}

// "Köln /" → "Köln"
function cityName(cityLabel?: string): string {
  return (cityLabel ?? "").replace(/\s*\/\s*$/, "").trim();
}

export function Contact({ data }: ContactProps) {
  const locations = data.locations;
  const email = data.email;
  const mailHref = email ? `mailto:${email}` : undefined;
  // Ohne gepflegte Nummer wird die Telefonzeile weggelassen — kein tel:-Link
  // auf eine Platzhalter-Nummer.
  const phoneHref = data.phone ? `tel:${data.phone.replace(/[^+\d]/g, "")}` : undefined;

  return (
    <MotionSection
      id="contact"
      className="relative bg-makec-dark text-white py-16 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Misch-Typo-Headline */}
        <MixedHeadline variant="h2" part1={data.headlineLine1} part2={data.headlineLine2} />

        {/* Intro-Link mit handgezeichneter Unterstreichung */}
        {mailHref && data.introLinkText && (
          <a href={mailHref} className="group inline-block mt-7 md:mt-8">
            <span className="font-garamond italic font-medium text-[clamp(1.25rem,2.2vw,1.625rem)] text-white group-hover:text-white/80 transition-colors">
              {data.introLinkText}
            </span>
            <SquiggleUnderline className="block w-full mt-1.5 text-makec-blue" />
          </a>
        )}

        {/* 2-Spalten-Grid: Ansprechpartner / Standorte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-[72px] mt-12 md:mt-20 items-start">
          {/* Ansprechpartner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-gotham text-meta uppercase tracking-[0.18em] text-white pb-4 border-b border-white/15 mb-7">
              Dein Ansprechpartner
            </p>

            <div className="flex items-center gap-5 md:gap-6">
              <div className="relative flex-none w-40 h-40 md:w-52 md:h-52">
                <Image
                  src={data.contactImage.src}
                  alt={data.contactImage.alt || data.contactName}
                  fill
                  sizes="(min-width: 768px) 208px, 160px"
                  className="object-contain"
                />
              </div>
              <div>
                {data.contactName && (
                  <p className="font-gotham font-semibold leading-tight text-[clamp(1.5rem,2.6vw,2rem)] text-white">
                    {data.contactName}
                  </p>
                )}
                {data.contactRole && (
                  <p className="font-gotham text-meta text-white/55 mt-1">{data.contactRole}</p>
                )}
              </div>
            </div>

            {/* Telefon / E-Mail */}
            <div className="mt-7 flex flex-col">
              {data.phone && (
                <a
                  href={phoneHref}
                  className="flex items-center justify-between gap-4 py-4 border-t border-white/15 font-gotham text-base text-white hover:text-makec-blue transition-colors"
                >
                  <span className="text-[13px] text-white/50">Telefon</span>
                  <span>{data.phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={mailHref}
                  className="flex items-center justify-between gap-4 py-4 border-t border-b border-white/15 font-gotham text-base text-white hover:text-makec-blue transition-colors"
                >
                  <span className="shrink-0 text-[13px] text-white/50">E-Mail</span>
                  <span className="break-all">{email}</span>
                </a>
              )}
            </div>

            {/* CTA-Button (design-treu: blau gefüllt statt weißer PillButton) */}
            {mailHref && (
              <a
                href={mailHref}
                className="group inline-flex items-center gap-2.5 mt-7 rounded-[2px] bg-makec-blue px-6 py-3.5 font-gotham font-medium text-small text-white hover:bg-makec-blue/90 transition-colors"
              >
                {data.ctaButtonText}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </motion.div>

          {/* Standorte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {data.kicker && (
              <p className="font-gotham text-meta uppercase tracking-[0.18em] text-white/55 pb-4 border-b border-white/15">
                {data.kicker}
              </p>
            )}

            {/* md:pt-[9.5px] richtet den Strich unter dem letzten Standort exakt auf
                den letzten Strich der linken Spalte (E-Mail-Zeile) aus. Die beiden
                Spalten haben unterschiedliche Zeilen-Rhythmen; die Differenz ist
                mit 9,5px bei 1280/1440/1920 konstant gemessen. Unter md stehen die
                Spalten untereinander, dort ist die Ausrichtung irrelevant. */}
            <div className="flex flex-col md:pt-[9.5px]">
              {locations.map((loc, i) => {
                const icon = iconForCity(loc.cityLabel);
                const subtitle = [loc.headlineLineOne, loc.headlineLineTwo]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <div
                    key={`${loc.cityLabel ?? "loc"}-${i}`}
                    className="flex items-start gap-5 py-6 border-b border-white/15"
                  >
                    {icon && (
                      <div className="relative flex-none w-12 h-12 md:w-[52px] md:h-[52px]">
                        <Image
                          src={icon}
                          alt={cityName(loc.cityLabel)}
                          fill
                          sizes="52px"
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="font-gotham font-semibold text-[clamp(1.375rem,2.4vw,1.875rem)] text-white">
                          {cityName(loc.cityLabel)}
                        </span>
                        {subtitle && (
                          <span className="font-garamond italic text-base text-white/55">
                            {subtitle}
                          </span>
                        )}
                      </div>
                      {(loc.addressLine1 || loc.addressLine2) && (
                        <p className="font-gotham font-light text-[15px] leading-relaxed text-white/60 mt-2">
                          {loc.addressLine1}
                          {loc.addressLine1 && loc.addressLine2 && <br />}
                          {loc.addressLine2}
                        </p>
                      )}
                      {loc.mapsUrl && (
                        <a
                          href={loc.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-3 inline-flex items-center gap-1.5 font-gotham text-[13.5px] text-white hover:text-white/60 transition-colors"
                        >
                          Route anzeigen
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
