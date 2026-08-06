"use client";

import Image from "next/image";
import clsx from "clsx";
import type { ImageRef } from "@/data/types";

export default function ProductGallery({
  images,
  activeIndex,
  onSelect,
  priority,
}: {
  images: ImageRef[];
  activeIndex: number;
  onSelect: (index: number) => void;
  priority?: boolean;
}) {
  const active = images[Math.min(activeIndex, images.length - 1)];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-deep">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={priority && i === activeIndex}
            className={clsx(
              "object-cover transition-opacity duration-500",
              i === activeIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === activeIndex}
              className={clsx(
                "relative aspect-[4/3] w-20 flex-none overflow-hidden border transition-colors",
                i === activeIndex ? "border-charcoal" : "border-charcoal/15 hover:border-charcoal/40",
              )}
            >
              <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs opacity-50">{active?.alt}</p>
    </div>
  );
}
