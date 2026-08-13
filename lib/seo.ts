// Zentrale SEO-Konstanten. Eine Quelle für NAP-Daten (Name/Adresse/Telefon),
// Basis-URL und den Indexierungs-Schalter — damit Metadata, JSON-LD, sitemap.ts,
// robots.ts und llms.txt nie auseinanderlaufen können.

import type { Metadata } from "next";

/**
 * Basis-URL für canonical, OpenGraph und JSON-LD.
 * Ohne `NEXT_PUBLIC_SITE_URL` greift die Vercel-Preview-Domain.
 * ACHTUNG: `NEXT_PUBLIC_*` wird zur Build-Zeit inlined — nach dem Setzen auf
 * Vercel muss neu deployed werden (docs/MAINTENANCE.md §3.1).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://make-c-website.vercel.app"
).replace(/\/$/, "");

/**
 * Indexierung ist standardmäßig AUS (die Seite ist vor Go-Live).
 * Zum Freischalten `NEXT_PUBLIC_SEO_INDEX=true` setzen und neu deployen —
 * das steuert gleichzeitig `robots` im Layout und `app/robots.ts`.
 */
export const IS_INDEXABLE = process.env.NEXT_PUBLIC_SEO_INDEX === "true";

export type OrgLocation = {
  city: string;
  street: string;
  postalCode: string;
  region: string;
  latitude: number;
  longitude: number;
  /** Nur für den Standort mit eigener Rufnummer — landet als `telephone` am Place-Knoten. */
  telephone?: string;
};

// ⚠️ `ORG` ist seit 31.07.2026 die EINZIGE Quelle der NAP-Daten. `lib/content/site.ts`
// leitet die Footer-Adressen hier ab (`ORG.locations` → "KÖLN" / ["Picassoplatz 1",
// "50679 Köln"]) und nimmt auch `email` und `linkedin` von hier. Adresse also nur hier
// ändern — die frühere Doppelpflege mit `FOOTER_CONTENT` bzw. dem Sanity-Dokument
// `siteSettings` ist weg.
export const ORG = {
  name: "make/c",
  legalName: "make/c video content marketing GmbH",
  description:
    "make/c ist eine Agentur für Videoproduktion und Video-Marketing mit Standorten in Köln und Essen.",
  email: "info@make-c.de",
  /**
   * Zentrale Rufnummer. Wird an drei Stellen ausgegeben: Kontakt-Sektion
   * (`LANDING.contact.phone`), Organization- und Köln-Place-Knoten der JSON-LD.
   *
   * 13.08.2026 vom User vereinheitlicht: **eine** Nummer auf der ganzen Seite,
   * auch im Impressum (`lib/content/legal.ts`, dort mit „Fon: " davor). Damit
   * ist die NAP-Inkonsistenz erledigt, die hier seit 11.08.2026 vermerkt war —
   * vorher standen die Mobilnummer +49 178 8800035 (hier) und +49 221 – 4 56 –
   * 7 62 12 (Impressum) nebeneinander. Wer die Nummer ändert, ändert **beide**
   * Stellen.
   */
  telephone: "+49 221 456 76390",
  // Aus der vom User gelieferten Admin-URL (…/company/7263738/admin/dashboard/):
  // die numerische ID ist die stabile öffentliche Form, LinkedIn leitet auf den
  // Vanity-Namen weiter. Vorher stand hier ein geratener Vanity-Slug.
  linkedin: "https://www.linkedin.com/company/7263738/",
  facebook: "https://www.facebook.com/makec.video.content.marketing",
  instagram: "https://www.instagram.com/makec_agency/",
  locations: [
    {
      city: "Köln",
      street: "Picassoplatz 1",
      postalCode: "50679",
      region: "Nordrhein-Westfalen",
      latitude: 50.9345,
      longitude: 6.9721,
      // Dieselbe Nummer wie `ORG.telephone` — die sichtbare Kontaktzeile und die
      // strukturierten Daten müssen übereinstimmen (NAP-Konsistenz). Seit
      // 13.08.2026 ist das eine Kölner Festnetznummer, die Ortsvorwahl passt
      // hier also auch geografisch.
      telephone: "+49 221 456 76390",
    },
    {
      city: "Essen",
      street: "Sigsfeldstraße 5",
      postalCode: "45141",
      region: "Nordrhein-Westfalen",
      latitude: 51.4633,
      longitude: 7.0309,
    },
  ] satisfies OrgLocation[],
};

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

/** Route des Marken-OG-Bilds (app/og/route.tsx). */
export const OG_IMAGE_PATH = "/og";

