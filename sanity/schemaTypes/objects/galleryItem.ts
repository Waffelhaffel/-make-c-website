import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galerie-Bild",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ratio",
      title: "Seitenverhältnis",
      type: "string",
      options: {
        list: [
          { title: "Wide (16:9)", value: "wide" },
          { title: "Tall (4:5)", value: "tall" },
          { title: "Standard (1:1)", value: "standard" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
    }),
  ],
  preview: {
    select: { media: "image", title: "image.alt" },
    prepare({ media, title }) {
      return { title: title || "Galerie-Bild", media };
    },
  },
});
