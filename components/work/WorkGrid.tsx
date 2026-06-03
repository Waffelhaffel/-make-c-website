"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import type { CaseStudySummary } from "@/sanity/types";

type WorkGridProps = {
  caseStudies: CaseStudySummary[];
};

export function WorkGrid({ caseStudies }: WorkGridProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
          Referenzen
        </h1>
        <p className="text-gray-400 mt-4 tracking-widest uppercase text-sm">
          Portfolio — 2024 / 2025
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((item, i) => {
          const image = item.thumbnailImage ?? item.heroImage;
          const imageUrl = hasImageAsset(image)
            ? urlFor(image).width(900).height(1100).fit("crop").auto("format").url()
            : null;
          const alt = image?.alt || item.projectMeta.client;

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <Link
                href={`/work/${item.slug}`}
                className="block aspect-[4/5] bg-neutral-900 border border-white/5 rounded-sm overflow-hidden relative"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs text-gray-300 uppercase tracking-widest mb-2">
                    {item.projectMeta.client} · {item.projectMeta.year}
                  </p>
                  <h3 className="text-xl font-bold uppercase tracking-tight">
                    {item.project}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {caseStudies.length === 0 && (
        <p className="text-center text-white/50 text-sm mt-20">
          Noch keine Case Studies veröffentlicht.
        </p>
      )}
    </>
  );
}
