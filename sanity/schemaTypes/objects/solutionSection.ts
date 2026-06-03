import { defineField, defineType } from "sanity";

export const solutionSection = defineType({
  name: "solutionSection",
  title: "Lösungs-Sektion",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Überschrift",
      description: "Z. B. 'the Solution.' — 'the ' wird weiß, zweiter Teil Garamond-blau gerendert",
      type: "string",
      initialValue: "the Solution.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Beschreibung",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageLeft",
      title: "Bild Links",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageRight",
      title: "Bild Rechts",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLabel",
      title: "Footer-Label (kleiner Text rechts unten)",
      description: "Z. B. '2024–2025 Video Produktion'",
      type: "string",
    }),
  ],
});
