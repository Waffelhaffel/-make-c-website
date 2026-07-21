import type { SchemaTypeDefinition } from "sanity";

import { caseStudy } from "./documents/caseStudy";
import { landingPage } from "./documents/landingPage";
import { legalPage } from "./documents/legalPage";
import { service } from "./documents/service";
import { siteSettings } from "./documents/siteSettings";
import { ctaSection } from "./objects/ctaSection";
import { galleryItem } from "./objects/galleryItem";
import { headline } from "./objects/headline";
import { location } from "./objects/location";
import { locationCard } from "./objects/locationCard";
import { mainMedia } from "./objects/mainMedia";
import { powerWord } from "./objects/powerWord";
import { projectMeta } from "./objects/projectMeta";
import { seo } from "./objects/seo";
import { socialLink } from "./objects/socialLink";
import { solutionSection } from "./objects/solutionSection";
import { statItem } from "./objects/statItem";
import { testimonial } from "./objects/testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  caseStudy,
  landingPage,
  siteSettings,
  legalPage,
  service,
  // Objects
  headline,
  projectMeta,
  mainMedia,
  solutionSection,
  ctaSection,
  galleryItem,
  seo,
  location,
  socialLink,
  statItem,
  locationCard,
  powerWord,
  testimonial,
];
