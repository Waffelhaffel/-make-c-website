import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";

export async function Footer() {
  const settings = await getSiteSettings();
  const lineOne = settings.footerHeadline?.lineOne ?? "LET'S";
  const lineTwo = settings.footerHeadline?.lineTwo ?? "TALK";

  return (
    <footer className="bg-makec-blue pt-16 md:pt-24 pb-8 px-6 md:px-12">
      <div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-16 md:mb-24">
            <div className="flex-1">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase mb-6">
                <span className="font-bold italic block">{lineOne}</span>
                <span className="font-garamond font-semibold italic block text-[1.1em]">{lineTwo}</span>
              </h2>
              <a
                href={`mailto:${settings.email}`}
                className="inline-block text-lg md:text-xl text-white/90 hover:text-white transition-colors"
              >
                {settings.email}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-20 text-sm text-white/80">
              {settings.locations.map((loc) => (
                <div key={loc.city}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-white">
                    {loc.city}
                  </p>
                  <address className="not-italic leading-relaxed space-y-0.5 text-white/70">
                    {loc.address.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs uppercase tracking-[0.15em] text-white/60">
            <div className="flex flex-wrap gap-6">
              {(settings.socials ?? []).map((social) => {
                const className =
                  "hover:text-white transition-colors" + (social.url ? "" : " cursor-default");
                return social.url ? (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {social.label}
                  </a>
                ) : (
                  <span key={social.label} className={className}>
                    {social.label}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-6">
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
