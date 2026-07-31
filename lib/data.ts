// Sichtbare Links in der Header-Leiste (Figma: Über Uns / Leistungen / Selected Work).
// "Leistungen" zeigt seit den Detailseiten auf die eigene Route statt auf den
// Landing-Anker — Anker-Links werden von getNavHref() in HeaderClient.tsx auf
// Unterseiten automatisch zu "/#anker" umgeschrieben, Routen bleiben unverändert.
export const HEADER_NAV_LINKS = [
  { name: "Über Uns", href: "#team" },
  { name: "Leistungen", href: "/leistungen" },
  { name: "Selected Work", href: "#work" },
];

export const NAV_LINKS = [
  { name: "Approach", href: "#approach" },
  { name: "Leistungen", href: "/leistungen" },
  { name: "Selected Work", href: "#work" },
  { name: "Video-Check", href: "#video-check" },
  { name: "Kontakt", href: "#contact" },
];

export type SelectedWorkItem = {
  name: string;
  /** Genre-Label, ersetzt seit 07/2026 die frühere Jahresangabe */
  label: string;
  image: string;
  /**
   * Slug des zugehörigen caseStudy-Dokuments in Sanity. Fehlt der Slug, gibt es
   * (noch) keinen Case — die Kachel wird dann bewusst nicht klickbar gerendert.
   */
  caseSlug?: string;
};

export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    name: "Flughafen Köln Bonn",
    label: "Imagefilm",
    image: "/Selected Work/Flughafen_Bild.webp",
    caseSlug: "koeln-bonn-airport",
  },
  {
    name: "Wund Holding",
    label: "SocialSpot",
    image: "/Selected Work/Wundholding_Bild.webp",
    caseSlug: "wundholding",
  },
  {
    name: "BarmeniaGothaer",
    label: "KI Avatar",
    image: "/Selected Work/BarmeniaGothaer_Bild.png",
  },
  {
    name: "Merkur Lighthouse",
    label: "Doku",
    image: "/Selected Work/Merkur_Bild.webp",
    caseSlug: "merkur",
  },
  {
    name: "FOM Video",
    label: "Studio bau und Betrieb",
    image: "/Selected Work/FOM_Bild.png",
  },
  {
    name: "TELEKOM",
    label: "Event Content",
    image: "/Selected Work/Telekom_Bild.png",
  },
];

// Hinweis: `FOOTER_CONTENT` lag bis 07/2026 hier und diente als Fallback für
// das Sanity-Dokument `siteSettings`. Die Footer-Angaben stehen jetzt in
// `lib/content/site.ts`, die Adressen kommen von dort aus `ORG` (`lib/seo.ts`).
