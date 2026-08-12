import Image from "next/image";

import type { LocalImage } from "@/lib/content/types";

type ServiceImageBandProps = {
  /** Zweites Set-Foto der Leistung, `SERVICE_PAGES[].images[1]` */
  image?: LocalImage;
};

/**
 * Full-Bleed-Bildband zwischen Ablauf und FAQ — die einzige Stelle der
 * Leistungsseite, an der ein Bild über die volle Breite läuft. Es ist die
 * Atempause zwischen neun Textblöcken und stammt aus derselben Foto-Strecke
 * wie das Bild in `ServiceBlocks` (`scripts/build-service-images.mjs`).
 *
 * ⚠️ Bewusst ohne eigene Überschrift und ohne `py`: das Band soll als Fläche
 * wirken, nicht als weiteres Kapitel. Die Höhe wächst nicht unbegrenzt mit —
 * `lg:max-h-[640px]` deckelt sie auf großen Schirmen, sonst wäre das Band auf
 * einem 1920er Display über 800 px hoch.
 *
 * Der Beschnitt ist erheblich: die Quellen sind 3:2, das Band auf Desktop
 * 21:9. Motive mit Randdetails gehören deshalb nach `images[0]`.
 */
export function ServiceImageBand({ image }: ServiceImageBandProps) {
  if (!image) return null;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[640px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
