import Image from "next/image";

import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import type { ServiceBlock } from "@/lib/leistungen";
import type { LocalImage } from "@/lib/content/types";

type ServiceBlocksProps = {
  blocks: ServiceBlock[];
  /** Erstes Set-Foto der Leistung, `SERVICE_PAGES[].images[0]` */
  image?: LocalImage;
};

/**
 * ⚠️ Hier lief bis 12.08.2026 das Loop-Video. Es führt jetzt als Header die
 * ganze Seite an (`ServiceHero`); ein zweiter Durchlauf desselben Clips auf
 * derselben Seite wäre Wiederholung. An seiner Stelle steht ein Set-Foto.
 *
 * Der Rahmen ist `aspect-[3/2]` — das native Seitenverhältnis der gelieferten
 * Bilder (6.800 × 4.500 px). Nur `event-content-2` ist 4:3 und verliert oben
 * und unten zusammen rund 11 % an `object-cover`; das Motiv ist mittig.
 */
export function ServiceBlocks({ blocks, image }: ServiceBlocksProps) {
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
          <div className="lg:col-span-5">
            {image && (
              <div className="relative aspect-[3/2] overflow-hidden bg-black/30">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            )}
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
