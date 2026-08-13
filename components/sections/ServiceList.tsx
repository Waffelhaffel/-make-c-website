import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { MotionSection } from "@/components/ui/MotionSection";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { PillButton } from "@/components/ui/PillButton";
import { getServicePage, loopPoster, servicePagePath } from "@/lib/leistungen";
import { SERVICE_CTA_TEXT } from "@/lib/content/services";
import type { Service } from "@/lib/content/types";

type ServiceListProps = {
  services: Service[];
};

// "Video Produktion" → ["Video", "Produktion"] für die Misch-Typo-Headline (Figma 38:190)
function splitTitle(title: string): [string, string | null] {
  const idx = title.indexOf(" ");
  if (idx === -1) return [title, null];
  return [title.slice(0, idx), title.slice(idx + 1)];
}

// Statische Leistungs-Liste. Die Kacheln klappten früher auf (ServiceAccordion,
// bis 07/2026); seit den Detailseiten verlinkt jede Kachel auf
// /leistungen/<slug>. Bleibt Server-Component — next/link braucht kein "use client".
export function ServiceList({ services }: ServiceListProps) {
  return (
    <MotionSection
      id="service"
      className="relative py-16 md:py-32 bg-makec-dark overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="flex flex-col">
          {services.map((service, idx) => {
            const imageLeft = idx % 2 === 0;
            const [titlePart1, titlePart2] = splitTitle(service.title);
            // Der Loop kommt aus `SERVICE_PAGES` — dieselbe Datei wie auf der
            // Detailseite, damit Kachel und Seite dasselbe zeigen und der Pfad
            // nur an einer Stelle steht.
            const loopVideo = getServicePage(service.slug)?.loopVideo;

            return (
              // Bild abwechselnd links/rechts, Headline überlappt die Bildkante (Figma 38:184ff)
              <Link
                key={service.slug}
                href={servicePagePath(service.slug)}
                data-cursor="VIEW"
                className="group relative md:grid md:grid-cols-2"
              >
                {/* Bild + Headline in einem Wrapper: auf Mobile ist er der
                    Positionsanker, damit das Overlay genau die Bildhöhe hat
                    (der Button darunter steht im Fluss und darf es nicht
                    verschieben). Ab md wieder static → das Overlay bezieht
                    sich wie vorher auf die ganze Kachel (40,5 %-Überlappung). */}
                <div className={`relative md:static ${imageLeft ? "" : "md:col-start-2"}`}>
                  {/* Seit 12.08.2026 der Loop statt der handgezeichneten Grafik
                      (User-Entscheidung). Das Seitenverhältnis bleibt 730/462 —
                      die Headline überlappt die Bildkante bei 40,5 %, und diese
                      Überlappung ist auf genau dieses Format eingestellt. Die
                      16:9-Loops werden dadurch oben und unten um zusammen rund
                      11 % beschnitten; das trägt `object-cover` unauffällig.
                      `image` bleibt als Rückfall für eine Leistung ohne Loop. */}
                  <div className="relative aspect-[730/462] overflow-hidden bg-black/20">
                    {loopVideo ? (
                      <LazyVideo
                        src={loopVideo}
                        poster={loopPoster(loopVideo)}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      service.image && (
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      )
                    )}
                  </div>

                  <div
                    className={`absolute inset-y-0 z-10 flex items-center ${
                      imageLeft
                        ? "left-[6%] md:left-[40.5%]"
                        : "left-[6%] md:left-auto md:right-[40.5%] md:justify-end"
                    }`}
                  >
                    <div
                      className={`flex flex-col items-start gap-8 ${
                        imageLeft ? "" : "md:items-end"
                      }`}
                    >
                      {/* h3: die Liste steht auf der Startseite unter der
                          Approach-h2, die Hierarchie bleibt damit lückenlos. */}
                      <MixedHeadline
                        as="h3"
                        variant="display"
                        stacked
                        slash
                        part1={titlePart1}
                        part2={titlePart2}
                        // Mobil-Deckelung wie beim display-Token, aber schärfer
                        // (11,5 statt 12,5vw): die Headline startet hier erst bei
                        // left-[6%] der Bildbreite, ihr fehlen also ~6 % gegenüber
                        // einer Headline am Spaltenrand. Greift nur unter 383 px —
                        // dort lief „Produktion" 37 px über den Bildschirmrand.
                        size="text-[min(11.5vw,clamp(2.75rem,5.5vw,6.5625rem))]"
                        className={imageLeft ? "" : "md:text-right"}
                      />
                      {/* CTA in die Detailseite. PillButton ohne href/onClick
                          rendert ein <span> — die ganze Kachel ist schon der
                          Link, ein <a> im <a> wäre ungültig.
                          `variant="box"` seit 13.08.2026 (User-Vorgabe): eckig
                          im Look der Testimonial-Karten statt weißes Pill. */}
                      <span className="hidden md:block">
                        <PillButton size="md" variant="box">
                          {SERVICE_CTA_TEXT}
                        </PillButton>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile: auf dem flachen Bild ist neben der (bei langen Titeln
                    zweizeiligen) Headline kein Platz → Button unter dem Bild. */}
                <div className="pt-5 pb-10 md:hidden">
                  <PillButton size="md" variant="box">
                    {SERVICE_CTA_TEXT}
                  </PillButton>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
