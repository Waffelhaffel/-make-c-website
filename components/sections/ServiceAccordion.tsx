"use client";

import { SERVICES } from "@/lib/data";
import { Plus, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ServiceAccordion() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <MotionSection id="service" className="py-16 md:py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-bold uppercase leading-none text-white">
            LEISTUNGEN
          </h2>
        </div>

        <div 
          className="flex flex-col border-t border-zinc-800"
          onMouseLeave={() => setActiveId(null)}
        >
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveId(service.id)}
              className="relative border-b border-zinc-800 overflow-hidden"
            >
              {/* Header / Trigger */}
              <div className="group flex items-center justify-between py-8 md:py-10 cursor-pointer relative z-10 bg-black/50 hover:bg-black/0 transition-colors">
                <h3 className={`text-3xl md:text-5xl font-bold uppercase transition-all duration-300 ${activeId === service.id ? 'pl-4 text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {service.title}
                </h3>
                <div className={`p-2 rounded-full transition-all duration-300 ${activeId === service.id ? 'bg-white text-black rotate-45' : 'bg-zinc-900 text-gray-400 group-hover:bg-zinc-800 group-hover:text-white'}`}>
                  <Plus size={24} />
                </div>
              </div>

              {/* Expanded Content */}
              <motion.div
                initial={false}
                animate={{
                  height: activeId === service.id ? "auto" : 0,
                  opacity: activeId === service.id ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Video Loop */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900">
                    <video
                      src={service.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  {/* Description & Link */}
                  <div className="flex flex-col items-start gap-6">
                    <p className="text-lg text-gray-300 leading-relaxed font-light">
                      {service.description}
                    </p>
                    
                    {service.externalLink ? (
                      <a
                        href={service.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-colors"
                      >
                        {service.buttonText || "Zur Website"}
                        <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    ) : (
                      <Link
                        href={`/services/${service.id}`}
                        className="group/btn flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-colors"
                      >
                        Mehr erfahren
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
