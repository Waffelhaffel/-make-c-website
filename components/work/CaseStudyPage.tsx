import Image from "next/image";

import { Swoosh } from "@/components/ui/Swoosh";
import { SquiggleUnderline } from "@/components/ui/SquiggleUnderline";
import { VideoFacade } from "@/components/work/VideoFacade";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { CaseStudy, SanityImage } from "@/sanity/types";

// Case-Study-Detailseite nach Design "MERKUR Variante 1a (Editorial Grid)":
// ruhige, leichte Editorial-Typo (font-normal + Garamond-Italic-Akzent),
// dünne Trennlinien, Cinemascope-Hero. Nav/Footer kommen von Header/Footer.

type CaseStudyPageProps = {
  data: CaseStudy;
};

function sanityImageUrl(image: SanityImage, width: number) {
  return urlFor(image).width(width).auto("format").quality(80).url();
}

function altFor(image: SanityImage | null | undefined, fallback: string) {
  return image?.alt && image.alt.trim().length > 0 ? image.alt : fallback;
}

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

// "Kurz / Dynamisch, emotional." → ["Kurz / Dynamisch,", "emotional."];
// ohne Komma: Split am letzten Leerzeichen, sonst alles in part1.
function splitHeading(text: string): [string, string | null] {
  const commaIdx = text.indexOf(",");
  if (commaIdx !== -1 && text.slice(commaIdx + 1).trim().length > 0) {
    return [text.slice(0, commaIdx + 1), text.slice(commaIdx + 1).trim()];
  }
  const idx = text.lastIndexOf(" ");
  if (idx === -1) return [text, null];
  return [text.slice(0, idx), text.slice(idx + 1)];
}

// Editorial-Misch-Headline dieses Layouts: erster Teil Gotham aufrecht/normal,
// zweiter Teil Garamond SemiBold Italic in eigener Zeile (bewusst leichter als
// die Bold-MixedHeadline der Landing — Typo-Charakter des Figma-Designs 1a).
function EditorialHeading({
  as: Tag = "h2",
  part1,
  part2,
  sizeClass,
}: {
  as?: "h2" | "h3";
  part1: string;
  part2?: string | null;
  sizeClass: string;
}) {
  return (
    <Tag
      className={`font-gotham font-normal text-white leading-[1.02] tracking-[-0.02em] ${sizeClass}`}
    >
      {part1}
      {part2 && (
        <>
          <br />
          <span className="font-garamond font-semibold italic tracking-normal">{part2}</span>
        </>
      )}
    </Tag>
  );
}

