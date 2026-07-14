"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Service } from "@/sanity/types";
import { SERVICE_LOOP_VIDEOS } from "@/sanity/lib/getServices";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { PillButton } from "@/components/ui/PillButton";

type ServiceAccordionProps = {
  services: Service[];
};

// "Video Produktion" → ["Video", "Produktion"] für die Misch-Typo-Headline (Figma 38:190)
function splitTitle(title: string): [string, string | null] {
  const idx = title.indexOf(" ");
  if (idx === -1) return [title, null];
  return [title.slice(0, idx), title.slice(idx + 1)];
}

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  // Es ist immer höchstens eine Kachel offen
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const rowButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const rowWrapperRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleService = (slug: string) => {
    setActiveSlug((current) => (current === slug ? null : slug));
  };

  const closePanel = useCallback((slug: string) => {
    setActiveSlug(null);
    // Fokus zurück auf die auslösende Zeile
    rowButtonRefs.current.get(slug)?.focus({ preventScroll: true });
  }, []);

  // Fokus ins Panel, sobald eine Kachel geöffnet wird
  useEffect(() => {
    if (activeSlug) panelRef.current?.focus({ preventScroll: true });
  }, [activeSlug]);

  // Escape schließt das offene Panel
  useEffect(() => {
    if (!activeSlug) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel(activeSlug);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeSlug, closePanel]);

  const openFirstService = () => {
    const first = services[0];
    if (!first) return;
    setActiveSlug(first.slug);
    rowWrapperRefs.current.get(first.slug)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MotionSection
      id="service"
      className="relative py-16 md:py-32 bg-makec-dark overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="flex flex-col">
          {services.map((service, idx) => {
            const imageLeft = idx % 2 === 0;
            const isActive = activeSlug === service.slug;
            const panelId = `service-panel-${service.slug}`;
            const loopVideo = SERVICE_LOOP_VIDEOS[service.slug];
            const heroImage = hasImageAsset(service.heroImage)
              ? urlFor(service.heroImage).width(1200).quality(85).auto("format").url()
              : null;
            const headline = service.displayTitle ?? service.headline ?? service.title;
            const [titlePart1, titlePart2] = splitTitle(headline);
            const features = service.features ?? [];
            const processSteps = service.processSteps ?? [];
            return (
              <div
                key={service._id}
                ref={(el) => {
                  if (el) rowWrapperRefs.current.set(service.slug, el);
                  else rowWrapperRefs.current.delete(service.slug);
                }}
                className="scroll-mt-[90px]"
              >
                {/* Zeile: Bild/Video abwechselnd links/rechts, Headline überlappt (Figma 38:184ff) */}
                <button
                  type="button"
                  ref={(el) => {
                    if (el) rowButtonRefs.current.set(service.slug, el);
                    else rowButtonRefs.current.delete(service.slug);
                  }}
                  onClick={() => toggleService(service.slug)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  className="group relative block w-full text-left md:grid md:grid-cols-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 focus-visible:-outline-offset-2"
                >
                  <div
                    className={`relative aspect-[730/462] overflow-hidden bg-black/20 ${
                      imageLeft ? "" : "md:col-start-2"
                    }`}
                  >
                    {loopVideo ? (
                      <LazyVideo
                        src={loopVideo}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : heroImage ? (
                      <Image
                        src={heroImage}
                        alt={service.heroImage?.alt ?? service.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    ) : null}
                  </div>

                  <div
                    className={`absolute inset-y-0 z-10 flex items-center pointer-events-none ${
                      imageLeft
                        ? "left-[6%] md:left-[40.5%]"
                        : "left-[6%] md:left-auto md:right-[40.5%] md:justify-end"
                    }`}
                  >
                    <h3
                      className={`uppercase text-white leading-none text-[clamp(2.75rem,5.5vw,6.5625rem)] ${
                        imageLeft ? "" : "md:text-right"
                      }`}
                    >
                      <span className="block font-gotham font-bold italic tracking-[-0.05em]">
                        {titlePart1}
                        {titlePart2 ? "/" : ""}
                      </span>
                      {titlePart2 && (
                        <span className="block font-garamond font-semibold italic text-[1.076em]">
                          {titlePart2}
                        </span>
                      )}
                      {/* Plus verschwindet bei offenem Panel — schließen nur über das X im Panel */}
                      <span
                        aria-hidden="true"
                        className={`mt-4 inline-flex w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white text-white items-center justify-center transition-opacity duration-300 ${
                          isActive ? "opacity-0" : "opacity-100 group-hover:bg-white/10"
                        }`}
                      >
                        <Plus size={20} strokeWidth={2.5} />
                      </span>
                    </h3>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Detail-Panel: blau, X oben rechts, Fokusziel beim Öffnen */}
                      <div
                        id={panelId}
                        role="region"
                        aria-label={headline}
                        ref={panelRef}
                        tabIndex={-1}
                        className="relative bg-makec-blue px-6 md:px-14 py-14 md:py-20 focus:outline-none"
                      >
                        <button
                          type="button"
                          onClick={() => closePanel(service.slug)}
                          aria-label="Details schließen"
                          className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-makec-blue transition-colors duration-300"
                        >
                          <X size={20} strokeWidth={2.5} />
                        </button>

                        <div className="flex flex-col gap-12 md:gap-14">
                          {/* Intro */}
                          <div className="flex flex-col gap-4 max-w-3xl pr-14 md:pr-24">
                            <p className="font-gotham text-meta uppercase tracking-[0.25em] text-white/60">
                              / {headline} /
                            </p>
                            <p className="font-gotham font-[325] text-[clamp(1.375rem,1.8vw,1.75rem)] leading-snug text-white">
                              {service.description}
                            </p>
                            {service.detailText && (
                              <p className="font-gotham font-[325] text-base md:text-lg leading-relaxed text-white/80">
                                {service.detailText}
                              </p>
                            )}
                          </div>

                          {features.length > 0 && (
                            <div className="border-t border-white/25 pt-10">
                              <p className="font-gotham text-meta uppercase tracking-[0.25em] text-white/60 mb-8">
                                Was wir machen
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                                {features.map((feature, i) => (
                                  <div key={feature._key ?? i} className="flex flex-col gap-1.5">
                                    <h4 className="font-gotham font-[325] text-lg text-white">
                                      {feature.title}
                                    </h4>
                                    {feature.description && (
                                      <p className="font-gotham font-[325] text-[15px] leading-relaxed text-white/70">
                                        {feature.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {processSteps.length > 0 && (
                            <div className="border-t border-white/25 pt-10">
                              <p className="font-gotham text-meta uppercase tracking-[0.25em] text-white/60 mb-8">
                                So arbeiten wir
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8">
                                {processSteps.map((step, i) => (
                                  <div key={step._key ?? i} className="flex flex-col gap-1.5">
                                    <span className="font-gotham font-[325] text-sm text-white/40">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h4 className="font-gotham font-[325] text-lg text-white">
                                      {step.title}
                                    </h4>
                                    {step.description && (
                                      <p className="font-gotham font-[325] text-[15px] leading-relaxed text-white/70">
                                        {step.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTA — der einzige Bold-Akzent im Panel */}
                          <div className="border-t border-white/25 pt-10">
                            {service.externalLink ? (
                              <PillButton
                                href={service.externalLink}
                                external
                                size="md"
                                tone="blue"
                                icon="external"
                              >
                                {service.buttonText || "Zur Website"}
                              </PillButton>
                            ) : (
                              <PillButton href="#contact" size="md" tone="blue">
                                Jetzt anfragen
                              </PillButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Weißer Pill-Button (Figma 45:8) — öffnet den ersten Service */}
        <div className="mt-20 md:mt-40 flex justify-center">
          <PillButton onClick={openFirstService}>Entdecke alle Leistungen</PillButton>
        </div>
      </div>
    </MotionSection>
  );
}
