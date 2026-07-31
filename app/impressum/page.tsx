import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { IMPRESSUM } from "@/lib/content/legal";
import { pageMetadata } from "@/lib/seo";

// Kein `revalidate` und kein `notFound()` mehr: der Text liegt im Code. Bis
// 07/2026 kam er aus Sanity und die Seite antwortete mit 404, sobald der Fetch
// `null` lieferte — also auch bei fehlenden Env-Variablen. Für eine Seite mit
// Impressumspflicht war das kein tragbares Ausfallverhalten.

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von make/c.",
  path: "/impressum",
});

export default function ImpressumPage() {
  const page = IMPRESSUM;

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
