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
 *
 * ⚠️ Stand 01.09.2026 (User-Lieferung): **27 Logos**. Neu sind Dräger,
 * Transgourmet, Forschungszentrum Jülich, Bastei Lübbe, opta data,
 * Thermengruppe Josef Wund und Dr. Hans Riegel-Stiftung; „MERKUR AG" ist durch
 * „MERKUR GROUP" ersetzt. **Herausgenommen** sind HDI, RheinEnergie Marathon
 * Köln und funny-frisch — nicht ohne Rückfrage wieder eintragen.
 *
 * ⚠️ Die **Dauer der Animation gehört zur Länge der Liste** (siehe
 * `@keyframes marquee` in `globals.css`): 23 Logos liefen in 80 s, 27 brauchen
 * bei gleicher Geschwindigkeit 97 s. Die Rechnung ist Leinwandbreite × (84/240)
 * plus 96 px Rand je Logo; sie geht für Mobil (56 px, 64 px Rand) auf denselben
 * Faktor 1,218 auf. Wer Logos ergänzt oder entfernt, zieht die Sekunden mit,
 * sonst ändert sich das Tempo der Leiste.
 */
const LOGOS: { file: string; alt: string; width: number }[] = [
  { file: "telekom.png", alt: "Telekom", width: 341 },
  { file: "db-schenker.png", alt: "DB Schenker", width: 617 },
  { file: "covestro.png", alt: "Covestro", width: 240 },
  { file: "koeln-bonn-airport.png", alt: "Köln Bonn Airport", width: 453 },
  { file: "bayer.png", alt: "Bayer", width: 240 },
  { file: "draeger.png", alt: "Dräger", width: 386 },
  { file: "zurich.png", alt: "Zurich", width: 303 },
  { file: "koelnmesse.png", alt: "Koelnmesse", width: 443 },
  { file: "evonik.png", alt: "Evonik", width: 474 },
  { file: "rewe-group.png", alt: "REWE Group", width: 435 },
  { file: "ergo.png", alt: "ERGO", width: 441 },
  { file: "merkur-group.png", alt: "MERKUR GROUP", width: 621 },
  { file: "transgourmet.png", alt: "Transgourmet", width: 387 },
  { file: "shop-apotheke.png", alt: "shop-apotheke.com", width: 240 },
  { file: "uniklinik-koeln.png", alt: "Uniklinik Köln", width: 425 },
  { file: "forschungszentrum-juelich.png", alt: "Forschungszentrum Jülich", width: 444 },
  { file: "eckes-granini.png", alt: "Eckes-Granini", width: 493 },
  { file: "tuev-rheinland.png", alt: "TÜV Rheinland", width: 474 },
  { file: "adalliance.png", alt: "AdAlliance", width: 269 },
  { file: "bastei-luebbe.png", alt: "Bastei Lübbe", width: 285 },
  { file: "gerolsteiner.png", alt: "Gerolsteiner", width: 300 },
  { file: "lorenz.png", alt: "Lorenz", width: 358 },
  { file: "opta-data.png", alt: "opta data", width: 588 },
  { file: "thermengruppe-josef-wund.png", alt: "Thermengruppe Josef Wund", width: 407 },
  { file: "hans-riegel-stiftung.png", alt: "Dr. Hans Riegel-Stiftung", width: 403 },
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
      <div className="flex w-max items-center animate-[marquee_97s_linear_infinite] py-8 md:py-10">
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
