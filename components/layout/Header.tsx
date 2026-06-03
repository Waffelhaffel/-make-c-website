import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const settings = await getSiteSettings();
  return <HeaderClient settings={settings} />;
}
