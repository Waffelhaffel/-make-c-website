"use client";

export function Grain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay">
      <svg className="h-full w-full">
        <filter id="grainy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainy)" />
      </svg>
    </div>
  );
}

