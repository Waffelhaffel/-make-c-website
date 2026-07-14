import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

// Weißer Pill-Button (Figma 45:8 / 51:4) in zwei Größen:
// lg = Landing-CTA (h-16/20, Body-Größe), md = Panel-CTA (h-14, Small, bold)
type PillButtonProps = {
  children: ReactNode;
  href?: string;
  /** öffnet href in neuem Tab (externe Links) */
  external?: boolean;
  onClick?: () => void;
  size?: "lg" | "md";
  /** Textfarbe auf dem weißen Pill: dark (auf makec-dark) / blue (auf makec-blue) */
  tone?: "dark" | "blue";
  icon?: "arrow" | "external";
  className?: string;
};

export function PillButton({
  children,
  href,
  external = false,
  onClick,
  size = "lg",
  tone = "dark",
  icon = "arrow",
  className = "",
}: PillButtonProps) {
  const sizeClass =
    size === "lg"
      ? "gap-8 md:gap-12 h-16 md:h-20 px-10 md:px-20 text-body-lg"
      : "gap-4 h-14 px-8 font-bold text-small";
  const toneClass = tone === "blue" ? "text-makec-blue" : "text-makec-dark";
  const rootClass = [
    "group/pill inline-flex items-center rounded-full bg-white font-gotham hover:bg-white/90 transition-colors",
    sizeClass,
    toneClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Icon = icon === "external" ? ExternalLink : ArrowRight;
  const iconEl =
    size === "lg" ? (
      <Icon
        strokeWidth={1.5}
        className="w-7 h-7 md:w-8 md:h-8 transition-transform group-hover/pill:translate-x-1"
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

  return (
    <button type="button" onClick={onClick} className={rootClass}>
      {children}
      {iconEl}
    </button>
  );
}
