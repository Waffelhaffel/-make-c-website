import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social-Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: "Z. B. 'INSTAGRAM', 'LINKEDIN', 'VIMEO'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https", "mailto"] }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
