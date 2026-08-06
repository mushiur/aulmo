"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

type LayeredImageProps = {
  src: string;
  alt: string;
  /** CSS position for the mask's focal point, e.g. "70% 42%". */
  focal?: string;
  /** Subtle scroll-linked drift — use on at most one image per page. */
  parallax?: boolean;
  priority?: boolean;
  /** Positions/sizes the image's own box. Defaults to a full-bleed fill —
   *  pass a bounded box (e.g. "absolute inset-y-0 right-0 w-[55%]") for
   *  source photos too small to upscale across a whole section. */
  className?: string;
  sizes?: string;
  /** Radial mask size as "widthPct heightPct" — bigger means more of the
   *  image stays fully opaque before the edges start fading. */
  spread?: string;
  /** object-position for the photo itself, e.g. "50% 100%" to crop toward
   *  the bottom of a composite image and cut off a text band above it. */
  objectPosition?: string;
};

/**
 * A background image with no visible rectangle: a radial mask fades it into
 * the section's own background color on every edge, so it reads as part of
 * the composition rather than a photo in a frame.
 */
export default function LayeredImage({
  src,
  alt,
  focal = "50% 46%",
  parallax = false,
  priority = false,
  className,
  sizes = "100vw",
  spread = "62% 58%",
  objectPosition = "50% 50%",
}: LayeredImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-6%", "6%"] : ["0%", "0%"]);
  const mask = `radial-gradient(${spread} at ${focal}, black 48%, rgba(0,0,0,0.6) 74%, transparent 98%)`;

  return (
    <div ref={ref} className={clsx("overflow-hidden", className ?? "absolute inset-0")}>
      <motion.div
        style={{ y, maskImage: mask, WebkitMaskImage: mask }}
        className="absolute inset-[-6%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>
    </div>
  );
}
