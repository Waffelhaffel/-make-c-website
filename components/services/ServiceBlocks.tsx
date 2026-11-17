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
 * „Was wir konkret machen" als Editorial-Zeilen (seit 17.11.2026, Entwurf des
 * Users „Option B"). Auftakt: Headline links, unten bündig, und das Set-Foto
 * rechts. Darunter läuft jeder Block als nummerierte Zeile über die volle
 * Breite — Nummer und Titel links, Text rechts —, als `<ol>`.
 *
 * Vorher stand das Foto (`col-span-5`) neben drei Textblöcken, die bis zu
 * dreimal so hoch waren; unter dem Bild blieben 600–850 px leere Fläche.
 *
 * ⚠️ Auftakt und Zeilen teilen dasselbe Raster (`lg:grid-cols-2 lg:gap-16`):
 * dadurch beginnt die Textspalte ab 1024 px exakt an der linken Bildkante.
 * Wer eines der beiden Raster ändert, ändert das andere mit.
 *
 * Der Rahmen ist `aspect-[3/2]`, das native Seitenverhältnis aller
 * `leistungen-bilder/*-1.webp` (1600 × 1066/1067, gebaut von
 * `scripts/build-service-images.mjs`). Die Nummer ist `aria-hidden` — die
 * Zählung liefert die `<ol>` selbst.
 */
export function ServiceBlocks({ blocks, image }: ServiceBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <MotionSection className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="mb-12 grid gap-12 md:mb-20 lg:grid-cols-2 lg:items-end lg:gap-16">
          <MixedHeadline part1="Was wir" part2="konkret machen" />
          {image && (
            <div className="relative aspect-[3/2] overflow-hidden bg-black/30">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          )}
        </div>

        <ol className="border-b border-white/15">
          {blocks.map((block, i) => (
            <li
              key={block.title}
              className="grid gap-4 border-t border-white/15 py-8 md:py-10 lg:grid-cols-2 lg:gap-16"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="font-gotham text-meta uppercase tracking-[0.3em] text-white/60"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-[14em] font-gotham text-h4 text-white hyphens-auto">
                  {block.title}
                </h3>
              </div>
              <p className="font-gotham text-body-lg text-white/80">{block.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
