import { sanityFetch } from "./fetch";
import { ALL_CASE_STUDIES_QUERY } from "./queries";
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
