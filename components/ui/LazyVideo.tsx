"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
};

// Autoplay-Loop-Video, das erst kurz vor Erreichen des Viewports lädt und
// außerhalb pausiert — verhindert, dass alle Loops die initiale Ladezeit fressen.
export function LazyVideo({ src, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
