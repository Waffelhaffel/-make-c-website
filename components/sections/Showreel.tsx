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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <MotionSection className="relative py-20 md:py-32 px-6 md:px-12 bg-makec-dark overflow-hidden">
      {/* Diagonal Lines Background SVG */}
      <div className="absolute inset-0 z-0 opacity-[0.08]">
        <svg 
          viewBox="0 0 2048 1707" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path fill="white" fillOpacity="0.956863" d="M 1732.63 166.292 C 1735.06 167.153 1734.34 166.372 1735.45 168.113 C 1707.1 218.323 1675.21 270.342 1645.8 320.161 L 1471.91 614.648 L 963.815 1475.01 L 961.823 1474.72 C 961.516 1471.73 963.122 1469.38 964.813 1466.52 C 992.47 1419.79 1020.16 1372.94 1047.77 1326.19 L 1218.4 1037.2 L 1732.63 166.292 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1999.28 166.481 L 2001.21 167.073 L 2001.84 168.329 C 1975.01 217.009 1941.58 270.663 1912.96 319.144 L 1738.94 613.87 L 1229.9 1475.86 L 1227.5 1473.88 C 1229.34 1469.32 1244.34 1444.73 1247.71 1439.02 L 1293.18 1362 L 1451.54 1093.82 L 1999.28 166.481 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 948.018 166.343 L 950.145 167.099 L 950.692 168.29 C 925.613 213.983 893.293 265.772 866.422 311.283 L 701.789 590.131 L 178.986 1475.66 L 176.422 1474.35 C 176.822 1470.66 332.339 1209.02 347.968 1182.56 L 948.018 166.343 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1206.99 166.33 L 1209.14 167.109 L 1209.69 168.293 C 1200.58 185.06 1189.04 203.604 1179.27 220.14 L 1123.85 313.952 L 954.214 601.24 L 437.954 1475.63 L 435.999 1474.68 C 435.616 1472.03 438.163 1468.09 439.622 1465.65 C 465.519 1422.41 491.065 1378.88 516.686 1335.49 L 683.234 1053.44 L 1206.99 166.33 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1599.41 166.424 L 1601.88 167.425 C 1601.64 171.828 889.695 1374.91 830.208 1475.64 L 828.042 1474.31 C 827.9 1471.5 854.376 1427.98 858.356 1421.24 L 921.607 1314.11 L 1115.46 985.774 L 1599.41 166.424 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1073.78 166.27 L 1076.53 167.617 C 1075.36 171.096 1063.87 189.918 1061.39 194.1 L 1024.69 256.146 L 876.825 506.565 L 304.777 1475.23 L 302.401 1474.53 C 302.288 1471.65 312.171 1456.19 314.255 1452.64 L 354.484 1384.48 L 499.828 1138.3 L 1073.78 166.27 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1865.94 166.301 L 1868.13 167.139 L 1868.65 168.29 C 1841.8 216.037 1810.83 266.413 1782.83 313.822 L 1615.58 597.065 L 1096.88 1475.6 C 1094.8 1474.8 1095.62 1475.51 1094.26 1473.61 C 1103.06 1457.14 1114.72 1438.49 1124.3 1422.29 L 1179.89 1328.19 L 1349.43 1041.06 L 1865.94 166.301 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1340.41 166.415 C 1342.38 167.074 1341.51 166.568 1343.04 167.919 C 1335.38 182.962 1322.76 202.906 1313.99 217.731 L 1260.53 308.223 L 1093.24 591.541 L 571.236 1475.65 L 568.868 1474.4 C 568.761 1471.74 657.375 1322.9 665.179 1309.7 L 853.34 991.106 L 1340.41 166.415 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 1466.01 166.344 L 1468.46 167.302 C 1468.54 171.538 779.576 1335.47 696.958 1475.64 L 694.928 1474.71 C 694.314 1472.23 694.727 1472.45 696.51 1469.37 L 1466.01 166.344 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 814.811 166.252 L 817.541 167.608 C 815.995 171.838 803.431 192.347 800.631 197.086 L 760.398 265.15 L 606.648 525.53 L 46.2626 1474.52 C 45.8927 1474.66 44.7054 1474.62 44.238 1474.63 C 43.6395 1469.95 68.0866 1430.87 72.2048 1423.89 L 128.78 1328.07 L 299.352 1039.2 L 814.811 166.252 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 2003.62 384.722 C 2005.65 392.561 1997.01 402.097 1993.14 408.743 C 1981.42 429.164 1969.51 449.476 1957.41 469.677 L 1863.59 628.514 L 1477.68 1282.04 L 1396.47 1419.73 C 1391.01 1428.99 1366.59 1471.71 1361.93 1476.15 L 1361.27 1473.9 C 1362.49 1468.46 1392.5 1419.56 1396.87 1412.17 L 1499.84 1237.77 L 2003.62 384.722 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 681.488 166.351 L 683.987 167.344 C 684.198 169.466 87.2366 1179.44 45.2193 1250.51 L 44.5168 1251.43 L 43.8013 1249.47 C 44.1518 1245.45 45.9606 1242.26 48.0388 1238.78 C 70.2239 1201.69 92.1742 1164.35 114.129 1127.13 L 258.085 883.306 L 681.488 166.351 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 2003.52 610.673 C 2004.78 615.726 2004.02 616.611 2001.49 620.892 L 1626.83 1255.27 C 1611.4 1281.41 1502 1470.65 1494.98 1476.07 C 1493.8 1471.21 1508.21 1449.35 1511.74 1443.37 L 1545.39 1386.37 L 1655.11 1200.55 L 2003.52 610.673 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 548.195 166.508 L 550.297 167.27 C 550.344 170.925 500.601 253.654 494.357 264.234 L 380.953 456.258 L 45.0672 1025.11 L 44.4299 1025.5 C 43.2104 1022.78 43.9283 1020.3 45.3828 1017.83 C 66.6042 981.792 87.8956 945.792 109.162 909.778 L 237.812 691.912 L 548.195 166.508 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 2003.41 836.648 C 2003.99 838.241 2004.67 840.489 2003.89 841.983 C 1999.02 851.239 1992.09 862.56 1986.92 871.301 L 1935.04 958.978 L 1695.64 1364.52 C 1687.1 1378.97 1634.52 1472.16 1628.07 1475.9 L 1627.65 1474.4 C 1628.41 1469.41 1707.83 1337.01 1715.24 1324.47 L 2003.41 836.648 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 414.922 166.287 L 417.008 167.184 C 417.478 171.027 409.599 181.867 407.46 185.501 C 370.696 247.977 333.764 310.454 296.908 372.869 L 45.5229 798.604 L 44.6349 799.773 L 43.8339 798.491 C 43.7861 795.334 44.5665 793.098 46.2316 790.356 C 59.3671 768.722 72.2041 746.605 85.0768 724.82 L 166.652 586.689 L 414.922 166.287 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 2003.76 1048.73 C 2003.94 1049.72 2004.48 1053.06 2004.21 1053.56 C 1993.62 1073.11 1955.43 1138.26 1946.79 1152.01 C 1925.34 1186.13 1761.1 1470.59 1753.97 1476.05 C 1753.83 1475.08 1753.69 1474.1 1753.55 1473.12 C 1810.74 1375.08 1957.52 1127.04 2003.76 1048.73 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 281.59 166.314 L 284.132 167.514 C 283.58 171.397 225.918 267.334 218.3 280.218 L 45.6847 572.55 L 44.9403 573.571 L 43.9612 572.788 C 44.0187 568.709 46.6105 563.645 48.7026 560.178 C 73.6282 518.87 98.1045 477.042 122.639 435.497 L 281.59 166.314 z"/>
          <path fill="white" fillOpacity="0.952941" d="M 2003.65 1274.7 C 2004.96 1279.94 2003.8 1281.22 2001.27 1285.51 C 1990.55 1303.73 1979.8 1321.93 1969.06 1340.13 L 1917.84 1426.88 C 1913.63 1434 1891.9 1472.77 1887.07 1475.92 L 1886.63 1474.4 C 1887.42 1469.26 1992.48 1293.61 2003.65 1274.7 z"/>
          <path fill="white" fillOpacity="0.956863" d="M 148.323 166.449 C 149.613 166.863 149.478 166.937 150.629 167.733 C 149.322 172.54 126.659 209.586 122.47 216.68 L 45.2844 347.449 L 43.9467 347.546 C 43.5225 345.131 43.912 343.101 45.147 340.997 C 56.3683 321.879 67.9631 302.29 79.1947 283.257 L 148.323 166.449 z"/>
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
          {/* Header Text */}
          <div className="text-center">
            <span className="block text-xs md:text-sm font-medium text-makec-blue italic tracking-widest mb-4">
              / High-End Produktion für skalierbare Video-Systeme /
            </span>
            
            {/* Mixed Typography Title */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
              <span className="font-bold italic font-gotham">SHOW</span>
              <span className="font-garamond font-semibold italic">REEL</span>
            </h2>
          </div>

          {/* Video Container */}
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
                  {/* Thumbnail Image */}
                  <Image
                    src="/thumbnail_Showreel.png"
                    alt="Showreel Thumbnail"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      <Play size={36} className="text-makec-dark ml-1" fill="#14140F" />
                    </motion.div>
                    
                    {/* Play/Pause Label */}
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
                  <video
                    ref={videoRef}
                    src="/Makec_Reel 1.mp4"
                    className="w-full h-full object-contain bg-black"
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
