import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });

const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
const token = requireEnv("SANITY_API_WRITE_TOKEN");
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// ---------------- Portable Text Helpers ----------------

type Mark = "strong" | "em";
type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  markDefs: { _key: string; _type: "link"; href: string }[];
  children: Span[];
  level?: number;
  listItem?: "bullet" | "number";
};

function span(text: string, marks: Mark[] = []): Span {
  return { _type: "span", _key: randomUUID(), text, marks };
}

function block(children: Span[], style: Block["style"] = "normal"): Block {
  return {
    _type: "block",
    _key: randomUUID(),
    style,
    markDefs: [],
    children,
  };
}

function h2(text: string): Block {
  return block([span(text)], "h2");
}

function h3(text: string): Block {
  return block([span(text)], "h3");
}

function p(...children: (Span | string)[]): Block {
  return block(
    children.map((c) => (typeof c === "string" ? span(c) : c)),
    "normal"
  );
}

function pStrong(text: string): Block {
  return block([span(text, ["strong"])], "normal");
}

function bullet(text: string): Block {
  return {
    _type: "block",
    _key: randomUUID(),
    style: "normal",
    markDefs: [],
    children: [span(text)],
    level: 1,
    listItem: "bullet",
  };
}

function pWithLink(prefix: string, linkText: string, href: string, suffix = ""): Block {
  const linkKey = randomUUID();
  return {
    _type: "block",
    _key: randomUUID(),
    style: "normal",
    markDefs: [{ _key: linkKey, _type: "link", href }],
    children: [
      span(prefix),
      { _type: "span", _key: randomUUID(), text: linkText, marks: [linkKey] },
      ...(suffix ? [span(suffix)] : []),
    ],
  };
}

// ---------------- Site Settings ----------------

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  email: "info@make-c.de",
  locations: [
    {
      _key: randomUUID(),
      _type: "location",
      city: "KÖLN",
      address: ["Picassoplatz 1", "50679 Köln"],
    },
    {
      _key: randomUUID(),
      _type: "location",
      city: "ESSEN",
      address: ["Sigsfeldstraße 5", "45141 Essen"],
    },
  ],
  socials: [
    { _key: randomUUID(), _type: "socialLink", label: "INSTAGRAM" },
    { _key: randomUUID(), _type: "socialLink", label: "LINKEDIN" },
    { _key: randomUUID(), _type: "socialLink", label: "VIMEO" },
  ],
  footerHeadline: { lineOne: "LET'S", lineTwo: "TALK" },
  copyright: "make/c — © 2025",
};

// ---------------- Impressum ----------------

const impressum = {
  _id: "legalPage-impressum",
  _type: "legalPage",
  slug: { _type: "slug", current: "impressum" },
  title: "Impressum",
  body: [
    h2("Anbieter"),
    pStrong("make/c video content marketing GmbH"),
    p("Sigsfeldstraße 5"),
    p("45141 Essen"),

    h2("Kontakt"),
    p("Fon: +49 221 – 4 56 – 7 62 12"),
    pWithLink("E-Mail: ", "info@make-c.de", "mailto:info@make-c.de"),

    h2("Register & Sitz"),
    p("Sitz der Gesellschaft: Essen"),
    p("Handelsregister: HRB 26367"),
    p("Amtsgericht Essen"),

    h2("Geschäftsführung"),
    p("Jens Kemper und Philip Welkisch"),
    block([span("make/c ist ein Unternehmen der CNC Cologne News Corporation GmbH", ["em"])]),

    h2("Disclaimer"),
    h3("Haftung für Inhalte"),
    p(
      "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
    ),

    h3("Haftung für Links"),
    p(
      "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
    ),

    h3("Urheberrecht"),
    p(
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
    ),
  ],
};

// ---------------- Datenschutz ----------------

