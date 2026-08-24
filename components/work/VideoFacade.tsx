"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Video-Facade (Case-Study-Design "Variante 1a"): Poster mit pulsierendem
// Play-Kreis; Klick lädt den Player erst dann nach (kein iframe beim Pageload).
//
// Das ist zugleich die **Zwei-Klick-Lösung** für den Datenschutz: solange nicht
// geklickt wurde, geht keine einzige Anfrage an YouTube oder Vimeo — weder ein
// Skript noch ein Bild. Der Klick ist die Einwilligung, und weil eine
// Einwilligung nur informiert wirksam ist, steht der Hinweis dazu sichtbar
// **unter** dem Play-Button (User-Vorgabe 22.08.2026), nicht irgendwo im
// Kleingedruckten. ⚠️ Wer den Hinweis entfernt, nimmt der Zwei-Klick-Lösung
// ihre Grundlage.
type VideoFacadeProps = {
  videoUrl: string | null;
  posterUrl: string | null;
  alt: string;
};

type Provider = {
  /** Name der Plattform, wie er im Hinweis steht. */
  name: string;
  /** Wer die Daten bekommt — im Hinweis hinter „Dabei werden Daten an … übertragen". */
  operator: string;
  embed: string;
};

// Vimeo-/YouTube-URL → Anbieter samt Embed-URL; unbekannte Anbieter → null
// (dann wird die URL extern geöffnet und es gibt nichts einzubetten).
//
// Zwei Datenschutz-Details in den Embed-URLs:
//   - YouTube läuft über `youtube-nocookie.com` — dieselbe Wiedergabe, aber
//     ohne die Werbe-Cookies, die `youtube.com` schon beim Laden setzt.
//   - Vimeo bekommt `dnt=1` (Do Not Track): kein Tracking der Sitzung.
// Beides ersetzt den Hinweis nicht, es verkleinert nur, was übertragen wird.
function toProvider(url: string): Provider | null {
  // ⚠️ Der zweite Pfadteil einer Vimeo-URL ist der **Privacy-Hash** eines nicht
  // gelisteten Videos (`vimeo.com/<id>/<hash>`). Ohne ihn antwortet der Player
  // mit 403 und zeigt „Aufgrund seiner eigenen Datenschutzeinstellungen kann
  // dieses Video nicht hier gespielt werden" — nachgemessen am
  // Flughafen-Köln-Bonn-Video (24.08.2026). Er muss als `h=` mit in die
  // Embed-URL; bei öffentlichen Videos gibt es ihn nicht und er entfällt.
  const vimeoPlayer = url.match(/player\.vimeo\.com\/video\/(\d+)/);
  const vimeoPlayerHash = url.match(/player\.vimeo\.com\/video\/\d+[^\s]*?[?&]h=([0-9a-f]+)/);
  const vimeoWatch = url.match(/(?:^|\/\/)(?:www\.)?vimeo\.com\/(\d+)(?:\/([0-9a-f]+))?/);
  const vimeoId = vimeoPlayer?.[1] ?? vimeoWatch?.[1];
  const vimeoHash = vimeoPlayerHash?.[1] ?? vimeoWatch?.[2];
  if (vimeoId) {
    const hash = vimeoHash ? `h=${vimeoHash}&` : "";
    return {
      name: "Vimeo",
      operator: "Vimeo",
      embed: `https://player.vimeo.com/video/${vimeoId}?${hash}autoplay=1&dnt=1&title=0&byline=0&portrait=0`,
    };
  }
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (youtube) {
    return {
      name: "YouTube",
      operator: "Google",
      embed: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`,
    };
  }
  return null;
}

export function VideoFacade({ videoUrl, posterUrl, alt }: VideoFacadeProps) {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const provider = videoUrl ? toProvider(videoUrl) : null;

  const handlePlay = () => {
    if (!videoUrl) return;
    if (provider) {
      setEmbedSrc(provider.embed);
    } else {
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  const frameClass =
    "group relative block w-full aspect-video overflow-hidden rounded-lg border border-white/10 bg-black";

  // Der Hinweis steht in **beiden** Zuständen unter dem Rahmen — vor dem Klick
  // als Aufklärung, danach als Einordnung. So springt das Layout auch nicht.
  const hinweis = provider ? (
    <p className="mt-3 font-gotham text-sm font-light leading-relaxed text-white/50">
      Mit dem Klick auf Play wird das Video von {provider.name} geladen. Dabei werden Daten
      an {provider.operator} übertragen, auch in Länder außerhalb der EU. Näheres in unserer{" "}
      <Link
        href="/datenschutz"
        className="underline underline-offset-2 transition-colors hover:text-white"
      >
        Datenschutzerklärung
      </Link>
      .
    </p>
  ) : null;

  if (embedSrc) {
    return (
      <div>
        <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
          <iframe
            src={embedSrc}
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute inset-0 w-full h-full border-0"
            title={alt}
          />
        </div>
        {hinweis}
      </div>
    );
  }

  const facade = (
    <>
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={alt}
          fill
          className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          sizes="(max-width: 1180px) 100vw, 1180px"
        />
      ) : (
        <div className="absolute inset-0 bg-white/5" aria-hidden />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.08, 1], opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
          className="block"
        >
          <svg width="76" height="76" viewBox="0 0 76 76" fill="none" aria-hidden="true">
            <circle cx="38" cy="38" r="37" stroke="#fff" strokeWidth="1.4" />
            <path d="M31 26 L54 38 L31 50 Z" fill="#fff" />
          </svg>
        </motion.span>
      </span>
    </>
  );

  if (videoUrl) {
    return (
      <div>
        <button
          type="button"
          onClick={handlePlay}
          aria-label={
            provider
              ? `Video abspielen — wird von ${provider.name} geladen`
              : "Video abspielen"
          }
          className={`${frameClass} cursor-pointer`}
        >
          {facade}
        </button>
        {hinweis}
      </div>
    );
  }

  return <div className={frameClass}>{facade}</div>;
}
