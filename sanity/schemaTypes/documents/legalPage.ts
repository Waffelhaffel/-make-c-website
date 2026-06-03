import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Rechtsseite (Impressum/Datenschutz)",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "slug",
      title: "URL-Slug",
      description:
        "Technischer Wert, der die URL bestimmt (z. B. 'impressum' → /impressum). Wird einmalig beim Anlegen gesetzt und sollte nicht geändert werden.",
      type: "slug",
      readOnly: true,
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const value = (slug as { current?: string } | undefined)?.current;
          const allowed = ["impressum", "datenschutz"];
          if (!value || !allowed.includes(value)) {
            return `Slug muss '${allowed.join("' oder '")}' sein`;
          }
          return true;
        }),
    }),
    defineField({
      name: "title",
      title: "Überschrift",
      description: "Wird gross als H1 oben auf der Seite angezeigt (z. B. 'Impressum')",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      description:
        "Frei strukturierbarer Text. Du kannst Überschriften (H2/H3), Absätze, Listen, fett und kursiv setzen. Links sind möglich.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Absatz", value: "normal" },
            { title: "Sektions-Überschrift (H2)", value: "h2" },
            { title: "Unter-Überschrift (H3)", value: "h3" },
            { title: "Zitat", value: "blockquote" },
          ],
          lists: [
            { title: "Aufzählung", value: "bullet" },
            { title: "Nummerierte Liste", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Fett", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "effectiveDate",
      title: "Stand (optional)",
      description: "Z. B. 'Dezember 2025' — erscheint kursiv unten auf der Seite",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title: title || "Rechtsseite", subtitle };
    },
  },
});
