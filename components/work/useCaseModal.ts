"use client";

import { useCallback, useState } from "react";
import type { CaseStudy } from "@/lib/content/types";

// Gemeinsamer Open-State für das Case-Modal — von SelectedWork und WorkGrid genutzt,
// damit die Öffnen/Schließen-Logik nicht doppelt liegt.
export function useCaseModal() {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const openCase = useCallback((c: CaseStudy) => setActiveCase(c), []);
  const closeCase = useCallback(() => setActiveCase(null), []);
  return { activeCase, openCase, closeCase };
}
