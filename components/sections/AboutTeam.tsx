import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { Swoosh } from "@/components/ui/Swoosh";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import type { LandingAbout } from "@/lib/content/types";

type AboutTeamProps = {
  data: LandingAbout;
};

export function AboutTeam({ data }: AboutTeamProps) {
  // Optional: ohne Portrait läuft das Zitat über die volle Breite. Kein
  // Ersatzbild — ein falsches Gesicht wäre schlimmer als kein Bild.
  const ceoImage = data.ceoImage;

  return (
    <MotionSection id="team" className="py-16 md:py-32 px-6 md:px-12 bg-makec-dark">
      <div className="max-w-7xl mx-auto">
        {/* Geschäftsführung: Portrait + Zitat.
            Zitat-Muster wie in Testimonials.tsx, Name/Rolle wie in Contact.tsx. */}
        {(ceoImage || data.ceoQuote) && (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] gap-10 md:gap-16 lg:gap-20 items-center mb-16 md:mb-28">
            {ceoImage && (
              // Der blaue Kasten liegt als eigene Fläche HINTER dem Bild und ist
              // nach links unten versetzt. Kein Rahmen und kein Padding am Bild:
              // die Bildmaße bleiben dadurch unverändert. Der äußere Wrapper darf
              // kein overflow-hidden haben, sonst wird der Überstand abgeschnitten.
              <div className="relative w-full max-w-[420px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-4 translate-y-4 bg-makec-blue md:-translate-x-6 md:translate-y-6"
                />
                <div className="group relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={ceoImage.src}
                    alt={ceoImage.alt || data.ceoName || "Geschäftsführung make/c"}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            )}

            {data.ceoQuote && (
              <figure className="flex flex-col">
                <span
                  aria-hidden="true"
                  className="font-garamond leading-[0.6] text-white/25 text-[clamp(3.5rem,6vw,5.5rem)] select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-2 font-gotham font-[325] text-[clamp(1.375rem,1.8vw,1.75rem)] leading-snug text-white">
                  {data.ceoQuote}
                </blockquote>
                {(data.ceoName || data.ceoRole) && (
                  <figcaption className="mt-6 md:mt-8 font-gotham text-meta text-white/50">
                    {/* Mit LinkedIn-URL wird der Name zum Link, ohne bleibt er Text. */}
                    {data.ceoName && data.ceoLinkedin ? (
                      <a
                        href={data.ceoLinkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
                      >
                        {data.ceoName}
                        <Linkedin size={13} aria-hidden="true" />
                        <span className="sr-only">(LinkedIn-Profil, öffnet in neuem Tab)</span>
                      </a>
                    ) : (
                      data.ceoName
                    )}
                    {data.ceoRole && (
                      <span className="text-white/35">
                        {data.ceoName ? " · " : ""}
                        {data.ceoRole}
                      </span>
                    )}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        )}

        {/* Marken-Zitat */}
        <div className="text-center">
          <MixedHeadline
            part1={data.quoteLine1}
            part2={data.quoteLine2}
            italicPart1
            className="mb-4 md:mb-6"
          />

          <div className="flex justify-center mt-4">
            <Swoosh className="w-[140px] md:w-[220px] text-white" />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
