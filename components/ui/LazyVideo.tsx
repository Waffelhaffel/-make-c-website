"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  /**
   * Standbild, das bis zum Start des Videos steht. Wichtig, weil `preload="none"`
   * bis zum Eintritt in den Viewport **gar nichts** lädt — ohne Poster ist der
   * Rahmen bis dahin eine schwarze Fläche.
   */
  poster?: string;
};

// Autoplay-Loop-Video, das erst kurz vor Erreichen des Viewports lädt und
// außerhalb pausiert — verhindert, dass alle Loops die initiale Ladezeit fressen.
export function LazyVideo({ src, className, poster }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ⚠️ Wer „Bewegung reduzieren" gesetzt hat, bekommt nur das Poster — das
    // Video wird gar nicht erst geladen. Die globale Regel in `globals.css`
    // greift hier nicht: sie kürzt CSS-Animationen und Übergänge, auf
    // `autoPlay` eines <video> hat sie keinen Einfluss. Seit die Startseite
    // sechs Loops gleichzeitig zeigt (12.08.2026) ist das kein Randfall mehr.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
        const video = ref.current;
        if (video && video.currentSrc) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
