import { SERVICES } from "@/lib/data";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = SERVICES.find((s) => s.id === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
            {/* Left Column: Headline */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 leading-tight uppercase">
                  {service.headline}
                </h1>
              </div>
            </div>

            {/* Right Column: Main Image Placeholder */}
            <div className="w-full aspect-video md:aspect-[4/3] bg-zinc-800 rounded-3xl flex items-center justify-center relative overflow-hidden group">
              <span className="text-zinc-500 font-medium text-lg uppercase tracking-widest group-hover:scale-110 transition-transform">
                Video / Image
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Description & Keywords */}
            <div className="flex flex-col gap-8">
              <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                {service.description}
              </p>
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm text-gray-500 font-mono tracking-tight">
                  {service.keywords}
                </p>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="flex flex-col justify-end items-start md:items-end">
              <div className="text-left md:text-right">
                <h3 className="text-5xl md:text-6xl font-bold uppercase mb-4 leading-none">
                  GET IN
                  <br />
                  TOUCH
                </h3>
                <a
                  href="mailto:pz@make-c.de"
                  className="text-xl font-medium text-gray-400 hover:text-white transition-colors"
                >
                  pz@make-c.de
                </a>
              </div>
            </div>
          </div>

          {/* Behind the scenes placeholder */}
          <div className="mt-24 max-w-sm">
            <div className="w-full aspect-[3/2] bg-zinc-800/50 rounded-xl flex items-center justify-center mb-2">
              <span className="text-zinc-600 text-xs uppercase tracking-widest">
                Foto
              </span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              Behind the scenes
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}










