"use client";

import Image from "next/image";
import { MotionSection } from "@/components/ui/MotionSection";
import type { Service } from "@/sanity/types";

interface VideoProductionPageProps {
  service: Service;
}

export function VideoProductionPage({ service: _service }: VideoProductionPageProps) {
  return (
    <main className="min-h-screen bg-makec-dark text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
        {/* Hero */}
        <MotionSection className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6">
            <span className="text-xs md:text-sm font-medium text-makec-blue italic tracking-[0.25em] uppercase">
              / Video Produktion /
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] uppercase tracking-tight">
              <span className="font-bold italic block">VIDEO</span>
              <span className="font-garamond font-semibold italic block text-[1.08em]">
                PRODUKTION
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
              Wir entwickeln und produzieren Bewegtbild, das Marken wirklich voranbringt –
              von kampagnenfähigen Imagefilmen bis zu skalierbaren Content-Serien für Social,
              Produkt-Launches und Recruiting.
            </p>
          </div>

          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
            <Image
              src="/Video_produktion/Video_Produktion_Bild1.png"
              alt="Video Produktion – Setaufnahme"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </MotionSection>

        {/* Unsere Videoformate */}
        <MotionSection className="space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Formate, die für Marken funktionieren.
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Jedes Video folgt einer klaren Aufgabe: Marke aufbauen, Produkte erklären
              oder Aktionen inszenieren. Wir denken in wiederverwendbaren Formaten statt
              in Einzelproduktionen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Imagefilm & Brand Story */}
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
                <Image
                  src="/Video_produktion/Video_Produktion_Bild1.png"
                  alt="Imagefilm & Brand Story"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold">
                Imagefilm &amp; Brand Story
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Cineastische Filme, die Haltung und Identität einer Marke sichtbar machen – 
                für Kampagnen, Websites und Pitch-Situationen.
              </p>
            </div>

            {/* Kampagnen- und Produktvideos */}
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
                <Image
                  src="/Video_produktion/Video_Produktion_Bild2.png"
                  alt="Kampagnen- und Produktvideos"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold">
                Kampagnen- &amp; Produktvideos
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Klar erzählte Stories, die Mehrwerte erklären, Features zeigen und
                in digitalen Kampagnen performant ausgespielt werden können.
              </p>
            </div>

            {/* Social-First Content */}
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
                <Image
                  src="/Video_produktion/Video_Produktion_Bild3.png"
                  alt="Social-First Content & Snippets"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold">
                Social-First Content &amp; Snippets
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Serielle Shorts, Reels und Cutdowns, die auf die Mechaniken von
                TikTok, Instagram &amp; Co. abgestimmt sind – inklusive Thumbnail- und
                Hook-Strategie.
              </p>
            </div>
          </div>
        </MotionSection>

        {/* Animation & Motion Design */}
        <MotionSection className="space-y-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Animation &amp; Motion Design.
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Wenn Produkte komplex sind oder Prozesse schwer zu greifen, wird
              Animation zum stärksten Tool. Wir verbinden Motion Design mit klaren
              Storylines und Marken-Guidelines.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
                <Image
                  src="/Video_produktion/Animations_Film_Bild1.png"
                  alt="Erklärfilme & Produktanimationen"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold">
                  Erklärfilme &amp; Produktanimationen
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Aufgeräumte Visuals, reduzierte Typografie und klare Dramaturgie:
                  Wir übersetzen komplexe Features in verständliche Bildwelten – für
                  Sales, Onboarding und Support.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
              <div className="order-2 md:order-1 space-y-4">
                <h3 className="text-lg md:text-xl font-bold">
                  Social Motion &amp; UI-Animation
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Mikro-Animationen, App-Flows und Social-Motion-Templates, die
                  dauerhaft im Marketing eingesetzt werden können und Teams inhouse
                  befähigen.
                </p>
              </div>
              <div className="order-1 md:order-2 relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
                <Image
                  src="/Video_produktion/Animations_Film_Bild2.png"
                  alt="Social Motion & UI-Animation"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Studio Produktion */}
        <MotionSection className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative w-full aspect-[5/3] rounded-3xl overflow-hidden bg-black/40 border border-white/10">
              <Image
                src="/Video_produktion/Bild_Studio1.png"
                alt="Studio Produktion bei make/c"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Studio Produktionen.
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Interviews, Moderationen, Talk-Formate oder Produkt-Demos – in unseren
                Studio-Setups produzieren wir wiederkehrende Formate effizient und
                in gleichbleibender Qualität. Auf Wunsch begleiten wir auch den Bau
                eurer eigenen Studio-Infrastruktur.
              </p>
            </div>
          </div>
        </MotionSection>

        {/* Vorteile / Bullet Block */}
        <MotionSection className="space-y-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Mehr als nur einzelne Videos.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold italic">Strategie + Produktion aus einer Hand</span>{" "}
                – von der ersten Idee über Formatentwicklung bis zu Drehplänen und
                Distribution.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold italic">
                  Skalierbare Setups statt Einzelproduktionen
                </span>{" "}
                – wir denken in Content-Serien, Launch-Strecken und Always-on
                Content.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold italic">Planbare Timings &amp; Budgets</span>{" "}
                dank klarer Prozesse, Templates und wiederkehrender Teams.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold italic">
                  Reporting &amp; Learnings aus laufenden Produktionen
                </span>{" "}
                – was performt, fließt direkt in die nächsten Formate ein.
              </p>
            </div>
          </div>
        </MotionSection>

        {/* Kontakt Teaser */}
        <MotionSection className="border-t border-white/10 pt-10 md:pt-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-makec-blue uppercase tracking-[0.25em] mb-3">
                Next Step
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Lass uns über dein nächstes Videoprojekt sprechen.
              </h2>
            </div>
            <a
              href="mailto:info@make-c.de"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white text-sm md:text-base font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-makec-dark transition-all duration-300"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </MotionSection>
      </div>
    </main>
  );
}

