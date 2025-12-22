import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16">Impressum</h1>
          
          <div className="space-y-12 text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">Anbieter</h2>
              <p className="text-lg text-white font-medium">make/c video content marketing GmbH</p>
              <p>Sigsfeldstraße 5</p>
              <p>45141 Essen</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Kontakt</h2>
                <p>Fon: +49 221 – 4 56 – 7 62 12</p>
                <p>E-Mail: <a href="mailto:info@make-c.de" className="text-white hover:text-zinc-400 transition-colors">info@make-c.de</a></p>
              </div>
              <div>
                <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Register & Sitz</h2>
                <p>Sitz der Gesellschaft: Essen</p>
                <p>Handelsregister: HRB 26367</p>
                <p>Amtsgericht Essen</p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Geschäftsführung</h2>
              <p>Jens Kemper und Philip Welkisch</p>
              <p className="mt-4 text-xs italic">make/c ist ein Unternehmen der CNC Cologne News Corporation GmbH</p>
            </section>

            <div className="h-px w-full bg-zinc-800 my-16" />

            <section className="space-y-8">
              <h2 className="text-2xl text-white font-bold uppercase tracking-tight">Disclaimer</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-2">Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

