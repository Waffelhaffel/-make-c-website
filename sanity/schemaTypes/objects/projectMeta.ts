import { defineField, defineType } from "sanity";

export const projectMeta = defineType({
  name: "projectMeta",
  title: "Projekt-Metadaten",
  type: "object",
  fields: [
    defineField({
      name: "client",
      title: "Kunde",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Jahr",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      description: "Z. B. 'Brand Campaign / Social Video'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "studio",
      title: "Studio-Label",
      description: "Anzeige im 'Studio'-Meta-Feld, z. B. '2024–2025 Video Production'",
      type: "string",
    }),
  ],
});
