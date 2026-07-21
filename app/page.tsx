import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { LogoBanner } from "@/components/sections/LogoBanner";
import { Approach } from "@/components/sections/Approach";
import { Showreel } from "@/components/sections/Showreel";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { InsightGeneration } from "@/components/sections/InsightGeneration";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { VideoCheck } from "@/components/sections/VideoCheck";
import { Contact } from "@/components/sections/Contact";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { getLandingPage } from "@/sanity/lib/getLandingPage";
import { getServices } from "@/sanity/lib/getServices";
import { getCaseStudies } from "@/sanity/lib/getCaseStudies";
import { SELECTED_WORK } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [data, services, caseStudies] = await Promise.all([
    getLandingPage(),
    getServices(),
    getCaseStudies(),
  ]);

  // Landing zeigt nur die kuratierten Selected-Work-Kacheln — nur deren
  // Case-Daten ans Modal geben (nicht alle Cases in die Landing-Props serialisieren).
  const selectedSlugs = new Set(SELECTED_WORK.map((w) => w.slug));
  const landingCases = caseStudies.filter((c) => selectedSlugs.has(c.slug));

  return (
    <>
      <Header />
      <main id="main-content" className="bg-makec-dark min-h-screen text-white overflow-x-hidden">
        <Hero data={data.hero} />
        <Stats data={data.stats} />
        <LogoBanner />
        <Showreel data={data.showreel} />
        <Approach data={data.approach} />
        <ServiceAccordion services={services} />
        <InsightGeneration data={data.insight} />
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
