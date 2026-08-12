import Link from "next/link";

import { LazyVideo } from "@/components/ui/LazyVideo";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { loopPoster } from "@/lib/leistungen";
import type { ServicePageContent } from "@/lib/leistungen";

type ServiceHeroProps = {
  content: ServicePageContent;
};

/**
 * Hero der Leistungsseite: das Loop-Video als Kopf der Seite, darunter die
 * keywordtragende Subline und der GEO-Definitionsabsatz.
 *
 * Seit 12.08.2026 führt der Loop die Seite an (User-Entscheidung: „wie son
 * Header"). Vier Dinge daran sind nicht beliebig:
 *
 * 1. **Beschnitten wird nur von unten** (`object-top`). Das Band ist auf
 *    Desktop flacher als 16:9, `object-cover` muss also etwas wegnehmen — und
 *    es darf nicht die Oberkante sein: mindestens der Studiobau-Loop trägt
 *    seinen Schriftzug („FULLY FLEXIBLE") im oberen Bilddrittel, ab etwa 13 %
 *    Bildhöhe. Bei 21:9 bleiben rund drei Viertel des Bildes stehen, gemessen
 *    vom oberen Rand. Unten kostet der Beschnitt fast nichts: dort liegen
 *    ohnehin der Verlauf und die H1.
 * 2. **Volles 16:9 auf Mobil.** Das Band ist dort nur ~219 px hoch, ein
 *    Beschnitt wäre reiner Verlust.
 * 3. **`pt-[70px]`**, weil die Kopfleiste deckend ist (`bg-makec-dark`,
 *    HeaderClient.tsx) und sonst das oberste Siebtel des Videos verdeckt.
 * 4. **Die H1 liegt ab `md` im Band** (unten links, Muster wie im Landing-Hero)
 *    und rutscht auf Mobil unter das Video, wo sie die Kante nur überlappt —
 *    in einem 219 px hohen Band verdeckte sie sonst das halbe Bild. Ein
 *    einziges h1-Element für beide Fälle, kein Duplikat. Der Verlauf trägt die
 *    Schrift; ohne ihn stünde Weiß auf hellen Frames.
 *
 * Kein `overflow-hidden` auf dem Headline-Wrapper — das würde den Italic-
 * Überhang des letzten Garamond-Glyphs abschneiden (bekannte Falle).
 *
 * Bewusst ohne CTA: der Button stand hier mit identischem Label und href wie
 * in `ServiceCta` am Seitenende. Ein Ziel, zwei Buttons — der untere bleibt.
 */
export function ServiceHero({ content }: ServiceHeroProps) {
  const { loopVideo } = content;

  return (
    <section className="relative bg-makec-dark pt-[70px]">
      {loopVideo ? (
        <div className="relative mx-auto w-full max-w-[1480px]">
          <div className="relative aspect-video overflow-hidden bg-black/40 md:aspect-[2/1] lg:aspect-[21/9]">
            <LazyVideo
              src={loopVideo}
              poster={loopPoster(loopVideo)}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* Unten: Übergang ins Seiten-Schwarz, Bühne für die H1 */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-makec-dark via-makec-dark/60 to-transparent" />
            {/* Oben: Schleier für die Brotkrume — die Loops sind an der Oberkante
                teils sehr hell (Strategie: weiße Wand, Motion Design: Grau). */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />

            <nav
              aria-label="Brotkrumen"
              className="absolute inset-x-0 top-0 z-10 px-6 pt-5 md:px-10 md:pt-7"
            >
              {/* Die Ebene „Leistungen" zeigt seit 08/2026 auf „/#service" statt
                  auf die entfallene Übersichtsseite. Sie bleibt sichtbar, weil
                  sie der direkte Weg zurück zur Leistungs-Liste ist — und sie
                  steht identisch in der BreadcrumbList (lib/seo.ts), damit
                  sichtbare Brotkrume und strukturierte Daten sich decken. */}
              <ol className="flex flex-wrap items-center gap-2 font-gotham text-meta text-white/70">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Startseite
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#service" className="transition-colors hover:text-white">
                    Leistungen
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">{content.h1Plain}</li>
              </ol>
            </nav>
          </div>

          {/* Auf Mobil unter dem Band (nur die Kante überlappend), ab md im Band */}
          <div className="relative z-10 -mt-[10vw] px-6 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-10 md:pb-8 lg:pb-10">
            <MixedHeadline
              as="h1"
              variant="display"
              stacked
              slash
              part1={content.titlePart1}
              part2={content.titlePart2}
              className="pr-[0.15em]"
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-[1480px] px-6 pt-32 md:px-10 md:pt-48">
          <nav aria-label="Brotkrumen" className="mb-8 md:mb-12">
            <ol className="flex flex-wrap items-center gap-2 font-gotham text-meta text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Startseite
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#service" className="transition-colors hover:text-white">
                  Leistungen
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">{content.h1Plain}</li>
            </ol>
          </nav>
          <MixedHeadline
            as="h1"
            variant="display"
            stacked
            slash
            part1={content.titlePart1}
            part2={content.titlePart2}
            className="pr-[0.15em]"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 pb-16 md:px-10 md:pb-28">
        <div className="mt-10 md:mt-14 grid gap-8 md:grid-cols-12">
          <p className="md:col-span-5 font-gotham text-h4 text-white">
            {content.subline}
          </p>
          <p className="md:col-span-6 md:col-start-7 font-gotham text-body-lg text-white/80">
            {content.definition}
          </p>
        </div>
      </div>
    </section>
  );
}
