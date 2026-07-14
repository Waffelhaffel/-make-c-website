import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Startseite",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Stats" },
    { name: "showreel", title: "Showreel" },
    { name: "approach", title: "Approach" },
    { name: "insight", title: "Insights" },
    { name: "about", title: "About / Team" },
    { name: "questions", title: "Fragen" },
    { name: "contact", title: "Kontakt-Sektion" },
  ],
  fields: [
    // ------------- HERO -------------
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "headlineLine1",
          title: "Headline – Zeile 1",
          description: "Z. B. 'DIE'",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline – Zeile 2",
          description: "Z. B. 'VIDEO'",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "headlineLine3",
          title: "Headline – Zeile 3",
          description: "Z. B. 'AGENTUR'",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          description: "Z. B. 'VIDEO MARKETING & PRODUCTION'",
          type: "string",
        }),
        defineField({
          name: "cornerLeft",
          title: "Eck-Label links",
          description: "Z. B. 'BASED IN KÖLN & ESSEN'",
          type: "string",
        }),
        defineField({
          name: "cornerCenter",
          title: "Eck-Label mitte",
          description: "Z. B. 'SCROLL DOWN'",
          type: "string",
        }),
        defineField({
          name: "cornerRight",
          title: "Eck-Label rechts",
          description: "Z. B. 'SINCE 2015'",
          type: "string",
        }),
      ],
    }),

    // ------------- STATS -------------
    defineField({
      name: "stats",
      title: "Stats",
      type: "object",
      group: "stats",
      fields: [
        defineField({
          name: "kicker",
          title: "Kicker (blau, kursiv)",
          description: "Z. B. '/ Mehr als nur Videoproduktion /'",
          type: "string",
        }),
        defineField({
          name: "headlineLine1",
          title: "Headline – Zeile 1 (Gotham Bold Italic)",
          description: "Z. B. 'Ein Team, das skalierbare Video-Lösungen für'",
          type: "string",
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline – Zeile 2 (Garamond Italic)",
          description: "Z. B. 'Marken, Unternehmen und Events baut.'",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Stat-Einträge",
          description: "Genau 3 Einträge empfohlen",
          type: "array",
          of: [{ type: "statItem" }],
          validation: (Rule) => Rule.min(1).max(3),
        }),
      ],
    }),

    // ------------- SHOWREEL -------------
    defineField({
      name: "showreel",
      title: "Showreel",
      type: "object",
      group: "showreel",
      fields: [
        defineField({
          name: "kicker",
          title: "Kicker (blau, kursiv)",
          description: "Z. B. '/ High-End Produktion für skalierbare Video-Systeme /'",
          type: "string",
        }),
        defineField({
          name: "headlinePart1",
          title: "Headline – Teil 1 (Gotham Bold Italic)",
          description: "Z. B. 'SHOW'",
          type: "string",
        }),
        defineField({
          name: "headlinePart2",
          title: "Headline – Teil 2 (Garamond Italic)",
          description: "Z. B. 'REEL'",
          type: "string",
        }),
        defineField({
          name: "thumbnail",
          title: "Thumbnail-Bild",
          description: "Vorschaubild vor dem Start des Videos. Wenn leer, wird /thumbnail_Showreel.webp genutzt.",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
        }),
        defineField({
          name: "videoUrl",
          title: "Video-URL (Vimeo, YouTube oder MP4-Link)",
          description:
            "Z. B. 'https://vimeo.com/123456789'. Wenn leer, wird die mitgelieferte /Makec_Reel 1.mp4 genutzt.",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
    }),

    // ------------- APPROACH -------------
    defineField({
      name: "approach",
      title: "Approach",
      type: "object",
      group: "approach",
      fields: [
        defineField({
          name: "headlineLine1",
          title: "Headline – Zeile 1 (Gotham Bold Italic)",
          description: "Z. B. 'WE MAKE VIDEOS'",
          type: "string",
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline – Zeile 2 (Garamond Italic)",
          description: "Z. B. 'THAT WORK'",
          type: "string",
        }),
        defineField({
          name: "kicker",
          title: "Kicker rechts (italic, klein)",
          description: "Z. B. '/ Approach /'",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Absätze",
          description: "Jeder Eintrag wird als eigener Absatz angezeigt",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "closing",
          title: "Schlusszeile (uppercase, fett)",
          description: "Z. B. 'UNSER TEAM ARBEITET MIT EINEM INTEGRIERTEN ANSATZ AUS STRATEGIE, KREATION UND PRODUKTION.'",
          type: "text",
          rows: 2,
        }),
      ],
    }),

    // ------------- INSIGHT -------------
    defineField({
      name: "insight",
      title: "Insight-Sektion",
      type: "object",
      group: "insight",
      fields: [
        defineField({
          name: "headlineLine1",
          title: "Headline – Zeile 1 (Garamond Italic, blau)",
          description: "Z. B. 'Mehr Output.'",
          type: "string",
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline – Zeile 2 (Garamond Italic, blau)",
          description: "Z. B. 'Mehr Insights.'",
          type: "string",
        }),
        defineField({
          name: "kicker",
          title: "Label (blau, kursiv)",
          description: "Z. B. 'Insights /'",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Beschreibungstext",
          type: "text",
          rows: 4,
        }),
      ],
    }),

    // ------------- ABOUT / TEAM -------------
    defineField({
      name: "about",
      title: "About / Team",
      type: "object",
      group: "about",
      fields: [
        defineField({
          name: "quoteLine1",
          title: "Zitat – Zeile 1 (Gotham Bold Italic)",
          description: 'Z. B. \'"WE BELIEVE IN THE\'',
          type: "string",
        }),
        defineField({
          name: "quoteLine2",
          title: "Zitat – Zeile 2 (Garamond Italic)",
          description: "Z. B. 'POWER OF MOVING IMAGES.\"'",
          type: "string",
        }),
        defineField({
          name: "powerWords",
          title: "Power-Wörter",
          description: "Die 3 Wörter im PowerCounter (Power, Leidenschaft, Umsetzung)",
          type: "array",
          of: [{ type: "powerWord" }],
          validation: (Rule) => Rule.min(1).max(3),
        }),
        defineField({
          name: "teamTitlePart1",
          title: "Team-Titel – Teil 1 (Gotham Bold Italic)",
          description: "Z. B. 'MAKE/'",
          type: "string",
        }),
        defineField({
          name: "teamTitlePart2",
          title: "Team-Titel – Teil 2 (Garamond Italic)",
          description: "Z. B. 'TEAM'",
          type: "string",
        }),
        defineField({
          name: "teamImage",
          title: "Team-Bild",
          description: "Wenn leer, wird /Team Bild1.JPG genutzt",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
        }),
        defineField({
          name: "kicker",
          title: "Kicker rechts (blau, kursiv)",
          description: "Z. B. '/ Highend Produktion für skalierbare Video-Systeme /'",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Absätze (rechts neben dem Team-Bild)",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
      ],
    }),

    // ------------- QUESTIONS -------------
    defineField({
      name: "questions",
      title: "Fragen-Sektion",
      type: "object",
      group: "questions",
      fields: [
        defineField({
          name: "headlineLine1",
          title: "Headline – Zeile 1 (Gotham Bold)",
          description: "Z. B. 'Der richtige Startpunkt'",
          type: "string",
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline – Zeile 2 (Garamond Italic)",
          description: "Z. B. 'sind die richtigen Fragen.'",
          type: "string",
        }),
        defineField({
          name: "linkText",
          title: "Link-Text",
          description: "Z. B. 'Lass uns über Wirkung sprechen'",
          type: "string",
        }),
      ],
    }),

    // ------------- CONTACT -------------
    defineField({
      name: "contact",
      title: "Kontakt-Sektion",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "kicker",
          title: "Kicker (Standorte-Label)",
          description: "Z. B. 'Unsere 2 Standorte von make/c'",
          type: "string",
        }),
        defineField({
          name: "headlineLine1",
          title: "Headline – Zeile 1 (Gotham)",
          description: "Z. B. 'Der richtige Startpunkt'",
          type: "string",
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline – Zeile 2 (Garamond, kursiv)",
          description: "Z. B. 'sind die richtigen Fragen.'",
          type: "string",
        }),
        defineField({
          name: "introLinkText",
          title: "Intro-Link-Text (unterstrichen, verlinkt E-Mail)",
          description: "Z. B. 'Lass uns über Wirkung sprechen'",
          type: "string",
        }),
        defineField({
          name: "ctaButtonText",
          title: "Button-Text (Ansprechpartner)",
          description: "Z. B. 'Gespräch anfragen'",
          type: "string",
        }),
        defineField({
          name: "contactImage",
          title: "Kontakt-Bild (Ansprechpartner)",
          description: "Bild der Kontaktperson. Wenn leer, wird /Kontakt_Guy.webp genutzt.",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
        }),
        defineField({
          name: "contactName",
          title: "Name der Kontaktperson",
          description: "Optional. Z. B. 'Paul Zajonc'",
          type: "string",
        }),
        defineField({
          name: "contactRole",
          title: "Rolle / Funktion",
          description: "Optional. Z. B. 'Geschäftsführer'",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Telefonnummer",
          description: "Z. B. '+49 123 455667'",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "E-Mail-Adresse",
          description: "Z. B. 'pz@make-c.de'",
          type: "string",
        }),
        defineField({
          name: "floatingCtaEnabled",
          title: "Schwebendes Kontakt-Icon anzeigen",
          description:
            "Kleines Icon, das beim Scrollen seitlich reinpoppt und zur Kontakt-Sektion führt. Standard: an.",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "ctaLabel",
          title: "Text des schwebenden Icons",
          description: "Z. B. 'Let's talk'. Wird neben dem Icon angezeigt.",
          type: "string",
        }),
        defineField({
          name: "locations",
          title: "Standort-Karten",
          description: "Karten rechts neben dem Kontaktbereich",
          type: "array",
          of: [{ type: "locationCard" }],
          validation: (Rule) => Rule.min(1).max(3),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Startseite" }),
  },
});
