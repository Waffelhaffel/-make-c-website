"use client";

import { useState } from "react";
import Image from "next/image";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

/**
 * Lead-Magnet am Ende des Checks (User-Entscheidung 11.08.2026 — ersetzt die
 * beiden Ergebnis-Grafiken aus dem Ordner „Budget tool"). Seit 12.08.2026 liegen
 * die PDFs vor, **je Ergebnis ein eigenes**; vorher zeigten beide Schirme auf
 * einen Pfad, unter dem gar keine Datei lag.
 *
 * ⚠️ Die Zuordnung ist gegenläufig zur Punktzahl, und das ist Absicht: **viele
 * Punkte = viel Bedarf**, nicht „gut aufgestellt" (siehe `score` unten, 0 = gut
 * abgedeckt). Deshalb bekommt der hohe Score die Grundlagen („Videos, die
 * wirken": Briefing, Rhythmus, Kanal, Messen) und der niedrige Score den
 * Aufbau-Guide („Die nächste Stufe" — laut Deckblatt „Fünf Stellen, an denen
 * **gut aufgestellte** Unternehmen Potenzial liegen lassen"). Wer das tauschen
 * will, tauscht die beiden `guide`-Blöcke, nicht die Schwelle.
 */
/**
 * ⚠️ `cover` ist die **Titelseite des jeweiligen PDFs**, gerendert nach WebP
 * (620 px breit, A4-Verhältnis). Wer ein PDF austauscht, muss das Cover neu
 * erzeugen — sonst zeigt die Vorschau neben dem Check einen Titel, den die
 * heruntergeladene Datei gar nicht trägt.
 */
type Guide = {
  href: string;
  label: string;
  title: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
};

const GUIDE_BASICS: Guide = {
  href: "/downloads/make-c-videos-die-wirken.pdf",
  label: "Guide „Videos, die wirken“ kostenlos laden",
  title: "Videos, die wirken",
  subtitle: "Fünf Entscheidungen, die über die Wirkung eures Videocontents bestimmen",
  cover: "/downloads/make-c-videos-die-wirken-cover.webp",
  coverAlt: "Titelseite des Guides „Videos, die wirken“",
};

const GUIDE_ADVANCED: Guide = {
  href: "/downloads/make-c-die-naechste-stufe.pdf",
  label: "Guide „Die nächste Stufe“ kostenlos laden",
  title: "Die nächste Stufe",
  subtitle: "Fünf Stellen, an denen gut aufgestellte Unternehmen Potenzial liegen lassen",
  cover: "/downloads/make-c-die-naechste-stufe-cover.webp",
  coverAlt: "Titelseite des Guides „Die nächste Stufe“",
};

/** Breite/Höhe der Cover-Dateien — A4 auf 620 px Breite gerendert. */
const COVER_W = 620;
const COVER_H = 878;

interface QuizOption {
  label: string;
  score: 0 | 1 | 2; // 0 = gut abgedeckt, 2 = hoher Bedarf
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Wie oft veröffentlicht ihr aktuell Videocontent?",
    options: [
      { label: "Regelmäßig, mehrmals im Monat", score: 0 },
      { label: "Ab und zu, wenn es sich ergibt", score: 1 },
      { label: "Selten bis nie", score: 2 },
    ],
  },
  {
    question: "Habt ihr eine klare Video-Strategie mit Zielen und Zielgruppen?",
    options: [
      { label: "Ja, dokumentiert und im Einsatz", score: 0 },
      { label: "Teilweise — eher aus dem Bauch heraus", score: 1 },
      { label: "Nein, bisher nicht", score: 2 },
    ],
  },
  {
    question: "Wer produziert eure Videos?",
    options: [
      { label: "Internes Team oder feste Partner", score: 0 },
      { label: "Mal intern, mal extern — je nach Projekt", score: 1 },
      { label: "Bisher niemand so richtig", score: 2 },
    ],
  },
  {
    question: "Nutzt ihr Video über mehrere Kanäle hinweg (Website, Social Media, Recruiting, Messen)?",
    options: [
      { label: "Ja, auf mehreren Kanälen", score: 0 },
      { label: "Nur auf einem Kanal", score: 1 },
      { label: "Kaum bis gar nicht", score: 2 },
    ],
  },
  {
    question: "Wisst ihr, wie eure Videos performen (Views, Leads, Conversions)?",
    options: [
      { label: "Ja, wir messen und optimieren", score: 0 },
      { label: "Wir schauen ab und zu drauf", score: 1 },
      { label: "Nein, keine Auswertung", score: 2 },
    ],
  },
];

