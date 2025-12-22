"use client";

import { CONTACT_LABELS } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Contact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <MotionSection id="contact" className="py-16 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <h2 className="text-5xl md:text-6xl font-bold uppercase mb-16 md:mb-24">
          Contact
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Contact Form (Tile) */}
          <div className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder={CONTACT_LABELS.name}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-900 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder={CONTACT_LABELS.email}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-900 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder={CONTACT_LABELS.subject}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-900 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  rows={4}
                  placeholder={CONTACT_LABELS.message}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-900 transition-all resize-none"
                />
              </div>

              <div className="mt-4">
                <button className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  Senden
                </button>
              </div>
            </form>
          </div>

          {/* Right: Location Icons/Images */}
          <div className="flex flex-col gap-12 md:gap-20 lg:pl-12 mt-12 lg:mt-[-4rem]">
            <div className="mb-[-20px]">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                UNSERE 2 STANDORTE VON MAKE/C
              </p>
            </div>

            {/* Köln */}
            <motion.div
              style={{ y: y1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 group cursor-default"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative w-full aspect-square sm:w-48 sm:h-48 md:w-64 md:h-64 flex-shrink-0 rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800/50"
              >
                <Image
                  src="/Köln Icon.png"
                  alt="Köln Icon"
                  fill
                  className="object-cover transition-transform duration-700"
                />
              </motion.div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white leading-tight group-hover:text-gray-200 transition-colors">
                  Im Herzen
                  <br />
                  der Dom Stadt
                </h3>
                <div className="h-px w-12 bg-zinc-700 group-hover:w-20 transition-all duration-500" />
                <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.25em]">
                  Köln
                </p>
              </div>
            </motion.div>

            {/* Essen */}
            <motion.div
              style={{ y: y2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 group cursor-default"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative w-full aspect-square sm:w-48 sm:h-48 md:w-64 md:h-64 flex-shrink-0 rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800/50"
              >
                <Image
                  src="/Essen Icon.png"
                  alt="Essen Icon"
                  fill
                  className="object-cover transition-transform duration-700"
                />
              </motion.div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white leading-tight group-hover:text-gray-200 transition-colors">
                  Im Zentrum
                  <br />
                  des Ruhrgebiets
                </h3>
                <div className="h-px w-12 bg-zinc-700 group-hover:w-20 transition-all duration-500" />
                <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.25em]">
                  Essen
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
