import Image from "next/image";
import Link from "next/link";

import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { CaseStudy, SanityImage } from "@/sanity/types";

type CaseStudyPageProps = {
  data: CaseStudy;
};

function sanityImageUrl(image: SanityImage, width: number) {
  return urlFor(image).width(width).auto("format").quality(80).url();
}

function altFor(image: SanityImage | null | undefined, fallback: string) {
  return image?.alt && image.alt.trim().length > 0 ? image.alt : fallback;
}

/**
 * Renders a Sanity image as a `fill` <Image>, or a neutral placeholder when the
 * asset is missing (e.g. directly after swapping the image in Sanity).
 */
function CaseImage({
  image,
  alt,
  width,
  sizes,
  priority = false,
  className = "object-cover",
}: {
  image: SanityImage | null | undefined;
  alt: string;
  width: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!hasImageAsset(image)) {
    return <div className="absolute inset-0 bg-white/5" aria-hidden />;
  }

  return (
    <Image
      src={sanityImageUrl(image, width)}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
    />
  );
}

export function CaseStudyPage({ data }: CaseStudyPageProps) {
  const client = data.projectMeta.client;
  const studioLabel = data.projectMeta.studio ?? "";
  const solutionFooterLabel = data.solution.footerLabel ?? studioLabel;

  const mainVideoHref = data.mainMedia.videoUrl ?? null;

  return (
    <main className="bg-[#05060B] text-white">
      <section className="relative isolate overflow-hidden pt-20 md:pt-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="relative aspect-[16/12] overflow-hidden md:aspect-[16/10]">
            <CaseImage
              image={data.heroImage}
              alt={altFor(data.heroImage, `${client} Hero Visual`)}
              width={2000}
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.34)_45%,rgba(0,0,0,0.85)_82%,#05060B_100%)]" />
            <div className="absolute bottom-6 left-5 right-5 text-center md:bottom-10 md:left-12 md:right-12">
              <p className="font-garamond text-4xl font-semibold italic text-white md:text-6xl">{data.headline.lead}</p>
              <h1 className="mt-1 text-5xl font-black uppercase italic leading-[0.88] tracking-[-0.03em] text-white md:text-8xl lg:text-[7rem]">
                {data.headline.impact}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-12 md:pt-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-12 md:px-12">
          <div className="relative aspect-[16/10] overflow-hidden border border-white/10 md:col-span-6">
            <CaseImage
              image={data.solution.imageLeft}
              alt={altFor(data.solution.imageLeft, "Das Projekt Visual")}
              width={1200}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.15),rgba(0,0,0,0.45))]" />
          </div>
          <div className="space-y-5 md:col-span-6 md:pt-2">
            <h2 className="text-4xl font-black italic leading-none tracking-tight md:text-5xl">
              <span className="text-white">das </span>
              <span className="font-garamond text-[#2C2CC6]">Projekt.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/72 md:text-base">{data.summary}</p>
            <div className="grid grid-cols-2 gap-5 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.2em] text-white/55">
              <div>
                <p>Kunde</p>
                <p className="mt-2 text-xs text-white/85 md:text-sm">{client}</p>
              </div>
              <div>
                <p>Jahr</p>
                <p className="mt-2 text-xs text-white/85 md:text-sm">{data.projectMeta.year}</p>
              </div>
              <div>
                <p>Kategorie</p>
                <p className="mt-2 text-xs text-white/85 md:text-sm">{data.projectMeta.category}</p>
              </div>
              {studioLabel && (
                <div>
                  <p>Studio</p>
                  <p className="mt-2 text-xs text-white/85 md:text-sm">{studioLabel}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="pointer-events-none absolute bottom-2 right-2 hidden h-[280px] w-[280px] bg-[radial-gradient(circle_at_center,rgba(44,44,198,0.2),transparent_65%)] md:block" />
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="relative bg-[#1726FF] p-4 md:p-7">
            <div className="grid items-center gap-6 md:grid-cols-12">
              <MainVideoFrame
                href={mainVideoHref}
                image={data.mainMedia.posterImage}
                imageAlt={altFor(data.mainMedia.posterImage, `${client} Main Video Vorschau`)}
              />
              <div className="relative md:col-span-3 md:-ml-3">
                <p className="text-5xl font-black uppercase italic leading-[0.8] tracking-tight text-white md:text-6xl">
                  MAIN
                  <br />
                  VIDEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 pt-8 md:pt-10">
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-white/10" />
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mx-auto mb-8 hidden w-[240px] md:block">
            <svg viewBox="0 0 240 36" className="h-auto w-full text-white/90" fill="none" aria-hidden="true">
              <path
                d="M4 26C20 5 36 5 52 26C68 5 84 5 100 26C116 5 132 5 148 26C164 5 180 5 196 26C212 5 228 5 236 16"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                <CaseImage
                  image={data.solution.imageLeft}
                  alt={altFor(data.solution.imageLeft, "Solution Visual")}
                  width={1200}
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
              </div>
              <div className="mt-8 max-w-md">
                <h3 className="text-5xl font-black italic leading-none tracking-tight md:text-6xl">
                  <SolutionHeading heading={data.solution.heading} />
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{data.solution.body}</p>
                <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/45">
                  <span>Projekt.</span>
                  {solutionFooterLabel && <span>{solutionFooterLabel}</span>}
                </div>
              </div>
            </div>
            <div className="md:col-span-6 md:pb-4">
              <div className="relative ml-auto aspect-[16/10] w-full max-w-[430px] overflow-hidden border border-white/10">
                <CaseImage
                  image={data.solution.imageRight}
                  alt={altFor(data.solution.imageRight, "Solution Detail")}
                  width={900}
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 bg-[#EFEFEF] text-black">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-garamond text-5xl font-semibold italic leading-[0.9] md:text-7xl">{data.cta.title}</p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/75 md:text-base">{data.cta.text}</p>
              <a
                href={`mailto:${data.cta.mail}`}
                className="mt-6 inline-block border-b border-black/70 pb-1 text-lg text-black transition-opacity hover:opacity-65"
              >
                {data.cta.mail}
              </a>
            </div>
            <div className="space-y-3 text-xs uppercase tracking-[0.2em] text-black/65 md:text-right">
              <p>Köln</p>
              <p>Essen</p>
              <div className="pt-6">
                <Link href="/impressum" className="mr-5 hover:text-black">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="hover:text-black">
                  Datenschutz
                </Link>
              </div>
              <p className="pt-8 text-[11px] tracking-[0.25em] text-black/50">make/c — 2026</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MainVideoFrame({
  href,
  image,
  imageAlt,
}: {
  href: string | null;
  image: SanityImage | null | undefined;
  imageAlt: string;
}) {
  const content = (
    <>
      <CaseImage
        image={image}
        alt={imageAlt}
        width={1600}
        sizes="(max-width: 768px) 100vw, 70vw"
      />
      <div className="absolute inset-0 bg-black/30" />
      <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xs font-bold text-black transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20 md:text-sm">
        ▶
      </span>
    </>
  );

  const className =
    "group relative aspect-[16/10] overflow-hidden border border-black/40 md:col-span-9";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function SolutionHeading({ heading }: { heading: string }) {
  const trimmed = heading.trim();
  const lastSpace = trimmed.lastIndexOf(" ");

  if (lastSpace === -1) {
    return <span className="font-garamond text-[#2C2CC6]">{trimmed}</span>;
  }

  const leading = trimmed.slice(0, lastSpace + 1);
  const accent = trimmed.slice(lastSpace + 1);

  return (
    <>
      <span className="text-white">{leading}</span>
      <span className="font-garamond text-[#2C2CC6]">{accent}</span>
    </>
  );
}
