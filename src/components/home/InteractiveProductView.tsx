"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import MagneticLink from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { TiltIcon, ZoomIcon } from "@/components/ui/Icon";
import type { ProductSeries } from "@/data/types";

const MAX_TILT = 8;
// How many degrees of real physical tilt (relative to however the visitor is
// already holding the phone) maps to the full MAX_TILT rotation.
const MAX_DEVICE_DELTA = 18;

type DeviceOrientationEventIOS = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function InteractiveProductView({ series }: { series: ProductSeries }) {
  const product = series.subSeries[0];
  const variants = product?.variants ?? [];
  const [active, setActive] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [hovering, setHovering] = useState(false);
  const [deviceTiltOn, setDeviceTiltOn] = useState(false);
  const baseline = useRef<{ beta: number; gamma: number } | null>(null);

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

  // Real gyroscope-driven tilt for touch devices — mouse-hover tilt (above)
  // never fires on touch, so without this "TILT TO EXPLORE" would be a false
  // promise there. Calibrates against whatever angle the phone is already
  // being held at on the first reading, then tracks movement from there,
  // since visitors don't hold phones at any one "neutral" angle.
  useEffect(() => {
    if (!deviceTiltOn) return;

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      if (!baseline.current) {
        baseline.current = { beta: e.beta, gamma: e.gamma };
        return;
      }
      const dBeta = clamp(e.beta - baseline.current.beta, -MAX_DEVICE_DELTA, MAX_DEVICE_DELTA);
      const dGamma = clamp(e.gamma - baseline.current.gamma, -MAX_DEVICE_DELTA, MAX_DEVICE_DELTA);
      setHovering(true);
      setTilt({
        x: (dBeta / MAX_DEVICE_DELTA) * MAX_TILT,
        y: (dGamma / MAX_DEVICE_DELTA) * MAX_TILT,
        px: 50 + (dGamma / MAX_DEVICE_DELTA) * 50,
        py: 50 + (dBeta / MAX_DEVICE_DELTA) * 50,
      });
    };

    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [deviceTiltOn]);

  // iOS 13+ Safari requires motion-sensor access to be requested from inside
  // a real user gesture (a tap), so this can't run automatically on mount —
  // the first tap on the card silently asks for permission, then every
  // reading after that drives the tilt. Android/other browsers don't gate
  // this behind a permission prompt at all, so it just turns on directly.
  const enableDeviceTilt = () => {
    if (deviceTiltOn || typeof window === "undefined" || !window.DeviceOrientationEvent) return;
    const DOE = window.DeviceOrientationEvent as DeviceOrientationEventIOS;
    if (typeof DOE.requestPermission === "function") {
      DOE.requestPermission()
        .then((result) => {
          if (result === "granted") setDeviceTiltOn(true);
        })
        .catch(() => {});
    } else {
      setDeviceTiltOn(true);
    }
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
          <Reveal as="h2" className="m-0 text-[clamp(24px,3vw,38px)] leading-[1.02] font-extrabold tracking-[-0.035em] uppercase [font-stretch:114%]">
            See it. Feel it.
            <br />
            Experience it.
          </Reveal>
          <Reveal delay={100} as="p" className="m-0 mt-4 max-w-[34ch] text-pretty text-[13.5px] leading-[1.6] opacity-65">
            Move your cursor to see the texture and finish catch the light.
          </Reveal>
          <Reveal delay={180} className="mt-6">
            <MagneticLink
              href={`/products/${series.slug}/${product?.slug}`}
              arrow
              className="bg-charcoal px-5 py-3.5 font-mono-label text-[10px] font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-300 hover:bg-signal-red"
            >
              View {product?.name}
            </MagneticLink>
          </Reveal>
        </div>

        <Reveal
          delay={120}
          y={20}
          className="relative mx-auto aspect-[4/5] w-full max-w-[260px] [perspective:1200px]"
        >
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={reset}
            onClick={enableDeviceTilt}
            className="absolute inset-0"
          >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-9%] rounded-full border border-dashed border-charcoal/15 md:inset-[-16%]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-4%] rounded-full border border-dashed border-charcoal/10 md:inset-[-7%]"
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
        </Reveal>

        <Reveal delay={200}>
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
        </Reveal>
      </div>
    </section>
  );
}
