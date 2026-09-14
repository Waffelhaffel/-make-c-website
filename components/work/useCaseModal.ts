"use client";

import { useCallback, useEffect, useState } from "react";
import type { CaseStudy } from "@/lib/content/types";

/**
 * Entfernt `?case=` aus der Adresszeile, ohne eine Next-Navigation auszulösen.
 *
 * Bewusst `history.replaceState` und nicht `router.replace`: Letzteres ist eine
 * Navigation und zöge das Einfrieren/Neuvermessen von Lenis in `SmoothScroll`
 * nach sich. `replaceState` feuert kein `popstate`, berührt weder Router noch
 * Scrollposition — die Zuständigkeiten aus CLAUDE.md bleiben, wo sie sind.
 */
function clearCaseParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("case")) return;
  url.searchParams.delete("case");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

/**
 * Gemeinsamer Open-State für das Case-Modal — von SelectedWork, WorkGrid und
 * ServiceCases genutzt, damit die Öffnen/Schließen-Logik nicht doppelt liegt.
 *
 * `deepLinkCases` ist optional und schaltet die Auswertung von `?case=<slug>`
 * frei: die alten `/portfolio/<slug>/`-Adressen der WordPress-Seite leiten
 * dorthin um (siehe `redirects()` in `next.config.ts`), damit wer aus Google
 * kommt direkt das gesuchte Projekt sieht. **Nur `WorkGrid` übergibt etwas** —
 * auf der Startseite und den Leistungsseiten soll `?case=` nichts öffnen.
 *
 * Gelesen wird über `window.location.search`, nicht über `useSearchParams()`:
 * Letzteres zwingt eine statische Route in eine `<Suspense>`-Grenze oder ins
 * Client-Rendering. `/work` ist voll statisch und soll es bleiben. Der Effekt
 * läuft ohnehin erst nach der Hydration, es geht also nichts verloren.
 */
export function useCaseModal(deepLinkCases?: CaseStudy[]) {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const openCase = useCallback((c: CaseStudy) => setActiveCase(c), []);
  const closeCase = useCallback(() => {
    if (deepLinkCases) clearCaseParam();
    setActiveCase(null);
  }, [deepLinkCases]);

  useEffect(() => {
    if (!deepLinkCases) return;
    const slug = new URLSearchParams(window.location.search).get("case");
    if (!slug) return;
    const found = deepLinkCases.find((c) => c.slug === slug);
    // Unbekannter Slug: kein Fenster, aber die Adresse aufräumen. Das ist der
    // Normalfall für die gestrichenen Projekte vor 2022 — sie haben keinen Case
    // mehr, ihre Alt-URL landet trotzdem hier.
    if (found) setActiveCase(found);
    else clearCaseParam();
  }, [deepLinkCases]);

  return { activeCase, openCase, closeCase };
}
