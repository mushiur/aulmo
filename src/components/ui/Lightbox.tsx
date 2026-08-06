"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Shared full-screen viewer chrome (backdrop, close/prev/next, keyboard nav,
 * counter) — the image/caption content is supplied as children so this
 * works for both product photos and certificate scans without forcing one
 * layout on both.
 */
export default function Lightbox({
  count,
  activeIndex,
  onNext,
  onPrev,
  onClose,
  caption,
  children,
}: {
  count: number;
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  caption?: ReactNode;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/95 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-6 right-6 font-mono-label text-[11px] tracking-[0.2em] text-paper/70 hover:text-paper"
      >
        CLOSE ✕
      </button>
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-paper/60 hover:text-paper md:left-10"
      >
        ‹
      </button>

      {children}

      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-[32px] text-paper/60 hover:text-paper md:right-10"
      >
        ›
      </button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono-label text-[10px] tracking-[0.2em] text-paper/70">
        {caption && <span>{caption} ·</span>}
        <span>
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
