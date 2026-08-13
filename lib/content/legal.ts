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

// Datenschutzerklärung. `effectiveDate` erscheint als „Stand: …" unter dem Text.
export const DATENSCHUTZ: LegalPageContent = {
  title: "Datenschutz",
  effectiveDate: "Dezember 2025",
  body: [
    {
      "_key": "905c90f6-52a5-46e6-bdc0-c1a1db57a9d3",
      "_type": "block",
      "children": [
        {
          "_key": "262bb025-5e04-4865-83f5-7311b40d76da",
          "_type": "span",
          "marks": [],
          "text": "1. Verantwortlicher"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "a0d83cf2-cf9c-4acc-8dc3-bd9ef772c77a",
      "_type": "block",
      "children": [
        {
          "_key": "e1660d6f-816d-4a89-b117-b801ca80c3b4",
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
      "_key": "f10b0f3d-6ea7-4531-8d17-6dbdaa6f352b",
      "_type": "block",
      "children": [
        {
          "_key": "eff48f85-6139-40e1-8326-130378f3f5fc",
          "_type": "span",
          "marks": [],
          "text": "Sigsfeldstraße 5"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "5e24a565-634a-496e-8699-50fb88cb88e4",
      "_type": "block",
      "children": [
        {
          "_key": "9d2fe872-a23c-4df6-b4f0-d1c444e982e9",
          "_type": "span",
          "marks": [],
          "text": "45141 Essen"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "dd0d4763-74ce-44b0-822d-6576844796e8",
      "_type": "block",
      "children": [
        {
          "_key": "e01a6356-5d39-450d-b860-fcb635c65eb3",
          "_type": "span",
          "marks": [],
          "text": "E-Mail: "
        },
        {
          "_key": "83b5c8cd-c451-47bf-99f0-83f5425e0306",
          "_type": "span",
          "marks": [
            "d6bd720f-bc18-45f1-b947-efbcd4f88e6c"
          ],
          "text": "datenschutz@make-c.de"
        }
      ],
      "markDefs": [
        {
          "_key": "d6bd720f-bc18-45f1-b947-efbcd4f88e6c",
          "_type": "link",
          "href": "mailto:datenschutz@make-c.de"
        }
      ],
      "style": "normal"
    },
    {
      "_key": "20324171-cf59-47a5-810b-edcd5c15d7bc",
      "_type": "block",
      "children": [
        {
          "_key": "7a49c187-14d2-4a51-8010-74a7835df867",
          "_type": "span",
          "marks": [],
          "text": "2. Allgemeine Hinweise zur Datenverarbeitung"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "85736288-7037-4768-838e-6ac3c6c3ffd1",
      "_type": "block",
      "children": [
        {
          "_key": "3e414d29-4182-4c26-8631-5ec2bb5c2472",
          "_type": "span",
          "marks": [],
          "text": "Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre personenbezogenen Daten ausschließlich auf Grundlage der geltenden gesetzlichen Bestimmungen, insbesondere der Datenschutz-Grundverordnung (DSGVO)."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "8723168b-5e14-4d51-834e-3f96303b9163",
      "_type": "block",
      "children": [
        {
          "_key": "e3e77457-34e5-49b0-ba9a-a78ad94d1a33",
          "_type": "span",
          "marks": [
            "strong"
          ],
          "text": "Diese Website dient derzeit Informations- und Entwicklungszwecken. Es findet kein Tracking, keine Analyse und keine werbliche Auswertung des Nutzerverhaltens statt."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "36a8a684-814a-4562-a2c5-6fd383ca60e2",
      "_type": "block",
      "children": [
        {
          "_key": "5199a8a1-7e2d-46d8-ad86-54aa59c8c5ac",
          "_type": "span",
          "marks": [],
          "text": "3. Hosting über Vercel"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "e267d4fe-8574-4a70-8dd8-d915884e0b23",
      "_type": "block",
      "children": [
        {
          "_key": "02540ea4-6fe3-4e2a-a9e9-bf0551e704b9",
          "_type": "span",
          "marks": [],
          "text": "Diese Website wird bei Vercel Inc. gehostet."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "48095473-fbe6-4ced-8cf2-e35c764fa6e1",
      "_type": "block",
      "children": [
        {
          "_key": "6863df7f-9543-4715-a95c-3f42e30a18e5",
          "_type": "span",
          "marks": [],
          "text": "Beim Aufruf der Website verarbeitet Vercel personenbezogene Daten, insbesondere sogenannte Server-Logfiles. Diese Daten sind technisch erforderlich, um die Website bereitzustellen und sicher zu betreiben."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "27cd39e4-686f-46df-b233-dbbf12a75a42",
      "_type": "block",
      "children": [
        {
          "_key": "fc95026d-2ca0-4b28-8354-1df6de6e5ec4",
          "_type": "span",
          "marks": [],
          "text": "Verarbeitete Daten können insbesondere sein:"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "69a299e6-9ec3-4609-bf21-43230593a35d",
      "_type": "block",
      "children": [
        {
          "_key": "d703a504-a705-4b10-9151-57881c1cffb0",
          "_type": "span",
          "marks": [],
          "text": "IP-Adresse"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "9d505ccf-bbf9-410d-9056-6e1bbccb0ea3",
      "_type": "block",
      "children": [
        {
          "_key": "f982a76f-da7b-46b8-bbfe-7dfa25220394",
          "_type": "span",
          "marks": [],
          "text": "Datum und Uhrzeit der Anfrage"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "8fe04810-9b95-40a5-9781-5718820392ea",
      "_type": "block",
      "children": [
        {
          "_key": "de5fbe6e-3239-483a-8031-96c61b3df5de",
          "_type": "span",
          "marks": [],
          "text": "aufgerufene URL"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "48f58bd4-4b4c-4744-ae44-123a815c66e1",
      "_type": "block",
      "children": [
        {
          "_key": "16aba740-8aae-4aa2-9914-c032bfa2682b",
          "_type": "span",
          "marks": [],
          "text": "Referrer-URL"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "3e431b04-a65a-4094-9ccc-e8eeb318bbe2",
      "_type": "block",
      "children": [
        {
          "_key": "8bde652c-775b-41f7-a00d-3c6ab5e0cefc",
          "_type": "span",
          "marks": [],
          "text": "Browsertyp und -version"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "eed25ea1-2e6b-4641-82b9-1b2d60466d16",
      "_type": "block",
      "children": [
        {
          "_key": "b0a8ed05-e593-4046-88fa-667d29a27bd4",
          "_type": "span",
          "marks": [],
          "text": "Betriebssystem"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "e2762482-1b39-40be-8e43-6a303349f663",
      "_type": "block",
      "children": [
        {
          "_key": "52966d9a-3456-4ed4-bac8-4f0b7127d405",
          "_type": "span",
          "marks": [],
          "text": "Zweck der Verarbeitung"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "eb032f03-d03f-4c5b-b8d3-b5a10629954e",
      "_type": "block",
      "children": [
        {
          "_key": "7caecc36-b51e-455c-a7ff-005df0b7e37e",
          "_type": "span",
          "marks": [],
          "text": "Auslieferung und Darstellung der Website"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "ecb053e8-ab9c-490e-ba50-adba434c0de7",
      "_type": "block",
      "children": [
        {
          "_key": "be8160a7-fbd3-4b52-9ea2-32074dbef1e3",
          "_type": "span",
          "marks": [],
          "text": "Gewährleistung von Stabilität und Sicherheit"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "e0c67173-9ca2-4631-a414-9246929398bf",
      "_type": "block",
      "children": [
        {
          "_key": "5c21fa59-1bb6-4e39-8e7a-c2257e2fc014",
          "_type": "span",
          "marks": [],
          "text": "Schutz vor Missbrauch und Angriffen"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "3c040b02-d80f-4b75-8da0-e53316a5a877",
      "_type": "block",
      "children": [
        {
          "_key": "aaf922f8-fb6e-4e6a-b0e2-cce8413c90c1",
          "_type": "span",
          "marks": [],
          "text": "Rechtsgrundlage"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "2f52bbcb-41a9-473c-971c-93d6a42474bc",
      "_type": "block",
      "children": [
        {
          "_key": "ddb83178-2e8a-43e2-98cf-27c154481a14",
          "_type": "span",
          "marks": [],
          "text": "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Betrieb der Website)."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "ed95cb77-5dcf-46f3-80c6-cf8f947d9e20",
      "_type": "block",
      "children": [
        {
          "_key": "5b498a3c-a9fa-49c8-a766-7dffae3b2831",
          "_type": "span",
          "marks": [],
          "text": "Datenübermittlung in Drittländer"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "1e61292b-4f46-4ac7-a49e-16ab1c14ab18",
      "_type": "block",
      "children": [
        {
          "_key": "5864c0c5-4a1e-448a-8c21-0a451bffe97b",
          "_type": "span",
          "marks": [],
          "text": "Vercel verarbeitet Daten unter anderem auch in den USA. Die Übermittlung erfolgt auf Grundlage der von der EU-Kommission genehmigten Standardvertragsklauseln (SCCs) gemäß Art. 46 DSGVO."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "01da641b-0e77-448f-aa14-e1c04ae94005",
      "_type": "block",
      "children": [
        {
          "_key": "9fc22db0-d236-4b9c-9b45-9d17db87f854",
          "_type": "span",
          "marks": [],
          "text": "4. Cookies"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "c77a005b-58ff-404a-9e3f-4ad242ced08a",
      "_type": "block",
      "children": [
        {
          "_key": "5bb43db4-b1de-4971-889e-0b6121de0f21",
          "_type": "span",
          "marks": [],
          "text": "Diese Website verwendet keine Cookies, die eine Einwilligung erfordern."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "bfcbe5d2-af89-44cb-867d-6ae2152b56ce",
      "_type": "block",
      "children": [
        {
          "_key": "cd02d516-245b-495a-a0d4-5c3d6a0f12ad",
          "_type": "span",
          "marks": [
            "strong"
          ],
          "text": "Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "967cac65-a0d4-4d0f-b426-cceff8c8034e",
      "_type": "block",
      "children": [
        {
          "_key": "65d0adcf-fdd1-4887-8b86-a2525e3a9290",
          "_type": "span",
          "marks": [],
          "text": "Lediglich technisch notwendige Verarbeitungen im Rahmen des Hostings (z. B. Server-Logs) finden statt. Ein Cookie-Banner ist daher nicht erforderlich."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "a5983b5b-67c7-495a-8922-fa4d0b97069e",
      "_type": "block",
      "children": [
        {
          "_key": "fa97807f-7144-488f-b3bc-753f1094eb33",
          "_type": "span",
          "marks": [],
          "text": "5. Kontaktaufnahme"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "f42c29d9-759b-4735-b628-630aed4354fd",
      "_type": "block",
      "children": [
        {
          "_key": "8d38091f-f6f5-4643-98de-64b1fa2f9bf8",
          "_type": "span",
          "marks": [],
          "text": "Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten personenbezogenen Daten (z. B. E-Mail-Adresse, Inhalt der Nachricht) ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "1a7366d7-ea08-4c43-880d-8074f27d3fb1",
      "_type": "block",
      "children": [
        {
          "_key": "2d0362a1-05a7-4bb6-b112-ac25b368ff28",
          "_type": "span",
          "marks": [],
          "text": "Rechtsgrundlage"
        }
      ],
      "markDefs": [],
      "style": "h3"
    },
    {
      "_key": "788fd172-d465-4e1d-a71b-2059a5071ad6",
      "_type": "block",
      "children": [
        {
          "_key": "9b9c9492-b059-4789-ab1c-53a11bb839f7",
          "_type": "span",
          "marks": [],
          "text": "Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation)"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "d8d769b4-2027-4ec5-8000-1b439447410f",
      "_type": "block",
      "children": [
        {
          "_key": "a3adfd77-81cd-40ef-b630-9cda00a5dcfc",
          "_type": "span",
          "marks": [],
          "text": "6. Speicherdauer"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "cb5c4b73-d4d2-48fb-85b3-a56abb84547b",
      "_type": "block",
      "children": [
        {
          "_key": "f52710dd-39d3-4af0-b3df-4da576bac1bd",
          "_type": "span",
          "marks": [],
          "text": "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "3e11674b-e52c-4346-8e26-0a58b4c68831",
      "_type": "block",
      "children": [
        {
          "_key": "f7a3ca3d-6e5a-49bf-9805-f5a9ebd9c485",
          "_type": "span",
          "marks": [
            "strong"
          ],
          "text": "Server-Logdaten werden von Vercel nur temporär gespeichert und anschließend gelöscht oder anonymisiert."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "487b579b-1729-4041-97c5-0ace3dae8952",
      "_type": "block",
      "children": [
        {
          "_key": "8a805fbf-978b-4705-b704-464f022a1bb4",
          "_type": "span",
          "marks": [],
          "text": "7. Rechte der betroffenen Personen"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "263b8953-843b-4c9c-9725-0dca4b6473b9",
      "_type": "block",
      "children": [
        {
          "_key": "fd1b05d4-4554-4692-941e-10167683b48c",
          "_type": "span",
          "marks": [],
          "text": "Sie haben jederzeit das Recht auf:"
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "8933722c-7fc1-4ee6-8bf6-ad0b52ea4f30",
      "_type": "block",
      "children": [
        {
          "_key": "36b0c483-ed06-4478-8c1b-09104d8d8eaa",
          "_type": "span",
          "marks": [],
          "text": "Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "2abc1810-2460-4ba2-81c6-d15ae2f243f0",
      "_type": "block",
      "children": [
        {
          "_key": "0d11009f-0316-4f99-9b22-f5cf96c1cdc6",
          "_type": "span",
          "marks": [],
          "text": "Berichtigung unrichtiger Daten (Art. 16 DSGVO)"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "32ab1965-2178-49f5-a76a-7eb21cc043b8",
      "_type": "block",
      "children": [
        {
          "_key": "6871185f-a705-4d90-b44d-31171b617239",
          "_type": "span",
          "marks": [],
          "text": "Löschung Ihrer Daten (Art. 17 DSGVO)"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "51acc49d-5621-4f7d-8ba4-01e413cd19db",
      "_type": "block",
      "children": [
        {
          "_key": "1555bf3f-f65b-46dc-8fe1-5885edea27ea",
          "_type": "span",
          "marks": [],
          "text": "Einschränkung der Verarbeitung (Art. 18 DSGVO)"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "0f1128b7-08de-49d3-8be8-3beb8f4ffbba",
      "_type": "block",
      "children": [
        {
          "_key": "cf1d6183-d4a6-41ed-a2f9-89f8d0f6f92f",
          "_type": "span",
          "marks": [],
          "text": "Datenübertragbarkeit (Art. 20 DSGVO)"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "d01a5043-407b-483f-818e-fcf07e247f8a",
      "_type": "block",
      "children": [
        {
          "_key": "52ee9125-792b-4a38-ae9c-f03fbdaf002c",
          "_type": "span",
          "marks": [],
          "text": "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "1c0df70e-22ca-4476-9710-29f1ce34e290",
      "_type": "block",
      "children": [
        {
          "_key": "13807655-8ea2-40ef-a38a-8b25fea850f1",
          "_type": "span",
          "marks": [
            "em"
          ],
          "text": "Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an die oben genannte Adresse."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "6be7db3a-fc11-4e0b-a858-c4334057f426",
      "_type": "block",
      "children": [
        {
          "_key": "dc516f31-234e-4875-981b-d54300618236",
          "_type": "span",
          "marks": [],
          "text": "8. Beschwerderecht"
        }
      ],
      "markDefs": [],
      "style": "h2"
    },
    {
      "_key": "7fca7d7c-a147-4aed-887d-44a233c1508e",
      "_type": "block",
      "children": [
        {
          "_key": "4a425173-51ab-4569-afec-6b25447d60a6",
          "_type": "span",
          "marks": [],
          "text": "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt."
        }
      ],
      "markDefs": [],
      "style": "normal"
    }
  ],
};
