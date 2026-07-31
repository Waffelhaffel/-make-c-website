"use client";

import { useEffect, useRef } from "react";

type WaveFieldProps = {
  /** Anzahl der Wellenlinien */
  lineCount?: number;
  /** jede n-te Linie im Akzentblau (#2C2CC6) */
  accentEvery?: number;
  /** Tempo-Faktor; 1 = Standard */
  speed?: number;
  className?: string;
};

const ACCENT = "44, 44, 198"; // makec-blue #2C2CC6

// Drei überlagerte Sinuswellen je Linie. Die Frequenzen sind bewusst nicht
// ganzzahlig zueinander, sonst entsteht ein sichtbar periodisches Muster.
const HARMONICS = [
  { freq: 1.0, amp: 1.0, drift: 0.18 },
  { freq: 2.3, amp: 0.42, drift: -0.27 },
  { freq: 4.1, amp: 0.19, drift: 0.41 },
];

/**
 * Animierter Wellen-Hintergrund im Marker-Look (weiße Linien auf makec-dark,
 * einzelne Linien im Akzentblau) — dasselbe visuelle Vokabular wie die
 * handgezeichneten Platzhaltergrafiken.
 *
 * Drei Dinge, die hier bewusst so gebaut sind:
 * 1. `prefers-reduced-motion` wird selbst geprüft. `MotionConfig
 *    reducedMotion="user"` in SiteEffects.tsx greift nur für framer-motion,
 *    nicht für ein eigenes Canvas.
 * 2. Der rAF-Loop rechnet mit deltaTime statt mit Frame-Zählern — sonst läuft
 *    die Animation auf 120-Hz-Displays doppelt so schnell.
 * 3. Ein IntersectionObserver pausiert außerhalb des Viewports (Idiom aus
 *    LazyVideo.tsx), damit die Seite beim Scrollen keine Rechenzeit verbrennt.
 */
export function WaveField({
  lineCount = 18,
  accentEvery = 6,
  speed = 1,
  className = "",
}: WaveFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let last = 0;
    let t = 0;
    let visible = true;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      // DPR auf 2 deckeln: darüber kostet es spürbar Füllrate, ohne dass man
      // bei 1px-Linien noch einen Unterschied sieht.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const steps = 42;
      const dx = width / steps;
      // Amplitude relativ zur Höhe, damit es in flachen und hohen Containern
      // gleich gut aussieht.
      const baseAmp = Math.min(height * 0.09, 56);

      for (let i = 0; i < lineCount; i++) {
        const p = i / Math.max(1, lineCount - 1);
        const baseY = height * (0.12 + p * 0.76);
        const isAccent = accentEvery > 0 && i % accentEvery === accentEvery - 1;
        // Linien laufen nach unten hin aus — erzeugt Tiefe ohne Verlauf-Overlay.
        const alpha = isAccent ? 0.55 - p * 0.25 : 0.28 - p * 0.24;

        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const x = s * dx;
          const u = s / steps;
          let y = baseY;
          for (const h of HARMONICS) {
            y +=
              Math.sin(u * Math.PI * 2 * h.freq + t * h.drift + i * 0.55) *
              baseAmp *
              h.amp *
              // Ränder leicht beruhigen, damit die Linien nicht abgeschnitten wirken
              Math.sin(Math.PI * u);
          }
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isAccent
          ? `rgba(${ACCENT}, ${Math.max(alpha, 0.06)})`
          : `rgba(255, 255, 255, ${Math.max(alpha, 0.04)})`;
        ctx.lineWidth = isAccent ? 1.5 : 1;
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      t += delta * speed;
      draw();
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (rafId || motionQuery.matches) return;
      last = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    resize();
    if (motionQuery.matches) {
      // Reduced Motion: genau ein statisches Bild, keine Schleife.
      draw();
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (motionQuery.matches || !rafId) draw();
    });
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (motionQuery.matches) return;
        if (visible) start();
        else stop();
      },
      { rootMargin: "200px" }
    );
    intersectionObserver.observe(parent);

    const onMotionChange = () => {
      if (motionQuery.matches) {
        stop();
        draw();
      } else if (visible) {
        start();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [lineCount, accentEvery, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
