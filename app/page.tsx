import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { LogoBanner } from "@/components/sections/LogoBanner";
import { Approach } from "@/components/sections/Approach";
import { Showreel } from "@/components/sections/Showreel";
import { ServiceList } from "@/components/sections/ServiceList";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { VideoCheck } from "@/components/sections/VideoCheck";
import { Contact } from "@/components/sections/Contact";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { getCasesBySlugs } from "@/lib/content/cases";
import { LANDING } from "@/lib/content/landing";
import { SERVICES } from "@/lib/content/services";
import { SELECTED_WORK } from "@/lib/data";

export default function Home() {
  const data = LANDING;

  // Landing zeigt nur die kuratierten Selected-Work-Kacheln — nur deren
  // Case-Daten ans Modal geben (nicht alle 60 Cases in die Landing-Props
  // serialisieren). `caseSlug` ist optional: Kacheln ohne zugehörigen Case
  // fallen hier raus und werden nicht klickbar gerendert.
  const landingCases = getCasesBySlugs(
    SELECTED_WORK.flatMap((w) => (w.caseSlug ? [w.caseSlug] : []))
  );

  return (
    <>
      <Header />
      <main id="main-content" className="bg-makec-dark min-h-screen text-white overflow-x-hidden">
        <Hero data={data.hero} />
        <Stats data={data.stats} />
        <LogoBanner />
        <Showreel data={data.showreel} />
        <Approach data={data.approach} />
        <ServiceList services={SERVICES} />
        <SelectedWork caseStudies={landingCases} />
        <Testimonials data={data.testimonials} />
        <AboutTeam data={data.about} />
        <VideoCheck />
        <Contact data={data.contact} />
      </main>
      <FloatingContact data={data.contact} />
      <Footer />
    </>
  );
}
