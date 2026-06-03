import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, readToken } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Ohne Token: CDN (schnell, gecacht, nur veröffentlichte Inhalte).
  // Mit Token (privates Dataset/Drafts): kein CDN, immer frische Daten.
  useCdn: !readToken,
  perspective: "published",
  token: readToken,
});
