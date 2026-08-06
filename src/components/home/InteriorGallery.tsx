"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Lightbox from "@/components/ui/Lightbox";

const ROOMS = [
  {
    src: "/interior-inspiration/living-room.png",
    alt: "AULMO switch installed beside a modern living room",
    label: "Living Room",
  },
  {
    src: "/interior-inspiration/bedroom.png",
    alt: "AULMO-styled bedroom interior",
    label: "Bedroom",
  },
  {
    src: "/interior-inspiration/kitchen.png",
    alt: "AULMO-equipped modern kitchen",
    label: "Kitchen",
  },
  {
    src: "/interior-inspiration/bathroom.png",
    alt: "AULMO-styled bathroom interior",
    label: "Bathroom",
  },
  {
    src: "/interior-inspiration/workspace.png",
    alt: "AULMO switch installed in a home workspace",
    label: "Workspace",
  },
];

const MAX_VISIBLE_OFFSET = 2;

export default function InteriorGallery() {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; active: boolean } | null>(null);

  const goTo = (i: number) => setActive(((i % ROOMS.length) + ROOMS.length) % ROOMS.length);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Pointer handlers live on the stage itself (not the individual 3D-transformed
  // cards) so the drag hit area is the whole section regardless of where any one
  // card's rotated/scaled visual bounds actually are — touching anywhere on the
  // stage and swiping works, not just a precise spot on the active card.
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, active: true };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current?.active) return;
    setDragOffset(e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!drag.current?.active) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    const delta = e.clientX - drag.current.startX;
    drag.current = null;
    setIsDragging(false);
    setDragOffset(0);
    const width = stageRef.current?.clientWidth ?? 1;

    if (delta < -width * 0.08) {
      next();
      return;
    }
    if (delta > width * 0.08) {
      prev();
      return;
    }

    // Not a swipe — treat it as a tap. Pointer capture (set below, needed for
    // reliable drag tracking) retargets every pointer event to the stage, which
    // on several mobile browsers also suppresses the native "click" event the
    // tapped button would normally fire — so the tap is resolved here directly
    // instead of depending on that click ever arriving.
    const target = (e.target as HTMLElement).closest("[data-room-index]");
    if (!target) return;
    const i = Number(target.getAttribute("data-room-index"));
    if (i === active) setLightboxOpen(true);
    else goTo(i);
  };

  const cancelDrag = () => {
    drag.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const activeRoom = ROOMS[active];

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink px-6 py-[10vh] text-paper md:px-[5vw] md:py-[12vh]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow label="INTERIOR INSPIRATION" className="mb-6 opacity-70" />
          <h2 className="m-0 max-w-[16ch] text-[clamp(28px,4.2vw,58px)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            Designed to belong.
          </h2>
        </div>
      </div>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        className="relative mt-12 h-[46vh] min-h-[280px] w-full touch-pan-y overflow-hidden select-none [perspective:1400px] sm:h-[52vh] md:mt-[8vh] md:h-[64vh] md:min-h-[420px]"
      >
        {ROOMS.map((room, i) => {
          const rawOffset = i - active;
          const wrapped =
            rawOffset > ROOMS.length / 2
              ? rawOffset - ROOMS.length
              : rawOffset < -ROOMS.length / 2
                ? rawOffset + ROOMS.length
                : rawOffset;
          const offset = Math.max(-MAX_VISIBLE_OFFSET - 1, Math.min(MAX_VISIBLE_OFFSET + 1, wrapped));
          const isActive = offset === 0;
          const abs = Math.abs(offset);
          const hidden = abs > MAX_VISIBLE_OFFSET;

          return (
            <button
              key={room.src}
              type="button"
              data-room-index={i}
              aria-label={isActive ? `Enlarge ${room.label}` : `Show ${room.label}`}
              aria-current={isActive}
              onClick={() => (isActive ? setLightboxOpen(true) : goTo(i))}
              className={clsx(
                "absolute top-1/2 left-1/2 aspect-[3/2] w-[78%] max-w-[620px] touch-pan-y cursor-pointer rounded-[18px] bg-ink-raised shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:w-[58%] md:w-[46%]",
                isDragging ? "transition-none" : "transition-[transform,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]",
              )}
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${offset * 52}% + ${dragOffset}px)) translateZ(${-abs * 110}px) rotateY(${offset * -28}deg) scale(${isActive ? 1 : 0.82})`,
                opacity: hidden ? 0 : isActive ? 1 : 0.45 - (abs - 1) * 0.15,
                zIndex: 10 - abs,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <span className="block h-full w-full overflow-hidden rounded-[18px]">
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes="(min-width: 768px) 46vw, 76vw"
                  className="pointer-events-none object-cover"
                />
              </span>
              <span
                className={clsx(
                  "pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[18px] bg-gradient-to-t from-ink/90 to-transparent px-5 py-4 text-left font-mono-label text-[10px] tracking-[0.18em] uppercase transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                {room.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 hidden items-center justify-center gap-6 sm:flex">
        <button
          type="button"
          aria-label="Previous room"
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-lg transition-colors hover:border-paper/50"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {ROOMS.map((room, i) => (
            <button
              key={room.src}
              type="button"
              aria-label={`Go to ${room.label}`}
              onClick={() => goTo(i)}
              className={clsx(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                i === active ? "w-6 bg-paper" : "w-1.5 bg-paper/25",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next room"
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-lg transition-colors hover:border-paper/50"
        >
          ›
        </button>
      </div>

      {lightboxOpen && (
        <Lightbox
          count={ROOMS.length}
          activeIndex={active}
          onNext={next}
          onPrev={prev}
          onClose={() => setLightboxOpen(false)}
          caption={activeRoom.label}
        >
          <div className="relative h-[80vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <Image src={activeRoom.src} alt={activeRoom.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </Lightbox>
      )}
    </section>
  );
}
