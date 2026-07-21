import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Zitat",
      description: "Der Text der Kundenstimme (ohne Anführungszeichen – die werden im Design ergänzt).",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Name",
      description: "Z. B. 'Max Mustermann'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle / Firma (optional)",
      description: "Z. B. 'Marketingleiter, Musterfirma GmbH'",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Sterne (1–5)",
      description: "Anzahl der angezeigten Sterne. Standard: 5.",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "quote",
    },
  },
});
