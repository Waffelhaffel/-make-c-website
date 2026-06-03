import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Approach } from "@/components/sections/Approach";
import { Showreel } from "@/components/sections/Showreel";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { InsightGeneration } from "@/components/sections/InsightGeneration";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { BudgetTool } from "@/components/sections/BudgetTool";
import { QuestionsEntry } from "@/components/sections/QuestionsEntry";
import { Contact } from "@/components/sections/Contact";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { getLandingPage } from "@/sanity/lib/getLandingPage";
import { getServices } from "@/sanity/lib/getServices";

export const revalidate = 60;

export default async function Home() {
  const [data, services] = await Promise.all([getLandingPage(), getServices()]);

  return (
    <>
      <Header />
      <main className="bg-makec-dark min-h-screen text-white overflow-x-hidden">
        <Hero data={data.hero} />
        <Stats data={data.stats} />
        <Showreel data={data.showreel} />
        <Approach data={data.approach} />
        <ServiceAccordion services={services} />
        <InsightGeneration data={data.insight} />
        <SelectedWork />
        <AboutTeam data={data.about} />
        <BudgetTool />
        <QuestionsEntry data={data.questions} />
        <Contact data={data.contact} />
      </main>
      <FloatingContact data={data.contact} />
      <Footer />
    </>
  );
}
