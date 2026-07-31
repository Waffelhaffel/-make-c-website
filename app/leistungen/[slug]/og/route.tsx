import { SERVICE_PAGE_SLUGS, getServicePage } from "@/lib/leistungen";
import { OG_FOOTER, brandOgImage, ogImage } from "@/lib/og";

// OG-Bild je Leistung, mit deren Headline im Marken-Muster.
// Zur Begründung der normalen Route statt der Dateikonvention: app/og/route.tsx.
export const dynamic = "force-static";

export function generateStaticParams() {
  return SERVICE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const content = getServicePage(slug);

  // Unbekannter Slug → die Page ruft notFound(); hier fällt das Bild auf die
  // Markenvariante zurück, damit die Route nicht wirft.
  if (!content) return brandOgImage();

  return ogImage({
    part1: content.titlePart1,
    part2: content.titlePart2,
    footer: OG_FOOTER,
  });
}
