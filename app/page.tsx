import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Approach } from "@/components/sections/Approach";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { BudgetTool } from "@/components/sections/BudgetTool";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-black min-h-screen text-white overflow-x-hidden">
        <Hero />
        <Stats />
        <Approach />
        <ServiceAccordion />
        <SelectedWork />
        <AboutTeam />
        <BudgetTool />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
