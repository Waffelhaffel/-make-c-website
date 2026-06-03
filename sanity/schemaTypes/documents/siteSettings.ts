import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-Einstellungen",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Kontakt", default: true },
    { name: "locations", title: "Standorte" },
    { name: "social", title: "Social Media" },
    { name: "copy", title: "Footer-Texte" },
  ],
  fields: [
    defineField({
      name: "email",
      title: "Kontakt-E-Mail",
      description: "Wird im Footer und im Mobile-Menü angezeigt (z. B. info@make-c.de)",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" }),
    }),
    defineField({
      name: "phone",
      title: "Telefonnummer (optional)",
      description: "Wird im Impressum angezeigt — hier nur, wenn auch im Footer benötigt",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "locations",
      title: "Standorte",
      description: "Köln, Essen, ... — werden im Footer angezeigt",
      type: "array",
      of: [{ type: "location" }],
      group: "locations",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "socials",
      title: "Social-Links",
      description: "Werden im Footer und Mobile-Menü angezeigt",
      type: "array",
      of: [{ type: "socialLink" }],
      group: "social",
    }),
    defineField({
      name: "footerHeadline",
      title: "Footer-Headline (links)",
      description: "Z. B. 'LET'S TALK' — wird gross über der Email angezeigt",
      type: "object",
      group: "copy",
      fields: [
        defineField({
          name: "lineOne",
          title: "Erste Zeile (Gotham Bold Italic)",
          type: "string",
          initialValue: "LET'S",
        }),
        defineField({
          name: "lineTwo",
          title: "Zweite Zeile (Garamond Semibold Italic)",
          type: "string",
          initialValue: "TALK",
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright-Zeile",
      description: "Wird im Mobile-Menü unten angezeigt",
      type: "string",
      group: "copy",
      initialValue: "make/c — © 2025",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site-Einstellungen" }),
  },
});
