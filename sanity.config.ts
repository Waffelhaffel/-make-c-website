import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Die Singleton-Sonderbehandlung (Templates ausblenden, Aktionen auf
// publish/discard/restore beschränken) galt nur für `siteSettings`, `legalPage`
// und `landingPage`. Diese Typen sind seit 07/2026 entfernt; `caseStudy` ist ein
// normaler, mehrfach anlegbarer Dokumenttyp und braucht die Filter nicht.
export default defineConfig({
  name: "make-c",
  title: "make/c Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
  },
});
