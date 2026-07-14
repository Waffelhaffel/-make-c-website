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
    defineField({
      name: "addressLine1",
      title: "Adresse – Zeile 1",
      description: "Z. B. 'Picassoplatz 1'",
      type: "string",
    }),
    defineField({
      name: "addressLine2",
      title: "Adresse – Zeile 2",
      description: "Z. B. '50679 Köln'",
      type: "string",
    }),
    defineField({
      name: "mapsUrl",
      title: "Google-Maps-Link ('Route anzeigen')",
      description: "Vollständige URL, z. B. 'https://maps.google.com/?q=...'",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "cityLabel",
      subtitle: "headlineLineOne",
    },
  },
});
