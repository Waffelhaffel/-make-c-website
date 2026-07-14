"use client";

import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { PowerCounter } from "@/components/ui/PowerCounter";
import { Swoosh } from "@/components/ui/Swoosh";
import Image from "next/image";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { LandingAbout } from "@/sanity/types";

type AboutTeamProps = {
  data: LandingAbout;
};

export function AboutTeam({ data }: AboutTeamProps) {
  const powerWords = data.powerWords ?? [];
  const paragraphs = data.paragraphs ?? [];

  // Team-Bild aus Sanity (about.teamImage), sonst Code-Fallback
  const teamImageSrc = hasImageAsset(data.teamImage)
    ? urlFor(data.teamImage).width(1600).quality(85).auto("format").url()
    : "/Budget tool/Team_Bild.webp";

  return (
    <MotionSection id="team" className="py-16 md:py-32 px-6 md:px-12 bg-makec-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-32">
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

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-12 lg:gap-20 mb-12 md:mb-32 max-w-4xl mx-auto px-2 sm:px-0">
          {powerWords.slice(0, 3).map((word, i) => (
            <PowerCounter
              key={`${word.label}-${i}`}
              label={word.label}
              duration={2 + i}
              delay={i * 0.2}
            />
          ))}
        </div>

        <div className="relative">
          <MixedHeadline
            variant="display"
            part1={data.teamTitlePart1}
            part2={data.teamTitlePart2}
            size="text-[clamp(2.75rem,5vw,6rem)]"
            className="text-center mb-0 relative z-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start -mt-4 md:-mt-8">
            <div className="relative">
              <div className="hidden sm:block absolute -bottom-12 -left-4 sm:-bottom-20 sm:-left-8 md:-bottom-32 md:-left-16 w-[70%] sm:w-[80%] md:w-[90%] h-[80%] sm:h-[90%] md:h-[100%] opacity-30 sm:opacity-40 md:opacity-50 pointer-events-none z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icon /schräge_Linien_hintergrund.svg"
                  alt=""
                  className="w-full h-full object-contain invert"
                />
              </div>

              {/* Team-Bild schwebt/wabert sanft beim Hover */}
              <div className="relative z-10 group">
                <div className="relative aspect-square w-full overflow-hidden transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:-rotate-1 group-hover:scale-[1.02]">
                  <Image
                    src={teamImageSrc}
                    alt={data.teamImage?.alt || "make/c Team"}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start pt-4 sm:pt-8 md:pt-24">
              {data.kicker && (
                <p className="font-gotham text-small text-white mb-6">{data.kicker}</p>
              )}

              <div className="space-y-6 font-gotham text-body-lg text-white/80">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
