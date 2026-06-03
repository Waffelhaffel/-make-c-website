import { sanityFetch } from "./fetch";
import { SITE_SETTINGS_QUERY } from "./queries";
import type { SiteSettings } from "../types";
import { FOOTER_CONTENT } from "@/lib/data";

const FALLBACK: SiteSettings = {
  email: FOOTER_CONTENT.email,
  locations: FOOTER_CONTENT.locations.map((loc) => ({
    city: loc.city,
    address: loc.address,
  })),
  socials: FOOTER_CONTENT.socials.map((label) => ({ label })),
  footerHeadline: { lineOne: "LET'S", lineTwo: "TALK" },
  copyright: "make/c — © 2025",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });

  if (!data) return FALLBACK;

  return {
    email: data.email || FALLBACK.email,
    phone: data.phone,
    locations:
      data.locations && data.locations.length > 0 ? data.locations : FALLBACK.locations,
    socials: data.socials && data.socials.length > 0 ? data.socials : FALLBACK.socials,
    footerHeadline: data.footerHeadline ?? FALLBACK.footerHeadline,
    copyright: data.copyright || FALLBACK.copyright,
  };
}
