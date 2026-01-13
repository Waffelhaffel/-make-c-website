"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";

export function VideoEngine() {
  return (
    <MotionSection
      id="video-engine"
      className="py-16 md:py-24 px-6 md:px-12 bg-black border-b border-zinc-900/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="block text-xs font-bold text-makec-blue uppercase tracking-[0.35em] mb-6">
            [ VIDEO ENGINE ]
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Die Video Engine
          </h2>
          <p className="max-w-2xl text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            Video verbindet Marke, Marketing, Vertrieb, Kommunikation und Leadership. make/c entwickelt keine Clips, sondern Video-Engines.
          </p>
        </div>

        {/* Diagram Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto mt-12 md:mt-20"
        >
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-800 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
             {/* Node 1: Strategy */}
             <div className="flex flex-col items-center group">
                <div className="w-4 h-4 rounded-full bg-black border-2 border-makec-blue mb-6 z-20 relative group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-makec-blue transition-colors">STRATEGY</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">Foundation</p>
             </div>

             {/* Node 2: Creative */}
             <div className="flex flex-col items-center group">
                <div className="w-4 h-4 rounded-full bg-black border-2 border-makec-blue mb-6 z-20 relative group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-makec-blue transition-colors">CREATIVE</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">Expression</p>
             </div>

             {/* Node 3: Production */}
             <div className="flex flex-col items-center group">
                <div className="w-4 h-4 rounded-full bg-black border-2 border-makec-blue mb-6 z-20 relative group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-makec-blue transition-colors">PRODUCTION</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">Execution</p>
             </div>
          </div>
          
          <div className="text-center mt-12 md:mt-16">
             <p className="text-xs text-gray-500 uppercase tracking-widest">Alle Disziplinen gleichwertig. Keine Hierarchie.</p>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}