export type PageMetadataParams = {
  /** Seitentitel. Läuft per Default durch `title.template` („… | make/c"). */
  title: string;
  description: string;
  /** Pfad ab Root, z. B. "/work" — wird für canonical und og:url absolut. */
  path: string;
  /**
   * `true`, wenn der Titel die Marke schon selbst trägt (die metaTitles der
   * Leistungsseiten tun das) — dann hängt das Layout-Template nichts mehr an.
   */
  absoluteTitle?: boolean;
  keywords?: string[];
  /**
   * Pfad der OG-Bild-Route. Default ist das Markenbild aus `app/og/route.tsx`;
   * die Leistungsseiten zeigen auf ihre eigene Variante.
   */
  ogImage?: string;
};

/**
 * Baut die Metadata einer Unterseite aus einer Quelle: Titel, Description,
 * canonical und OpenGraph.
 *
 * ⚠️ Warum es diesen Helfer gibt: Next merged `openGraph` **nicht** feldweise.
 * Eine Seite, die nur `title` und `description` setzt, erbt das komplette
 * `openGraph`-Objekt des Layouts — also og:title UND og:url der Startseite.
 * Genau das war auf /work, /impressum und /datenschutz der Fall: geteilte
 * Links zeigten Titel und URL der Startseite. Neue Unterseiten deshalb immer
 * über diesen Helfer, nicht per Hand.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  keywords,
  ogImage = OG_IMAGE_PATH,
}: PageMetadataParams): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${ORG.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: ORG.name,
      url: absoluteUrl(path),
      // Beim Teilen greift kein `title.template`, das die Marke anhängen
      // würde — der OG-Titel muss sie also selbst tragen.
      title: ogTitle,
      description,
      // Explizit statt über Nexts Dateikonvention — Begründung in
      // app/og/route.tsx. Relative Pfade macht `metadataBase` absolut.
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Wird einmalig im Layout ausgegeben. `ProfessionalService` erbt von
 * `LocalBusiness` und trägt beide Standorte — das ist das lokale Geo-Signal.
 *
 * Bewusst NICHT enthalten: `aggregateRating` / `review` — auch seit die
 * Testimonials echt sind (12.08.2026). Zwei Gründe: die Zitate tragen gar keine
 * Bewertung (`aggregateRating` bräuchte Zahlen, die es nicht gibt), und
 * Bewertungen, die ein Unternehmen über sich selbst ausgibt, sind bei Google
 * seit 2019 von Review-Rich-Results ausgeschlossen. Das würde sich erst ändern,
 * wenn Bewertungen mit Skala von einer unabhängigen Plattform kämen.
 */
export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORGANIZATION_ID,
        name: ORG.name,
        legalName: ORG.legalName,
        description: ORG.description,
        url: SITE_URL,
        email: ORG.email,
        telephone: ORG.telephone,
        sameAs: [ORG.linkedin, ORG.facebook, ORG.instagram],
        image: absoluteUrl("/makec-logo-icon.png"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/makec-logo-icon.png"),
        },
        address: ORG.locations.map((loc) => ({
          "@type": "PostalAddress",
          streetAddress: loc.street,
          postalCode: loc.postalCode,
          addressLocality: loc.city,
          addressRegion: loc.region,
          addressCountry: "DE",
        })),
        location: ORG.locations.map((loc) => ({
          "@type": "Place",
          name: `${ORG.name} ${loc.city}`,
          // Nur der Standort mit eigener Nummer bekommt sie — die Köln-Nummer
          // am Essener Place-Knoten wäre eine falsche NAP-Angabe.
          ...(loc.telephone ? { telephone: loc.telephone } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.street,
            postalCode: loc.postalCode,
            addressLocality: loc.city,
            addressRegion: loc.region,
            addressCountry: "DE",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
        })),
        areaServed: [
          { "@type": "City", name: "Köln" },
          { "@type": "City", name: "Essen" },
          { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
          { "@type": "Country", name: "Deutschland" },
        ],
        knowsLanguage: ["de", "en"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: ORG.name,
        inLanguage: "de-DE",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export type BreadcrumbEntry = { name: string; path: string };

export function breadcrumbGraph(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function faqGraph(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Übersichtsseite mit einer Liste von Arbeiten (aktuell nur /work).
 *
 * Die Cases tragen bewusst **kein** `url` — seit der Umstellung auf Modals
 * (Commit b890bf9) haben sie keine eigenen Seiten. Ein `url` hier wäre ein
 * Link ins Nichts. `CreativeWork` statt `VideoObject`, weil uns für letzteres
 * die Pflichtangaben (`contentUrl`, `uploadDate`) fehlen.
 */
export function collectionPageGraph(params: {
  name: string;
  description: string;
  path: string;
  items: { name: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(params.path)}#collection`,
    url: absoluteUrl(params.path),
    name: params.name,
    description: params.description,
    inLanguage: "de-DE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: params.items.length,
      itemListElement: params.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          creator: { "@id": ORGANIZATION_ID },
        },
      })),
    },
  };
}

export function serviceGraph(params: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(params.path)}#service`,
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    url: absoluteUrl(params.path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Essen" },
      { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
      { "@type": "Country", name: "Deutschland" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(params.path),
    },
  };
}
