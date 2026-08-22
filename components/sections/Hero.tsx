"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Swoosh } from "@/components/ui/Swoosh";
import type { LandingHero } from "@/lib/content/types";

type HeroProps = {
  data: LandingHero;
};

export function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  // Das Hero-Video soll in **jedem** Browser laufen, sobald jemand die Seite
  // öffnet (User-Entscheidung 22.08.2026) — es gibt hier bewusst keine
  // `prefers-reduced-motion`-Abschaltung wie in `LazyVideo`.
  //
  // `autoPlay muted playsInline` trägt das fast überall, und die Autoplay-Sperre
  // der Browser greift hier ohnehin nicht: die drei Videodateien haben **gar
  // keine Tonspur** (`-an` in `scripts/build-header-video.mjs`), und stumme
  // Wiedergabe ist immer erlaubt. Zwei Fälle blocken trotzdem — iOS im
  // Stromsparmodus und Firefox mit strenger Medien-Einstellung. Für die läuft
  // der Nachstart unten: die erste Eingabe des Besuchers startet das Video.
  //
  // ⚠️ Das hängt bewusst **nichts** vom JavaScript ab, was oberhalb des Falzes
  // sichtbar wäre: das `<video>` samt `autoPlay` steht vollständig im
  // ausgelieferten HTML, der Effekt hier ist reine Absicherung obendrauf.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React setzt `muted` als Property, nicht als Attribut — vor dem Abspielen
    // deshalb noch einmal hart setzen, sonst kann die Sperre doch greifen.
    video.muted = true;

    const events = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    const cleanup = () => {
      video.removeEventListener("canplay", start);
      for (const event of events) window.removeEventListener(event, start);
    };
    function start() {
      // Ein abgewiesenes play() wirft — dann bleibt es beim nächsten Ereignis.
      video!.play().then(cleanup, () => {});
    }

    video.addEventListener("canplay", start);
    for (const event of events) window.addEventListener(event, start, { passive: true });
    start();
    return cleanup;
  }, []);

  const skewValue = useTransform(scrollY, [0, 1000], [0, -15]);
  const smoothSkew = useSpring(skewValue, { damping: 20, stiffness: 100 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const lines = [data.headlineLine1, data.headlineLine2, data.headlineLine3].filter(
    Boolean
  ) as string[];

  return (
    <section ref={containerRef} className="relative">
      <div className="relative min-h-screen flex flex-col pt-[70px] pb-8 px-6 md:px-10 xl:px-[70px] justify-between overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Drei Fassungen desselben Videos, geladen wird genau eine: der Browser
              nimmt die erste Quelle, die er abspielen kann. AV1 (Chrome, Edge,
              Firefox) ist bei weniger Bytes besser als H.264, HEVC deckt Safari
              ab, H.264 bleibt der Fallback für alles andere.
              ⚠️ Die codecs=-Angaben müssen zu den Dateien passen — stimmt eine
              nicht, überspringt der Browser die Quelle stillschweigend. Gebaut
              und ausgegeben werden sie von scripts/build-header-video.mjs. */}
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/header-video-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/header-video-av1.mp4" type='video/mp4; codecs="av01.0.08M.08"' />
            <source src="/header-video-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L120.B0"' />
            <source src="/header-video.mp4" type='video/mp4; codecs="avc1.640028"' />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
        </div>

        <div className="relative flex-1 flex flex-col justify-center items-start w-full z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
            style={{ skewY: smoothSkew }}
          >
            <h1 className="font-gotham text-[16vw] sm:text-[13vw] lg:text-[10.5vw] leading-[0.95] font-bold italic tracking-[-0.03em] uppercase text-white flex flex-col">
              {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block overflow-hidden">
                  {/* pr verhindert, dass der Italic-Überhang des letzten Buchstabens abgeschnitten wird */}
                  <span className="flex pr-[0.1em]">
                    {line.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {char === " " ? " " : char}
                      </motion.span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>
            {data.subheadline && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="font-garamond-semibold-italic text-[clamp(1.5rem,3vw,3rem)] text-white mt-6"
              >
                {data.subheadline}
              </motion.p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative flex justify-between font-gotham text-meta text-white w-full z-10"
        >
          <div className="text-left">{data.cornerLeft}</div>
          <div className="text-right">{data.cornerRight}</div>
        </motion.div>
      </div>

      {/* Swoosh sitzt wie im Figma auf der Unterkante des Videos (halb drüber, halb drunter) */}
      <Swoosh className="relative z-10 mx-auto -mt-7 w-[clamp(12rem,25vw,30.5rem)] text-white" />
    </section>
  );
}
