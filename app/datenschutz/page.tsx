import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { DATENSCHUTZ } from "@/lib/content/legal";
import { pageMetadata } from "@/lib/seo";

// Kein `revalidate` und kein `notFound()` mehr — Begründung siehe
// app/impressum/page.tsx.

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description: "Datenschutzerklärung von make/c.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  const page = DATENSCHUTZ;

  return (
    <>
      <Header />
      <main id="main-content" className="bg-makec-dark text-white min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-gotham text-h2 uppercase text-white mb-16">
            {page.title}
          </h1>

          <div className="space-y-4 font-gotham text-white/70 leading-relaxed">
            <PortableTextRenderer value={page.body} />
          </div>

          {page.effectiveDate && (
            <p className="mt-16 font-gotham text-meta uppercase tracking-widest text-white/60">
              Stand: {page.effectiveDate}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
