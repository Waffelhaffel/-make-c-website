import Image from "next/image";

/**
 * Kundenlogos als Endlos-Marquee.
 *
 * ⚠️ Seit 12.08.2026 **weiße Logos auf dunklem Grund** (User-Lieferung
 * „_White Versions"). Bis dahin lief hier die Figma-Fassung (Node 25:55): eine
 * weiße Leiste mit dunklen Graustufen-PNGs, die per `grayscale` + `multiply`
 * und einer blauen `::after`-Fläche mit `lighten` blau getönt wurden. Diese
 * Blend-Mechanik ist mit den weißen Dateien hinfällig — `multiply` mit Weiß auf
 * Dunkel ergibt Dunkel, die Logos wären unsichtbar. Sie ist deshalb aus
 * `globals.css` entfernt, ebenso die blaue Tönung: #2C2CC6 auf #14140F ist ein
 * Kontrast von 1,5:1.
 *
 * Die Dateien in `public/logos/` sind **nicht** die Rohdaten, sondern gebaut mit
 * `scripts/build-logo-banner.mjs` aus `scripts/data/logos-white/`. Der Grund
 * steht dort: die Quellen reichen von 1:1 (Bayer) bis 9,9:1 (Serviceplan) und
 * haben teils riesige transparente Ränder. Alle Zieldateien haben deshalb
 * **dieselbe Leinwandhöhe (240 px)** und ein auf gleiche optische Fläche
 * skaliertes Motiv darin — weil das CSS unten die Bildhöhe fixiert, entscheidet
 * die Leinwandhöhe und nicht das Motiv über die wahrgenommene Größe.
 *
 * Neues Logo: Datei nach `scripts/data/logos-white/`, Zeile in
 * `LOGOS` von `scripts/build-logo-banner.mjs` ergänzen, Skript laufen lassen,
 * hier eintragen. Reihenfolge = Reihenfolge in der Leiste.
 */
const LOGOS: { file: string; alt: string; width: number }[] = [
  { file: "telekom.png", alt: "Telekom", width: 341 },
  { file: "db-schenker.png", alt: "DB Schenker", width: 617 },
  { file: "covestro.png", alt: "Covestro", width: 240 },
  { file: "koeln-bonn-airport.png", alt: "Köln Bonn Airport", width: 453 },
  { file: "bayer.png", alt: "Bayer", width: 240 },
  { file: "zurich.png", alt: "Zurich", width: 303 },
  { file: "koelnmesse.png", alt: "Koelnmesse", width: 443 },
  { file: "evonik.png", alt: "Evonik", width: 474 },
  { file: "rewe-group.png", alt: "REWE Group", width: 435 },
  { file: "ergo.png", alt: "ERGO", width: 441 },
  { file: "merkur.png", alt: "Merkur", width: 257 },
  { file: "hdi.png", alt: "HDI", width: 379 },
  { file: "shop-apotheke.png", alt: "shop-apotheke.com", width: 240 },
  { file: "uniklinik-koeln.png", alt: "Uniklinik Köln", width: 425 },
  { file: "eckes-granini.png", alt: "Eckes-Granini", width: 493 },
  { file: "tuev-rheinland.png", alt: "TÜV Rheinland", width: 474 },
  { file: "adalliance.png", alt: "AdAlliance", width: 269 },
  { file: "rheinenergie-marathon-koeln.png", alt: "RheinEnergie Marathon Köln", width: 387 },
  { file: "gerolsteiner.png", alt: "Gerolsteiner", width: 300 },
  { file: "lorenz.png", alt: "Lorenz", width: 358 },
  { file: "funny-frisch.png", alt: "funny-frisch", width: 240 },
  { file: "vok-dams.png", alt: "VOK DAMS", width: 630 },
  { file: "serviceplan.png", alt: "Serviceplan", width: 630 },
];

/** Einheitliche Leinwandhöhe aller Dateien — siehe `scripts/build-logo-banner.mjs`. */
const CANVAS_HEIGHT = 240;

export function LogoBanner() {
  return (
    <section
      aria-label="Kunden"
      // Hairlines statt der früheren weißen Fläche: ohne sie wäre die Leiste auf
      // dem dunklen Seitenhintergrund kein Band mehr, sondern nur eine Reihe
      // schwebender Logos. `border-white/10` ist dieselbe Linie wie an den
      // Testimonial-Karten.
      className="logo-banner border-y border-white/10 bg-makec-dark overflow-hidden"
    >
      <div className="flex w-max items-center animate-[marquee_80s_linear_infinite] py-8 md:py-10">
        {[...LOGOS, ...LOGOS].map(({ file, alt, width }, i) => (
          <Image
            key={`${file}-${i}`}
            src={`/logos/${file}`}
            // Die zweite Hälfte ist die Kopie für den nahtlosen Umlauf und darf
            // Screenreadern nicht ein zweites Mal denselben Kunden vorlesen.
            alt={i < LOGOS.length ? alt : ""}
            width={width}
            height={CANVAS_HEIGHT}
            className="mx-8 md:mx-12 h-14 md:h-[84px] w-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
}
