import type { MetadataRoute } from "next";

import { SERVICE_PAGE_SLUGS, servicePagePath } from "@/lib/leistungen";
import { absoluteUrl } from "@/lib/seo";

// Kein `lastModified` mehr: seit 08/2026 liegt der gesamte Inhalt hartcodiert im
// Repo, es gibt also keinen echten Änderungszeitstempel — bis dahin kam der für
// `/work` aus dem jüngsten `caseStudy._updatedAt` in Sanity. Davor stand hier
// überall `new Date()`, also die Build-Zeit: damit meldete jeder Deploy alle
// Seiten als geändert und das Signal war wertlos. Das Feld ist optional; kein
// Datum ist ehrlicher als ein erfundenes.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Kein Eintrag für /leistungen mehr: die Übersichtsseite ist 08/2026
    // entfallen, die sechs Leistungen stehen auf der Startseite. Die Route
    // leitet nur noch auf /#service weiter (next.config.ts).
    {
      url: absoluteUrl("/work"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/impressum"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/datenschutz"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Ohne lastModified: der Text dieser Seiten liegt hartcodiert in
  // lib/leistungen.ts, es gibt also keinen echten Änderungszeitstempel.
  const serviceEntries: MetadataRoute.Sitemap = SERVICE_PAGE_SLUGS.map((slug) => ({
    url: absoluteUrl(servicePagePath(slug)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...serviceEntries];
}
