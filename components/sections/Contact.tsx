"use client";

import { CONTACT_LABELS } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <MotionSection id="contact" className="relative py-16 md:py-32 px-6 md:px-12 bg-makec-dark">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          
          {/* Left: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 md:p-10"
          >
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder={CONTACT_LABELS.name}
                className="w-full bg-transparent border-b border-zinc-700 px-0 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 transition-all"
              />

              <input
                type="email"
                placeholder={CONTACT_LABELS.email}
                className="w-full bg-transparent border-b border-zinc-700 px-0 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 transition-all"
              />

              <input
                type="text"
                placeholder={CONTACT_LABELS.subject}
                className="w-full bg-transparent border-b border-zinc-700 px-0 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 transition-all"
              />

              <textarea
                rows={4}
                placeholder={CONTACT_LABELS.message}
                className="w-full bg-transparent border-b border-zinc-700 px-0 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 transition-all resize-none"
              />

              <div className="mt-4">
                <button className="w-full bg-transparent text-white font-bold uppercase tracking-[0.2em] py-4 border border-white rounded-full hover:bg-white hover:text-makec-dark transition-all duration-300">
                  Senden
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right: Locations - Text Only */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-10 md:gap-14 lg:pl-8"
          >
            {/* Header */}
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
              Unsere 2 Standorte von make/c
            </p>

            {/* Köln */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Im Herzen
                <br />
                der Dom Stadt.
              </h3>
              <p className="text-base text-gray-400">
                Köln /
              </p>
            </div>

            {/* Essen */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Im Zentrum
                <br />
                des Ruhrgebiets
              </h3>
              <p className="text-base text-gray-400">
                Essen /
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
