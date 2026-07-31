"use client";

import { useState, useRef } from "react";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import type { LandingShowreel } from "@/lib/content/types";

type ShowreelProps = {
  data: LandingShowreel;
};

function detectVideoKind(url: string | undefined): "vimeo" | "youtube" | "file" | null {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes("vimeo.com")) return "vimeo";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  return "file";
}

function vimeoEmbedUrl(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!m) return null;
  return `https://player.vimeo.com/video/${m[1]}?autoplay=1&title=0&byline=0&portrait=0`;
}

function youtubeEmbedUrl(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  if (!m) return null;
  return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
}

export function Showreel({ data }: ShowreelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = data.videoUrl;
  const kind = detectVideoKind(videoUrl);
  const isEmbed = kind === "vimeo" || kind === "youtube";
  const embedSrc =
    kind === "vimeo" && videoUrl
      ? vimeoEmbedUrl(videoUrl)
      : kind === "youtube" && videoUrl
        ? youtubeEmbedUrl(videoUrl)
        : null;

  const handlePlay = () => {
    setIsPlaying(true);
    if (!isEmbed) videoRef.current?.play();
  };

  const handleClose = () => {
    setIsPlaying(false);
    if (!isEmbed) {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <MotionSection className="relative pt-16 md:pt-20 pb-16 md:pb-24 px-6 md:px-12 bg-makec-blue overflow-hidden">
      <div className="relative max-w-[1480px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center">
            {/* Headline überlappt wie im Figma die Oberkante des Players */}
            <MixedHeadline
              variant="display"
              part1={data.headlinePart1}
              part2={data.headlinePart2}
              slash
              className="relative z-10 -mb-[0.55em] pointer-events-none"
            />
          </div>

          <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl shadow-black/40">
            <AnimatePresence mode="wait">
              {!isPlaying ? (
                <motion.button
                  type="button"
                  key="thumbnail"
                  aria-label="Showreel abspielen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative block w-full h-full cursor-pointer group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:-outline-offset-4"
                  onClick={handlePlay}
                >
                  <Image
                    src={data.thumbnail.src}
                    alt={data.thumbnail.alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-24 h-24 md:w-[10.4vw] md:h-[10.4vw] md:max-w-[200px] md:max-h-[200px] rounded-full bg-white flex items-center justify-center shadow-lg"
                    >
                      <Play className="text-makec-dark ml-1 w-9 h-9 md:w-[3.5vw] md:h-[3.5vw] md:max-w-16 md:max-h-16" fill="currentColor" />
                    </motion.div>

                    <span className="mt-5 uppercase text-white text-base md:text-lg">
                      <span className="font-garamond font-semibold italic">Play</span>
                      <span className="font-garamond font-semibold italic">/</span>
                      <span className="font-gotham font-bold italic text-[0.875em]">Pause</span>
                    </span>
                  </div>
                </motion.button>
              ) : (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                  onContextMenu={handleContextMenu}
                >
                  {isEmbed && embedSrc ? (
                    <iframe
                      src={embedSrc}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title="Showreel"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-full object-contain bg-black"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      playsInline
                      onEnded={handleClose}
                      onContextMenu={handleContextMenu}
                    />
                  )}

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 px-4 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full text-white text-xs uppercase tracking-widest transition-colors"
                    aria-label="Video schließen"
                  >
                    Schließen
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
