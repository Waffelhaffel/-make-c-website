import { CogIcon, DocumentTextIcon, HomeIcon, PackageIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const HIDDEN_DOC_TYPES = [
  "caseStudy",
  "siteSettings",
  "legalPage",
  "landingPage",
  "service",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("make/c Content")
    .items([
      S.listItem()
        .title("Startseite")
        .icon(HomeIcon)
        .child(
          S.editor()
            .id("landingPage")
            .schemaType("landingPage")
            .documentId("landingPage")
        ),
      S.divider(),
      S.listItem()
        .title("Case Studies")
        .schemaType("caseStudy")
        .child(
          S.documentTypeList("caseStudy")
            .title("Case Studies")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Dienstleistungen")
        .icon(PackageIcon)
        .schemaType("service")
        .child(
          S.documentTypeList("service")
            .title("Dienstleistungen")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Site-Einstellungen")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Impressum")
        .icon(DocumentTextIcon)
        .child(
          S.editor()
            .id("legalPage-impressum")
            .schemaType("legalPage")
            .documentId("legalPage-impressum")
        ),
      S.listItem()
        .title("Datenschutz")
        .icon(DocumentTextIcon)
        .child(
          S.editor()
            .id("legalPage-datenschutz")
            .schemaType("legalPage")
            .documentId("legalPage-datenschutz")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !HIDDEN_DOC_TYPES.includes(listItem.getId() ?? "")
      ),
    ]);
