import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getCaseStudies } from "@/sanity/lib/getCaseStudies";

export const revalidate = 60;

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <Header />
      <main id="main-content" className="bg-makec-dark min-h-screen text-white pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <WorkGrid caseStudies={caseStudies} />

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
