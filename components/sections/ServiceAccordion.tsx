"use client";

import { Plus, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Service } from "@/sanity/types";
import { SERVICE_LOOP_VIDEOS } from "@/sanity/lib/getServices";

type ServiceAccordionProps = {
  services: Service[];
};

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <MotionSection
      id="service"
      className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-blue overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <h2 className="text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
            <span className="font-bold italic font-gotham">UNSERE </span>
            <span className="font-garamond font-semibold italic text-[1.15em]">LEISTUNGEN</span>
          </h2>
        </div>

        <div className="flex flex-col" onMouseLeave={() => setActiveId(null)}>
          {services.map((service) => {
            const loopVideo = SERVICE_LOOP_VIDEOS[service.slug];
            const headline = service.displayTitle ?? service.headline ?? service.title;
            return (
              <div
                key={service._id}
                onMouseEnter={() => setActiveId(service.slug)}
                className="relative border-t border-white/30 last:border-b overflow-hidden"
              >
                <div
                  className="group flex items-center justify-between py-6 md:py-8 cursor-pointer relative z-10"
                  onClick={() => toggleService(service.slug)}
                >
                  <h3
                    className={`text-2xl md:text-4xl lg:text-5xl font-bold italic tracking-tight transition-all duration-300 ${
                      activeId === service.slug ? "translate-x-2" : ""
                    }`}
                  >
                    {headline}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 ${
                      activeId === service.slug
                        ? "bg-white text-makec-blue rotate-45"
                        : "bg-transparent text-white"
                    }`}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                </div>

                <AnimatePresence>
                  {activeId === service.slug && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {loopVideo && (
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-black/20">
                            <video
                              src={loopVideo}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex flex-col items-start gap-6">
                          <p className="text-lg text-white/90 leading-relaxed font-light">
                            {service.description}
                          </p>

                          {service.externalLink ? (
                            <a
                              href={service.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center gap-3 px-6 py-3 rounded-full bg-white text-makec-blue font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
                            >
                              {service.buttonText || "Zur Website"}
                              <ExternalLink
                                size={16}
                                className="transition-transform group-hover/btn:translate-x-1"
                              />
                            </a>
                          ) : (
                            <Link
                              href={`/services/${service.slug}`}
                              className="group/btn flex items-center gap-3 px-6 py-3 rounded-full bg-white text-makec-blue font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
                            >
                              Mehr erfahren
                              <ArrowRight
                                size={16}
                                className="transition-transform group-hover/btn:translate-x-1"
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
