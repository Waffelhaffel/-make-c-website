import type { ReactNode } from "react";

// Hebt ein einzelnes, per CMS gepflegtes Wort in einer Textzeile hervor —
// z. B. das „make" in „We make videos", damit es wie die Wortmarke im Logo
// kursiv steht. Kommt als `part1` in <MixedHeadline> (nimmt ReactNode).
type EmphasizedTextProps = {
  text?: string;
  /** Wort, das hervorgehoben wird (case-insensitive, nur ganze Wörter) */
  word?: string;
  /** Klassen für das hervorgehobene Wort; Default "italic" (Logo-Stil) */
  emphasisClassName?: string;
};

// \p{L} statt Lookbehind — läuft damit auch in älteren Safari-Versionen.
const isLetter = (ch: string | undefined) => ch !== undefined && /\p{L}/u.test(ch);

export function EmphasizedText({
  text,
  word,
  emphasisClassName = "italic",
}: EmphasizedTextProps) {
  if (!text) return null;
  if (!word) return <>{text}</>;

  const parts: ReactNode[] = [];
  const haystack = text.toLowerCase();
  const needle = word.toLowerCase();
  let searchFrom = 0;
  let lastEnd = 0;

  while (searchFrom <= text.length) {
    const hit = haystack.indexOf(needle, searchFrom);
    if (hit === -1) break;
    const after = hit + needle.length;
    // Nur ganze Wörter: links und rechts darf kein Buchstabe stehen
    if (isLetter(text[hit - 1]) || isLetter(text[after])) {
      searchFrom = hit + 1;
      continue;
    }
    if (hit > lastEnd) parts.push(text.slice(lastEnd, hit));
    parts.push(
      <em key={hit} className={emphasisClassName}>
        {text.slice(hit, after)}
      </em>
    );
    lastEnd = after;
    searchFrom = after;
  }

  if (lastEnd < text.length) parts.push(text.slice(lastEnd));
  return <>{parts}</>;
}