const MAX_SCORE = QUIZ_QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
  0
);
const NEED_THRESHOLD = Math.ceil(MAX_SCORE / 2);

// Ohne `image`: die beiden Ergebnis-Grafiken sind am 11.08.2026 entfallen
// (User-Entscheidung). Die Dateien liegen weiter unter „/Budget tool/", werden
// aber von nichts mehr referenziert — siehe „Offene Punkte" in CLAUDE.md.
interface QuizResult {
  headline: string;
  headlineAccent: string;
  body: string;
  ctaLabel: string;
  guide: Guide;
}

const RESULT_HIGH_NEED: QuizResult = {
  headline: "Bei euch steckt",
  headlineAccent: "reichlich Video-Potenzial.",
  body: "Ob Strategie, Produktion oder Distribution — bei euch gibt es ordentlich Luft nach oben. Genau dafür sind wir da: Wir entwickeln mit euch Videocontent, der eure Zielgruppe wirklich erreicht.",
  ctaLabel: "Lass uns sprechen",
  guide: GUIDE_BASICS,
};

const RESULT_WELL_POSITIONED: QuizResult = {
  headline: "Ihr seid schon",
  headlineAccent: "gut aufgestellt.",
  body: "Stark! Trotzdem lohnt sich ein Austausch — ob nächste Produktion, frische Kampagne oder ein Blick von außen auf euren Content. Wir freuen uns aufs Gespräch.",
  ctaLabel: "Projekt anfragen",
  guide: GUIDE_ADVANCED,
};

