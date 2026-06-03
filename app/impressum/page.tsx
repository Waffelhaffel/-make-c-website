import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { LEGAL_PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { LegalPage } from "@/sanity/types";

export const revalidate = 60;

export default async function ImpressumPage() {
  const page = await sanityFetch<LegalPage | null>({
    query: LEGAL_PAGE_BY_SLUG_QUERY,
    params: { slug: "impressum" },
    tags: ["legalPage", "legalPage:impressum"],
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16">
            {page.title}
          </h1>

          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <PortableTextRenderer value={page.body} />
          </div>

          {page.effectiveDate && (
            <p className="mt-16 text-xs uppercase tracking-widest text-zinc-500">
              Stand: {page.effectiveDate}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
