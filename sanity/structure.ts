import type { StructureResolver } from "sanity/structure";

// Das Studio zeigt nur noch die Case Studies — der übrige Seiteninhalt ist
// hartcodiert (siehe `sanity/schemaTypes/index.ts`). Damit entfallen die
// Singleton-Editoren für Startseite, Site-Einstellungen, Impressum und
// Datenschutz sowie die Dienstleistungs-Liste.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("make/c Content")
    .items([
      S.listItem()
        .title("Case Studies")
        .schemaType("caseStudy")
        .child(
          S.documentTypeList("caseStudy")
            .title("Case Studies")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
