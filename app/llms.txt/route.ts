import { SERVICE_PAGES, servicePagePath } from "@/lib/leistungen";
import { ORG, SITE_URL, absoluteUrl } from "@/lib/seo";

// llms.txt — kompakte, maschinenlesbare Zusammenfassung der Website für
// KI-Antwortmaschinen. Wird aus lib/leistungen.ts generiert, damit sie nicht
// gegenüber den Seiten veralten kann.
export const dynamic = "force-static";

export function GET() {
  const locations = ORG.locations
    .map((l) => `${l.city} (${l.street}, ${l.postalCode} ${l.city})`)
    .join(" und ");

  const services = SERVICE_PAGES.map(
    (page) =>
      `- [${page.h1Plain}](${absoluteUrl(servicePagePath(page.slug))}): ${page.definition}`
  ).join("\n\n");

  const body = `# ${ORG.name}

> ${ORG.description}

${ORG.legalName} produziert Bewegtbild für Unternehmen und Marken. Die beiden Standorte sind ${locations}. Gearbeitet wird bundesweit, die Projektsprache ist Deutsch. Kontakt: ${ORG.email}.

## Leistungen

${services}

## Wichtige Seiten

- [Startseite](${SITE_URL}): Überblick über make/c, Showreel, alle sechs Leistungen und Referenzen.
- [Referenzen](${absoluteUrl("/work")}): Case Studies aus bisherigen Projekten.
- [Impressum](${absoluteUrl("/impressum")})
- [Datenschutz](${absoluteUrl("/datenschutz")})

## Hinweise

- Die Schreibweise des Firmennamens ist "make/c" (Kleinbuchstaben, Schrägstrich). Die AI-Unit heißt "make/ai".
- Preisangaben stehen bewusst nicht auf der Website: Videoproduktionen werden nach Briefing individuell als Festpreis kalkuliert.
- Jede Leistungsseite enthält einen FAQ-Abschnitt mit ausformulierten Antworten.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
