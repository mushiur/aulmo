"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

type Stage = {
  src: string;
  alt: string;
  label: string;
  detail: string;
};

export default function StagesGallery({ stages }: { stages: Stage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? stages[activeIndex] : null;

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-[6vh] md:grid-cols-4">
        {stages.map((stage, i) => (
          <Reveal key={stage.src} delay={i * 90} y={26}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View full image — ${stage.label}`}
              className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[16px] bg-ink-raised text-left"
            >
              <Image
                src={stage.src}
                alt={stage.alt}
                fill
                sizes="(min-width: 768px) 22vw, 44vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-extrabold tracking-[-0.01em]">{stage.label}</div>
                <p className="m-0 mt-1.5 max-w-[24ch] text-pretty text-[12.5px] leading-[1.5] opacity-70">
                  {stage.detail}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <Lightbox
          count={stages.length}
          activeIndex={activeIndex ?? 0}
          onNext={() => setActiveIndex((i) => (i === null ? i : (i + 1) % stages.length))}
          onPrev={() => setActiveIndex((i) => (i === null ? i : (i - 1 + stages.length) % stages.length))}
          onClose={() => setActiveIndex(null)}
          caption={active.label}
        >
          <div className="relative h-[80vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </Lightbox>
      )}
    </>
  );
}
