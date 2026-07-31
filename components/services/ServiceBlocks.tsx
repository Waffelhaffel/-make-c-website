import Image from "next/image";

import { LazyVideo } from "@/components/ui/LazyVideo";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import type { ServiceBlock } from "@/lib/leistungen";
import type { LocalImage } from "@/lib/content/types";

type ServiceBlocksProps = {
  blocks: ServiceBlock[];
  /** Datei in public/ — Namen enthalten Leerzeichen, daher encodeURI */
  loopVideo?: string;
  /** Fallback, wenn es kein Loop-Video gibt (z. B. Motion Design) */
  image?: LocalImage;
};

export function ServiceBlocks({ blocks, loopVideo, image }: ServiceBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <MotionSection className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1="Was wir"
          part2="konkret machen"
          className="mb-12 md:mb-20"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Medium: Loop-Video, sonst die Leistungs-Grafik.
              Vier der fünf Loops in public/ sind 512×512 (nur "AI Video Loop.mp4"
              ist 1224×752) — deshalb ein quadratischer Rahmen fürs Video und
              das 3:2-Format der Grafiken nur für den Bild-Fallback. */}
          <div className="lg:col-span-5">
            <div
              className={`relative overflow-hidden bg-black/30 ${
                loopVideo ? "aspect-square" : "aspect-[730/462]"
              }`}
            >
              {loopVideo ? (
                <LazyVideo
                  src={encodeURI(loopVideo)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                )
              )}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-10 md:gap-14">
            {blocks.map((block) => (
              <div key={block.title} className="border-t border-white/15 pt-6">
                <h3 className="font-gotham text-h4 text-white">{block.title}</h3>
                <p className="mt-4 font-gotham text-body-lg text-white/80">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
