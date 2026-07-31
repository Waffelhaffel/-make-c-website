import { SITE } from "@/lib/content/site";
import { HeaderClient } from "./HeaderClient";

// Dünner Server-Wrapper um die interaktive Leiste. War bis 07/2026 `async` und
// holte `siteSettings` aus Sanity — auf jeder Route, zusätzlich zum identischen
// Aufruf im Footer.
export function Header() {
  return <HeaderClient settings={SITE} />;
}
