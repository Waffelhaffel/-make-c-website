// Die Kategorien der Referenzen — Quelle für die Filterleiste auf `/work` und
// für das `categories`-Feld der Cases in `./cases.ts`.
//
// Seit 12.08.2026 sind es **genau die sechs Leistungen** von der Startseite
// (User-Entscheidung). Vorher standen hier 14 Kategorien aus der Filterleiste
// der alten Portfolio-Seite (make-c.de/portfolio) — „Erklärvideo", „Imagefilm",
// „Live-Streaming", „Partner für Agenturen" und so weiter. Die haben ein
// zweites, konkurrierendes Vokabular neben den Leistungen aufgemacht: ein
// Besucher, der auf `/#service` „Video Event Content" gelesen hat, fand auf
// `/work` stattdessen „Event & Messe Kommunikation" und „Live-Streaming".
//
// ⚠️ `slug` und Reihenfolge sind bewusst identisch mit `SERVICES`
// (`./services.ts`) und `SERVICE_PAGES` (`lib/leistungen.ts`). Wer dort einen
// Slug ändert, muss ihn hier und in `categories[]` aller Cases mitziehen —
// das prüft kein Typ. `label` trägt hier wie dort das „Video"-Präfix, damit
// Filterchip und Leistungskachel dasselbe Wort zeigen.

export type WorkCategory = {
  /** Technischer Schlüssel, steht in `CaseStudy.categories`. Gleich dem Leistungs-Slug. */
  slug: string;
  /** Sichtbares Label auf dem Filter-Chip und in der Metazeile des Case-Fensters. */
  label: string;
};

export const WORK_CATEGORIES: WorkCategory[] = [
  { slug: "video-strategie", label: "Video Strategie" },
  { slug: "video-produktion", label: "Video Produktion" },
  { slug: "video-motion-design", label: "Video Motion Design" },
  { slug: "event-content", label: "Video Event Content" },
  { slug: "artificial-intelligence", label: "Video AI" },
  { slug: "studiobau", label: "Video Studiobau" },
];
