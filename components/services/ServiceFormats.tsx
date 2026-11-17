import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import type { ServiceFormats as ServiceFormatsContent } from "@/lib/leistungen";

type ServiceFormatsProps = {
  formats?: ServiceFormatsContent;
};

/**
 * Formate, an denen make/c mitgewirkt, die es aber nicht selbst produziert hat
 * (seit 17.11.2026: die TV-Formate der CNC auf Branded Entertainment).
 *
 * ⚠️ Bewusst **anders als die Case-Kacheln** (`ServiceCases`) und getrennt von
 * ihnen: Kasten im Stil der Testimonial-Karten statt freistehendem Bild, Link
 * nach außen statt Case-Fenster. Es sind keine make/c-Cases — User-Vorgabe:
 * „nicht kleinreden, aber es muss auch wahr sein".
 *
 * Reine Links: vor dem Klick geht keine Anfrage an den Sender, die Bilder
 * liegen auf dem eigenen Server (Datenschutzerklärung: keine fremden Hosts).
 */
export function ServiceFormats({ formats }: ServiceFormatsProps) {
  if (!formats?.items.length) return null;

  return (
    <MotionSection className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1={formats.titlePart1}
          part2={formats.titlePart2}
          className="mb-6 md:mb-8"
        />
        <p className="mb-12 max-w-3xl font-gotham text-body-lg text-white/80 md:mb-20">
          {formats.intro}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {formats.items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col border border-white/10 bg-white/[0.035] transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="font-gotham text-meta uppercase tracking-[0.18em] text-white/60">
                  {item.label}
                </p>
                <h3 className="mt-3 font-gotham text-h4 uppercase text-white">{item.title}</h3>
                <p className="mt-4 flex-1 font-gotham text-body-lg text-white/75">{item.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-gotham text-meta uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:text-white/70">
                  {item.linkLabel}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
