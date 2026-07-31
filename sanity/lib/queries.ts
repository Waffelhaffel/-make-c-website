import { groq } from "next-sanity";

// Sanity liefert seit 07/2026 nur noch Case Studies. Entfernt wurden mit den
// zugehörigen Schemas: LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY,
// LEGAL_PAGE_BY_SLUG_QUERY, ALL_SERVICES_QUERY und SERVICE_BY_SLUG_QUERY.

const IMAGE_PROJECTION = `{
  _type,
  asset,
  crop,
  hotspot,
  alt
}`;

// Volle Case-Projektion — geteilt zwischen Landing/Work-Grid und den
// Leistungsseiten, damit das Modal überall dieselben Felder bekommt.
const CASE_STUDY_PROJECTION = `{
    _id,
    title,
    "slug": slug.current,
    kicker,
    project,
    intro,
    introHeading,
    summary,
    services,
    projectMeta,
    headline,
    "credits": credits[]{_key, role, name},
    heroImage ${IMAGE_PROJECTION},
    mainMedia{
      posterImage ${IMAGE_PROJECTION},
      videoUrl
    },
    solution{
      heading,
      body,
      imageLeft ${IMAGE_PROJECTION},
      imageRight ${IMAGE_PROJECTION},
      footerLabel
    },
    gallery[]{
      _key,
      ratio,
      image ${IMAGE_PROJECTION}
    },
    thumbnailImage ${IMAGE_PROJECTION},
    seo{
      metaTitle,
      metaDescription,
      ogImage ${IMAGE_PROJECTION}
    }
  }`;

// Volle Projektion aller Cases (für Modal + /work-Grid). 18 Dokumente →
// einmalig serverseitig laden ist billig; kein Detailseiten-Fetch mehr nötig.
export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy" && (featured == true || !defined(featured))] | order(coalesce(order, 100) asc, _createdAt desc)${CASE_STUDY_PROJECTION}
`;

// Gezielt die Cases einer Leistungsseite. Bewusst OHNE `featured`-Filter: die
// Seite kuratiert die Slugs selbst, ein späteres Entfernen des featured-Flags
// soll die Detailseiten nicht stillschweigend leeren.
export const CASE_STUDIES_BY_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && slug.current in $slugs]${CASE_STUDY_PROJECTION}
`;

// Änderungszeitstempel für app/sitemap.ts. Seit 07/2026 nur noch `/work`: die
// übrigen Seiten sind hartcodiert und haben damit — wie /leistungen schon vorher —
// keinen echten Änderungszeitstempel mehr.
export const NEWEST_CASE_UPDATED_AT_QUERY = groq`
  *[_type == "caseStudy"] | order(_updatedAt desc)[0]._updatedAt
`;
