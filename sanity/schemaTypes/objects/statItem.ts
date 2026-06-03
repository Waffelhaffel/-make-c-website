import { defineField, defineType } from "sanity";

export const statItem = defineType({
  name: "statItem",
  title: "Stat-Eintrag",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      description: "Welches Icon links angezeigt werden soll",
      type: "string",
      options: {
        list: [
          { title: "Personen (Users)", value: "users" },
          { title: "Play / Video", value: "play" },
          { title: "Standort (MapPin)", value: "mapPin" },
        ],
        layout: "radio",
      },
      initialValue: "users",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Zahl",
      description: "Z. B. '15+' oder '5.000+' oder '2'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      description: "Z. B. 'Mitarbeiter' oder 'Videos'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtext",
      title: "Beschreibungstext",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "number" },
    prepare({ title, subtitle }) {
      return { title: `${subtitle} ${title}`.trim() };
    },
  },
});
