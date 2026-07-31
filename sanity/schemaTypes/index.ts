import type { SchemaTypeDefinition } from "sanity";

import { caseStudy } from "./documents/caseStudy";
import { ctaSection } from "./objects/ctaSection";
import { galleryItem } from "./objects/galleryItem";
import { headline } from "./objects/headline";
import { mainMedia } from "./objects/mainMedia";
import { projectMeta } from "./objects/projectMeta";
import { seo } from "./objects/seo";
import { solutionSection } from "./objects/solutionSection";

// Sanity verwaltet seit 07/2026 ausschließlich die Case Studies. Die Typen
// `landingPage`, `service`, `siteSettings` und `legalPage` (mit den Objekten
// `location`, `socialLink`, `statItem`, `locationCard`, `testimonial`) sind
// entfernt — dieser Inhalt liegt hartcodiert in `lib/content/` bzw.
// `lib/leistungen.ts`.
//
// ⚠️ Die zugehörigen Dokumente liegen weiterhin im Dataset (bewusste
// Entscheidung: ein entferntes Schema löscht keine Daten). Sie tauchen im Studio
// nicht mehr auf, werden von keiner Query gelesen und kosten zur Laufzeit
// nichts. Wer sie wirklich loswerden will, muss sie explizit löschen.
export const schemaTypes: SchemaTypeDefinition[] = [
  // Document
  caseStudy,
  // Objects
  headline,
  projectMeta,
  mainMedia,
  solutionSection,
  ctaSection,
  galleryItem,
  seo,
];
