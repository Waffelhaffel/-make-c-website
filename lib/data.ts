// Sichtbare Links in der Header-Leiste (Figma: Über Uns / Leistungen / Selected Work).
// "Leistungen" zeigt seit 08/2026 wieder auf den Landing-Anker: die Übersichts-
// seite /leistungen ist entfallen (User-Entscheidung — die sechs Leistungen
// stehen auf der Startseite, die Zwischenseite war eine Ebene zu viel).
// Anker-Links werden von getNavHref() in HeaderClient.tsx auf Unterseiten
// automatisch zu "/#anker" umgeschrieben — von einer Detailseite aus führt der
// Link also zurück zur Leistungs-Sektion der Startseite.
export const HEADER_NAV_LINKS = [
  { name: "Über Uns", href: "#team" },
  { name: "Leistungen", href: "#service" },
  { name: "Selected Work", href: "#work" },
];

export const NAV_LINKS = [
  { name: "Approach", href: "#approach" },
  { name: "Leistungen", href: "#service" },
  { name: "Selected Work", href: "#work" },
  // Die id bleibt `#video-check` — sie ist Ziel im Seitenmenü und in e2e/.
  { name: "Video-Strategie-Check", href: "#video-check" },
  { name: "Kontakt", href: "#contact" },
];

export type SelectedWorkItem = {
  name: string;
  /** Genre-Label, ersetzt seit 07/2026 die frühere Jahresangabe */
  label: string;
  image: string;
  /**
   * Slug eines Cases aus `lib/content/cases.ts`. Fehlt der Slug, gibt es (noch)
   * keinen Case — die Kachel wird dann bewusst nicht klickbar gerendert.
   */
  caseSlug?: string;
};

export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    name: "Flughafen Köln Bonn",
    label: "Imagefilm",
    image: "/selected-work/flughafen-koeln-bonn.webp",
    // Bis 12.08.2026 gab es zwei Cases für diesen Kunden: `flughafen-koeln-bonn`
    // (Imagefilm, 2026) und `koeln-bonn-airport` (Content Timelapse, 2020). Der
    // zweite ist mit dem Schnitt bei 2022 entfallen; die Kachel heißt ohnehin
    // „Imagefilm" und zeigte immer auf den ersten.
    caseSlug: "flughafen-koeln-bonn",
  },
  {
    name: "Wund Holding",
    label: "Social Spot",
    image: "/selected-work/wundholding.webp",
    caseSlug: "wundholding",
  },
  {
    name: "BarmeniaGothaer",
    label: "KI Avatar",
    image: "/selected-work/barmenia-gothaer.webp",
    caseSlug: "barmenia-gothaer",
  },
  {
    name: "Merkur Lighthouse",
    label: "Doku",
    image: "/selected-work/merkur.webp",
    caseSlug: "merkur",
  },
  {
    name: "FOM Video",
    label: "Studio bau und Betrieb",
    image: "/selected-work/fom-studio.webp",
    caseSlug: "fom-studio",
  },
  {
    name: "TELEKOM",
    label: "Event Content",
    image: "/selected-work/telekom.webp",
    caseSlug: "telekom",
  },
];

// Hinweis: `FOOTER_CONTENT` lag bis 07/2026 hier und diente als Fallback für
// das Sanity-Dokument `siteSettings`. Die Footer-Angaben stehen jetzt in
// `lib/content/site.ts`, die Adressen kommen von dort aus `ORG` (`lib/seo.ts`).
