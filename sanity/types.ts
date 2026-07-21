import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

export type SanityImage = Image & {
  alt?: string;
};

export type Location = {
  city: string;
  address: string[];
};

export type SocialLink = {
  label: string;
  url?: string;
};

export type SiteSettings = {
  email: string;
  phone?: string;
  locations: Location[];
  socials?: SocialLink[];
  footerHeadline?: {
    lineOne?: string;
    lineTwo?: string;
  };
  copyright?: string;
};

export type LegalPage = {
  _id: string;
  title: string;
  slug: string;
  body: PortableTextBlock[];
  effectiveDate?: string;
};

export type LandingHero = {
  headlineLine1?: string;
  headlineLine2?: string;
  headlineLine3?: string;
  subheadline?: string;
  cornerLeft?: string;
  cornerCenter?: string;
  cornerRight?: string;
};

export type StatIcon = "users" | "play" | "mapPin";

export type LandingStatItem = {
  icon?: StatIcon;
  number?: string;
  label?: string;
  subtext?: string;
};

export type LandingStats = {
  kicker?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  items?: LandingStatItem[];
};

export type LandingShowreel = {
  kicker?: string;
  headlinePart1?: string;
  headlinePart2?: string;
  thumbnail?: SanityImage;
  videoUrl?: string;
};

export type LandingApproach = {
  headlineLine1?: string;
  headlineLine2?: string;
  kicker?: string;
  paragraphs?: string[];
  closing?: string;
};

export type LandingInsight = {
  headlineLine1?: string;
  headlineLine2?: string;
  kicker?: string;
  body?: string;
};

export type LandingAbout = {
  quoteLine1?: string;
  quoteLine2?: string;
  powerWords?: { label: string }[];
  teamTitlePart1?: string;
  teamTitlePart2?: string;
  teamImage?: SanityImage;
  kicker?: string;
  paragraphs?: string[];
};

export type LandingQuestions = {
  headlineLine1?: string;
  headlineLine2?: string;
  linkText?: string;
};

export type LandingTestimonial = {
  _key?: string;
  quote: string;
  author: string;
  role?: string;
  rating?: number;
};

export type LandingTestimonials = {
  items?: LandingTestimonial[];
};

export type LandingLocationCard = {
  headlineLineOne?: string;
  headlineLineTwo?: string;
  cityLabel?: string;
  addressLine1?: string;
  addressLine2?: string;
  mapsUrl?: string;
};

export type LandingContact = {
  kicker?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  introLinkText?: string;
  ctaButtonText?: string;
  contactImage?: SanityImage;
  contactName?: string;
  contactRole?: string;
  phone?: string;
  email?: string;
  floatingCtaEnabled?: boolean;
  ctaLabel?: string;
  locations?: LandingLocationCard[];
};

export type ServiceItem = {
  _key?: string;
  title: string;
  description?: string;
};

export type Service = {
  _id: string;
  title: string;
  displayTitle?: string;
  slug: string;
  headline?: string;
  description: string;
  detailText?: string;
  features?: ServiceItem[];
  processSteps?: ServiceItem[];
  heroImage?: SanityImage;
  externalLink?: string;
  buttonText?: string;
  order?: number;
};

export type LandingPage = {
  hero?: LandingHero;
  stats?: LandingStats;
  showreel?: LandingShowreel;
  approach?: LandingApproach;
  insight?: LandingInsight;
  testimonials?: LandingTestimonials;
  about?: LandingAbout;
  questions?: LandingQuestions;
  contact?: LandingContact;
};

export type Headline = {
  lead: string;
  impact: string;
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

export type CaseStudySummary = Pick<
  CaseStudy,
  "_id" | "title" | "project" | "slug" | "projectMeta" | "thumbnailImage" | "heroImage"
>;
