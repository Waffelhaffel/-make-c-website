import { defineField, defineType } from "sanity";

export const mainMedia = defineType({
  name: "mainMedia",
  title: "Hauptvideo / Main Media",
  type: "object",
  fields: [
    defineField({
      name: "posterImage",
      title: "Poster / Thumbnail",
      description: "Vorschaubild, das vor dem Start des Videos angezeigt wird",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video-URL (YouTube, Vimeo oder eigener CDN-Link)",
      description: "Wenn leer, wird der Play-Button als reines Visual angezeigt",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
});