export function VideoCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const totalScore = answers.reduce(
    (sum, optionIndex, i) => sum + QUIZ_QUESTIONS[i].options[optionIndex].score,
    0
  );
  const result =
    totalScore >= NEED_THRESHOLD ? RESULT_HIGH_NEED : RESULT_WELL_POSITIONED;

  const handleAnswer = (optionIndex: number) => {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
    if (step === QUIZ_QUESTIONS.length - 1) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setFinished(false);
  };

  return (
    <MotionSection
      id="video-check"
      className="py-16 md:py-32 px-6 md:px-12 bg-makec-blue text-white"
    >
      {/* Zweispaltig seit 12.08.2026: rechts die Guide-Vorschau. Vorher war die
          Sektion einspaltig (`max-w-3xl`), seit die FAQ-Spalte 07/2026 wegfiel.
          Die Breite ist so gewählt, dass die Quiz-Spalte bei ~730 px landet und
          damit ungefähr so breit bleibt wie vorher. */}
      <div className="max-w-[1120px] mx-auto">
        {/* Quiz-Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-gotham font-bold tracking-[-0.05em] text-h4 text-white mb-4">
            Der Video-Strategie-
            <span className="font-garamond font-semibold italic text-[1.2em] leading-[0.85]">
              Check
            </span>
          </h2>
          <p className="font-gotham text-body-lg text-white/80">
            Fünf Fragen, ehrliche Antwort: Wo steht ihr mit Video? Am Ende
            bekommt ihr euren Guide — kostenlos.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 items-start">
        {/* Quiz-Body */}
        <div>
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-[#14140F]/40 rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10">
                  <div className="mb-8">
                    <p className="font-gotham text-meta uppercase tracking-widest text-white/60 mb-4">
                      Frage {step + 1}/{QUIZ_QUESTIONS.length}
                    </p>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${(step / QUIZ_QUESTIONS.length) * 100}%`,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    </div>
                  </div>

                  <p className="font-gotham font-bold text-xl md:text-2xl tracking-[-0.02em] text-white mb-8">
                    {QUIZ_QUESTIONS[step].question}
                  </p>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[step].options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAnswer(index)}
                        className="w-full text-left p-5 md:p-6 rounded-2xl border border-white/20 bg-[#14140F]/30 hover:bg-[#14140F]/60 hover:border-white/40 transition-all duration-300 font-gotham text-small text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="mt-6 font-gotham text-small text-white/50 hover:text-white transition-colors"
                  >
                    ← Zurück
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-gotham font-bold tracking-[-0.05em] text-h4 text-white mb-6">
                  {result.headline}{" "}
                  <span className="font-garamond font-semibold italic text-[1.2em] leading-[0.85]">
                    {result.headlineAccent}
                  </span>
                </h3>
                <p className="font-gotham text-white/80 text-sm md:text-base leading-relaxed max-w-lg mb-10">
                  {result.body}
                </p>

                {/* Der Guide steht vorn: er ist der niedrigschwellige Abschluss
                    des Checks. Das Gespräch bleibt als zweite, ruhigere Option
                    daneben — vorher war es die einzige. */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4">
                  <a
                    href={result.guide.href}
                    download
                    // min-h statt h: die Beschriftung bricht unter ~420px auf zwei
                    // Zeilen um und würde aus einer festen Höhe herauslaufen.
                    className="group inline-flex min-h-14 md:min-h-16 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-center font-gotham text-small font-bold text-makec-blue transition-colors hover:bg-white/90 md:px-9"
                  >
                    <Download size={20} className="shrink-0" />
                    {result.guide.label}
                  </a>

                  <a
                    href="#contact"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/40 px-7 py-3 font-gotham text-small font-bold text-white transition-colors hover:border-white/70 hover:bg-white/10 md:min-h-16 md:px-9"
                  >
                    {result.ctaLabel}
                    <ArrowRight
                      size={20}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={restart}
                    className="font-gotham text-small text-white/50 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Check neu starten
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

          {/* Guide-Vorschau. Der Check gab bis 12.08.2026 keinen Hinweis darauf,
              dass am Ende ein PDF wartet — man sah das Angebot erst, wenn man
              schon durch war. Deshalb stehen die Titelseiten jetzt daneben.

              Während des Quiz beide (man weiß ja noch nicht, welcher kommt),
              nach dem Abschluss nur noch der passende — sonst bewirbt die Spalte
              etwas, das der Button daneben längst konkret anbietet. */}
          <aside className="lg:sticky lg:top-28">
            <p className="font-gotham text-meta uppercase tracking-[0.18em] text-white/60 mb-3">
              {finished ? "Dein Guide" : "Das bekommt ihr"}
            </p>
            {/* ⚠️ `font-normal` ist nötig: das Token `text-small` bringt 18 px
                **Bold** mit (tailwind.config.ts) und ließ den Absatz hier so
                schwer wirken wie eine Überschrift. */}
            <p className="font-gotham text-small font-normal text-white/80 leading-relaxed mb-6">
              {finished
                ? "Passend zu eurem Ergebnis — direkt unten laden."
                : "Ein Guide als PDF mit Tipps und Beispielen. Welcher der beiden, entscheidet euer Ergebnis."}
            </p>

            {/* ⚠️ Nebeneinander, nicht gestapelt — auch auf Desktop. Untereinander
                war die Spalte 952 px hoch gegen 472 px Quiz-Karte (gemessen) und
                bestimmte damit die Höhe der ganzen Sektion: die Beigabe hätte den
                Check erschlagen. Nebeneinander bleibt sie darunter. Dass die
                Titel auf den Covern dabei zu klein zum Lesen werden, ist
                verkraftbar — sie stehen als Text in der Bildunterschrift. */}
            <div
              className={`grid gap-4 ${
                finished ? "max-w-[200px]" : "grid-cols-2"
              }`}
            >
              {(finished ? [result.guide] : [GUIDE_BASICS, GUIDE_ADVANCED]).map(
                (guide) => (
                  <figure key={guide.href}>
                    <Image
                      src={guide.cover}
                      alt={guide.coverAlt}
                      width={COVER_W}
                      height={COVER_H}
                      sizes="200px"
                      // Kein Radius (auf der Seite ist außer den Pill-Buttons
                      // nichts gerundet). Die Linie trennt die dunkle Titelseite
                      // vom blauen Sektionsgrund.
                      className="w-full h-auto border border-white/15 shadow-xl"
                    />
                    {/* Nur der Titel — der Untertitel steht bereits auf der
                        Titelseite. Ausnahme ist der Ergebnis-Schirm: dort steht
                        das Cover allein und die Spalte hat Platz dafür. */}
                    <figcaption className="mt-3 font-gotham text-meta text-white/70 leading-snug">
                      <span className="block font-semibold text-white">
                        {guide.title}
                      </span>
                      {finished && guide.subtitle}
                    </figcaption>
                  </figure>
                )
              )}
            </div>
          </aside>
        </div>
      </div>
    </MotionSection>
  );
}
