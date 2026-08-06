"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Lightbox from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/Icon";
import type { ProductSeries, ProductVariant } from "@/data/types";

type FilterKey = "ALL" | "L" | "D" | "M";

type Slide = {
  key: string;
  src: string;
  alt: string;
  seriesSlug: string;
  subSeriesSlug: string;
  subSeriesName: string;
  variant: ProductVariant;
};

function buildSlides(series: ProductSeries): Slide[] {
  const slides: Slide[] = [];
  for (const sub of series.subSeries) {
    if (!sub.variants || sub.variants.length === 0) continue;
    for (const variant of sub.variants) {
      slides.push({
        key: `${sub.slug}-${variant.code}`,
        src: variant.hero.src,
        alt: variant.hero.alt,
        seriesSlug: series.slug,
        subSeriesSlug: sub.slug,
        subSeriesName: sub.name,
        variant,
      });
    }
  }
  return slides;
}

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "L", label: "L SERIES" },
  { key: "D", label: "D SERIES" },
  { key: "M", label: "M SERIES" },
];

const CARDS_PER_PAGE = 2;

export default function ProductGallery({
  lSeries,
  dSeries,
  mSeries,
}: {
  lSeries: ProductSeries;
  dSeries: ProductSeries;
  mSeries: ProductSeries;
}) {
  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => {
    if (filter === "ALL") return [lSeries, dSeries, mSeries].flatMap(buildSlides);
    const bySeries: Record<"L" | "D" | "M", ProductSeries> = { L: lSeries, D: dSeries, M: mSeries };
    return buildSlides(bySeries[filter]);
  }, [filter, lSeries, dSeries, mSeries]);

  const pageCount = Math.max(1, Math.ceil(slides.length / CARDS_PER_PAGE));

  const selectFilter = (key: FilterKey) => {
    setFilter(key);
    setPage(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

  const scrollByPage = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.86;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) {
      setPage(0);
      return;
    }
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setPage(Math.round(progress * (pageCount - 1)));
  };

  const lightboxSlide = lightboxIndex !== null ? slides[lightboxIndex] : null;

  return (
    <section
      id="series"
      data-theme="light"
      className="relative bg-paper-bright px-6 py-[10vh] text-charcoal md:px-[5vw] md:py-[12vh]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow label="OUR COLLECTION" className="mb-6" />
          <h2 className="m-0 text-[clamp(28px,4.2vw,60px)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            Crafted to define
            <br />
            every space.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => selectFilter(f.key)}
              className={clsx(
                "rounded-full border px-5 py-2.5 font-mono-label text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300",
                filter === f.key
                  ? "border-charcoal bg-charcoal text-paper-bright"
                  : "border-charcoal/20 hover:border-charcoal/50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-10 md:mt-[7vh]">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByPage(-1)}
          className="absolute top-1/2 left-0 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-paper-bright text-lg shadow-md transition-colors hover:border-charcoal/40 sm:flex"
        >
          ‹
        </button>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Expand ${s.subSeriesName} ${s.variant.name}`}
              className="group relative w-[44vw] flex-none snap-start text-left sm:w-[210px]"
            >
              <span className="relative block aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-bone-deep">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 640px) 210px, 44vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-paper-bright/90 text-charcoal opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                  <ExpandIcon className="h-4 w-4" />
                </span>
              </span>
              <span className="mt-3 block text-[13px] font-bold tracking-[-0.01em]">{s.subSeriesName}</span>
              <span className="mt-0.5 block font-mono-label text-[9px] tracking-[0.16em] opacity-50">
                {s.variant.name.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByPage(1)}
          className="absolute top-1/2 right-0 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-paper-bright text-lg shadow-md transition-colors hover:border-charcoal/40 sm:flex"
        >
          ›
        </button>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <span
              key={i}
              className={clsx(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                i === page ? "w-6 bg-charcoal" : "w-1.5 bg-charcoal/20",
              )}
            />
          ))}
        </div>
      )}

      <div className="mt-[6vh] flex justify-end md:mt-[7vh]">
        <Link href="/products" className="font-mono-label text-[10px] tracking-[0.18em] text-signal-red">
          EXPLORE ALL PRODUCTS →
        </Link>
      </div>

      {lightboxSlide && (
        <Lightbox
          count={slides.length}
          activeIndex={lightboxIndex ?? 0}
          onNext={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % slides.length))}
          onPrev={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + slides.length) % slides.length))}
          onClose={() => setLightboxIndex(null)}
          caption={`${lightboxSlide.subSeriesName} — ${lightboxSlide.variant.name}`}
        >
          <div className="relative h-[75vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightboxSlide.src} alt={lightboxSlide.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </Lightbox>
      )}
    </section>
  );
}
