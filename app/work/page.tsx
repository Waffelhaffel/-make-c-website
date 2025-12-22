"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkPage() {
  const placeholders = Array.from({ length: 9 });

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen text-white pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
              Referenzen
            </h1>
            <p className="text-gray-400 mt-4 tracking-widest uppercase text-sm">
              Portfolio — 2024 / 2025
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholders.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[4/5] bg-neutral-900 border border-white/5 rounded-sm overflow-hidden group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Project {i + 1}</p>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Placeholder Title</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
             <Link href="/" className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-gray-400 transition-colors">
               Zurück zur Startseite
             </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

