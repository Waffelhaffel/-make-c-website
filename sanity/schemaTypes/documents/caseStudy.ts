import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "team", title: "Team" },
    { name: "media", title: "Medien" },
    { name: "settings", title: "Einstellungen & SEO" },
    { name: "archive", title: "Archiv (nicht sichtbar)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Interner Titel",
      description: "Nur im Studio sichtbar (z. B. 'Merkur Powerclip 2024')",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL-Segment)",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      description: "Kleiner Header-Text über dem Projektnamen im Fenster, z. B. 'Case Merkur'",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "project",
      title: "Projektname",
      description: "Große Überschrift im Case-Fenster, z. B. 'Powerclip Campaign'",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Projektbeschreibung (Was wir gemacht haben)",
      description: "Der Fließtext im Case-Fenster.",
      type: "text",
      rows: 5,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Leistungen (Tags)",
      description: "Erscheinen als Tag-Reihe im Case-Fenster.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "content",
    }),
    defineField({
      name: "projectMeta",
      title: "Meta-Feld-Block (Kunde/Jahr/Kategorie/Studio)",
      description: "Kunde · Jahr · Kategorie erscheinen als Zeile unter dem Projektnamen.",
      type: "projectMeta",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    // ---------------- Team / Credits ----------------
    defineField({
      name: "credits",
      title: "Team / Credits (Rolle → Name)",
      description:
        "Wer welche Rolle hatte (Redaktion, Schnitt, Kamera …). Erscheint als zweispaltige Liste im Case-Fenster.",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          name: "creditItem",
          title: "Credit",
          fields: [
            defineField({
              name: "role",
              title: "Rolle",
              description: "Z. B. 'Regie', 'Kamera', 'Schnitt', 'Redaktion'",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "role", subtitle: "name" },
          },
        },
      ],
    }),

    // ---------------- Medien ----------------
    defineField({
      name: "heroImage",
      title: "Hero-Bild",
      description: "Wird im /work-Grid als Kachel-Fallback genutzt (wenn kein Thumbnail).",
      type: "image",
      options: { hotspot: true },
      group: "media",
      fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainMedia",
      title: "Video",
      description:
        "Poster-Bild + optionale Video-URL (Vimeo/YouTube). Mit URL erscheint ein Play-Button im Fenster; ohne URL wird nur das Poster gezeigt.",
      type: "mainMedia",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Produktionsbilder (bis zu 3)",
      description: "Bilder aus der Produktion — erscheinen unten im Case-Fenster.",
      type: "array",
      of: [{ type: "galleryItem" }],
      group: "media",
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail (für /work-Grid)",
      description: "Wenn leer, wird das Hero-Bild verwendet.",
      type: "image",
      options: { hotspot: true },
      group: "media",
      fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
    }),

    // ---------------- Einstellungen & SEO ----------------
    defineField({
      name: "order",
      title: "Reihenfolge (kleiner = weiter oben)",
      type: "number",
      group: "settings",
      initialValue: 100,
    }),
    defineField({
      name: "featured",
      title: "Featured (auf /work anzeigen)",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      description:
        "Aktuell inaktiv (keine Case-Detailseiten mehr). Für spätere Nutzung (Sitemap/OpenGraph beim Go-Live).",
      type: "seo",
      group: "settings",
    }),

    // ---------------- Archiv (nicht mehr auf der Website sichtbar) ----------------
    // Diese Felder gehörten zu den früheren /work/[slug]-Detailseiten, die durch
    // das Case-Fenster ersetzt wurden. Daten bleiben erhalten, werden aber nicht
    // gerendert. Nicht mehr Pflicht.
    defineField({
      name: "headline",
      title: "Hero Headline (Archiv)",
      description: "Nicht mehr sichtbar — stammt aus der alten Detailseite.",
      type: "headline",
      group: "archive",
    }),
    defineField({
      name: "intro",
      title: "Intro (Archiv)",
      description: "Nicht mehr sichtbar — alte Detailseite / SEO-Fallback.",
      type: "text",
      rows: 2,
      group: "archive",
    }),
    defineField({
      name: "introHeading",
      title: "Intro-Überschrift (Archiv)",
      description: "Nicht mehr sichtbar — alte Detailseite.",
      type: "string",
      group: "archive",
    }),
    defineField({
      name: "solution",
      title: "Die Lösung (Archiv)",
      description: "Nicht mehr sichtbar — alte Detailseite.",
      type: "solutionSection",
      group: "archive",
    }),
    defineField({
      name: "cta",
      title: "CTA-Sektion (Archiv)",
      description: "Nicht mehr sichtbar — ungenutzt.",
      type: "ctaSection",
      group: "archive",
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge (order)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Jahr (neueste zuerst)",
      name: "yearDesc",
      by: [{ field: "projectMeta.year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      client: "projectMeta.client",
      year: "projectMeta.year",
      media: "heroImage",
    },
    prepare({ title, client, year, media }) {
      return {
        title: title || client || "Case Study",
        subtitle: [client, year].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
