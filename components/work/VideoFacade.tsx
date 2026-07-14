"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Video-Facade (Case-Study-Design "Variante 1a"): Poster mit pulsierendem
// Play-Kreis; Klick lädt den Player erst dann nach (kein iframe beim Pageload).
type VideoFacadeProps = {
  videoUrl: string | null;
  posterUrl: string | null;
  alt: string;
};

// Vimeo-/YouTube-URL → Embed-URL mit Autoplay; unbekannte Anbieter → null
// (dann wird die URL extern geöffnet).
function toEmbedUrl(url: string): string | null {
  const vimeoPlayer = url.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (vimeoPlayer) {
    return `${url}${url.includes("?") ? "&" : "?"}autoplay=1&title=0&byline=0&portrait=0`;
  }
  const vimeo = url.match(/(?:^|\/\/)(?:www\.)?vimeo\.com\/(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&title=0&byline=0&portrait=0`;
  }
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (youtube) {
    return `https://www.youtube.com/embed/${youtube[1]}?autoplay=1`;
  }
  return null;
}

export function VideoFacade({ videoUrl, posterUrl, alt }: VideoFacadeProps) {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  const handlePlay = () => {
    if (!videoUrl) return;
    const embed = toEmbedUrl(videoUrl);
    if (embed) {
      setEmbedSrc(embed);
    } else {
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (embedSrc) {
    return (
      <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
        <iframe
          src={embedSrc}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 w-full h-full border-0"
          title={alt}
        />
      </div>
    );
  }

  const facade = (
    <>
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={alt}
          fill
          className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          sizes="(max-width: 1180px) 100vw, 1180px"
        />
      ) : (
        <div className="absolute inset-0 bg-white/5" aria-hidden />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.08, 1], opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
          className="block"
        >
          <svg width="76" height="76" viewBox="0 0 76 76" fill="none" aria-hidden="true">
            <circle cx="38" cy="38" r="37" stroke="#fff" strokeWidth="1.4" />
            <path d="M31 26 L54 38 L31 50 Z" fill="#fff" />
          </svg>
        </motion.span>
      </span>
    </>
  );

  const frameClass =
    "group relative block w-full aspect-video overflow-hidden border border-white/10 bg-black";

  if (videoUrl) {
    return (
      <button type="button" onClick={handlePlay} aria-label="Video abspielen" className={`${frameClass} cursor-pointer`}>
        {facade}
      </button>
    );
  }

  return <div className={frameClass}>{facade}</div>;
}
