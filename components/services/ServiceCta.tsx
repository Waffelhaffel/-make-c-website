import { Magnetic } from "@/components/ui/Magnetic";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { MotionSection } from "@/components/ui/MotionSection";
import { PillButton } from "@/components/ui/PillButton";
import { Swoosh } from "@/components/ui/Swoosh";
import { ORG } from "@/lib/seo";
import type { ServicePageContent } from "@/lib/leistungen";

type ServiceCtaProps = {
  cta: ServicePageContent["cta"];
};

export function ServiceCta({ cta }: ServiceCtaProps) {
  return (
    <section className="relative bg-makec-dark">
      {/* Swoosh sitzt halb/halb auf der Kante Dunkel → Blau (Muster aus SelectedWork) */}
      <Swoosh className="absolute left-1/2 top-0 z-10 w-[clamp(12rem,25vw,30.5rem)] -translate-x-1/2 -translate-y-1/2 text-white" />

      <MotionSection className="bg-makec-blue px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <MixedHeadline
            part1={cta.headline}
            part2={null}
            className="mb-8"
          />
          <p className="font-gotham text-body-lg text-white/80">{cta.body}</p>

          <div className="mt-12 flex flex-col items-center gap-6">
            <Magnetic strength={0.3}>
              <PillButton href="/#contact" tone="blue">
                {cta.buttonText}
              </PillButton>
            </Magnetic>
            <a
              href={`mailto:${ORG.email}`}
              className="font-gotham text-small uppercase tracking-[0.2em] text-white transition-colors hover:text-white/70"
            >
              {ORG.email}
            </a>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
