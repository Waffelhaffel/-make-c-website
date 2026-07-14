import type { ElementType, ReactNode } from "react";

// Zentrales Misch-Typo-Muster (Markenzeichen, Figma):
// - variant "h2":      Gotham-Teil im text-h2-Token + Garamond SemiBold Italic 1.2em (leading 0.85)
// - variant "display": Gotham Bold Italic uppercase + Garamond SemiBold Italic 1.076em ("SELECTED/WORK")
type MixedHeadlineProps = {
  as?: ElementType;
  variant?: "h2" | "display";
  part1?: ReactNode;
  part2?: ReactNode;
  /** display: "/" zwischen den Teilen (SELECTED/WORK) */
  slash?: boolean;
  /** Teile als Blöcke untereinander; Default: true bei "h2", false bei "display" */
  stacked?: boolean;
  /** h2: Gotham-Teil kursiv (z. B. AboutTeam-Zitat) */
  italicPart1?: boolean;
  /** Größen-Klasse; Default text-display bzw. text-h2 — null erbt vom Wrapper */
  size?: string | null;
  className?: string;
};

export function MixedHeadline({
  as: Tag = "h2",
  variant = "h2",
  part1,
  part2,
  slash = false,
  stacked,
  italicPart1 = false,
  size,
  className = "",
}: MixedHeadlineProps) {
  const isDisplay = variant === "display";
  const stack = stacked ?? !isDisplay;
  const sizeClass =
    size === null ? "" : size ?? (isDisplay ? "text-display" : "text-h2");
  const rootClass = [
    isDisplay ? "uppercase leading-none" : "font-gotham",
    "text-white",
    sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const part1Class = [
    isDisplay ? "font-gotham font-bold italic tracking-[-0.05em]" : "",
    !isDisplay && italicPart1 ? "italic" : "",
    stack ? "block" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const part2Class = [
    "font-garamond font-semibold italic tracking-normal",
    isDisplay ? "text-[1.076em]" : "text-[1.2em] leading-[0.85]",
    stack ? "block" : "",
  ].join(" ");

  return (
    <Tag className={rootClass}>
      {part1 != null && (
        <span className={part1Class || undefined}>
          {part1}
          {isDisplay && slash && !stack && part2 != null ? "/" : ""}
        </span>
      )}
      {part2 != null && <span className={part2Class}>{part2}</span>}
    </Tag>
  );
}

// Auto-Split einer CMS-Zeile ins Misch-Typo-Muster: bei Komma mit Folgetext
// Gotham-Teil bis inkl. Komma + Garamond-Rest als Blöcke untereinander,
// sonst Split am ersten Leerzeichen (inline).
export function MixedText({ text }: { text: string }) {
  const commaIdx = text.indexOf(",");
  if (commaIdx !== -1 && text.slice(commaIdx + 1).trim().length > 0) {
    return (
      <>
        <span className="font-gotham font-bold tracking-[-0.05em] block">
          {text.slice(0, commaIdx + 1)}
        </span>
        <span className="font-garamond font-semibold italic text-[1.2em] leading-[0.85] tracking-normal block">
          {text.slice(commaIdx + 1).trim()}
        </span>
      </>
    );
  }
  const idx = text.indexOf(" ");
  const part1 = idx === -1 ? text : text.slice(0, idx);
  const part2 = idx === -1 ? null : text.slice(idx + 1);
  return (
    <>
      <span className="font-gotham font-bold tracking-[-0.05em]">{part1} </span>
      {part2 && (
        <span className="font-garamond font-semibold italic text-[1.2em] leading-[0.85] tracking-normal">
          {part2}
        </span>
      )}
    </>
  );
}
