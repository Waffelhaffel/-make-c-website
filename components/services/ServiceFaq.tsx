import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import type { ServiceFaq as ServiceFaqItem } from "@/lib/leistungen";

type ServiceFaqProps = {
  faq: ServiceFaqItem[];
};

/**
 * Bewusst KEIN Accordion und kein <details>: Die Antworten stehen offen im
 * ausgelieferten HTML. Antwortmaschinen zitieren nur, was sie ohne Interaktion
 * lesen können — und jede Antwort ist so formuliert, dass sie allein steht.
 */
export function ServiceFaq({ faq }: ServiceFaqProps) {
  if (faq.length === 0) return null;

  return (
    <MotionSection id="faq" className="bg-makec-dark py-16 md:py-32">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <MixedHeadline
          part1="Häufige"
          part2="Fragen"
          className="mb-12 md:mb-20"
        />

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-16">
          {faq.map((item) => (
            <div key={item.question} className="border-t border-white/15 pt-6">
              <h3 className="font-gotham text-h4 text-white">{item.question}</h3>
              <p className="mt-4 font-gotham text-body-lg text-white/80">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
