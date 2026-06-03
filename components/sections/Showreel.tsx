"use client";

import { useState, useRef } from "react";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { LandingShowreel } from "@/sanity/types";

type ShowreelProps = {
  data: LandingShowreel;
};

const DEFAULT_VIDEO_SRC = "/Makec_Reel 1.mp4";
const DEFAULT_THUMBNAIL = "/thumbnail_Showreel.png";

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

  const thumbnailSrc = hasImageAsset(data.thumbnail)
    ? urlFor(data.thumbnail).width(1600).quality(85).auto("format").url()
    : DEFAULT_THUMBNAIL;

  const videoUrl = data.videoUrl;
  const kind = detectVideoKind(videoUrl);
  const localFileSrc = kind === "file" && videoUrl ? videoUrl : DEFAULT_VIDEO_SRC;
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
    <MotionSection className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-dark overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.08]">
        <svg viewBox="0 0 2048 1707" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <path fill="white" fillOpacity="0.956863" d="M 1732.63 166.292 C 1735.06 167.153 1734.34 166.372 1735.45 168.113 C 1707.1 218.323 1675.21 270.342 1645.8 320.161 L 1471.91 614.648 L 963.815 1475.01 L 961.823 1474.72 C 961.516 1471.73 963.122 1469.38 964.813 1466.52 C 992.47 1419.79 1020.16 1372.94 1047.77 1326.19 L 1218.4 1037.2 L 1732.63 166.292 z" />
          <path fill="white" fillOpacity="0.956863" d="M 1999.28 166.481 L 2001.21 167.073 L 2001.84 168.329 C 1975.01 217.009 1941.58 270.663 1912.96 319.144 L 1738.94 613.87 L 1229.9 1475.86 L 1227.5 1473.88 C 1229.34 1469.32 1244.34 1444.73 1247.71 1439.02 L 1293.18 1362 L 1451.54 1093.82 L 1999.28 166.481 z" />
          <path fill="white" fillOpacity="0.956863" d="M 948.018 166.343 L 950.145 167.099 L 950.692 168.29 C 925.613 213.983 893.293 265.772 866.422 311.283 L 701.789 590.131 L 178.986 1475.66 L 176.422 1474.35 C 176.822 1470.66 332.339 1209.02 347.968 1182.56 L 948.018 166.343 z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-10 md:space-y-14"
        >
          <div className="text-center">
            {data.kicker && (
              <span className="block text-xs md:text-sm font-medium text-makec-blue italic tracking-widest mb-4">
                {data.kicker}
              </span>
            )}
            <h2 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
              {data.headlinePart1 && (
                <span className="font-bold italic font-gotham">{data.headlinePart1}</span>
              )}
              {data.headlinePart2 && (
                <span className="font-garamond font-semibold italic text-[1.15em]">
                  {data.headlinePart2}
                </span>
              )}
            </h2>
          </div>

          <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black overflow-hidden shadow-2xl shadow-black/60">
            <AnimatePresence mode="wait">
              {!isPlaying ? (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handlePlay}
                >
                  <Image
                    src={thumbnailSrc}
                    alt="Showreel Thumbnail"
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
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      <Play size={36} className="text-makec-dark ml-1" fill="#14140F" />
                    </motion.div>

                    <span className="mt-4 text-xs md:text-sm uppercase tracking-[0.25em] text-white font-medium italic">
                      PLAY/PAUSE
                    </span>
                  </div>
                </motion.div>
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
                      src={localFileSrc}
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
