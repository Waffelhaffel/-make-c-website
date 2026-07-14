import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ALL_CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { CaseStudySummary } from "@/sanity/types";

export const revalidate = 60;

export default async function WorkPage() {
  const caseStudies = await sanityFetch<CaseStudySummary[]>({
    query: ALL_CASE_STUDIES_QUERY,
    tags: ["caseStudy"],
  });

  return (
    <>
      <Header />
      <main id="main-content" className="bg-makec-dark min-h-screen text-white pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <WorkGrid caseStudies={caseStudies ?? []} />

          <div className="mt-24 flex justify-center">
            <Link
              href="/"
              className="font-gotham text-small uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
