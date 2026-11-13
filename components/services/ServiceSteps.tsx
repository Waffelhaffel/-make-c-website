import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import type { ServiceStep } from "@/lib/leistungen";

type ServiceStepsProps = {
  steps: ServiceStep[];
};

/**
 * Ablauf als echte <ol>. Nummerierte Prozessschritte werden von
 * Antwortmaschinen überproportional häufig als Liste ausgespielt — deshalb
 * semantische Ordnung statt gestylter Divs.
 */
export function ServiceSteps({ steps }: ServiceStepsProps) {
  if (steps.length === 0) return null;

  return (
    <MotionSection className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1="So läuft"
          part2="die Zusammenarbeit"
          className="mb-12 md:mb-20"
        />

        {/* Vier Spalten seit 12.08.2026: der Ablauf ist von sechs auf vier
            Schritte zusammengefasst und steht damit in einer Reihe statt in
            zwei angebrochenen.
            ⚠️ `hyphens-auto` seit 13.11.2026: in vier Spalten ist eine Spalte
            bei 1024 px nur ~210 px breit, und Titel wie „Postproduktion",
            „Technikplanung" oder „Umsetzungsbegleitung" liefen in die
            Nachbarspalte bzw. wurden am Bildschirmrand abgeschnitten — auf
            fünf von sechs Leistungsseiten (gemessen). Getrennt wird nur, was
            nicht passt; `lang="de"` am <html> liefert die Silbenregeln.
            Bewusst **nur an den Titeln** (h3): an der ganzen Liste trennte der
            Browser auch die Fließtexte durchgehend, und die liefen gar nicht
            über. */}
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-white/15 pt-6">
              <span
                aria-hidden="true"
                className="font-gotham text-meta uppercase tracking-[0.3em] text-white/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-gotham text-h4 text-white hyphens-auto">{step.title}</h3>
              <p className="mt-3 font-gotham text-body-lg text-white/80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
