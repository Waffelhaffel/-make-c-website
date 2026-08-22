"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import type { CaseStudy } from "@/lib/content/types";
import { WORK_CATEGORIES } from "@/lib/content/workCategories";
import { CaseModal } from "@/components/work/CaseModal";
import { useCaseModal } from "@/components/work/useCaseModal";

type WorkGridProps = {
  caseStudies: CaseStudy[];
};

const ALL = "*";

/**
 * So viele Kacheln werden ohne Einblend-Animation gerendert — sie sollen im
 * ersten Bild stehen und nicht an der Hydration hängen.
 *
 * 12, nicht 8: bei vier Spalten reicht das dritte Kachelreihe ab einer
 * Viewport-Höhe von rund 1200 px ins Bild (gemessen: 1024 px breit ab 1205 px
 * Höhe, 1440 px ab 1393 px). Auf einem iPad Pro im Hochformat (1024×1366)
 * schnitten mit 8 vier leere Kacheln ins erste Bild. Zwölf decken drei
 * Vierer-, vier Dreier- und sechs Zweierreihen ab.
 */
const ABOVE_THE_FOLD = 12;

export function WorkGrid({ caseStudies }: WorkGridProps) {
  const { activeCase, openCase, closeCase } = useCaseModal();
  const [active, setActive] = useState<string>(ALL);

  // Nur Kategorien anbieten, die tatsächlich belegt sind — ein Filter, der auf
  // eine leere Liste führt, ist eine Sackgasse. Reihenfolge kommt aus
  // WORK_CATEGORIES, nicht aus dem Vorkommen, damit sie stabil bleibt.
  const categories = useMemo(() => {
    const used = new Set(caseStudies.flatMap((c) => c.categories));
    return WORK_CATEGORIES.filter((c) => used.has(c.slug));
  }, [caseStudies]);

  const visible = useMemo(
    () =>
      active === ALL
        ? caseStudies
        : caseStudies.filter((c) => c.categories.includes(active)),
    [caseStudies, active]
  );

  return (
    <>
      {/* Kein motion-Wrapper: framer-motion schreibt `initial` als Inline-Style
          schon ins statische HTML. Die Seitenüberschrift hing dadurch an der
          Hydration und war bis dahin unsichtbar. */}
      <div className="mb-12 md:mb-16">
        <h1 className="font-gotham text-h2 uppercase text-white">Referenzen</h1>
        <p className="font-gotham text-meta text-white/60 mt-4 tracking-widest uppercase">
          Portfolio
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-10 md:mb-14">
          <div
            role="group"
            aria-label="Referenzen nach Kategorie filtern"
            className="flex flex-wrap gap-2"
          >
            <FilterChip
              label="Alle"
              active={active === ALL}
              onClick={() => setActive(ALL)}
            />
            {categories.map((c) => (
              <FilterChip
                key={c.slug}
                label={c.label}
                active={active === c.slug}
                onClick={() => setActive(c.slug)}
              />
            ))}
          </div>
          <p aria-live="polite" className="mt-4 font-gotham text-meta text-white/45">
            {visible.length} {visible.length === 1 ? "Projekt" : "Projekte"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {visible.map((item, i) => (
          <motion.div
            key={item.slug}
            // `initial={false}` = kein Inline-`opacity:0` im statischen HTML.
            // Die oberen Kacheln stehen damit sofort da, statt erst nach
            // Hydration + IntersectionObserver + Stagger (gemessen: 1,15 s).
            // Acht Stück, weil das Raster responsiv ist (2/3/4 Spalten) — das
            // deckt oberhalb des Falzes jede Breite ab, nicht nur Desktop.
            initial={i < ABOVE_THE_FOLD ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i < ABOVE_THE_FOLD ? 0 : Math.min((i - ABOVE_THE_FOLD) * 0.04, 0.4),
            }}
            className="group relative"
          >
            <button
              type="button"
              onClick={() => openCase(item)}
              data-cursor="VIEW"
              className="block w-full text-left aspect-[4/5] bg-white/5 border border-white/5 rounded-sm overflow-hidden relative"
            >
              {/* Die erste Reihe stellt den LCP: `priority` erzeugt dafür ein
                  <link rel="preload"> im <head>. Die übrigen Kacheln laden
                  nativ per loading="lazy" — nicht "erst nach der Hydration",
                  wie hier früher stand. */}
              <Image
                src={item.image.src}
                alt={item.image.alt || item.client}
                fill
                priority={i < 4}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              {/* `right-0`: ohne rechte Kante ist der Kasten so breit wie sein
                  längster Text und schiebt ihn aus der Kachel — bei zwei Spalten
                  auf 320 px lief „Bundesgartenschau 2023" 20 px über den Rand.
                  Mit Kante bricht die Zeile stattdessen um. */}
              {/* `hyphens-auto` (nutzt das lang="de" am <html>): bei zwei Spalten
                  auf 320 px ist die Textspalte nur 96 px breit, „Bundesgartenschau"
                  misst dort 141 px und kann als ein Wort nicht umbrechen. Ohne
                  Trennung stünde es über der Nachbarkachel. Ab sm ist die Spalte
                  breit genug, dann trennt der Browser von sich aus nichts.
                  ⚠️ Dazu `hyphenate-limit-chars: 10 4 4` (22.08.2026): das
                  `lang="de"` legt **deutsche** Trennregeln auch über englische
                  Wörter, und die kurzen trifft es am härtesten — „Social Media
                  Spot" brach als „SOCI-AL". Mit der Untergrenze von zehn Zeichen
                  bleiben kurze Wörter ganz, „Bundesgartenschau" (17) wird
                  weiterhin getrennt. Wo die Eigenschaft fehlt (ältere Firefox),
                  gilt schlicht das bisherige Verhalten. */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 hyphens-auto [hyphenate-limit-chars:10_4_4]">
                <p className="font-gotham text-[10px] text-white/70 uppercase tracking-widest mb-1">
                  {item.client} · {item.year}
                </p>
                {/* h2, nicht h3: auf /work stehen die Kacheln direkt unter
                    der h1 „Referenzen" — es gibt keine Zwischenebene, ein h3
                    wäre eine Lücke in der Hierarchie. */}
                <h2 className="font-gotham text-xs sm:text-sm uppercase tracking-tight leading-tight">
                  {item.project}
                </h2>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-center text-white/50 text-sm mt-20">
          Zu dieser Kategorie gibt es noch keine Referenz.
        </p>
      )}

      <CaseModal caseData={activeCase} onClose={closeCase} />
    </>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

// Pillen-Form wie die Leistungs-Tags im Case-Fenster, damit /work kein eigenes
// Formenvokabular bekommt.
function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 font-gotham text-meta uppercase tracking-wider transition-colors ${
        active
          ? "border-makec-blue bg-makec-blue text-white"
          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
