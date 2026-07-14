import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "media", title: "Medien" },
    { name: "meta", title: "Meta & SEO" },
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
      name: "order",
      title: "Reihenfolge (kleiner = weiter oben)",
      type: "number",
      group: "meta",
      initialValue: 100,
    }),
    defineField({
      name: "featured",
      title: "Featured (auf /work anzeigen)",
      type: "boolean",
      group: "meta",
      initialValue: true,
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      description: "Kleiner Header-Text, z. B. 'Case Merkur'",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "project",
      title: "Projektname",
      description: "Z. B. 'Powerclip Campaign'",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Hero Headline",
      type: "headline",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro (kurzer Einleitungssatz)",
      description: "Wird u. a. als SEO-Fallback verwendet",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "introHeading",
      title: "Intro-Überschrift (fetter Vorspann)",
      description: "Z. B. '07/ Geschäftsbereiche, eine visuelle Sprache.'",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "summary",
      title: "Projektbeschreibung (Das Projekt)",
      type: "text",
      rows: 5,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services / Leistungsbereiche",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "content",
    }),
    defineField({
      name: "projectMeta",
      title: "Meta-Feld-Block (Kunde/Jahr/Kategorie/Studio)",
      type: "projectMeta",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero-Bild",
      type: "image",
      options: { hotspot: true },
      group: "media",
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainMedia",
      title: "Main Video",
      type: "mainMedia",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Die Lösung (Sektion)",
      type: "solutionSection",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie (optional)",
      description:
        "Bild 1 erscheint links unter dem Main-Video, Bild 2 neben den Leistungen",
      type: "array",
      of: [{ type: "galleryItem" }],
      group: "media",
    }),
    defineField({
      name: "credits",
      title: "Full Credits (Rolle → Name)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "creditItem",
          title: "Credit",
          fields: [
            defineField({
              name: "role",
              title: "Rolle",
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
    defineField({
      name: "cta",
      title: "CTA-Sektion",
      description: "Aktuell ungenutzt — die Detailseite rendert keine CTA-Sektion.",
      type: "ctaSection",
      group: "content",
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail (für /work-Grid)",
      description: "Wenn leer, wird das Hero-Bild verwendet",
      type: "image",
      options: { hotspot: true },
      group: "media",
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "meta",
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
