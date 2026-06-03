import { defineField, defineType } from "sanity";

export const headline = defineType({
  name: "headline",
  title: "Headline",
  type: "object",
  fields: [
    defineField({
      name: "lead",
      title: "Lead (kursiv, kleiner)",
      description: "Z. B. 'Merkur.' oder 'Köln Bonn Airport:'",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "impact",
      title: "Impact (großer Haupttitel)",
      description: "Z. B. 'POWERCLIP' oder 'TAKE OFF'",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
  ],
});
