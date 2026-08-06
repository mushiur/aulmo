import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { ImageRef } from "@/data/types";

/**
 * A full-bleed image with the label overlaid via gradient — not a boxed
 * "photo + white card" e-commerce tile. `featured` renders larger, at a
 * wider aspect, for the lead item in an otherwise uniform sub-series list.
 */
export default function SeriesSubCard({
  href,
  spec,
  name,
  description,
  image,
  featured = false,
}: {
  href: string;
  spec?: string;
  name: string;
  description: string;
  image?: ImageRef;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative block w-full overflow-hidden bg-ink-raised",
        featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3]",
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={featured ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-105"
        />
      ) : (
        <ImagePlaceholder className="absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/25 to-transparent" />
      <div className={clsx("absolute inset-x-0 bottom-0 text-paper", featured ? "p-7 md:p-10" : "p-5")}>
        {spec && (
          <div className="font-mono-label text-[9px] tracking-[0.18em] opacity-60">{spec}</div>
        )}
        <div
          className={clsx(
            "mt-1.5 font-extrabold tracking-[-0.02em]",
            featured ? "text-[clamp(24px,3vw,40px)]" : "text-lg",
          )}
        >
          {name}
        </div>
        <p
          className={clsx(
            "m-0 mt-1.5 text-pretty leading-[1.5] opacity-75",
            featured ? "max-w-[48ch] text-[14px]" : "max-w-[30ch] text-[12.5px]",
          )}
        >
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2.5 font-mono-label text-[10px] font-bold tracking-[0.16em] text-signal-yellow">
          EXPLORE SERIES
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}
