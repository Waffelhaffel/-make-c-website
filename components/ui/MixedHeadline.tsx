import type { ElementType, ReactNode } from "react";

// Zentrales Misch-Typo-Muster (Markenzeichen, Figma):
// - variant "h2":      Gotham-Teil im text-h2-Token + Garamond SemiBold Italic 1.2em (leading 0.85)
// - variant "display": Gotham Bold Italic uppercase + Garamond SemiBold Italic 1.076em ("SELECTED/WORK")
type MixedHeadlineProps = {
  as?: ElementType;
  variant?: "h2" | "display";
  part1?: ReactNode;
  part2?: ReactNode;
  /** display: "/" zwischen den Teilen (SELECTED/WORK, VIDEO/PRODUKTION) */
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
          {isDisplay && slash && part2 != null ? "/" : ""}
        </span>
      )}
      {/* Gestapelt sind beide Teile block-Elemente — ein Leerzeichen dazwischen
          kollabiert visuell, trennt die Wörter aber im Textinhalt. Ohne das
          liest sich "Was wir" + "konkret machen" als "Was wirkonkret machen"
          (Screenreader, Suchmaschinen, Textextraktion). */}
      {stack && part1 != null && part2 != null ? " " : null}
      {part2 != null && <span className={part2Class}>{part2}</span>}
    </Tag>
  );
}
