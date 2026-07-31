import { sanityFetch } from "./fetch";
import { ALL_CASE_STUDIES_QUERY, CASE_STUDIES_BY_SLUGS_QUERY } from "./queries";
import type { CaseStudy } from "../types";

// Case-Content ist Sanity-only (kein Code-Fallback — würde Regel #1 verletzen und
// wäre riesig). Bei fehlender/fehlgeschlagener Konfiguration: leeres Array.
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const data = await sanityFetch<CaseStudy[] | null>({
    query: ALL_CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });
  return data ?? [];
}

/**
 * Die kuratierten Cases einer Leistungsseite, in der Reihenfolge der übergebenen
 * Slugs (GROQ `in` gibt keine stabile Reihenfolge zurück). Fehlende Slugs fallen
 * still raus — die Seite rendert dann eben weniger Kacheln.
 */
export async function getCaseStudiesBySlugs(
  slugs: string[]
): Promise<CaseStudy[]> {
  if (slugs.length === 0) return [];
  const data = await sanityFetch<CaseStudy[] | null>({
    query: CASE_STUDIES_BY_SLUGS_QUERY,
    params: { slugs },
    tags: ["caseStudy"],
  });
  if (!data) return [];
  const bySlug = new Map(data.map((c) => [c.slug, c]));
  return slugs.flatMap((slug) => {
    const doc = bySlug.get(slug);
    return doc ? [doc] : [];
  });
}
