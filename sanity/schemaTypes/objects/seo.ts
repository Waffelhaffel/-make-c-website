import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      description: "Wenn leer, wird 'project' + Client verwendet",
      type: "string",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      description: "Wenn leer, wird 'intro' verwendet",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Bild",
      description: "Wenn leer, wird das Hero-Bild verwendet",
      type: "image",
    }),
  ],
});
