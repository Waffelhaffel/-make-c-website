import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Standort",
  type: "object",
  fields: [
    defineField({
      name: "city",
      title: "Stadt",
      description: "Z. B. 'KÖLN'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      description: "Eine Zeile pro Adressbestandteil (Straße, PLZ Ort)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "city", subtitle: "address.0" },
  },
});
