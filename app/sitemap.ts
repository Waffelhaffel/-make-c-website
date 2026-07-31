import type { MetadataRoute } from "next";

import { SERVICE_PAGE_SLUGS, servicePagePath } from "@/lib/leistungen";
import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { NEWEST_CASE_UPDATED_AT_QUERY } from "@/sanity/lib/queries";

/** Verwirft alles, was `new Date()` nicht als gültiges Datum lesen kann. */
function toDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// /studio bleibt bewusst draußen — das ist das eingebettete Sanity-Studio.
//
// `lastModified` trägt nur noch `/work`: dort kommt es aus dem jüngsten
// `caseStudy._updatedAt`. Alle anderen Seiten sind hartcodiert und haben deshalb
// keinen echten Änderungszeitstempel. Früher stand hier überall `new Date()`, also
// die Build-Zeit — damit meldete jeder Deploy alle Seiten als geändert und das
// Signal war wertlos. Das Feld ist optional; kein Datum ist ehrlicher als ein
// erfundenes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newestCase = await sanityFetch<string | null>({
    query: NEWEST_CASE_UPDATED_AT_QUERY,
    tags: ["caseStudy"],
  });

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/leistungen"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/work"),
      lastModified: toDate(newestCase),
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
