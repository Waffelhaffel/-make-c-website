import Link from "next/link";
import { FOOTER_CONTENT } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-makec-dark pt-12 pb-0 px-0">
      <div className="w-full h-full">
        <div className="rounded-t-[32px] md:rounded-t-[44px] bg-[#f5f5f5] text-[#222222] px-6 md:px-12 pt-16 pb-12 shadow-[0_-18px_60px_rgba(0,0,0,0.65)] min-h-[50vh]">
          <div className="mx-auto max-w-7xl flex flex-col gap-16 md:gap-20">
            {/* Top row: Let's Talk + Locations */}
            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">
              {/* Left: Let's Talk */}
              <div className="flex-1">
                <h2 className="text-[16vw] md:text-[8rem] leading-[0.8] font-bold tracking-tight uppercase">
                  Let&apos;s
                  <br />
                  Talk
                </h2>
                <a
                  href={`mailto:${FOOTER_CONTENT.email}`}
                  className="mt-6 inline-block text-xl md:text-2xl font-semibold underline underline-offset-4 decoration-2"
                >
                  {FOOTER_CONTENT.email}
                </a>
              </div>

              {/* Right: Locations (Köln & Essen) */}
              <div className="flex flex-1 flex-col md:flex-row justify-end gap-12 md:gap-20 text-sm md:text-base text-[#555555]">
                {FOOTER_CONTENT.locations.map((loc) => (
                  <div key={loc.city} className="min-w-[140px]">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
                      {loc.city}
                    </p>
                    <address className="not-italic leading-relaxed space-y-1">
                      {loc.address.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </address>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] md:text-xs uppercase tracking-[0.18em] text-gray-500">
              <div className="flex flex-wrap gap-5">
                {FOOTER_CONTENT.socials.map((social) => (
                  <span key={social}>{social}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-5">
                <Link href="/impressum" className="hover:text-gray-700 transition-colors">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="hover:text-gray-700 transition-colors">
                  Datenschutz
                </Link>
              </div>

              <span>{FOOTER_CONTENT.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
