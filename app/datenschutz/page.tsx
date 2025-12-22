import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16">Datenschutz</h1>
          
          <div className="space-y-16 text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">1. Verantwortlicher</h2>
              <p className="text-lg text-white font-medium">make/c video content marketing GmbH</p>
              <p>Sigsfeldstraße 5</p>
              <p>45141 Essen</p>
              <p className="mt-2">E-Mail: <a href="mailto:datenschutz@make-c.de" className="text-white hover:text-zinc-400 transition-colors">datenschutz@make-c.de</a></p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
                Wir verarbeiten Ihre personenbezogenen Daten ausschließlich auf Grundlage der geltenden gesetzlichen Bestimmungen, insbesondere der Datenschutz-Grundverordnung (DSGVO).
              </p>
              <p className="mt-4 font-medium text-white">
                Diese Website dient derzeit Informations- und Entwicklungszwecken.
                Es findet kein Tracking, keine Analyse und keine werbliche Auswertung des Nutzerverhaltens statt.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">3. Hosting über Vercel</h2>
              <p>Diese Website wird bei Vercel Inc. gehostet.</p>
              <p className="mt-4">
                Beim Aufruf der Website verarbeitet Vercel personenbezogene Daten, insbesondere sogenannte Server-Logfiles. Diese Daten sind technisch erforderlich, um die Website bereitzustellen und sicher zu betreiben.
              </p>
              <p className="mt-4">Verarbeitete Daten können insbesondere sein:</p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>aufgerufene URL</li>
                <li>Referrer-URL</li>
                <li>Browsertyp und -version</li>
                <li>Betriebssystem</li>
              </ul>
              
              <div className="mt-6">
                <p className="font-bold text-white mb-2 uppercase text-xs">Zweck der Verarbeitung</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Auslieferung und Darstellung der Website</li>
                  <li>Gewährleistung von Stabilität und Sicherheit</li>
                  <li>Schutz vor Missbrauch und Angriffen</li>
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-bold text-white mb-2 uppercase text-xs">Rechtsgrundlage</p>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einem sicheren und funktionsfähigen Betrieb der Website).
                </p>
              </div>

              <div className="mt-6">
                <p className="font-bold text-white mb-2 uppercase text-xs">Datenübermittlung in Drittländer</p>
                <p>
                  Vercel verarbeitet Daten unter anderem auch in den USA.
                  Die Übermittlung erfolgt auf Grundlage der von der EU-Kommission genehmigten
                  Standardvertragsklauseln (SCCs) gemäß Art. 46 DSGVO.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">4. Cookies</h2>
              <p>Diese Website verwendet keine Cookies, die eine Einwilligung erfordern.</p>
              <p className="mt-2 text-white">Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt.</p>
              <p className="mt-4">
                Lediglich technisch notwendige Verarbeitungen im Rahmen des Hostings (z. B. Server-Logs) finden statt.
                Ein Cookie-Banner ist daher nicht erforderlich.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">5. Kontaktaufnahme</h2>
              <p>
                Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten personenbezogenen Daten (z. B. E-Mail-Adresse, Inhalt der Nachricht) ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet.
              </p>
              <p className="mt-4 font-bold text-white uppercase text-xs">Rechtsgrundlage</p>
              <p>
                Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
                oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation)
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">6. Speicherdauer</h2>
              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
              <p className="mt-4 text-white">
                Server-Logdaten werden von Vercel nur temporär gespeichert und anschließend gelöscht oder anonymisiert.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">7. Rechte der betroffenen Personen</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-6 text-white italic">
                Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an die oben genannte Adresse.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">8. Beschwerderecht</h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.
              </p>
            </section>

            <section className="pt-12">
              <p className="text-xs uppercase tracking-widest">Stand: Dezember 2025</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

