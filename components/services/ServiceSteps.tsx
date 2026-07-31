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

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-white/15 pt-6">
              <span
                aria-hidden="true"
                className="font-gotham text-meta uppercase tracking-[0.3em] text-white/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-gotham text-h4 text-white">{step.title}</h3>
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
