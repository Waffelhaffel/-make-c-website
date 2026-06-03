"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { LandingInsight } from "@/sanity/types";

type InsightGenerationProps = {
  data: LandingInsight;
};

export function InsightGeneration({ data }: InsightGenerationProps) {
  return (
    <section id="insights" className="relative">
      <div className="bg-makec-blue h-[120px] sm:h-[150px] md:h-[200px]" />

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-20">
          <div className="w-[150px] sm:w-[200px] md:w-[280px]">
            <Image
              src="/icon /gezeichnete_Linie2.png"
              alt=""
              width={280}
              height={80}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="relative bg-makec-dark py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center text-center md:text-left"
          >
            <div className="flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight">
                {data.headlineLine1 && (
                  <span className="font-garamond font-semibold italic text-makec-blue">
                    {data.headlineLine1}
                  </span>
                )}
                <br />
                {data.headlineLine2 && (
                  <span className="font-garamond font-semibold italic text-makec-blue">
                    {data.headlineLine2}
                  </span>
                )}
              </h2>
            </div>

            <div className="flex-1 max-w-lg">
              {data.kicker && (
                <span className="block text-sm font-medium text-makec-blue italic tracking-wide mb-3">
                  {data.kicker}
                </span>
              )}
              {data.body && (
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  {data.body}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
