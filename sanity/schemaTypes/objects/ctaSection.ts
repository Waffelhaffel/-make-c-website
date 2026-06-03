import { defineField, defineType } from "sanity";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA-Sektion",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      initialValue: "LET'S TALK",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Beschreibungstext",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mail",
      title: "E-Mail-Adresse",
      type: "string",
      initialValue: "info@make-c.de",
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: "email",
          invert: false,
        }),
    }),
  ],
});
