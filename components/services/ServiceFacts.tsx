import { MotionSection } from "@/components/ui/MotionSection";
import { Swoosh } from "@/components/ui/Swoosh";
import type { ServiceFact } from "@/lib/leistungen";

type ServiceFactsProps = {
  facts: ServiceFact[];
};

/**
 * Eckdaten als Definitionsliste. Bewusst <dl>/<dt>/<dd>: Antwortmaschinen
 * übernehmen Attribut-Wert-Paare deutlich zuverlässiger als Fließtext.
 *
 * Der einzige blaue Block im Seitenkörper — die Farbkanten dunkel↔blau tragen
 * wie überall auf der Seite einen Swoosh (Muster aus SelectedWork.tsx).
 */
export function ServiceFacts({ facts }: ServiceFactsProps) {
  if (facts.length === 0) return null;

  return (
    <div className="relative bg-makec-dark">
      <Swoosh className="absolute left-1/2 top-0 z-10 w-[clamp(12rem,25vw,30.5rem)] -translate-x-1/2 -translate-y-1/2 text-white" />
      <MotionSection className="bg-makec-blue py-16 md:py-28">
        <div className="max-w-[1480px] mx-auto px-6 md:px-10">
          <h2 className="font-gotham text-h4 text-white mb-10 md:mb-14">
            Eckdaten auf einen Blick
          </h2>
          <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-white/30 pt-5">
                <dt className="font-gotham text-meta uppercase tracking-[0.2em] text-white/70">
                  {fact.label}
                </dt>
                <dd className="mt-3 font-gotham text-body-lg text-white">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </MotionSection>
      {/* Swoosh auf der Unterkante blau → dunkel */}
      <Swoosh className="relative z-10 mx-auto -mt-7 w-[clamp(12rem,25vw,30.5rem)] text-white" />
    </div>
  );
}
