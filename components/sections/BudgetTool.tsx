"use client";

import { useState } from "react";
import Image from "next/image";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Was kostet ein typisches Videoprojekt?",
    answer: "Die Kosten hängen stark von Umfang, Teamgröße und Postproduktion ab. Kleinere Social-Media-Produktionen starten im unteren vierstelligen Bereich, während komplexe Imagefilme oder Kampagnen je nach Aufwand individuell kalkuliert werden.",
  },
  {
    question: "Wie lange dauert die Produktion?",
    answer: "In der Regel planen wir für ein Projekt von der Konzeption bis zum fertigen Schnitt etwa 4 bis 8 Wochen ein. Eilprojekte sind nach Absprache natürlich auch schneller realisierbar.",
  },
  {
    question: "Warum sollte ich mit make/c arbeiten?",
    answer: "Wir vereinen strategische Beratung mit High-End-Produktion. Bei uns bekommst du keine Videos 'von der Stange', sondern maßgeschneiderte Inhalte, die deine Zielgruppe wirklich erreichen und messbare Ergebnisse liefern.",
  },
  {
    question: "Welche Videostile bietet ihr an?",
    answer: "Von cineastischen Imagefilmen über dynamischen Social Content bis hin zu High-End Animationen und Studio-Produktionen decken wir das gesamte Spektrum des modernen Bewegtbildmarketings ab.",
  },
];

export function BudgetTool() {
  const [budgetLevel, setBudgetLevel] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [
    { level: 1, src: "/Budget tool/1 Mensch.png", alt: "Low Budget - 1 Mensch" },
    { level: 2, src: "/Budget tool/2 Menschen.png", alt: "Medium Budget - 2 Menschen" },
    { level: 3, src: "/Budget tool/3 Menschen.png", alt: "High Budget - 3 Menschen" },
    { level: 4, src: "/Budget tool/5 Menschen.png", alt: "Premium Budget - 5 Menschen" },
  ];

  const currentImage = images.find((img) => img.level === budgetLevel) || images[0];

  return (
    <MotionSection id="budget-tool" className="py-16 md:py-32 px-6 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Budget Tool */}
          <div className="flex flex-col">
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4 leading-tight">
                Was bekommst du für dein Budget?
              </h2>
              <p className="text-gray-400 text-lg">
                Schieb den Regler und sieh, wie wir skalieren.
              </p>
            </div>

            {/* Image Display */}
            <div className="relative w-full aspect-video bg-zinc-900/50 rounded-3xl overflow-hidden mb-12 border border-zinc-800/50 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={budgetLevel}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      fill
                      className="object-contain p-6 md:p-10"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="w-full">
              <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-zinc-500">€</span>
                <div className="relative w-full h-12 flex items-center flex-1">
                  <div className="absolute w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((budgetLevel - 1) / 3) * 100}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={budgetLevel}
                    onChange={(e) => setBudgetLevel(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    aria-label="Budget Slider"
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10 pointer-events-none"
                    animate={{ left: `calc(${((budgetLevel - 1) / 3) * 100}% - 12px)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
                <div className="flex gap-0.5 text-xl font-bold text-white">
                  <span>€</span><span>€</span><span>€</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 mt-4 font-bold uppercase tracking-[0.2em] px-1">
                <span>Minimal</span>
                <span>Premium</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-12 text-zinc-500 text-sm leading-relaxed max-w-lg">
              Wir passen Team und Equipment effizient an dein Budget an, 
              um das bestmögliche Ergebnis zu erzielen – egal ob One-Man-Show oder großes Set.
            </p>
          </div>

          {/* Right Column: FAQ */}
          <div className="flex flex-col pt-4 lg:pt-0">
            <div className="mb-12">
              <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Häufige Fragen</h3>
              <p className="text-zinc-500 mt-4 uppercase tracking-widest text-xs font-bold">Quick Answers</p>
              <div className="h-px w-12 bg-white/30 mt-6" />
            </div>
            
            <div className="space-y-3">
              {FAQ_DATA.map((faq, index) => (
                <div 
                  key={index}
                  className={`group border transition-all duration-300 rounded-2xl overflow-hidden ${openFaq === index ? 'border-white/20 bg-zinc-900/40' : 'border-zinc-800/50 bg-zinc-900/10 hover:bg-zinc-900/30'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-500 ${openFaq === index ? 'bg-white text-black border-white rotate-90' : 'text-white border-zinc-700'}`}>
                        {openFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                      <span className={`text-base md:text-lg font-bold tracking-tight uppercase transition-colors ${openFaq === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-8 ml-14 text-zinc-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </MotionSection>
  );
}
