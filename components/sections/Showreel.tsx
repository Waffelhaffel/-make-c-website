"use client";

import { useState, useRef } from "react";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

export function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleClose = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
    videoRef.current && (videoRef.current.currentTime = 0);
  };

  // Prevent right-click and download
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <MotionSection className="relative py-16 md:py-32 px-6 md:px-12 bg-black border-b border-zinc-900/60 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Showreel_background.png"
          alt="Showreel Background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Optional overlay for better text readability */}
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
              Showreel
            </h2>
            <p className="text-gray-400 font-light text-lg tracking-wide">
              High-End Production für skalierbare Systeme.
            </p>
            <div className="h-px w-16 bg-white/30 mx-auto mt-6" />
          </div>

          <div className="relative w-full max-w-6xl mx-auto aspect-video bg-black rounded-sm overflow-hidden group shadow-2xl shadow-black/50">
            <AnimatePresence mode="wait">
              {!isPlaying ? (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full cursor-pointer"
                  onClick={handlePlay}
                >
                  {/* Thumbnail Image - falls vorhanden, sonst Video-Poster */}
                  <div className="absolute inset-0 bg-zinc-950">
                    <video
                      src="/Makec_Reel 1.mp4"
                      className="w-full h-full object-cover opacity-90"
                      muted
                      playsInline
                      preload="metadata"
                      onContextMenu={handleContextMenu}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <Play size={28} className="text-white ml-1" fill="white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Subtle hint text */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <p className="text-xs text-white/60 uppercase tracking-[0.3em] font-medium">
                      Zum Abspielen klicken
                    </p>
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
                  <video
                    ref={videoRef}
                    src="/Makec_Reel 1.mp4"
                    className="w-full h-full object-contain"
                    controls
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    playsInline
                    onEnded={handleClose}
                    onContextMenu={handleContextMenu}
                  />
                  
                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-20 px-4 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full text-white text-xs uppercase tracking-widest transition-colors"
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
