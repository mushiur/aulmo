import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { ImageRef } from "@/data/types";

/**
 * A full-bleed image with the label overlaid via gradient — not a boxed
 * "photo + white card" e-commerce tile. Every card uses the same 4:3 box
 * regardless of `featured` (which only bumps type scale) — the source
 * photography is portrait (~855×1160), and a wider box would force an
 * upscale past native resolution, which is what caused the blur this
 * component previously had at `aspect-[21/9]`.
 */
export default function SeriesSubCard({
  href,
  spec,
  name,
  description,
  image,
  featured = false,
  ctaLabel = "EXPLORE SERIES",
  unavailable = false,
}: {
  href: string;
  spec?: string;
  name: string;
  description: string;
  image?: ImageRef;
  featured?: boolean;
  ctaLabel?: string;
  /** Retired item (`isDeleted` in product-hierarchy.json) — still shown and
   *  still navigable, just flagged, rather than removed from the grid. */
  unavailable?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/3] w-full overflow-hidden bg-ink-raised"
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className={clsx(
            "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-105",
            unavailable && "grayscale",
          )}
        />
      ) : (
        <ImagePlaceholder className="absolute inset-0" />
      )}
      {unavailable && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-signal-red px-3 py-1.5 font-mono-label text-[9px] font-bold tracking-[0.14em] text-paper-bright uppercase">
          Currently Unavailable
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/25 to-transparent" />
      <div className={clsx("absolute inset-x-0 bottom-0 text-paper", featured ? "p-7" : "p-5")}>
        {spec && (
          <div className="font-mono-label text-[9px] tracking-[0.18em] opacity-60">{spec}</div>
        )}
        <div
          className={clsx(
            "mt-1.5 font-extrabold tracking-[-0.02em]",
            featured ? "text-[clamp(22px,2.6vw,32px)]" : "text-lg",
          )}
        >
          {name}
        </div>
        <p
          className={clsx(
            "m-0 mt-1.5 text-pretty leading-[1.5] opacity-75",
            featured ? "max-w-[38ch] text-[13.5px]" : "max-w-[30ch] text-[12.5px]",
          )}
        >
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2.5 font-mono-label text-[10px] font-bold tracking-[0.16em] text-signal-yellow">
          {ctaLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}
