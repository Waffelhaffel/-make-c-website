import { defineField, defineType } from "sanity";

export const locationCard = defineType({
  name: "locationCard",
  title: "Standort-Karte",
  type: "object",
  fields: [
    defineField({
      name: "headlineLineOne",
      title: "Überschrift Zeile 1",
      description: "Z. B. 'Im Herzen'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineLineTwo",
      title: "Überschrift Zeile 2",
      description: "Z. B. 'der Dom Stadt.'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cityLabel",
      title: "Stadt (klein, unter der Überschrift)",
      description: "Z. B. 'Köln /'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "cityLabel",
      subtitle: "headlineLineOne",
    },
  },
});
