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
import { getCaseStudies } from "@/sanity/lib/getCaseStudies";
import { LANDING } from "@/lib/content/landing";
import { SERVICES } from "@/lib/content/services";
import { SELECTED_WORK } from "@/lib/data";

// Nur noch für die Case Studies — der übrige Seiteninhalt liegt in lib/content/.
export const revalidate = 60;

export default async function Home() {
  const data = LANDING;
  const caseStudies = await getCaseStudies();

  // Landing zeigt nur die kuratierten Selected-Work-Kacheln — nur deren
  // Case-Daten ans Modal geben (nicht alle Cases in die Landing-Props serialisieren).
  // caseSlug ist optional — Kacheln ohne Sanity-Case (noch kein Dokument) fallen hier raus.
  const selectedSlugs = new Set(
    SELECTED_WORK.flatMap((w) => (w.caseSlug ? [w.caseSlug] : []))
  );
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
