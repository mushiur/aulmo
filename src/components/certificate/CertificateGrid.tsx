"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { DownloadIcon, EyeIcon } from "@/components/ui/Icon";

export type Certificate = {
  src: string;
  name: string;
  number: string;
  issuer: string;
};

export default function CertificateGrid({ certificates }: { certificates: Certificate[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const active = lightboxIndex !== null ? certificates[lightboxIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {certificates.map((cert, i) => (
          <div key={cert.src} className="group">
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${cert.name}, ${cert.number}`}
              className="relative block aspect-[3/4.24] w-full overflow-hidden rounded-[12px] bg-paper"
            >
              <Image
                src={cert.src}
                alt={`${cert.name} — ${cert.number}`}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 44vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-[opacity,background-color] duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-bright/90 text-charcoal">
                  <EyeIcon className="h-4 w-4" />
                </span>
              </span>
            </button>
            <div className="mt-2.5 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[11.5px] font-bold tracking-[-0.01em]">{cert.name}</div>
                <div className="mt-0.5 font-mono-label text-[8.5px] tracking-[0.12em] opacity-50">{cert.number}</div>
              </div>
              <a
                href={cert.src}
                download
                aria-label={`Download ${cert.name}, ${cert.number}`}
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-paper/20 opacity-70 transition-opacity hover:opacity-100"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <Lightbox
          count={certificates.length}
          activeIndex={lightboxIndex ?? 0}
          onNext={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % certificates.length))}
          onPrev={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + certificates.length) % certificates.length))}
          onClose={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex h-[80vh] w-full max-w-[520px] flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image src={active.src} alt={`${active.name} — ${active.number}`} fill sizes="60vw" className="object-contain" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <div>
                <div className="text-[13px] font-bold text-paper">{active.name}</div>
                <div className="mt-0.5 font-mono-label text-[9px] tracking-[0.16em] text-paper/50">
                  {active.number} — {active.issuer}
                </div>
              </div>
              <a
                href={active.src}
                download
                className="flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2 font-mono-label text-[9px] font-bold tracking-[0.16em] text-paper uppercase transition-colors hover:border-paper/60"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </div>
        </Lightbox>
      )}
    </>
  );
}
