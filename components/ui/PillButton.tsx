import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

// Weißer Pill-Button (Figma 45:8 / 51:4) in zwei Größen:
// lg = Landing-CTA (h-16/20, Body-Größe), md = Panel-CTA (h-14, Small, bold)
//
// Seit 13.08.2026 zusätzlich `variant="box"` (User-Vorgabe): eckig statt Pill,
// im Look der Testimonial-Karten — dieselbe Füllung, derselbe Rahmen, dazu ein
// harter Versatz-Schatten als 3D-Kante. Der Name „Pill" stimmt dafür nicht mehr
// ganz; die Variante sitzt trotzdem hier, weil die ganze Polymorphie darunter
// (Link / a / span / button, siehe unten) sonst ein zweites Mal dastünde.
type PillButtonProps = {
  children: ReactNode;
  href?: string;
  /** öffnet href in neuem Tab (externe Links) */
  external?: boolean;
  onClick?: () => void;
  size?: "lg" | "md";
  /** Textfarbe auf dem weißen Pill: dark (auf makec-dark) / blue (auf makec-blue) */
  tone?: "dark" | "blue";
  /** pill = weiß und rund (Standard) · box = eckige graue Kachel mit 3D-Kante */
  variant?: "pill" | "box";
  icon?: "arrow" | "external";
  className?: string;
};

// Farben der Box-Variante. Bewusst **deckend** statt `bg-white/[0.035]` wie die
// Testimonial-Karten: der Button steht in `ServiceList` über dem Loop-Video, und
// eine 3,5-%-Weißfläche verschwindet auf einem hellen Frame (der Strategie-Loop
// ist fast weiß). Die Werte sind genau die, die die Karte über `bg-makec-dark`
// ausrechnet — nebeneinander sehen beide identisch aus.
// #1c1c18 = #14140F + 3,5 % Weiß · #22221d = + 6 % Weiß (Hover der Karte).
const BOX_FILL = "bg-[#1c1c18] hover:bg-[#22221d]";
// Der Versatz ist die 3D-Kante. Deckendes Grau, damit sie auf dunklem Grund UND
// auf hellem Video trägt; beim Hover rückt der Button auf die Kante zu, die
// Kante wird entsprechend kürzer — die Außenkontur bleibt dadurch stehen.
// ⚠️ Deshalb muss **Restkante + Versatz = Ausgangskante** sein (md 3+3=6,
// lg 4+5=9), sonst wandert die Außenkante beim Hover.
// Die Kante ist nach Größe gestaffelt: 6 px an einem 56 px hohen Button liest
// sich als Kante, an dem 80 px hohen `lg` (520 px breit) als Haarlinie.
const BOX_EDGE = {
  lg: "shadow-[9px_9px_0_0_#2e2e28] hover:shadow-[4px_4px_0_0_#2e2e28] hover:translate-x-[5px] hover:translate-y-[5px]",
  md: "shadow-[6px_6px_0_0_#2e2e28] hover:shadow-[3px_3px_0_0_#2e2e28] hover:translate-x-[3px] hover:translate-y-[3px]",
} as const;

export function PillButton({
  children,
  href,
  external = false,
  onClick,
  size = "lg",
  tone = "dark",
  variant = "pill",
  icon = "arrow",
  className = "",
}: PillButtonProps) {
  // ⚠️ Bei `lg` sind Innenabstand und Spalt auf Mobil kleiner als ab md. Mit den
  // Desktop-Werten (px-20/gap-12 skalieren nicht mit, die Klassen ohne Präfix
  // galten überall) blieben bei 390 px Viewport nur 202 px für die Beschriftung —
  // „Alle Referenzen anzeigen" braucht 215 px und brach zweizeilig um.
  // Ab md unverändert.
  const sizeClass =
    size === "lg"
      ? "gap-4 md:gap-12 h-16 md:h-20 px-5 md:px-20 text-body-lg"
      : "gap-4 h-14 px-8 font-bold text-small";
  const toneClass = tone === "blue" ? "text-makec-blue" : "text-makec-dark";
  const variantClass =
    variant === "box"
      ? `border border-white/10 hover:border-white/20 text-white ${BOX_FILL} ${BOX_EDGE[size]}`
      : `rounded-full bg-white hover:bg-white/90 ${toneClass}`;
  const rootClass = [
    // `transition` statt `transition-colors`: die Box-Variante bewegt beim Hover
    // auch Schatten und Position.
    "group/pill inline-flex items-center font-gotham transition duration-200",
    sizeClass,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Icon = icon === "external" ? ExternalLink : ArrowRight;
  const iconEl =
    size === "lg" ? (
      <Icon
        strokeWidth={1.5}
        className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover/pill:translate-x-1"
      />
    ) : (
      <Icon size={18} className="transition-transform group-hover/pill:translate-x-1" />
    );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={rootClass}>
          {children}
          {iconEl}
        </a>
      );
    }
    return (
      <Link href={href} className={rootClass}>
        {children}
        {iconEl}
      </Link>
    );
  }

  // Ohne href und ohne onClick ist das Pill reine Optik → <span>. Nötig für
  // Buttons, die *innerhalb* eines Links sitzen (ServiceList-Kacheln): ein <a>
  // im <a> ist ungültiges HTML, ein <button> im <a> ebenso.
  if (!onClick) {
    return (
      <span className={rootClass}>
        {children}
        {iconEl}
      </span>
    );
  }

  return (
    <button type="button" onClick={onClick} className={rootClass}>
      {children}
      {iconEl}
    </button>
  );
}
