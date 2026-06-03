"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

const ClientStudio = dynamic(
  async () => {
    const { default: config } = await import("@/sanity.config");
    return function ConfiguredStudio() {
      return <NextStudio config={config} />;
    };
  },
  { ssr: false }
);

export function Studio() {
  return <ClientStudio />;
}
