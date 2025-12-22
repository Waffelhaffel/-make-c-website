"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, FOOTER_CONTENT } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/5">
      <Link href="/" className="text-xl font-bold tracking-tighter text-white z-[60] mix-blend-difference">
        make/c
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2">
        {NAV_LINKS.map((link) => (
          <Magnetic key={link.name} strength={0.2}>
            <Link
              href={link.href}
              className="text-[11px] font-bold text-white hover:text-gray-400 transition-colors uppercase py-2 px-3 tracking-widest"
            >
              {link.name}
            </Link>
          </Magnetic>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-[10000] text-white p-2 flex items-center gap-2 group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          {isOpen ? "Close" : "Menu"}
        </span>
        <div className="relative w-6 h-6 flex items-center justify-center">
           <AnimatePresence mode="wait">
             {isOpen ? (
               <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                 <X size={28} />
               </motion.div>
             ) : (
               <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                 <Menu size={28} />
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </button>

      {/* NEW Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[9999] flex flex-col lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.5)] h-[100dvh] w-screen overflow-y-auto"
          >
            {/* Solid Black Layer */}
            <div className="absolute inset-0 bg-black z-[-2]" />
            
            {/* Background Grain/Texture for the menu */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-[-1]" />
            
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 pt-28 pb-12 relative z-10">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-8">Navigation</p>
              
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl sm:text-5xl font-bold text-white hover:text-zinc-400 transition-colors uppercase tracking-tighter inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom Section with Socials & Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 sm:p-12 border-t border-white/5 bg-zinc-900/20 backdrop-blur-xl"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Socials</p>
                  <div className="flex flex-col gap-2">
                    {FOOTER_CONTENT.socials.map(social => (
                      <a key={social} href="#" className="text-xs font-bold text-white hover:text-zinc-400 transition-colors uppercase">{social}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Get in touch</p>
                  <a href={`mailto:${FOOTER_CONTENT.email}`} className="text-xs font-bold text-white hover:text-zinc-400 transition-colors uppercase break-all">
                    {FOOTER_CONTENT.email}
                  </a>
                </div>
              </div>
              
              <div className="mt-12 flex justify-between items-end">
                <p className="text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
                  make/c — © 2025
                </p>
                <div className="flex gap-4">
                   {FOOTER_CONTENT.legal.map(item => (
                     <span key={item} className="text-[9px] text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">{item}</span>
                   ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