// Credit-Zeile: Rolle links gedimmt, Name rechts, dünne Trennlinie oben.
function CreditRow({
  role,
  name,
  last = false,
}: {
  role: string;
  name: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-5 py-4 border-t border-white/15 ${
        last ? "border-b" : ""
      }`}
    >
      <span className="font-gotham text-sm text-white/55">{role}</span>
      <span className="font-gotham text-[15px] text-white text-right">{name}</span>
    </div>
  );
}

export function CaseStudyPage({ data }: CaseStudyPageProps) {
  const client = data.projectMeta.client;
  const credits = data.credits ?? [];
  const introCredits = credits.slice(0, 2);
  const services = data.services ?? [];
  const fullWidthImage = data.gallery?.[0]?.image ?? null;
  const posterUrl = hasImageAsset(data.mainMedia.posterImage)
    ? sanityImageUrl(data.mainMedia.posterImage, 1800)
    : null;
  const [introPart1, introPart2] = data.introHeading
    ? splitHeading(data.introHeading)
    : [null, null];
  const [solutionPart1, solutionPart2] = splitHeading(data.solution.heading);
  // Credits auf 2 Spalten verteilen (links eine mehr bei ungerader Anzahl)
  const creditsSplit = Math.ceil(credits.length / 2);
  const creditsLeft = credits.slice(0, creditsSplit);
  const creditsRight = credits.slice(creditsSplit);

  return (
    <main id="main-content" className="bg-makec-dark text-white overflow-x-hidden pt-[70px]">
      {/* Hero: Cinemascope-Still, full-bleed */}
      <figure className="relative aspect-[4/3] md:aspect-[2.35/1] overflow-hidden">
        <CaseImage
          image={data.heroImage}
          alt={altFor(data.heroImage, `${client} Hero Visual`)}
          width={2200}
          priority
          sizes="100vw"
        />
      </figure>

      {/* Titel + Credits-Kurzblock */}
      <header className="max-w-[1052px] mx-auto px-6 md:px-12 pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-end">
        <div>
          <div className="flex items-center gap-3 font-gotham text-meta uppercase tracking-[0.16em] mb-6">
            {data.kicker && <span className="text-makec-blue">{data.kicker}</span>}
            {data.projectMeta.year && (
              <span className="text-white/40">{data.projectMeta.year}</span>
            )}
          </div>
          <h1 className="font-gotham font-bold uppercase text-white leading-[0.9] tracking-[-0.035em] text-[clamp(3.625rem,7vw,6.5rem)]">
            {data.headline.lead}
            <span className="font-garamond font-semibold italic normal-case tracking-[-0.01em]">
              {data.headline.impact}
            </span>
          </h1>
          {data.projectMeta.category && (
            <p className="font-gotham font-light text-[19px] text-white/60 mt-5">
              {data.projectMeta.category}
            </p>
          )}
        </div>

        <div className="self-end">
          <p className="font-gotham text-meta uppercase tracking-[0.18em] text-makec-blue pb-3.5 border-b border-white/15 mb-2">
            Credits
          </p>
          <div className="flex items-baseline justify-between gap-7 py-2.5">
            <span className="font-gotham text-[13px] text-white/50">Kunde</span>
            <span className="font-gotham text-[15px] text-right">{client}</span>
          </div>
          {introCredits.map((credit) => (
            <div
              key={credit._key}
              className="flex items-baseline justify-between gap-7 py-2.5 border-t border-white/10"
            >
              <span className="font-gotham text-[13px] text-white/50">{credit.role}</span>
              <span className="font-gotham text-[15px] text-right">{credit.name}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Intro: Headline + Squiggle links, Fließtext rechts */}
      <section className="max-w-[1052px] mx-auto px-6 md:px-12 py-16 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div>
          {introPart1 && (
            <EditorialHeading
              part1={introPart1}
              part2={introPart2}
              sizeClass="text-[clamp(2rem,3.6vw,3.125rem)] leading-[1.06]"
            />
          )}
          <SquiggleUnderline className="mt-5 w-[clamp(11rem,55%,17.5rem)] text-makec-blue" />
        </div>
        <p className="font-gotham font-light text-[19px] leading-[1.62] text-white/80 md:mt-1.5">
          {data.summary}
        </p>
      </section>

      {/* Main Video: Label-Zeile + Facade */}
      {(posterUrl || data.mainMedia.videoUrl) && (
        <section className="max-w-[1180px] mx-auto px-6 md:px-12 pb-16 md:pb-28">
          <div className="flex items-center gap-5 mb-6">
            <span className="font-gotham font-semibold uppercase tracking-[-0.01em] text-white text-[clamp(1.375rem,2.4vw,2rem)]">
              Main
              <span className="font-garamond font-semibold italic normal-case">Video</span>
            </span>
            <span className="flex-1 h-px bg-white/15" aria-hidden />
            <span className="font-gotham text-xs uppercase tracking-[0.14em] text-white/45">
              Play / Pause
            </span>
          </div>
          <VideoFacade
            videoUrl={data.mainMedia.videoUrl ?? null}
            posterUrl={posterUrl}
            alt={altFor(data.mainMedia.posterImage, `${client} Main Video`)}
          />
        </section>
      )}

      {/* Was wir gemacht haben: Headline + weißer Swoosh, nummerierte Services */}
      {services.length > 0 && (
        <section className="max-w-[1052px] mx-auto px-6 md:px-12 pb-12 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div>
            <EditorialHeading
              part1="Was wir"
              part2="gemacht haben."
              sizeClass="text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]"
            />
            <Swoosh className="mt-4 w-[clamp(12.5rem,60%,20rem)] text-white" />
          </div>
          <div className="self-center">
            {services.map((service, i) => (
              <div
                key={service}
                className={`flex items-baseline gap-4 py-4 border-t border-white/15 ${
                  i === services.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-garamond italic text-makec-blue text-xl w-9 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-gotham font-normal text-white text-[clamp(1.25rem,2.2vw,1.75rem)]">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full-width Still */}
      {hasImageAsset(fullWidthImage) && (
        <figure className="px-6 md:px-12 pb-16 md:pb-28">
          <div className="relative aspect-[16/9] md:aspect-[16/7] overflow-hidden">
            <CaseImage
              image={fullWidthImage}
              alt={altFor(fullWidthImage, `${client} Still`)}
              width={2200}
              sizes="100vw"
            />
          </div>
        </figure>
      )}

      {/* Statement: Bild 4/5 links, solution.heading/body rechts */}
      <section className="max-w-[1052px] mx-auto px-6 md:px-12 pb-16 md:pb-28 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
        <div className="relative aspect-[4/5] overflow-hidden">
          <CaseImage
            image={data.solution.imageLeft}
            alt={altFor(data.solution.imageLeft, `${client} Still`)}
            width={1200}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="md:pb-2">
          <EditorialHeading
            as="h3"
            part1={solutionPart1}
            part2={solutionPart2}
            sizeClass="text-[clamp(1.75rem,3.2vw,2.625rem)] leading-[1.08]"
          />
          <p className="font-gotham font-light text-lg leading-[1.62] text-white/80 mt-5">
            {data.solution.body}
          </p>
        </div>
      </section>

      {/* Full Credits */}
      {credits.length > 0 && (
        <section className="max-w-[1052px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
          <EditorialHeading
            part1="Full"
            part2="Credits"
            sizeClass="text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]"
          />
          <SquiggleUnderline className="mt-2 mb-10 w-48 md:w-64 text-makec-blue" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24">
            <div>
              {creditsLeft.map((credit, i) => (
                <CreditRow
                  key={credit._key}
                  role={credit.role}
                  name={credit.name}
                  last={i === creditsLeft.length - 1}
                />
              ))}
            </div>
            <div>
              {creditsRight.map((credit, i) => (
                <CreditRow
                  key={credit._key}
                  role={credit.role}
                  name={credit.name}
                  last={i === creditsRight.length - 1}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
