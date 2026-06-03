import { defineField, defineType } from "sanity";

export const powerWord = defineType({
  name: "powerWord",
  title: "Power-Wort",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Wort",
      description: "Z. B. 'Power', 'Leidenschaft', 'Umsetzung'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label" },
  },
});
