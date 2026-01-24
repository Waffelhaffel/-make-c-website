"use client";

import { SELECTED_WORK } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight } from "lucide-react";

export function SelectedWork() {
  return (
    <section id="work" className="relative bg-makec-dark overflow-hidden">
      {/* Diagonal Lines Background SVG */}
      <div className="absolute inset-0 z-0 opacity-[0.07]">
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
        </svg>
      </div>


      <div className="relative z-10">
        {/* Section Title */}
        <div className="py-16 md:py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-center">
              <span className="font-bold italic font-gotham">SELECTED</span>
              <span className="font-garamond font-normal italic">WORK</span>
            </h2>
          </div>
        </div>

        {/* Image Grid - No gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {SELECTED_WORK.map((project) => (
            <Link 
              key={project.slug} 
              href={`/work/${project.slug}`} 
              className="block group relative"
              data-cursor="VIEW"
            >
              <motion.div
                className="w-full overflow-hidden bg-makec-dark relative aspect-[4/3]"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-200 mb-2">
                    Case Study
                  </p>
                  <p className="text-xl md:text-3xl font-bold leading-tight text-white uppercase tracking-tight">
                    {project.name}
                  </p>
                  <span className="text-xs text-gray-300 mt-2 font-medium tracking-widest">{project.year}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Button */}
        <div className="py-14 md:py-20 flex justify-center px-6">
          <Magnetic strength={0.3}>
            <Link 
              href="/work" 
              className="group relative inline-flex items-center justify-center px-8 py-4 border border-white/30 rounded-full overflow-hidden transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              <span className="relative text-sm font-medium tracking-[0.15em] text-white">
                Alle Referenzen anzeigen
              </span>
              <ArrowRight className="ml-3 w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
