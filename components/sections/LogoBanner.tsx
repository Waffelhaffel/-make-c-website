import Image from "next/image";

// Kundenlogos aus public/Seite Logos Kopie (150×150), im Figma als blau getönte
// Leiste auf Weiß (Node 25:55). Läuft als Endlos-Marquee.
const LOGO_FILES = [
  "atlantik-bruecke-150x150.png",
  "covestro-150x150.png",
  "dfl-150x150.png",
  "flughafen-150x150.png",
  "fressnapf-150x150.png",
  "funnyfrisch-150x150.png",
  "gothaer-150x150.png",
  "haribo-150x150.png",
  "hdi-150x150.png",
  "institut-der-deutschen-wirtschaft-150x150.png",
  "koeln-marathon-150x150.png",
  "lanxess-150x150.png",
  "pfeifer-und-langen-150x150.png",
  "renault-150x150.png",
  "rewe-150x150.png",
  "shopapotheke-150x150.png",
  "universitaet-koeln-150x150.png",
  "zurich-150x150.png",
];

function altFromFile(file: string) {
  return file
    .replace(/-150x150\.png$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function LogoBanner() {
  return (
    <section aria-label="Kunden" className="logo-banner bg-white overflow-hidden">
      <div className="flex w-max items-center animate-[marquee_50s_linear_infinite] py-6 md:py-7">
        {[...LOGO_FILES, ...LOGO_FILES].map((file, i) => (
          <Image
            key={`${file}-${i}`}
            src={`/Seite Logos Kopie/${file}`}
            alt={i < LOGO_FILES.length ? altFromFile(file) : ""}
            width={150}
            height={150}
            className="mx-8 md:mx-12 h-14 md:h-[84px] w-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
}
