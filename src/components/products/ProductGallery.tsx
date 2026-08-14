"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { ImageRef } from "@/data/types";
import Lightbox from "@/components/ui/Lightbox";
import { ChevronLeftIcon, ChevronRightIcon, DragIcon, ExpandIcon } from "@/components/ui/Icon";

const SWIPE_THRESHOLD = 40;

export default function ProductGallery({
  images,
  activeIndex,
  onSelect,
  priority,
  unavailable = false,
}: {
  images: ImageRef[];
  activeIndex: number;
  onSelect: (index: number) => void;
  priority?: boolean;
  /** True when the finish/product currently shown (`isDeleted`) has been
   *  retired — the photos stay visible, just stamped as unavailable rather
   *  than hidden. */
  unavailable?: boolean;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const active = images[Math.min(activeIndex, images.length - 1)];
  const hasMultiple = images.length > 1;

  const goTo = (index: number) => onSelect((index + images.length) % images.length);
  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null || !hasMultiple) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
  };

  return (
    <div>
      <div
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl bg-bone-deep select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={images[0]?.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {images.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={priority && i === activeIndex}
                className={clsx(
                  img.fit === "contain" ? "object-contain p-6" : "object-cover",
                  "pointer-events-none transition-opacity duration-500",
                  i === activeIndex ? "opacity-100" : "opacity-0",
                  unavailable && "grayscale",
                )}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
          {hasMultiple && (
            <div className="flex items-center gap-2 rounded-full bg-ink/55 px-3 py-1.5 font-mono-label text-[9px] font-semibold tracking-[0.16em] text-paper uppercase backdrop-blur-sm">
              <DragIcon className="h-3 w-3" />
              Drag to explore
            </div>
          )}
          {unavailable && (
            <div className="rounded-full border-2 border-signal-red bg-ink/70 px-3 py-1.5 font-mono-label text-[9px] font-bold tracking-[0.16em] text-paper uppercase backdrop-blur-sm">
              Currently Unavailable
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="View fullscreen"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-ink/55 text-paper backdrop-blur-sm transition-colors hover:bg-ink/75"
        >
          <ExpandIcon className="h-4 w-4" />
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper-bright/80 text-charcoal shadow-sm transition-colors hover:bg-paper-bright"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper-bright/80 text-charcoal shadow-sm transition-colors hover:bg-paper-bright"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === activeIndex}
              onClick={() => goTo(i)}
              className={clsx(
                "h-1.5 rounded-full transition-all",
                i === activeIndex ? "w-5 bg-charcoal" : "w-1.5 bg-charcoal/25 hover:bg-charcoal/45",
              )}
            />
          ))}
        </div>
      )}

      {hasMultiple && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={img.src} type="button" onClick={() => goTo(i)} className="flex-none">
              <span
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === activeIndex}
                className={clsx(
                  "relative block aspect-[4/3] w-20 overflow-hidden border transition-colors",
                  i === activeIndex ? "border-charcoal" : "border-charcoal/15 hover:border-charcoal/40",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="80px"
                  className={clsx(img.fit === "contain" ? "object-contain p-1.5" : "object-cover", unavailable && "grayscale")}
                />
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs opacity-50">{active?.alt}</p>

      {lightboxOpen && active && (
        <Lightbox
          count={images.length}
          activeIndex={activeIndex}
          onNext={next}
          onPrev={prev}
          onClose={() => setLightboxOpen(false)}
          caption={active.label}
        >
          <div
            className="relative h-[80vh] w-full max-w-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </Lightbox>
      )}
    </div>
  );
}
