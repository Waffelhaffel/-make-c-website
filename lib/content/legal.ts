import type { PortableTextBlock } from "@portabletext/types";

// Impressum und Datenschutz — hartcodiert (siehe CLAUDE.md, Regel 1).
//
// Der Text lag bis 07/2026 als `legalPage`-Dokument in Sanity und wurde von
// `app/impressum` / `app/datenschutz` gelesen. Beide Seiten riefen `notFound()`,
// wenn Sanity `null` lieferte — also auch bei fehlenden Env-Variablen. Bei
// Impressumspflicht ist das kein akzeptables Ausfallverhalten, deshalb liegt der
// Text jetzt hier.
//
// ⚠️ Nicht per Hand umformatieren. Die Blöcke wurden 1:1 aus dem Dataset
// exportiert; `PortableTextRenderer` rendert sie unverändert weiter (normal/h2/h3,
// Listen, Links). Änderungen am Rechtstext gehören juristisch geprüft, nicht
// kosmetisch gemacht.

export type LegalPageContent = {
  title: string;
  body: PortableTextBlock[];
  effectiveDate?: string;
};

// Anbieterkennzeichnung nach § 5 DDG.
export const IMPRESSUM: LegalPageContent = {
  title: "Impressum",
  body: [
    {
      "_key": "3ded350b-a0e6-4791-a43e-e655266c2a73",
      "_type": "block",
      "children": [
        {
          "_key": "915f3635-337d-4ad7-bf34-e01adbec005a",
          "_type": "span",
          "marks": [],
          "text": "Anbieter"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "184a9c4f-af52-41ec-a511-5bec7a691903",
      "_type": "block",
      "children": [
        {
          "_key": "45ce61aa-9bb6-481d-9fa3-ef5459a52568",
          "_type": "span",
          "marks": [
            "strong"
          ],
          "text": "make/c video content marketing GmbH"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "4d67db88-168b-4c29-848c-704e8eac27fe",
      "_type": "block",
      "children": [
        {
          "_key": "bfa55e04-bc89-469b-930e-8732c6b6024f",
          "_type": "span",
          "marks": [],
          "text": "Sigsfeldstraße 5"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "ef5c49a6-a1a3-4e3c-9ba9-2cae1511f181",
      "_type": "block",
      "children": [
        {
          "_key": "7551d9b3-516b-4fa0-b689-35be2e28db9c",
          "_type": "span",
          "marks": [],
          "text": "45141 Essen"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "013bdff7-0baf-498b-ab4e-f67f256eac86",
      "_type": "block",
      "children": [
        {
          "_key": "db75b029-f829-4b23-bd7b-7aa4e0f87063",
          "_type": "span",
          "marks": [],
          "text": "Kontakt"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "534b780e-35cf-4c34-b768-40c282755467",
      "_type": "block",
      "children": [
        {
          "_key": "8f1006a1-9ede-4d09-b125-3a7dc317a123",
          "_type": "span",
          "marks": [],
          "text": "Fon: +49 221 456 76390"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "4f6908fd-1037-4885-aad3-c41ee06ddbfd",
      "_type": "block",
      "children": [
        {
          "_key": "9f5a953a-d6bf-4179-ae21-0ab6ed968548",
          "_type": "span",
          "marks": [],
          "text": "E-Mail: "
        },
        {
          "_key": "7a958507-b864-4505-af08-86d8595df770",
          "_type": "span",
          "marks": [
            "72b82ae1-7bcc-4e3b-9fc9-0144f029c98e"
          ],
          "text": "info@make-c.de"
        }
      ],
      "markDefs": [
        {
          "_key": "72b82ae1-7bcc-4e3b-9fc9-0144f029c98e",
          "_type": "link",
          "href": "mailto:info@make-c.de"
        }
      ],
      "style": "normal"
    },
    {
      "_key": "4ef9b7f6-b2cd-401d-a222-9266f9cac6ff",
      "_type": "block",
      "children": [
        {
          "_key": "22e193a5-58e6-4272-916f-eca98dc8d33c",
          "_type": "span",
          "marks": [],
          "text": "Register & Sitz"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "5cb63342-360a-432b-9e3a-dad2149628b7",
      "_type": "block",
      "children": [
        {
          "_key": "e2b5b38a-0dc7-4998-9e74-65209b17134d",
          "_type": "span",
          "marks": [],
          "text": "Sitz der Gesellschaft: Essen"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "30cb65d4-5d5c-4851-9e93-2db437e45178",
      "_type": "block",
      "children": [
        {
          "_key": "ca182366-e72d-49c5-a62e-8449a728fd74",
          "_type": "span",
          "marks": [],
          "text": "Handelsregister: HRB 26367"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "425bafb9-57e1-4407-9b03-0e1d7eefb6f1",
      "_type": "block",
      "children": [
        {
          "_key": "ee09e7c1-bfa2-4931-9900-ce3de7d7b28f",
          "_type": "span",
          "marks": [],
          "text": "Amtsgericht Essen"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "c4744c1e-a234-48f3-bbcf-daae4983c147",
      "_type": "block",
      "children": [
        {
          "_key": "f1e1188b-3276-47fe-8dc0-025ae0a0ff32",
          "_type": "span",
          "marks": [],
          "text": "Geschäftsführung"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "e7bc2999-d8e2-471a-a0e9-7105f1a783ea",
      "_type": "block",
      "children": [
        {
          "_key": "55d5e5a6-eed4-43c9-a849-f1940631aa1f",
          "_type": "span",
          "marks": [],
          "text": "Jens Kemper und Philip Welkisch"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "ac5f9b50-1576-4d05-a3e3-9af1dc695a44",
      "_type": "block",
      "children": [
        {
          "_key": "2ca8b048-cbe3-484e-a3c1-1359d3b6a088",
          "_type": "span",
          "marks": [
            "em"
          ],
          "text": "make/c ist ein Unternehmen der CNC Cologne News Corporation GmbH"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "ab7a8242-edf5-4ea3-ae07-591696a96cda",
      "_type": "block",
      "children": [
        {
          "_key": "bb434fab-6132-4084-b184-be73342beb00",
          "_type": "span",
          "marks": [],
          "text": "Disclaimer"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "7511f61d-96c6-420a-b109-24fc93428018",
      "_type": "block",
      "children": [
        {
          "_key": "453facbc-1a19-42b0-9cbf-e869397e2290",
          "_type": "span",
          "marks": [],
          "text": "Haftung für Inhalte"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "78c4097d-e6bc-4cdf-a796-1532ff533058",
      "_type": "block",
      "children": [
        {
          "_key": "e3fcdddf-cd64-4b25-b722-a515c441f97e",
          "_type": "span",
          "marks": [],
          "text": "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "3e2a04f3-5a11-4066-b227-0efa1820e1c8",
      "_type": "block",
      "children": [
        {
          "_key": "c9c428be-2591-4c2d-acd4-25afd88857a1",
          "_type": "span",
          "marks": [],
          "text": "Haftung für Links"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "56687106-60de-4776-a2f2-1006aeaef887",
      "_type": "block",
      "children": [
        {
          "_key": "0e69f807-af8a-4a0a-bc5d-ac0bf62b08c0",
          "_type": "span",
          "marks": [],
          "text": "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "cc0b0490-b30b-460a-b458-ebd7c797116c",
      "_type": "block",
      "children": [
        {
          "_key": "7b069450-c0b0-42a5-bb55-52931c69e84f",
          "_type": "span",
          "marks": [],
          "text": "Urheberrecht"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "acce74a7-19f2-4f25-8fe6-3820a669e05f",
      "_type": "block",
      "children": [
        {
          "_key": "86c0e43e-ab4d-45b4-b26c-560f81fa3795",
          "_type": "span",
          "marks": [],
          "text": "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
        }
      ],
      "markDefs": [],
      "style": "normal"
    }
  ],
};

// ── Datenschutzerklärung ────────────────────────────────────────────────────
//
// Neu geschrieben am 22.08.2026. Die Fassung davor (Stand Dezember 2025) kannte
// weder die eingebetteten Videos noch die Reichweitenmessung und beschrieb damit
// nicht mehr, was auf der Seite passiert. Wer sie braucht: `git show` auf den
// Stand vom 22.08.2026.
//
// ⚠️ **Juristisch nicht geprüft.** Der Text beschreibt exakt das, was die Seite
// technisch tut (nachgemessen, siehe unten) — die rechtliche Bewertung gehört
// trotzdem gegengelesen.
//
// Nachgemessen am Production-Build über alle zehn Routen, inklusive Scrollen bis
// zum Seitenende (Playwright + System-Chrome, siehe CLAUDE.md):
//   • fremde Hosts: **keine**
//   • Cookies: **keine** · localStorage: leer · sessionStorage: leer
//   • Schriften: vier `.woff2` von der **eigenen** Domain, keine von Google
// Wer an der Seite etwas ändert, das eine dieser drei Zeilen umwirft, muss diese
// Erklärung mitändern. Die Messung lässt sich mit `/tmp/pw/audit-extern.mjs`
// wiederholen — das Muster steht in CLAUDE.md unter „Visuelle Prüfung / Messen“.
//
// Warum Bauhelfer statt roher Portable-Text-Blöcke wie beim Impressum darüber:
// der Text ist rund viermal so lang. Als Blockliteral wäre er nicht mehr lesbar
// und damit auch nicht mehr prüfbar. Die Helfer erzeugen genau dieselbe Struktur,
// die `PortableTextRenderer` ohnehin erwartet (normal/h2/h3, Listen, Links).

/** Ein Textstück: nackter String, oder mit Link und/oder Fettung. */
type Teil = string | { text: string; href?: string; stark?: boolean };

let lfd = 0;
const kk = () => `ds-${(++lfd).toString().padStart(3, "0")}`;

function kinder(teile: Teil[]) {
  const children: PortableTextBlock["children"] = [];
  const markDefs: { _key: string; _type: string; href: string }[] = [];
  for (const teil of teile) {
    if (typeof teil === "string") {
      children.push({ _key: kk(), _type: "span", marks: [], text: teil });
      continue;
    }
    const marks: string[] = [];
    if (teil.stark) marks.push("strong");
    if (teil.href) {
      const linkKey = kk();
      markDefs.push({ _key: linkKey, _type: "link", href: teil.href });
      marks.push(linkKey);
    }
    children.push({ _key: kk(), _type: "span", marks, text: teil.text });
  }
  return { children, markDefs };
}

const bl = (
  style: string,
  teile: Teil[],
  extra: Record<string, unknown> = {},
): PortableTextBlock => ({
  _key: kk(),
  _type: "block",
  style,
  ...kinder(teile),
  ...extra,
});

/** Abschnittsüberschrift („1. Verantwortlicher“). */
const h2 = (text: string) => bl("h2", [text]);
/** Zwischenüberschrift innerhalb eines Abschnitts. */
const h3 = (text: string) => bl("h3", [text]);
/** Absatz. */
const p = (...teile: Teil[]) => bl("normal", teile);
/** Aufzählungspunkt. */
const li = (...teile: Teil[]) => bl("normal", teile, { level: 1, listItem: "bullet" });

export const DATENSCHUTZ: LegalPageContent = {
  title: "Datenschutz",
  effectiveDate: "22. August 2026",
  body: [
    p(
      "Wir freuen uns über Ihr Interesse an make/c. Nachfolgend informieren wir Sie darüber, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden, zu welchem Zweck das geschieht und welche Rechte Ihnen zustehen.",
    ),
    p(
      { text: "Kurz vorweg:", stark: true },
      " Diese Website setzt keine Cookies, lädt weder Schriften noch Karten oder Social-Media-Bausteine von fremden Servern und verwendet keine Werbe- oder Wiedererkennungstechniken. Eine Verbindung zu einem anderen Anbieter entsteht erst, wenn Sie selbst ein eingebettetes Video starten oder einem Link folgen.",
    ),

    // ── 1 ───────────────────────────────────────────────────────────────────
    h2("1. Verantwortlicher"),
    p(
      "Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
    ),
    p("make/c video content marketing GmbH"),
    p("Sigsfeldstraße 5, 45141 Essen"),
    p("Vertreten durch die Geschäftsführung: Jens Kemper und Philip Welkisch"),
    p("Telefon: +49 221 456 76390"),
    p("E-Mail: ", {
      text: "datenschutz@make-c.de",
      href: "mailto:datenschutz@make-c.de",
    }),

    // ── 2 ───────────────────────────────────────────────────────────────────
    h2("2. Allgemeines zur Datenverarbeitung"),
    h3("Personenbezogene Daten"),
    p(
      "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen — etwa Name, Anschrift, E-Mail-Adresse oder IP-Adresse.",
    ),
    h3("Rechtsgrundlagen"),
    p(
      "Holen wir für einen Verarbeitungsvorgang Ihre Einwilligung ein, ist Art. 6 Abs. 1 lit. a DSGVO die Rechtsgrundlage. Verarbeiten wir Daten zur Erfüllung eines Vertrags oder für vorvertragliche Maßnahmen, ist es Art. 6 Abs. 1 lit. b DSGVO. Sind wir gesetzlich zur Verarbeitung verpflichtet, gilt Art. 6 Abs. 1 lit. c DSGVO. Ist die Verarbeitung zur Wahrung eines berechtigten Interesses erforderlich und überwiegen Ihre Interessen und Grundrechte nicht, stützen wir uns auf Art. 6 Abs. 1 lit. f DSGVO.",
    ),
    h3("Verschlüsselung"),
    p(
      "Diese Website wird ausschließlich über eine verschlüsselte Verbindung ausgeliefert (HTTPS/TLS). Sie erkennen das am Schloss-Symbol in der Adresszeile Ihres Browsers.",
    ),
    h3("Sie müssen keine Daten angeben"),
    p(
      "Sie können diese Website vollständig nutzen, ohne personenbezogene Daten anzugeben. Es gibt kein Kontaktformular, keine Registrierung, kein Benutzerkonto und keinen Newsletter.",
    ),

    // ── 3 ───────────────────────────────────────────────────────────────────
    h2("3. Hosting bei Vercel und Server-Protokolle"),
    p("Diese Website wird bei Vercel gehostet. Anbieter ist:"),
    p("Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA"),
    // ⚠️ Die Region ist eine **Angabe des Betreibers** (12.09.2026), keine
    // Messung: der Vercel-Account hängt nicht an diesem Arbeitsplatz, die
    // Einstellung ist von hier aus nicht prüfbar. Wer sie ändert, ändert diesen
    // Satz mit. Der zweite Satz steht bewusst daneben — die Seite ist voll
    // statisch und wird über Vercels weltweites CDN verteilt, „die Server
    // stehen in Frankfurt" allein wäre deshalb zu viel behauptet.
    p(
      { text: "Als Verarbeitungsregion haben wir Frankfurt am Main gewählt", stark: true },
      ", also einen Standort innerhalb der Europäischen Union. Die Seiteninhalte sind darüber hinaus statische Dateien, die Vercel über sein weltweites Auslieferungsnetz (CDN) bereitstellt und vom jeweils nächstgelegenen Standort ausliefert; für Aufrufe aus Deutschland ist das in aller Regel Frankfurt.",
    ),
    p(
      "Bei jedem Aufruf einer Seite übermittelt Ihr Browser automatisch Informationen an den Server, die dort in Protokolldateien gespeichert werden:",
    ),
    li("die IP-Adresse des anfragenden Geräts"),
    li("Datum und Uhrzeit der Anfrage"),
    li("die aufgerufene Adresse (URL)"),
    li("die zuvor besuchte Seite, sofern Ihr Browser sie übermittelt (Referrer)"),
    li("Browsertyp, Browserversion und Betriebssystem"),
    li("Statuscode und übertragene Datenmenge"),
    p(
      "Diese Daten sind technisch erforderlich, damit die Seite überhaupt ausgeliefert werden kann. Darüber hinaus nutzen wir sie, um den Betrieb stabil und sicher zu halten und Angriffe abzuwehren. Sie werden nicht mit anderen Datenquellen zusammengeführt, und wir ziehen aus ihnen keine Rückschlüsse auf einzelne Personen.",
    ),
    p(
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und störungsfreien Betrieb dieser Website.",
    ),
    p(
      "Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Vercel hat seinen Sitz in den USA; zu der damit verbundenen Übermittlung siehe Abschnitt 14.",
    ),

    // ── 4 ───────────────────────────────────────────────────────────────────
    h2("4. Schriftarten von unserem eigenen Server"),
    p(
      "Diese Website verwendet die Schriftarten Montserrat und EB Garamond. Beide werden nicht bei jedem Seitenaufruf von einem fremden Server nachgeladen, sondern bereits bei der Erstellung der Website heruntergeladen und anschließend von unserem eigenen Server ausgeliefert.",
    ),
    p({
      text: "Es wird deshalb keine Verbindung zu Google Fonts aufgebaut, und Ihre IP-Adresse wird zu diesem Zweck nicht an Google übermittelt.",
      stark: true,
    }),

    // ── 5 ───────────────────────────────────────────────────────────────────
    h2("5. Cookies und Speicherung auf Ihrem Endgerät"),
    p(
      "Diese Website setzt von sich aus keine Cookies. Es kommen auch keine vergleichbaren Techniken zum Einsatz, die Informationen auf Ihrem Endgerät speichern oder darauf zugreifen — weder Local Storage oder Session Storage noch Zählpixel.",
    ),
    p(
      { text: "Deshalb gibt es hier auch kein Cookie-Banner:", stark: true },
      " Es gibt nichts, wofür wir Ihre Einwilligung nach § 25 TDDDG einholen müssten.",
    ),
    p(
      "Das gilt auch für die Reichweitenmessung: Sie kommt ohne jede Speicherung auf Ihrem Endgerät aus. Näheres dazu in Abschnitt 6.",
    ),
    p(
      "Eine Ausnahme entsteht erst durch Ihr eigenes Zutun: Wenn Sie ein eingebettetes Video starten, können YouTube beziehungsweise Vimeo eigene Cookies setzen. Näheres in Abschnitt 7.",
    ),

    // ── 6 ───────────────────────────────────────────────────────────────────
    // ⚠️ Dieser Abschnitt beschreibt PostHog in der **cookiefreien** Betriebsart.
    // Er ist Satz für Satz an `instrumentation-client.ts` gebunden und nur
    // richtig, solange PostHog genau so eingebunden ist:
    //   `cookieless_mode: "always"` + `persistence: "memory"` → kein Cookie,
    //       kein Local/Session Storage, Zählung über den Tages-Hash unten
    //   `person_profiles: "never"`  → keine Profile
    //   `autocapture: true`         → deckt den Aufzählungspunkt „Klicks" ab
    //   `disable_session_recording` / `capture_heatmaps: false` → keine
    //       Aufzeichnung, keine Mauswege (sonst fehlte hier eine Kategorie)
    //   `doNotTrack()` vor `init()`  → der technische Widerspruch weiter unten.
    //       ⚠️ Nicht `respect_dnt`: das ist in der cookiefreien Betriebsart
    //       wirkungslos, Begründung steht in `instrumentation-client.ts`.
    //   EU-Instanz + Reverse Proxy in `next.config.ts` → Serverstandort und
    //       der Satz „nicht unmittelbar an PostHog"
    //
    // Die Aufzählung „Erfasst werden dabei" ist **nicht geraten**: sie ist am
    // 12.09.2026 aus den tatsächlich gesendeten Ereignissen abgelesen (POST an
    // /mc-relay/e/ entpackt, alle Eigenschaftsnamen und -werte gelesen).
    // Dabei gemessen: `$device_id: null`, `distinct_id` leer,
    // `$process_person_profile: false`, `$cookieless_mode: true` — und
    // Scrolltiefe, Verweildauer, Zeitzone, Sprache, Bildschirmgröße und
    // User-Agent, die deshalb hier einzeln aufgeführt sind. Wer die
    // Konfiguration anfasst, misst neu, statt die Liste zu raten.
    // Kommt PostHog doch nicht oder anders — diesen Abschnitt löschen bzw.
    // anpassen und die folgenden Nummern hochzählen. Eine Datenschutzerklärung
    // darf keine Verarbeitung beschreiben, die es so nicht gibt.
    h2("6. Reichweitenmessung (ohne Cookies)"),
    p(
      "Um nachvollziehen zu können, welche Inhalte dieser Website genutzt werden, setzen wir zwei Dienste zur Reichweitenmessung ein: PostHog für die inhaltliche Auswertung und Vercel Web Analytics als Überblick unseres Hosters. ",
      { text: "Beide arbeiten ohne Cookies", stark: true },
      " und ohne jede Speicherung auf Ihrem Endgerät. Was jeder der beiden erfasst, steht unten getrennt; Rechtsgrundlage und Widerspruchsrecht gelten für beide gleichermaßen und stehen am Ende dieses Abschnitts.",
    ),

    h3("a) PostHog"),
    p(
      "Anbieter ist PostHog, Inc., 2261 Market St. #4008, San Francisco, CA 94114, USA.",
    ),
    p(
      { text: "Wir nutzen PostHog ausschließlich in der cookiefreien Betriebsart.", stark: true },
      " Es werden weder Cookies gesetzt noch Daten in Local Storage oder Session Storage abgelegt. Es werden keine Nutzerprofile gebildet, und eine Wiedererkennung über mehrere Geräte oder über andere Websites hinweg findet nicht statt.",
    ),
    p("Erfasst werden dabei:"),
    li("die aufgerufene Seite samt Seitentitel und der Zeitpunkt des Aufrufs"),
    li("die zuvor besuchte Seite (Referrer)"),
    li(
      "Browser, Betriebssystem und Gerätetyp einschließlich der Browserkennung (User-Agent), die Ihr Browser bei jedem Seitenaufruf ohnehin mitsendet",
    ),
    li("Bildschirm- und Fenstergröße sowie Spracheinstellung und Zeitzone des Browsers"),
    li("das Land, aus dem der Aufruf erfolgt, abgeleitet aus der IP-Adresse"),
    li("wie lange eine Seite geöffnet war und wie weit auf ihr gescrollt wurde"),
    li(
      "Klicks auf Schaltflächen und Links sowie deren Beschriftung — Eingaben in Textfelder werden nicht erfasst",
    ),
    p(
      { text: "Den übermittelten Daten ist keine Geräte- oder Nutzerkennung beigefügt.", stark: true },
      " Nicht erfasst werden außerdem Mausbewegungen; eine Aufzeichnung Ihrer Sitzung oder Ihres Bildschirms findet nicht statt.",
    ),
    p(
      { text: "Zur Unterscheidung einzelner Besuche innerhalb eines Tages", stark: true },
      " bildet PostHog auf seinem Server einen nicht umkehrbaren Hashwert aus Ihrer IP-Adresse, der Browserkennung und einem Zufallswert, der täglich wechselt. Dadurch lässt sich zählen, wie viele verschiedene Personen die Website besucht haben, ohne dass etwas auf Ihrem Endgerät gespeichert wird. Mit dem Wechsel des Zufallswerts verliert der Hashwert seine Bedeutung: eine Wiedererkennung über den Tag hinaus ist damit ausgeschlossen. Die IP-Adresse selbst wird nicht gespeichert; sie wird darüber hinaus nur zur Ermittlung des ungefähren Standorts auf Länderebene verwendet.",
    ),
    p(
      { text: "Die Daten werden nicht unmittelbar von Ihrem Browser an PostHog gesendet.", stark: true },
      " Ihr Browser spricht ausschließlich unsere eigene Domain an; die Weiterleitung an PostHog erfolgt auf unserem Server. Beim Aufruf dieser Website baut Ihr Browser also keine Verbindung zu PostHog auf.",
    ),
    p(
      "Die Verarbeitung findet auf Servern innerhalb der Europäischen Union statt (Standort Deutschland). Mit PostHog besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.",
    ),

    h3("b) Vercel Web Analytics"),
    p(
      "Diese Auswertung stammt von unserem Hoster Vercel Inc. (Anschrift in Abschnitt 3) und ergänzt PostHog um einen groben Überblick unmittelbar neben dem Betrieb der Website.",
    ),
    p(
      { text: "Auch hier werden keine Cookies gesetzt", stark: true },
      " und keine Daten auf Ihrem Endgerät abgelegt. Nach Angaben des Anbieters werden die Aufrufe anonym gezählt: Vercel bildet dafür aus Ihrer Anfrage einen Hashwert, der nach 24 Stunden verworfen wird, und erhebt keine Merkmale, mit denen sich Ihr Verhalten über verschiedene Websites hinweg zusammenführen ließe. Auch für diese Messung gilt: Das Skript wird von unserer eigenen Domain ausgeliefert, Ihr Browser baut keine Verbindung zu einem fremden Host auf.",
    ),
    p("Erfasst werden dabei:"),
    li("die aufgerufene Seite und der Zeitpunkt des Aufrufs"),
    li("die zuvor besuchte Seite (Referrer)"),
    li("Browser, Betriebssystem und Gerätetyp, jeweils mit Version"),
    li(
      "der ungefähre Standort, abgeleitet aus der IP-Adresse — bei diesem Dienst bis auf die Ebene von Region und Stadt und damit genauer als bei PostHog",
    ),
    p(
      { text: "Einen europäischen Verarbeitungsort sichert Vercel für diese Auswertung nicht zu.", stark: true },
      " Anders als bei PostHog kann die Verarbeitung deshalb auch außerhalb der Europäischen Union stattfinden; die Wahl unserer Hosting-Region aus Abschnitt 3 erstreckt sich nicht darauf. Näheres in Abschnitt 14. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.",
    ),

    h3("Rechtsgrundlage und Widerspruch — für beide Dienste"),
    p(
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt darin, die Nutzung unserer Website in anonymer Form auszuwerten und unser Angebot zu verbessern. Da dabei keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, ist hierfür keine Einwilligung nach § 25 TDDDG erforderlich.",
    ),
    p(
      { text: "Sie können der Messung jederzeit widersprechen.", stark: true },
      " Am einfachsten geht das in Ihrem Browser: Ist dort die Einstellung „Do Not Track“ aktiv, findet für Sie überhaupt keine Messung statt — weder durch PostHog noch durch Vercel. Wir werten dieses Signal aus und laden beide Dienste dann gar nicht erst. Ebenso genügt eine formlose Nachricht an uns, siehe Abschnitt 17.",
    ),

    // ── 7 ───────────────────────────────────────────────────────────────────
    h2("7. Videos von YouTube und Vimeo"),
    p(
      "Auf unseren Referenzseiten binden wir Videos ein, die bei YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) und bei Vimeo (Vimeo.com, Inc., 330 West 34th Street, 10th Floor, New York, NY 10001, USA) liegen.",
    ),
    p({
      text: "Beim bloßen Aufruf unserer Seiten werden keine Daten an YouTube oder Vimeo übertragen.",
      stark: true,
    }),
    p(
      "Statt des Players zeigen wir zunächst nur ein Standbild, das von unserem eigenen Server kommt. Erst wenn Sie auf den Play-Button klicken, wird der Player des Anbieters nachgeladen — und erst in diesem Moment stellt Ihr Browser eine Verbindung dorthin her. Dabei werden unter anderem Ihre IP-Adresse, Angaben zu Browser und Endgerät sowie die aufgerufene Seite an den Anbieter übermittelt. Sind Sie gleichzeitig bei Google beziehungsweise Vimeo angemeldet, kann der Abruf Ihrem dortigen Konto zugeordnet werden.",
    ),
    p(
      "YouTube-Videos binden wir über die Domain youtube-nocookie.com ein, Vimeo-Videos mit dem Parameter „Do Not Track“. Beides verringert die Datenerhebung, schließt sie aber nicht vollständig aus.",
    ),
    p(
      "Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG, die Sie mit dem Klick auf den Play-Button erteilen. Unmittelbar unterhalb des Play-Buttons weisen wir Sie vorher auf die Datenübertragung hin. Die Einwilligung gilt nur für den jeweiligen Seitenaufruf: Laden Sie die Seite neu, ohne erneut auf Play zu klicken, findet keine Übertragung statt.",
    ),
    p(
      "Näheres zur Datenverarbeitung durch die Anbieter finden Sie in deren Datenschutzhinweisen: ",
      { text: "policies.google.com/privacy", href: "https://policies.google.com/privacy" },
      " und ",
      { text: "vimeo.com/privacy", href: "https://vimeo.com/privacy" },
      ".",
    ),

    // ── 8 ───────────────────────────────────────────────────────────────────
    h2("8. Links zu sozialen Netzwerken"),
    p(
      "Im Fußbereich unserer Website verweisen wir auf unsere Profile bei LinkedIn, Facebook und Instagram.",
    ),
    p(
      {
        text: "Dabei handelt es sich um einfache Verlinkungen, nicht um Social-Media-Bausteine („Plugins“).",
        stark: true,
      },
      " Es sind keine Like- oder Teilen-Schaltflächen eingebunden, es werden keine Zählpixel geladen, und es werden keine Daten an die Netzwerke übertragen, solange Sie die Links nicht anklicken.",
    ),
    p(
      "Erst wenn Sie einem dieser Links folgen, verlassen Sie unsere Website. Ab diesem Moment ist der jeweilige Anbieter für die Datenverarbeitung verantwortlich:",
    ),
    li(
      "LinkedIn: LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland — ",
      {
        text: "Datenschutzhinweise",
        href: "https://www.linkedin.com/legal/privacy-policy",
      },
    ),
    li(
      "Facebook und Instagram: Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland — ",
      {
        text: "Datenschutzhinweise",
        href: "https://www.facebook.com/privacy/policy",
      },
    ),

    // ── 9 ───────────────────────────────────────────────────────────────────
    h2("9. Kartenlinks zu Google Maps"),
    p(
      "Zu beiden Standorten finden Sie auf der Startseite den Verweis „Route anzeigen“. Auch das ist ein einfacher Link — es ist keine Karte eingebettet. Google erfährt von Ihrem Besuch erst, wenn Sie den Link anklicken und damit zu Google Maps wechseln. Dort gelten die Datenschutzhinweise von Google.",
    ),

    // ── 10 ──────────────────────────────────────────────────────────────────
    h2("10. Kontaktaufnahme"),
    p(
      "Diese Website enthält kein Kontaktformular. Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten — etwa Ihren Namen, Ihre Kontaktdaten und den Inhalt Ihrer Anfrage — ausschließlich zur Bearbeitung dieser Anfrage und für den Fall von Anschlussfragen.",
    ),
    p(
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss oder die Durchführung eines Vertrags gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der Beantwortung von Anfragen.",
    ),

    // ── 11 ──────────────────────────────────────────────────────────────────
    h2("11. Downloads"),
    p(
      "Die auf dieser Website angebotenen Leitfäden können Sie ohne Angabe personenbezogener Daten herunterladen. Es ist weder eine Registrierung noch die Angabe einer E-Mail-Adresse erforderlich; die Dateien liegen auf demselben Server wie die Website.",
    ),

    // ── 12 ──────────────────────────────────────────────────────────────────
    h2("12. Video-Strategie-Check"),
    p(
      "Der „Video-Strategie-Check“ auf der Startseite läuft vollständig in Ihrem Browser ab. Ihre Antworten werden weder an uns noch an Dritte übertragen und nirgends gespeichert — sie sind verloren, sobald Sie die Seite verlassen oder neu laden.",
    ),

    // ── 13 ──────────────────────────────────────────────────────────────────
    h2("13. Empfänger Ihrer Daten"),
    p(
      "Über die in dieser Erklärung genannten Stellen hinaus geben wir Ihre Daten nicht weiter. Im Überblick:",
    ),
    li(
      "Vercel Inc., USA — Hosting und Auslieferung dieser Website sowie Reichweitenmessung mit Vercel Web Analytics (Auftragsverarbeiter)",
    ),
    li(
      "PostHog, Inc., USA, Verarbeitung in Deutschland — Reichweitenmessung (Auftragsverarbeiter)",
    ),
    li(
      "Google Ireland Limited und Vimeo.com, Inc. — nur dann, wenn Sie selbst ein eingebettetes Video starten",
    ),
    p(
      "Darüber hinaus geben wir Daten nur weiter, wenn wir dazu gesetzlich verpflichtet sind oder eine behördliche oder gerichtliche Anordnung vorliegt.",
    ),

    // ── 14 ──────────────────────────────────────────────────────────────────
    h2("14. Übermittlung in Drittländer"),
    p(
      "Unser Hoster Vercel hat seinen Sitz in den USA. Als Verarbeitungsregion haben wir Frankfurt am Main und damit einen Standort in der Europäischen Union gewählt (Abschnitt 3). Da ein Zugriff aus den USA — etwa im Rahmen der technischen Betreuung — gleichwohl nicht vollständig auszuschließen ist, haben wir mit Vercel die Standardvertragsklauseln der Europäischen Kommission nach Art. 46 Abs. 2 lit. c DSGVO vereinbart. Für die Reichweitenmessung mit Vercel Web Analytics (Abschnitt 6 b) gilt die gewählte Region nicht: Vercel sichert dafür keinen europäischen Verarbeitungsort zu, die Verarbeitung kann also auch in den USA erfolgen. Sie ist von denselben Standardvertragsklauseln gedeckt.",
    ),
    p(
      "Die Daten der Reichweitenmessung mit PostHog werden ausschließlich in Deutschland verarbeitet (Abschnitt 6 a). Da der Anbieter PostHog seinen Sitz in den USA hat und ein Zugriff von dort — etwa im Rahmen der technischen Betreuung — nicht vollständig auszuschließen ist, haben wir auch mit PostHog die Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO vereinbart.",
    ),
    p(
      "Starten Sie ein eingebettetes Video, können außerdem Daten an Google und Vimeo und damit in die USA übermittelt werden. Diese Übermittlung stützen wir auf Ihre ausdrückliche Einwilligung nach Art. 49 Abs. 1 lit. a DSGVO, die Sie mit dem Klick auf den Play-Button erteilen. Wir weisen Sie darauf hin, dass in den USA kein dem europäischen Recht gleichwertiges Datenschutzniveau garantiert werden kann und insbesondere ein Zugriff durch dortige Behörden nicht ausgeschlossen ist.",
    ),

    // ── 15 ──────────────────────────────────────────────────────────────────
    h2("15. Speicherdauer"),
    p(
      "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder wie es gesetzliche Aufbewahrungsfristen vorschreiben. Im Einzelnen:",
    ),
    // ⚠️ Hier stand zwischenzeitlich „längstens 30 Tage". Das war geraten —
    // wie lange Vercel Zugriffsprotokolle vorhält, hängt vom Tarif ab. Sobald
    // die tatsächliche Frist feststeht, gehört sie hier als konkrete Zahl hin;
    // eine erfundene Frist ist in einer Datenschutzerklärung schlimmer als
    // gar keine.
    li(
      "Server-Protokolle: nur so lange, wie es für Betrieb und Sicherheit erforderlich ist; die technische Speicherdauer richtet sich nach den Vorgaben unseres Hosters",
    ),
    li(
      "Reichweitenmessung: in aggregierter, nicht personenbezogener Form; ein Personenbezug entsteht dabei nicht",
    ),
    li(
      "Anfragen per E-Mail oder Telefon: bis Ihr Anliegen abschließend geklärt ist, danach im Rahmen der handels- und steuerrechtlichen Aufbewahrungsfristen",
    ),

    // ── 16 ──────────────────────────────────────────────────────────────────
    h2("16. Ihre Rechte"),
    p("Ihnen stehen gegenüber uns die folgenden Rechte zu:"),
    li("Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)"),
    li("Berichtigung unrichtiger Daten (Art. 16 DSGVO)"),
    li("Löschung Ihrer Daten (Art. 17 DSGVO)"),
    li("Einschränkung der Verarbeitung (Art. 18 DSGVO)"),
    li("Datenübertragbarkeit (Art. 20 DSGVO)"),
    li("Widerspruch gegen die Verarbeitung (Art. 21 DSGVO, siehe Abschnitt 17)"),
    li(
      "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
    ),
    p(
      "Zur Ausübung genügt eine formlose Nachricht an ",
      { text: "datenschutz@make-c.de", href: "mailto:datenschutz@make-c.de" },
      ".",
    ),

    // ── 17 ──────────────────────────────────────────────────────────────────
    h2("17. Widerspruchsrecht nach Art. 21 DSGVO"),
    p({
      text: "Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen, die auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt.",
      stark: true,
    }),
    p(
      "Das betrifft auf dieser Website die Server-Protokolle (Abschnitt 3) und die Reichweitenmessung (Abschnitt 6). Legen Sie Widerspruch ein, verarbeiten wir Ihre Daten nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
    ),
    p(
      "Ein formloser Widerspruch an ",
      { text: "datenschutz@make-c.de", href: "mailto:datenschutz@make-c.de" },
      " genügt.",
    ),

    // ── 18 ──────────────────────────────────────────────────────────────────
    h2("18. Beschwerderecht bei einer Aufsichtsbehörde"),
    p(
      "Unbeschadet anderer Rechtsbehelfe haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt (Art. 77 DSGVO). Die für uns zuständige Behörde ist:",
    ),
    p("Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen"),
    p("Kavalleriestraße 2–4, 40213 Düsseldorf"),
    p({ text: "ldi.nrw.de", href: "https://www.ldi.nrw.de" }),

    // ── 19 ──────────────────────────────────────────────────────────────────
    h2("19. Keine automatisierte Entscheidungsfindung"),
    p(
      "Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 DSGVO findet auf dieser Website nicht statt.",
    ),

    // ── 20 ──────────────────────────────────────────────────────────────────
    h2("20. Änderungen dieser Datenschutzerklärung"),
    p(
      "Wir passen diese Datenschutzerklärung an, sobald sich die Datenverarbeitung auf dieser Website ändert oder die Rechtslage es erfordert. Es gilt jeweils die hier veröffentlichte Fassung; das Datum finden Sie am Ende der Seite.",
    ),
  ],
};
