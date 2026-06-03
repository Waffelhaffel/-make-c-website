import { notFound } from "next/navigation";
import Image from "next/image";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VideoProductionPage } from "@/components/sections/VideoProductionPage";
import {
  getServiceBySlug,
  getServiceSlugs,
} from "@/sanity/lib/getServices";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { Service } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      {service.slug === "video-produktion" ? (
        <VideoProductionPage service={service} />
      ) : (
        <GenericServicePage service={service} />
      )}
      <Footer />
    </>
  );
}

function GenericServicePage({ service }: { service: Service }) {
  const heroImage = hasImageAsset(service.heroImage)
    ? urlFor(service.heroImage).width(1400).quality(85).auto("format").url()
    : null;

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 leading-tight uppercase">
                {service.headline ?? service.displayTitle ?? service.title}
              </h1>
            </div>
          </div>

          <div className="w-full aspect-video md:aspect-[4/3] bg-zinc-800 rounded-3xl relative overflow-hidden group">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={service.heroImage?.alt ?? `${service.title} Hero`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zinc-500 font-medium text-lg uppercase tracking-widest group-hover:scale-110 transition-transform">
                  Video / Image
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="flex flex-col gap-8">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              {service.description}
            </p>
            {service.keywords && (
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm text-gray-500 font-mono tracking-tight">
                  {service.keywords}
                </p>
              </div>
            )}
          </div>

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

        {service.referenceVideoUrl && (
          <ReferenceVideoEmbed url={service.referenceVideoUrl} />
        )}
      </div>
    </main>
  );
}

function ReferenceVideoEmbed({ url }: { url: string }) {
  const lower = url.toLowerCase();
  const vimeoMatch = lower.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const ytMatch = lower.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
  );
  const embedSrc = vimeoMatch
    ? `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`
    : ytMatch
      ? `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`
      : null;

  return (
    <div className="mt-24">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">
        Referenz-Video
      </p>
      <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border border-white/10">
        {embedSrc ? (
          <iframe
            src={embedSrc}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Referenz-Video"
          />
        ) : (
          <video
            src={url}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