const datenschutz = {
  _id: "legalPage-datenschutz",
  _type: "legalPage",
  slug: { _type: "slug", current: "datenschutz" },
  title: "Datenschutz",
  effectiveDate: "Dezember 2025",
  body: [
    h2("1. Verantwortlicher"),
    pStrong("make/c video content marketing GmbH"),
    p("Sigsfeldstraße 5"),
    p("45141 Essen"),
    pWithLink("E-Mail: ", "datenschutz@make-c.de", "mailto:datenschutz@make-c.de"),

    h2("2. Allgemeine Hinweise zur Datenverarbeitung"),
    p(
      "Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre personenbezogenen Daten ausschließlich auf Grundlage der geltenden gesetzlichen Bestimmungen, insbesondere der Datenschutz-Grundverordnung (DSGVO)."
    ),
    pStrong(
      "Diese Website dient derzeit Informations- und Entwicklungszwecken. Es findet kein Tracking, keine Analyse und keine werbliche Auswertung des Nutzerverhaltens statt."
    ),

    h2("3. Hosting über Vercel"),
    p("Diese Website wird bei Vercel Inc. gehostet."),
    p(
      "Beim Aufruf der Website verarbeitet Vercel personenbezogene Daten, insbesondere sogenannte Server-Logfiles. Diese Daten sind technisch erforderlich, um die Website bereitzustellen und sicher zu betreiben."
    ),
    p("Verarbeitete Daten können insbesondere sein:"),
    bullet("IP-Adresse"),
    bullet("Datum und Uhrzeit der Anfrage"),
    bullet("aufgerufene URL"),
    bullet("Referrer-URL"),
    bullet("Browsertyp und -version"),
    bullet("Betriebssystem"),

    h3("Zweck der Verarbeitung"),
    bullet("Auslieferung und Darstellung der Website"),
    bullet("Gewährleistung von Stabilität und Sicherheit"),
    bullet("Schutz vor Missbrauch und Angriffen"),

    h3("Rechtsgrundlage"),
    p(
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Betrieb der Website)."
    ),

    h3("Datenübermittlung in Drittländer"),
    p(
      "Vercel verarbeitet Daten unter anderem auch in den USA. Die Übermittlung erfolgt auf Grundlage der von der EU-Kommission genehmigten Standardvertragsklauseln (SCCs) gemäß Art. 46 DSGVO."
    ),

    h2("4. Cookies"),
    p("Diese Website verwendet keine Cookies, die eine Einwilligung erfordern."),
    pStrong("Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt."),
    p(
      "Lediglich technisch notwendige Verarbeitungen im Rahmen des Hostings (z. B. Server-Logs) finden statt. Ein Cookie-Banner ist daher nicht erforderlich."
    ),

    h2("5. Kontaktaufnahme"),
    p(
      "Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten personenbezogenen Daten (z. B. E-Mail-Adresse, Inhalt der Nachricht) ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet."
    ),
    h3("Rechtsgrundlage"),
    p(
      "Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation)"
    ),

    h2("6. Speicherdauer"),
    p(
      "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen."
    ),
    pStrong("Server-Logdaten werden von Vercel nur temporär gespeichert und anschließend gelöscht oder anonymisiert."),

    h2("7. Rechte der betroffenen Personen"),
    p("Sie haben jederzeit das Recht auf:"),
    bullet("Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)"),
    bullet("Berichtigung unrichtiger Daten (Art. 16 DSGVO)"),
    bullet("Löschung Ihrer Daten (Art. 17 DSGVO)"),
    bullet("Einschränkung der Verarbeitung (Art. 18 DSGVO)"),
    bullet("Datenübertragbarkeit (Art. 20 DSGVO)"),
    bullet("Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)"),
    block([span("Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an die oben genannte Adresse.", ["em"])]),

    h2("8. Beschwerderecht"),
    p(
      "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt."
    ),
  ],
};

// ---------------- Run ----------------

async function run() {
  console.log("Seeding Site Settings, Impressum, Datenschutz...");

  const tx = client.transaction();
  tx.createOrReplace(siteSettings);
  tx.createOrReplace(impressum);
  tx.createOrReplace(datenschutz);

  const result = await tx.commit();
  console.log(`✓ Wrote ${result.results.length} documents`);
  for (const doc of result.results) {
    console.log(`  - ${doc.id} (${doc.operation})`);
  }
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
