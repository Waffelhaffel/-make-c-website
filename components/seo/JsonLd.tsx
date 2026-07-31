// Strukturierte Daten als <script type="application/ld+json">.
// Bewusst kein next/script: JSON-LD wird nicht ausgeführt, sondern nur gelesen —
// als normales Script-Tag steht es sofort im ausgelieferten HTML.

type JsonLdProps = {
  data: unknown;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // `<` maskieren, damit ein Wert im Content das Script-Tag nicht schließen kann.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
