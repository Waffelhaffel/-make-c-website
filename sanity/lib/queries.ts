import { groq } from "next-sanity";

const IMAGE_PROJECTION = `{
  _type,
  asset,
  crop,
  hotspot,
  alt
}`;

export const CASE_STUDY_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
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
  }
`;

export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy" && (featured == true || !defined(featured))] | order(coalesce(order, 100) asc, _createdAt desc){
    _id,
    title,
    project,
    "slug": slug.current,
    projectMeta,
    thumbnailImage ${IMAGE_PROJECTION},
    heroImage ${IMAGE_PROJECTION}
  }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    email,
    phone,
    locations[]{
      city,
      address
    },
    socials[]{
      label,
      url
    },
    footerHeadline{
      lineOne,
      lineTwo
    },
    copyright
  }
`;

export const LEGAL_PAGE_BY_SLUG_QUERY = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    body,
    effectiveDate
  }
`;

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(coalesce(order, 100) asc, _createdAt asc){
    _id,
    title,
    displayTitle,
    "slug": slug.current,
    headline,
    description,
    detailText,
    features[]{ _key, title, description },
    processSteps[]{ _key, title, description },
    heroImage ${IMAGE_PROJECTION},
    externalLink,
    buttonText,
    order
  }
`;

export const LANDING_PAGE_QUERY = groq`
  *[_type == "landingPage"][0]{
    hero{
      headlineLine1, headlineLine2, headlineLine3,
      subheadline,
      cornerLeft, cornerCenter, cornerRight
    },
    stats{
      kicker,
      headlineLine1, headlineLine2,
      items[]{ icon, number, label, subtext }
    },
    showreel{
      kicker,
      headlinePart1, headlinePart2,
      thumbnail ${IMAGE_PROJECTION},
      videoUrl
    },
    approach{
      headlineLine1, headlineLine2,
      kicker,
      paragraphs,
      closing
    },
    insight{
      headlineLine1, headlineLine2,
      kicker,
      body
    },
    about{
      quoteLine1, quoteLine2,
      powerWords[]{ label },
      teamTitlePart1, teamTitlePart2,
      teamImage ${IMAGE_PROJECTION},
      kicker,
      paragraphs
    },
    questions{
      headlineLine1, headlineLine2,
      linkText
    },
    contact{
      kicker,
      headlineLine1,
      headlineLine2,
      introLinkText,
      ctaButtonText,
      contactImage ${IMAGE_PROJECTION},
      contactName,
      contactRole,
      phone,
      email,
      floatingCtaEnabled,
      ctaLabel,
      locations[]{ headlineLineOne, headlineLineTwo, cityLabel, addressLine1, addressLine2, mapsUrl }
    }
  }
`;
