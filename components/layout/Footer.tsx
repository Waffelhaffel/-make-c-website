import Link from "next/link";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";

export async function Footer() {
  const settings = await getSiteSettings();
  const lineOne = settings.footerHeadline?.lineOne ?? "Lets";
  const lineTwo = settings.footerHeadline?.lineTwo ?? "talk";

  return (
    <footer className="bg-makec-blue pt-14 md:pt-[70px] pb-10 md:pb-12 px-6 md:px-12">
      <div className="max-w-[1514px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-10 md:mb-14">
          <div className="flex-1">
            <MixedHeadline part1={lineOne} part2={lineTwo} className="mb-8" />
            <a
              href={`mailto:${settings.email}`}
              className="inline-block font-gotham text-body-lg text-white underline underline-offset-4 hover:text-white/80 transition-colors"
            >
              {settings.email}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-24 md:gap-40 md:pt-16">
            {settings.locations.map((loc) => (
              <div key={loc.city}>
                <p className="mb-2 font-gotham text-small text-white">{loc.city}</p>
                <address className="not-italic font-gotham text-meta text-white">
                  {loc.address.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-gotham text-meta text-white">
          <div className="flex flex-wrap gap-12 md:gap-[76px]">
            {(settings.socials ?? []).map((social) => {
              const className =
                "hover:text-white/70 transition-colors" + (social.url ? "" : " cursor-default");
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

          <div className="flex flex-wrap gap-12 md:gap-40">
            <Link href="/impressum" className="hover:text-white/70 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white/70 transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
