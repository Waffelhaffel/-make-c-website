"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import { VideoFacade } from "@/components/work/VideoFacade";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import type { CaseGalleryItem, CaseStudy } from "@/lib/content/types";
import { useFocusTrap } from "./useFocusTrap";

type CaseModalProps = {
  caseData: CaseStudy | null;
  onClose: () => void;
};

const RATIO_ASPECT: Record<CaseGalleryItem["ratio"], string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[4/5]",
  standard: "aspect-[4/3]",
};

const TITLE_ID = "case-modal-title";

export function CaseModal({ caseData, onClose }: CaseModalProps) {
  const isOpen = caseData != null;
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useFocusTrap(cardRef, isOpen);

  // Scroll-Lock (gemeinsamer Zähler mit dem Header-Menü). `body { overflow:
  // hidden }` allein reichte nicht: Lenis scrollt programmatisch und ignoriert
  // es — neben der Karte scrollte der Hintergrund weiter (gemessen y 300→2700).
  // `lockScroll()` stoppt deshalb zusätzlich Lenis; `data-lenis-prevent` am
  // inneren Scroller hält den Inhalt der Karte weiterhin scrollbar.
  //
  // Der Lock hängt an `visible`, nicht an `isOpen`: AnimatePresence lässt
  // Backdrop und Karte für die Ausblend-Animation noch bis zu 0,6 s im DOM
  // stehen. An `isOpen` gehängt war der Lock in dieser Zeit schon weg und der
  // Hintergrund scrollte hinter der noch sichtbaren Karte weg.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);
  useEffect(() => {
    if (!visible) return;
    lockScroll();
    return unlockScroll;
  }, [visible]);

  // Escape schließt (nur registriert, solange offen).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const data = caseData;
  // Ohne eigenes Poster dient das Kachelbild als Standbild.
  const poster = data ? data.poster ?? data.image : null;
  const posterUrl = poster?.src ?? null;
  const videoUrl = data?.video ?? null;
  const secondaryVideos = data?.secondaryVideos ?? [];
  const posterAlt = poster?.alt || `${data?.project ?? "make/c"} Video`;
  const services = data?.services ?? [];
  const credits = data?.credits ?? [];
  const splitAt = Math.ceil(credits.length / 2);
  const gallery = (data?.gallery ?? []).slice(0, 3);

  return createPortal(
    <AnimatePresence onExitComplete={() => setVisible(false)}>
      {isOpen && data && (
        <motion.div
          key="case-backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 md:p-10"
        >
          <motion.div
            key="case-card"
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="relative w-full max-w-[960px] max-h-[92vh] sm:max-h-[85vh] overflow-hidden rounded-2xl bg-makec-dark border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] focus:outline-none"
          >
            {/* Schließen — runder Icon-Button, Projekt-Idiom */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Case schließen"
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-makec-dark/60 text-white transition-colors hover:bg-white hover:text-makec-dark"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Interner Scroll — Lenis-sicher */}
            <div
              data-lenis-prevent
              className="max-h-[92vh] overflow-y-auto overscroll-contain px-6 py-12 sm:max-h-[85vh] md:px-12 md:py-16"
            >
              {/* 1 · Header */}
              <div className="mb-8 pr-12">
                {data.kicker && (
                  <p className="mb-3 font-gotham text-meta uppercase tracking-[0.18em] text-white/60">
                    {data.kicker}
                  </p>
                )}
                <h2
                  id={TITLE_ID}
                  className="font-gotham font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white text-[clamp(2rem,4vw,3.25rem)]"
                >
                  {data.project}
                </h2>
                <p className="mt-3 font-gotham text-meta uppercase tracking-[0.18em] text-white/55">
                  {[data.client, data.year, data.category].filter(Boolean).join(" · ")}
                </p>
              </div>

              {/* 2 · Video (Play nur wenn URL vorhanden; sonst Poster als Bild) */}
              {/* ⚠️ Die Rundung sitzt am Rahmen in `VideoFacade`, nicht an einem
                  Wrapper hier: die Facade rendert unter dem Rahmen den
                  Datenschutz-Hinweis mit, den ein `overflow-hidden` mit
                  einschließen würde. */}
              {(videoUrl || posterUrl) && (
                <div className="mb-10">
                  {videoUrl ? (
                    <VideoFacade videoUrl={videoUrl} posterUrl={posterUrl} alt={posterAlt} />
                  ) : (
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
                      {posterUrl && (
                        <Image
                          src={posterUrl}
                          alt={posterAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 960px) 100vw, 960px"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 3 · Leistungen (Tags) */}
              {services.length > 0 && (
                <div className="mb-10 flex flex-wrap gap-2">
                  {services.map((service, i) => (
                    <span
                      key={`${service}-${i}`}
                      className="rounded-full border border-white/15 px-3 py-1 font-gotham text-meta uppercase tracking-wider text-white/60"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              )}

              {/* 4 · Case-Text */}
              {/* whitespace-pre-line: die Texte aus dem alten Portfolio haben
                  teils zwei Absätze, getrennt durch \n\n in `summary`. */}
              {data.summary && (
                <p className="mb-12 whitespace-pre-line font-gotham font-light leading-[1.62] text-white/80 text-[19px]">
                  {data.summary}
                </p>
              )}

              {/* 4a · Kundenzitat (25.08.2026). Bis dahin standen die drei
                  vorhandenen Zitate im `summary` und waren als Zitat nicht zu
                  erkennen — User-Vorgabe: „müssen auch als solche zu erkennen
                  sein, vllt in einer Box zentriert in der Mitte."
                  ⚠️ Kasten **ohne Radius** und mit `bg-white/[0.035]`: das ist
                  das Zitat-Idiom der Seite (`Testimonials.tsx`), und außer den
                  Pill-Buttons ist auf der Seite kein Kasten gerundet. Das
                  Anführungszeichen ist dekorativ (`aria-hidden`) — der Screen
                  Reader bekommt die Auszeichnung über `<blockquote>`. */}
              {data.quote && (
                <figure className="mb-12 border border-white/10 bg-white/[0.035] px-6 py-10 text-center sm:px-12">
                  {/* ⚠️ `&rdquo;` (das **hohe** Anführungszeichen), nicht das
                      deutsche `&bdquo;`: die Marke ist reine Dekoration über dem
                      Zitat, kein Satzzeichen im Text. Ein tiefstehendes „ säße
                      dort falsch, und eines der drei Zitate ist englisch —
                      deutsche Anführungszeichen wären dort auch inhaltlich
                      daneben. */}
                  <span
                    aria-hidden="true"
                    className="block font-garamond text-[3.5rem] italic leading-none text-white/20"
                  >
                    &rdquo;
                  </span>
                  <blockquote className="mx-auto mt-4 max-w-[46ch] font-gotham font-light leading-[1.6] text-white/85 text-[19px]">
                    {data.quote.text}
                  </blockquote>
                  <figcaption className="mt-7 font-gotham text-meta">
                    <span className="block font-semibold text-white/85">{data.quote.author}</span>
                    {data.quote.role && (
                      <span className="mt-1 block text-white/45">{data.quote.role}</span>
                    )}
                  </figcaption>
                </figure>
              )}

              {/* 4b · Weitere Videos zum selben Case (z. B. Merkur: Imagefilm
                  oben, ein Produktvideo hier). Ohne Hauptvideo bewusst nichts —
                  dann fehlte oben der Film, zu dem diese hier die Ergänzung sind. */}
              {videoUrl && secondaryVideos.length > 0 && (
                <div className="mb-12">
                  <p className="mb-4 font-gotham text-meta uppercase tracking-[0.18em] text-white/60">
                    {secondaryVideos.length === 1 ? "Weiteres Video" : "Weitere Videos"}
                  </p>
                  <div className="flex flex-col gap-8">
                    {secondaryVideos.map((v, i) => (
                      <VideoFacade
                        key={v.url}
                        videoUrl={v.url}
                        posterUrl={v.poster?.src ?? null}
                        alt={v.poster?.alt || `${data.project} — Video ${i + 2}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 5 · Credits (2 Spalten) */}
              {credits.length > 0 && (
                <div className="mb-12 border-t border-white/15 pt-8">
                  <p className="mb-4 font-gotham text-meta uppercase tracking-[0.18em] text-white/60">
                    Credits
                  </p>
                  <div className="grid grid-cols-1 gap-x-16 md:grid-cols-2">
                    {[credits.slice(0, splitAt), credits.slice(splitAt)].map((col, ci) => (
                      <div key={ci}>
                        {col.map((c) => (
                          <div
                            key={`${c.role}-${c.name}`}
                            className="flex items-baseline justify-between gap-5 border-t border-white/15 py-4"
                          >
                            <span className="font-gotham text-sm text-white/55">{c.role}</span>
                            <span className="text-right font-gotham text-white text-[15px]">
                              {c.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6 · Produktionsbilder (≤3, ratio-aware) */}
              {gallery.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gallery.map((g, i) => {
                    // Bei drei Bildern läuft das erste über beide Spalten und
                    // ist dann rund 860 px breit, nicht 480. Mit der schmalen
                    // Angabe holte next/image die 480-px-Variante und zog sie
                    // auf die doppelte Breite — auf 1x-Displays sichtbar weich.
                    const full = gallery.length === 3 && i === 0;
                    return (
                      <div
                        key={g.src}
                        className={`relative overflow-hidden rounded-lg bg-white/5 ${
                          RATIO_ASPECT[g.ratio] ?? "aspect-[4/3]"
                        } ${full ? "sm:col-span-2" : ""}`}
                      >
                        <Image
                          src={g.src}
                          alt={g.alt || `${data.project} Still ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes={`(max-width: 640px) 100vw, ${full ? "864px" : "480px"}`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
