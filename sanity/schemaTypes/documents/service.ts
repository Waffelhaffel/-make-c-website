import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Dienstleistung",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "media", title: "Medien" },
    { name: "link", title: "Verlinkung" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titel (UPPERCASE)",
      description: "Wie im Akkordeon angezeigt, z. B. 'VIDEO PRODUKTION'",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Anzeigetitel (normal)",
      description: "Mixed-Case-Variante, z. B. 'Video Produktion'",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      description:
        "Wird Teil der URL: /services/<slug>. Bestimmt auch, welches Loop-Video angezeigt wird.",
      type: "slug",
      group: "content",
      options: {
        source: "displayTitle",
        maxLength: 60,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[äöüß]/g, (ch) =>
              ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[ch] ?? ch
            )
            .replace(/[^a-z0-9-]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 60),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Detail-Page Headline",
      description: "Wird oben auf /services/<slug> gross angezeigt",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      description: "Kurztext für das Akkordeon und die Detail-Page",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detailText",
      title: "Ausführlicher Text",
      description:
        "Optional. Zweiter, längerer Absatz unter der Kurzbeschreibung im aufgeklappten Akkordeon.",
      type: "text",
      rows: 5,
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Leistungen im Detail",
      description:
        "Liste konkreter Leistungspunkte (Titel + kurze Erklärung), die im aufgeklappten Akkordeon erscheinen.",
      type: "array",
      group: "content",
      of: [
        defineField({
          name: "feature",
          title: "Leistung",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "processSteps",
      title: "Ablauf / So arbeiten wir",
      description:
        "Nummerierte Schritte (Titel + Text). Die Nummerierung erfolgt automatisch nach Reihenfolge.",
      type: "array",
      group: "content",
      of: [
        defineField({
          name: "step",
          title: "Schritt",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero-Bild (Detail-Page)",
      description: "Optional. Wenn leer, wird ein Platzhalter angezeigt.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
      group: "media",
    }),
    defineField({
      name: "externalLink",
      title: "Externer Link (statt /services/<slug>)",
      description:
        "Optional. Wenn gesetzt, geht der Button im Akkordeon zu dieser URL statt zur Detail-Page. Z. B. für die AI-Unit zu make-ai.de.",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
      group: "link",
    }),
    defineField({
      name: "buttonText",
      title: "Button-Text (bei externem Link)",
      description: "Wird nur verwendet, wenn 'Externer Link' gesetzt ist",
      type: "string",
      group: "link",
    }),
    defineField({
      name: "order",
      title: "Reihenfolge (kleiner = weiter oben)",
      type: "number",
      group: "meta",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "displayTitle",
    },
    prepare({ title, subtitle }) {
      return { title: title || subtitle || "Dienstleistung", subtitle };
    },
  },
});
