import type { MetadataRoute } from "next";

import { IS_INDEXABLE, absoluteUrl } from "@/lib/seo";

// Ersetzt die frühere statische public/robots.txt (die enthielt `Disallow: /`
// und hätte diesen Route Handler überstimmt — eine Datei in public/ gewinnt
// immer gegen eine gleichnamige Route).
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
