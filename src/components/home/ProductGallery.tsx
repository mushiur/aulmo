"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/Icon";
import type { ProductSeries } from "@/data/types";

type Slide = {
  key: string;
  src: string;
  alt: string;
  seriesSlug: string;
  subSeriesSlug: string;
  subSeriesName: string;
  // Sub-series with a finish selector carry a variant name (e.g. "Ink
  // Black"); sub-series with just a plain `image` (K/S today) don't, so this
  // is omitted rather than faked.
  variantName?: string;
};

function buildSlides(series: ProductSeries): Slide[] {
  const slides: Slide[] = [];
  for (const sub of series.subSeries) {
    if (sub.variants && sub.variants.length > 0) {
      for (const variant of sub.variants) {
        slides.push({
          key: `${sub.slug}-${variant.code}`,
          src: variant.hero.src,
          alt: variant.hero.alt,
          seriesSlug: series.slug,
          subSeriesSlug: sub.slug,
          subSeriesName: sub.name,
          variantName: variant.name,
        });
      }
    } else if (sub.image) {
      slides.push({
        key: sub.slug,
        src: sub.image.src,
        alt: sub.image.alt,
        seriesSlug: series.slug,
        subSeriesSlug: sub.slug,
        subSeriesName: sub.name,
      });
    }
  }
  return slides;
}

const CARDS_PER_PAGE = 2;

export default function ProductGallery({ series }: { series: ProductSeries[] }) {
  // Data-driven on purpose: adding, removing or renaming a series in
  // product-hierarchy.ts changes what shows here automatically — no edits
  // needed in this file. A series only earns a filter pill once it has real
  // variant photography (buildSlides returns something for it), so K/S stay
  // out of the showcase until they get real photos, without an allow-list.
  const showcaseSeries = useMemo(() => series.filter((s) => buildSlides(s).length > 0), [series]);

  const FILTERS = useMemo(
    () => [{ slug: "ALL", label: "ALL" }, ...showcaseSeries.map((s) => ({ slug: s.slug, label: s.name.toUpperCase() }))],
    [showcaseSeries],
  );

  const [filter, setFilter] = useState("ALL");
  const [subFilter, setSubFilter] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeSeries = useMemo(
    () => (filter === "ALL" ? null : showcaseSeries.find((s) => s.slug === filter) ?? null),
    [filter, showcaseSeries],
  );

  // Only offer a sub-series drill-down once one specific series is picked —
  // with "ALL" selected, sub-series names from several different series
  // would just clutter the row rather than help anyone narrow things down.
  const availableSubSeries = activeSeries
    ? activeSeries.subSeries.filter((sub) => (sub.variants && sub.variants.length > 0) || sub.image)
    : [];

  const slides = useMemo(() => {
    if (!activeSeries) return showcaseSeries.flatMap(buildSlides);
    const all = buildSlides(activeSeries);
    return subFilter ? all.filter((s) => s.subSeriesSlug === subFilter) : all;
  }, [activeSeries, subFilter, showcaseSeries]);

  const pageCount = Math.max(1, Math.ceil(slides.length / CARDS_PER_PAGE));

  const selectFilter = (slug: string) => {
    setFilter(slug);
    setSubFilter(null);
    setPage(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

  const selectSubFilter = (slug: string | null) => {
    setSubFilter(slug);
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

  if (showcaseSeries.length === 0) return null;

  return (
    <section
      id="series"
      data-theme="light"
      className="relative bg-paper-bright px-6 py-[10vh] text-charcoal md:px-[5vw] md:py-[12vh]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow label="OUR COLLECTION" className="mb-6" />
          <Reveal as="h2" className="m-0 text-[clamp(28px,4.2vw,60px)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            Crafted to define
            <br />
            every space.
          </Reveal>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => selectFilter(f.slug)}
              className={clsx(
                "rounded-full border px-5 py-2.5 font-mono-label text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300",
                filter === f.slug
                  ? "border-charcoal bg-charcoal text-paper-bright"
                  : "border-charcoal/20 hover:border-charcoal/50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {availableSubSeries.length > 0 && (
          <motion.div
            key={filter}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 flex flex-wrap gap-2 md:justify-end">
              <button
                type="button"
                onClick={() => selectSubFilter(null)}
                className={clsx(
                  "rounded-full border px-4 py-2 font-mono-label text-[9.5px] font-bold tracking-[0.14em] uppercase transition-colors duration-300",
                  subFilter === null
                    ? "border-signal-red bg-signal-red text-charcoal"
                    : "border-charcoal/15 opacity-60 hover:border-charcoal/40 hover:opacity-100",
                )}
              >
                ALL {FILTERS.find((f) => f.slug === filter)?.label}
              </button>
              {availableSubSeries.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => selectSubFilter(sub.slug)}
                  className={clsx(
                    "rounded-full border px-4 py-2 font-mono-label text-[9.5px] font-bold tracking-[0.14em] uppercase transition-colors duration-300",
                    subFilter === sub.slug
                      ? "border-signal-red bg-signal-red text-charcoal"
                      : "border-charcoal/15 opacity-60 hover:border-charcoal/40 hover:opacity-100",
                  )}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <Reveal key={s.key} delay={Math.min(i * 40, 400)} y={20} className="w-[44vw] flex-none snap-start sm:w-[210px]">
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Expand ${s.subSeriesName}${s.variantName ? ` ${s.variantName}` : ""}`}
                className="group relative block w-full text-left"
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
                {s.variantName && (
                  <span className="mt-0.5 block font-mono-label text-[9px] tracking-[0.16em] opacity-50">
                    {s.variantName.toUpperCase()}
                  </span>
                )}
              </button>
            </Reveal>
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

      <div className="mt-[6vh] flex justify-center md:mt-[7vh] md:justify-end">
        <Link
          href="/products"
          className="inline-flex items-center gap-2.5 rounded-full border border-charcoal/24 px-6 py-3.5 font-mono-label text-[10px] font-bold tracking-[0.18em] text-charcoal uppercase transition-colors duration-300 hover:border-charcoal/65 hover:bg-charcoal hover:text-paper-bright"
        >
          EXPLORE ALL PRODUCTS
          <span>→</span>
        </Link>
      </div>

      {lightboxSlide && (
        <Lightbox
          count={slides.length}
          activeIndex={lightboxIndex ?? 0}
          onNext={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % slides.length))}
          onPrev={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + slides.length) % slides.length))}
          onClose={() => setLightboxIndex(null)}
          caption={
            lightboxSlide.variantName
              ? `${lightboxSlide.subSeriesName} — ${lightboxSlide.variantName}`
              : lightboxSlide.subSeriesName
          }
        >
          <div className="relative h-[75vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightboxSlide.src} alt={lightboxSlide.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </Lightbox>
      )}
    </section>
  );
}
