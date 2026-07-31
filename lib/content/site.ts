import { ORG } from "@/lib/seo";
import type { SiteSettings } from "./types";

// Site-weite Angaben für Header und Footer — hartcodiert
// (siehe CLAUDE.md, Regel 1).
//
// Bis 07/2026 kamen sie aus dem Sanity-Singleton `siteSettings`, gelesen von
// `getSiteSettings()` — und zwar in `Header` **und** `Footer`, also mit zwei
// CMS-Requests pro Seitenrendering, auch auf Routen ohne jeden CMS-Inhalt.
//
// NAP-Daten (Name/Adresse) werden aus `ORG` in `lib/seo.ts` abgeleitet statt
// erneut getippt: dort stehen sie mit Geo-Koordinaten für die JSON-LD, und die
// frühere Doppelpflege („bei Änderung beide Stellen anfassen") war als
// Fallstrick vermerkt. Adresse also nur noch in `lib/seo.ts` ändern.

export const SITE: SiteSettings = {
  email: ORG.email,

  // "Köln" → "KÖLN" / ["Picassoplatz 1", "50679 Köln"] — das Format, das der
  // Footer schon rendert.
  locations: ORG.locations.map((loc) => ({
    city: loc.city.toUpperCase(),
    address: [loc.street, `${loc.postalCode} ${loc.city}`],
  })),

  // Ohne `url` rendert `Footer.tsx` ein <span> statt eines Links.
  // ⚠️ Instagram-URL fehlt noch — bis dahin bleibt das Label bewusst
  // nicht klickbar, statt auf ein Profil zu raten.
  socials: [
    { label: "INSTAGRAM" },
    { label: "LINKEDIN", url: ORG.linkedin },
  ],

  footerHeadline: {
    lineOne: "LET'S",
    lineTwo: "TALK",
  },

  copyright: "make/c — © 2026",
};
