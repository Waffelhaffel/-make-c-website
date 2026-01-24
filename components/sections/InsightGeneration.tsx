"use client";

import { motion } from "framer-motion";

export function InsightGeneration() {
  return (
    <section id="insights" className="relative">
      {/* Top blue strip with wavy line */}
      <div className="bg-makec-blue py-10 md:py-14">
        <div className="flex justify-center">
          <div className="w-[180px] md:w-[260px]">
            <svg 
              viewBox="0 0 2048 1020" 
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <path 
                fill="white" 
                d="M 415.646 367.412 C 433.786 365.084 454.496 367.126 472.504 369.795 C 612.883 390.602 623.182 539.706 707.404 558.31 C 787.884 576.086 841.505 477.914 900.528 440.574 C 923.264 426.191 948.533 419.54 975.401 421.169 C 1059.06 426.241 1077.1 492.497 1125.43 544.739 C 1137.31 557.588 1150.2 568.389 1167.7 572.226 C 1183.58 575.707 1200.28 574.105 1215.91 570.132 C 1267.72 556.962 1288.98 525.96 1321.7 487.913 C 1340.11 466.502 1362.82 443.482 1386.63 428.259 C 1449.59 387.997 1480.69 426.281 1526.32 467.48 C 1538.23 478.235 1551.32 489.202 1567.44 492.596 C 1581.69 495.596 1596.55 492.504 1609.88 487.236 C 1648.57 471.949 1659.79 452.632 1686.41 424.392 C 1692.57 417.854 1699.16 410.402 1706.79 405.57 C 1709.54 403.833 1711.98 402.638 1715.31 403.366 C 1730.62 418.623 1690.9 448.193 1681.12 456.536 C 1652.76 480.736 1626.34 500.416 1588.24 504.753 C 1553.44 507.629 1519.87 483.855 1495.53 461.745 C 1468.05 436.776 1448.54 413.694 1409.1 431.446 C 1357.78 454.546 1333.19 501.972 1295.84 539.485 C 1283.66 551.79 1269.65 562.145 1254.32 570.187 C 1234.21 580.68 1208.18 588.555 1185.36 587.897 C 1088.43 585.1 1087.46 466.504 1001.79 439.73 C 989.192 435.89 976.025 434.258 962.871 434.904 C 907.276 437.239 871.669 482.666 834.275 518.803 C 782.423 568.911 717.543 600.082 655.925 545.688 C 647.105 537.903 639.711 526.29 632.276 516.952 C 611.581 490.961 593.863 462.283 571.477 437.695 C 551.335 415.592 524.774 397.709 496.003 388.731 C 454.512 375.784 396.874 379.177 355.866 393.42 C 338.026 399.616 321.568 409.319 305.972 420.025 C 293.153 428.825 284.932 442.837 272.209 450.96 C 269.846 452.468 267.985 451.994 265.781 451.219 C 261.7 444.295 269.409 436.692 274.026 431.289 C 308.74 390.671 363.643 371.411 415.646 367.412 z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content area with simple blue triangle on left */}
      <div className="relative bg-makec-dark min-h-[280px] md:min-h-[320px]">
        {/* Simple blue triangle on the left */}
        <div 
          className="absolute top-0 left-0 w-[25%] sm:w-[30%] md:w-[30%] h-full bg-makec-blue"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)'
          }}
        />

        {/* Content - positioned to the right of the triangle */}
        <div className="relative z-10 py-12 md:py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="ml-[28%] sm:ml-[25%] md:ml-[22%] flex flex-col md:flex-row gap-6 md:gap-12 items-start"
            >
              {/* Left: Label + Title */}
              <div className="flex-shrink-0">
                <span className="block text-xs font-medium text-gray-400 italic tracking-widest mb-3">
                  / Insights /
                </span>
                
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
                  <span className="font-garamond font-semibold italic text-makec-blue">Mehr Output.</span>
                  <br />
                  <span className="font-garamond font-semibold italic text-makec-blue">Mehr Insights.</span>
                </h2>
              </div>

              {/* Right: Description */}
              <div className="flex-1 text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-lg md:pt-6">
                <p>
                  Häufige Video-Produktion erzeugt Daten. Diese Daten zeigen gnadenlos, was funktioniert, was nicht konvertiert und wo Kommunikation bricht.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
