import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SELECTED_WORK } from "@/lib/data";

export async function generateStaticParams() {
  return SELECTED_WORK.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = SELECTED_WORK.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Case Study
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase">
                {project.name}
              </h1>
              <p className="text-sm text-gray-400 mt-2">{project.year}</p>
            </div>
            <Link
              href="#contact"
              className="text-sm font-medium uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors"
            >
              Projekt anfragen
            </Link>
          </div>

          <div className="w-full aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative">
            <Image
              src={project.image}
              alt={project.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-200 leading-relaxed">
                Hochwertige Bewegtbild-Produktion mit klarem Storytelling und cineastischem Look.
                Wir kombinieren Konzept, Dreh und Postproduktion inhouse, damit die Kampagne
                kanalübergreifend funktioniert.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Deliverables: Hauptfilm, Social Cuts, Stills. Format-Adaptionen für Instagram,
                TikTok, YouTube und Paid. Produktion in 2024/2025.
              </p>
            </div>
            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Format</p>
                <p className="text-sm text-gray-200">Imagefilm / Campaign</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Services</p>
                <p className="text-sm text-gray-200">
                  Strategie, Kreation, Produktion, Postproduktion, Social Adaptions
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Kunde</p>
                <p className="text-sm text-gray-200">{project.name}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}








