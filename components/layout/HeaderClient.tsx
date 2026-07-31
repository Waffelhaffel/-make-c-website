"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, HEADER_NAV_LINKS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import type { SiteSettings } from "@/lib/content/types";

type HeaderClientProps = {
  settings: SiteSettings;
};

const LEGAL_LINKS = [
  { label: "IMPRESSUM", href: "/impressum" },
  { label: "DATENSCHUTZ", href: "/datenschutz" },
];

export function HeaderClient({ settings }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);

  // Escape schließt das Menü, Fokus kehrt zum Toggle zurück
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Fokus beim Öffnen auf den ersten Menüpunkt
  useEffect(() => {
    if (isOpen) firstNavLinkRef.current?.focus();
  }, [isOpen]);

  const getNavHref = (href: string) => {
    if (!href.startsWith("#")) {
      return href;
    }
    return pathname === "/" ? href : `/${href}`;
  };

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
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[70px] items-center justify-between px-6 md:px-10 xl:px-[70px] bg-makec-dark">
      <Link href="/" className="font-gotham text-2xl font-bold italic tracking-tight text-white z-[60]">
        make/c
      </Link>

      <div className="flex items-center gap-4 lg:gap-10">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {HEADER_NAV_LINKS.map((link) => (
            <Magnetic key={link.name} strength={0.2}>
              <Link
                href={getNavHref(link.href)}
                scroll
                className="font-gotham text-meta text-white hover:text-white/60 transition-colors py-2"
              >
                {link.name}
              </Link>
            </Magnetic>
          ))}
        </nav>

      {/* Menu Button (alle Breakpoints, Figma zeigt Burger auch auf Desktop) */}
      <button
        ref={toggleButtonRef}
        className="z-[10000] text-white p-2 flex items-center gap-2 group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={isOpen}
        aria-controls="site-menu-overlay"
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
      </div>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="site-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Seitenmenü"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-makec-dark z-[9999] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] h-[100dvh] w-screen overflow-y-auto"
          >
            <div className="absolute inset-0 bg-makec-dark z-[-2]" />
            {/* Kein eigenes Noise-Overlay: public/noise.svg existiert nicht mehr
                (404 bei jedem Menü-Öffnen). Grain.tsx erzeugt den Effekt global. */}

            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 pt-28 pb-12 relative z-10">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.4em] mb-8">Navigation</p>

              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      ref={i === 0 ? firstNavLinkRef : undefined}
                      href={getNavHref(link.href)}
                      scroll
                      onClick={() => setIsOpen(false)}
                      className="text-4xl sm:text-5xl font-bold text-white hover:text-white/70 transition-colors uppercase tracking-tighter inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 sm:p-12 border-t border-white/5 bg-white/5 backdrop-blur-xl"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Socials</p>
                  <div className="flex flex-col gap-2">
                    {(settings.socials ?? []).map((social) =>
                      social.url ? (
                        <a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-white hover:text-white/70 transition-colors uppercase"
                        >
                          {social.label}
                        </a>
                      ) : (
                        <span
                          key={social.label}
                          className="text-xs font-bold text-white uppercase"
                        >
                          {social.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Get in touch</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-xs font-bold text-white hover:text-white/70 transition-colors uppercase break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="mt-12 flex justify-between items-end">
                <p className="text-[9px] text-white/60 uppercase tracking-[0.3em]">
                  {settings.copyright ?? "make/c — © 2025"}
                </p>
                <div className="flex gap-4">
                  {LEGAL_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[9px] text-white/60 uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
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
