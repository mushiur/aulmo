"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import MagneticLink from "@/components/ui/MagneticLink";
import { TiltIcon, ZoomIcon } from "@/components/ui/Icon";
import type { ProductSeries } from "@/data/types";

const MAX_TILT = 8;

export default function InteractiveProductView({ series }: { series: ProductSeries }) {
  const product = series.subSeries[0];
  const variants = product?.variants ?? [];
  const [active, setActive] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [hovering, setHovering] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setTilt({
      x: -((py - 50) / 50) * MAX_TILT,
      y: ((px - 50) / 50) * MAX_TILT,
      px,
      py,
    });
  };

  const reset = () => {
    setHovering(false);
    setTilt({ x: 0, y: 0, px: 50, py: 50 });
  };

  return (
    <section
      id="engineering"
      data-theme="light"
      className="relative bg-paper-bright px-6 py-[8vh] text-charcoal md:px-[5vw] md:py-[10vh]"
    >
      <div className="grid gap-10 md:grid-cols-[0.75fr_0.85fr_0.7fr] md:items-center md:gap-8">
        <div>
          <SectionEyebrow label="PRODUCT EXPERIENCE" className="mb-5" />
          <h2 className="m-0 text-[clamp(24px,3vw,38px)] leading-[1.02] font-extrabold tracking-[-0.035em] uppercase [font-stretch:114%]">
            See it. Feel it.
            <br />
            Experience it.
          </h2>
          <p className="m-0 mt-4 max-w-[34ch] text-pretty text-[13.5px] leading-[1.6] opacity-65">
            Move your cursor to see the texture and finish catch the light.
          </p>
          <div className="mt-6">
            <MagneticLink
              href={`/products/${series.slug}/${product?.slug}`}
              arrow
              className="bg-charcoal px-5 py-3.5 font-mono-label text-[10px] font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-300 hover:bg-signal-red"
            >
              View {product?.name}
            </MagneticLink>
          </div>
        </div>

        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={reset}
          className="relative mx-auto aspect-[4/5] w-full max-w-[260px] [perspective:1200px]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-16%] rounded-full border border-dashed border-charcoal/15"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-7%] rounded-full border border-dashed border-charcoal/10"
          />

          <div
            className="relative h-full w-full overflow-hidden rounded-[22px] bg-bone-deep shadow-[0_40px_70px_-30px_rgba(20,20,18,0.32)] transition-transform duration-150 ease-out will-change-transform"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovering ? 1.03 : 1})`,
            }}
          >
            {variants.map((v, i) => (
              <Image
                key={v.code}
                src={v.hero.src}
                alt={v.hero.alt}
                fill
                sizes="(min-width: 768px) 22vw, 60vw"
                className={clsx(
                  "object-cover transition-opacity duration-500",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
              style={{
                opacity: hovering ? 0.45 : 0,
                background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(255,255,255,0.85), transparent 55%)`,
              }}
            />
          </div>
        </div>

        <div>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-charcoal/20">
                <TiltIcon className="h-4 w-4" />
              </span>
              <span className="font-mono-label text-[10px] font-bold tracking-[0.16em]">TILT TO EXPLORE</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-charcoal/20">
                <ZoomIcon className="h-4 w-4" />
              </span>
              <span className="font-mono-label text-[10px] font-bold tracking-[0.16em]">ZOOM ON HOVER</span>
            </li>
          </ul>

          {variants.length > 1 && (
            <div className="mt-7">
              <div className="mb-3 font-mono-label text-[9px] tracking-[0.2em] opacity-45">CHOOSE FINISH</div>
              <div className="flex flex-wrap gap-2.5">
                {variants.map((v, i) => (
                  <button
                    key={v.code}
                    type="button"
                    aria-label={v.name}
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={clsx(
                      "h-8 w-8 rounded-full border transition-[transform,border-color] duration-300",
                      i === active ? "scale-110 border-charcoal" : "border-charcoal/25 hover:border-charcoal/50",
                    )}
                    style={{ background: v.swatch }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
