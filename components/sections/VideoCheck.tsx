"use client";

import { useState } from "react";
import Image from "next/image";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

interface QuizResult {
  headline: string;
  headlineAccent: string;
  body: string;
  image: { src: string; alt: string };
  ctaLabel: string;
}

const RESULT_HIGH_NEED: QuizResult = {
  headline: "Bei euch steckt",
  headlineAccent: "reichlich Video-Potenzial.",
  body: "Ob Strategie, Produktion oder Distribution — bei euch gibt es ordentlich Luft nach oben. Genau dafür sind wir da: Wir entwickeln mit euch Videocontent, der eure Zielgruppe wirklich erreicht.",
  image: { src: "/Budget tool/5 Menschen.png", alt: "make/c Team im Einsatz" },
  ctaLabel: "Lass uns sprechen",
};

const RESULT_WELL_POSITIONED: QuizResult = {
  headline: "Ihr seid schon",
  headlineAccent: "gut aufgestellt.",
  body: "Stark! Trotzdem lohnt sich ein Austausch — ob nächste Produktion, frische Kampagne oder ein Blick von außen auf euren Content. Wir freuen uns aufs Gespräch.",
  image: { src: "/Budget tool/2 Menschen.png", alt: "make/c Zweierteam" },
  ctaLabel: "Projekt anfragen",
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
      {/* Einspaltig, seit die FAQ-Spalte rechts entfernt wurde (07/2026) */}
      <div className="max-w-3xl mx-auto">
        {/* Quiz-Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-gotham font-bold tracking-[-0.05em] text-h4 text-white mb-4">
            Der Video-
            <span className="font-garamond font-semibold italic text-[1.2em] leading-[0.85]">
              Check
            </span>
          </h2>
          <p className="font-gotham text-body-lg text-white/80">
            Fünf Fragen, ehrliche Antwort: Wo steht ihr mit Video?
          </p>
        </div>

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
                <div className="relative w-full aspect-video bg-[#14140F]/40 rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
                  <Image
                    src={result.image.src}
                    alt={result.image.alt}
                    fill
                    className="object-contain p-6 md:p-10"
                  />
                </div>

                <h3 className="font-gotham font-bold tracking-[-0.05em] text-h4 text-white mb-6">
                  {result.headline}{" "}
                  <span className="font-garamond font-semibold italic text-[1.2em] leading-[0.85]">
                    {result.headlineAccent}
                  </span>
                </h3>
                <p className="font-gotham text-white/80 text-sm md:text-base leading-relaxed max-w-lg mb-10">
                  {result.body}
                </p>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-4 rounded-full bg-white text-makec-blue h-14 md:h-16 px-8 md:px-10 font-gotham font-bold text-small hover:bg-white/90 transition-colors"
                >
                  {result.ctaLabel}
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

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
      </div>
    </MotionSection>
  );
}
