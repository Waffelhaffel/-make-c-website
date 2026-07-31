import type { Image } from "sanity";

// Typen der Sanity-Inhalte. Seit 07/2026 verwaltet Sanity nur noch die Case
// Studies — die Landing-, Service-, SiteSettings- und Legal-Typen sind nach
// `lib/content/types.ts` gewandert und beschreiben dort hartcodierten Inhalt.

export type SanityImage = Image & {
  alt?: string;
};

export type ProjectMeta = {
  client: string;
  year: string;
  category: string;
  studio?: string;
};

export type MainMedia = {
  posterImage: SanityImage;
  videoUrl?: string;
};

export type GalleryItem = {
  _key: string;
  image: SanityImage;
  ratio: "wide" | "tall" | "standard";
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
};

export type CreditItem = {
  _key: string;
  role: string;
  name: string;
};

// ── Archiv: stammt aus der früheren Case-Detailseite (bis Commit b890bf9).
// Wird weiter abgefragt und getypt, aber vom Modal nicht gerendert. Im Studio
// unter „Archiv (nicht sichtbar)" gruppiert.
export type Headline = {
  lead: string;
  impact: string;
};

export type SolutionSection = {
  heading: string;
  body: string;
  imageLeft: SanityImage;
  imageRight: SanityImage;
  footerLabel?: string;
};

export type CtaSection = {
  title: string;
  text: string;
  mail: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  kicker?: string;
  project: string;
  intro?: string;
  introHeading?: string;
  summary: string;
  services?: string[];
  projectMeta: ProjectMeta;
  headline: Headline;
  heroImage: SanityImage;
  mainMedia: MainMedia;
  solution: SolutionSection;
  gallery?: GalleryItem[];
  credits?: CreditItem[];
  thumbnailImage?: SanityImage;
  seo?: Seo;
};
