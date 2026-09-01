import type { Service } from "./types";

// Die sechs Leistungs-Kacheln auf der Startseite (Anker `#service`) —
// hartcodiert (siehe CLAUDE.md, Regel 1). Die frühere Übersichtsseite
// `/leistungen` ist 08/2026 entfallen.
//
// Bis 07/2026 lagen sie als `service`-Dokumente in Sanity. Von den gepflegten
// Feldern erreichte allerdings nur `heroImage`, `displayTitle`, `slug` und
// `ctaText` je das DOM; `description`, `detailText`, `externalLink` und
// `buttonText` waren im Studio schon mit „⚠️ wird derzeit NICHT gerendert"
// markiert und sind beim Umzug entfallen. Der Seitentext der Leistungen steht
// unverändert in `lib/leistungen.ts`.
//
// ⚠️ `slug` muss zu einem Eintrag in `SERVICE_PAGES` (`lib/leistungen.ts`)
// passen, sonst verlinkt die Kachel auf eine 404. Die drei `video-*`-Präfixe
// sind gewollt inkonsistent gelassen.
//
// ⚠️ **Eine Ausnahme, seit 01.09.2026:** `artificial-intelligence` hat keinen
// Eintrag in `SERVICE_PAGES` und damit keine Detailseite — die Kachel verlinkt
// über `externalUrl` nach `make-ai.de`. Die Liste hier bleibt trotzdem
// sechsteilig, `SERVICE_PAGES` ist fünfteilig. Das ist gewollt und der einzige
// Punkt, an dem die beiden Listen auseinanderlaufen dürfen.
//
// ⚠️ Die Grafiken sind handgezeichnete Platzhalter (Magnific, weiße
// Marker-Linien auf #14140F). Austauschen = Datei unter demselben Pfad ersetzen.

/** Einheitliches CTA-Label aller Kacheln. War ein CMS-Feld mit identischem Wert in allen 6 Dokumenten. */
export const SERVICE_CTA_TEXT = "Mehr erfahren";

export const SERVICES: Service[] = [
  {
    slug: "video-strategie",
    title: "Video Strategie",
    image: {
      src: "/leistungen/video-strategie.png",
      alt: "Handgezeichnete Illustration: Video Strategie",
    },
  },
  {
    slug: "video-produktion",
    title: "Video Produktion",
    image: {
      src: "/leistungen/video-produktion.png",
      alt: "Handgezeichnete Illustration: Video Produktion",
    },
  },
  {
    slug: "video-motion-design",
    title: "Video Motion Design",
    image: {
      src: "/leistungen/video-motion-design.png",
      alt: "Handgezeichnete Illustration: Video Motion Design",
    },
  },
  {
    slug: "event-content",
    title: "Video Event Content",
    image: {
      src: "/leistungen/event-content.png",
      alt: "Handgezeichnete Illustration: Video Event Content",
    },
  },
  // ⚠️ **Die einzige Leistung ohne Detailseite** (User-Entscheidung 01.09.2026):
  // die Kachel führt nach `make-ai.de`, `/leistungen/artificial-intelligence`
  // ist entfallen und liefert eine 404. Deshalb steht hier — anders als bei den
  // fünf anderen — der Loop-Pfad direkt am Eintrag: es gibt keinen Gegenpart in
  // `SERVICE_PAGES`, aus dem `ServiceList` ihn holen könnte. Den Text der
  // früheren Seite liefert `git show` auf `lib/leistungen.ts` vom 31.08.2026.
  {
    slug: "artificial-intelligence",
    title: "Video AI",
    externalUrl: "https://make-ai.de",
    loopVideo: "/leistungen-loops/artificial-intelligence.mp4",
    image: {
      src: "/leistungen/artificial-intelligence.png",
      alt: "Handgezeichnete Illustration: Video AI",
    },
  },
  {
    slug: "studiobau",
    title: "Video Studiobau",
    image: {
      src: "/leistungen/studiobau.png",
      alt: "Handgezeichnete Illustration: Video Studiobau",
    },
  },
];

/** Einzelne Leistung für `/leistungen/[slug]` (dort wird nur `image` gebraucht). */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
