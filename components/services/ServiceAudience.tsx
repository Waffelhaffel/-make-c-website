import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";

type ServiceAudienceProps = {
  audience: string[];
};

/**
 * Bedient „für wen eignet sich …"-Fragen — eine der häufigsten Prompt-Formen.
 * Bewusst auf makec-dark: Blau bleibt den Eckdaten und dem CTA vorbehalten,
 * sonst zerfällt die Seite in zu viele Farbblöcke.
 *
 * Ohne Einleitungssatz: „{Leistung} von make/c eignet sich besonders für:"
 * sagte nur die Headline ein zweites Mal.
 */
export function ServiceAudience({ audience }: ServiceAudienceProps) {
  if (audience.length === 0) return null;

  return (
    <MotionSection className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1="Für wen"
          part2="das passt"
          className="mb-12 md:mb-16"
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {audience.map((item) => (
            <li
              key={item}
              className="border-t border-white/15 pt-5 font-gotham text-body-lg text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
