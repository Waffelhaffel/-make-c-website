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

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-makec-dark min-h-screen text-white overflow-x-hidden">
        <Hero />
        <Stats />
        <Showreel />
        <Approach />
        <ServiceAccordion />
        <InsightGeneration />
        <SelectedWork />
        <AboutTeam />
        <BudgetTool />
        <QuestionsEntry />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
