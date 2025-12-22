"use client";

import { SELECTED_WORK } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";

export function SelectedWork() {
  return (
    <MotionSection id="work" className="py-16 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-bold uppercase leading-none">
            Selected
            <br />
            Work
          </h2>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
              CASE STUDIES
              <br />
              2024 — 2025
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
          {SELECTED_WORK.map((project) => (
            <Link 
              key={project.slug} 
              href={`/work/${project.slug}`} 
              className="block group"
              data-cursor="VIEW"
            >
              <motion.div
                className="w-full overflow-hidden bg-black relative aspect-[4/3]"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gray-200">
                    Case Study
                  </p>
                  <p className="text-2xl md:text-4xl font-bold leading-tight text-white uppercase tracking-tighter">
                    {project.name}
                  </p>
                  <span className="text-xs text-gray-300 mt-2 font-medium tracking-widest">{project.year}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Magnetic strength={0.3}>
            <Link href="/work" className="group relative inline-flex items-center justify-center px-12 py-6 border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:border-white">
              <motion.div 
                className="absolute inset-0 bg-black translate-y-[101%]"
                whileHover={{ translateY: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300">
                Alle Referenzen ansehen
              </span>
              <motion.div
                className="relative ml-4 w-6 h-6 flex items-center justify-center"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-4 h-4 stroke-current text-white transition-colors duration-300"
                  strokeWidth="2.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.div>
            </Link>
          </Magnetic>
        </div>
      </div>
    </MotionSection>
  );
}

