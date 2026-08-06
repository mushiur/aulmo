import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { ImageRef } from "@/data/types";

export default function ProductCard({
  href,
  eyebrow,
  name,
  description,
  image,
}: {
  href: string;
  eyebrow?: string;
  name: string;
  description: string;
  image?: ImageRef;
}) {
  return (
    <Link href={href} data-card="" className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-deep">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder className="absolute inset-0" />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3.5 border-t border-charcoal/16 pt-3">
        <div>
          {eyebrow && (
            <div className="font-mono-label text-[9px] tracking-[0.18em] opacity-45">{eyebrow}</div>
          )}
          <div className="mt-1 text-lg font-extrabold tracking-[-0.02em]">{name}</div>
          <div className="mt-1 text-[13px] opacity-55">{description}</div>
        </div>
        <span className="font-mono-label text-xs transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-0.5">
          →
        </span>
      </div>
    </Link>
  );
}
