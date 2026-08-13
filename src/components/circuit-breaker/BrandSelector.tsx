"use client";

import Image from "next/image";
import clsx from "clsx";
import type { CircuitBreakerBrand } from "@/data/types";
import { BRAND_LOGOS } from "@/components/circuit-breaker/brandLogos";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icon";

export default function BrandSelector({
  brands,
  activeBrand,
  onSelect,
}: {
  brands: CircuitBreakerBrand[];
  activeBrand?: string;
  onSelect: (brand: string | undefined) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScrollDirection = () => {
      const hasOverflow = element.scrollWidth > element.clientWidth + 1;
      if (!hasOverflow) return setScrollDirection(null);
      setScrollDirection(element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 ? "left" : "right");
    };

    updateScrollDirection();
    element.addEventListener("scroll", updateScrollDirection, { passive: true });
    window.addEventListener("resize", updateScrollDirection);
    return () => {
      element.removeEventListener("scroll", updateScrollDirection);
      window.removeEventListener("resize", updateScrollDirection);
    };
  }, [brands]);

  const scrollBrands = () => {
    const element = scrollRef.current;
    if (!element || !scrollDirection) return;
    element.scrollBy({ left: scrollDirection === "right" ? 240 : -240, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="font-mono-label text-[10px] font-bold tracking-[0.18em] uppercase">Brand</span>
        {activeBrand && (
          <button type="button" onClick={() => onSelect(undefined)} className="bg-transparent font-mono-label text-[9px] font-bold tracking-[0.14em] text-signal-red uppercase">
            Clear brand
          </button>
        )}
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex snap-x gap-2 overflow-x-auto pb-2 pr-8 md:grid md:grid-cols-4 md:overflow-visible md:pr-0 lg:grid-cols-7">
          <button type="button" onClick={() => onSelect(undefined)} className={clsx("flex h-11 min-w-[52px] snap-start items-center justify-center rounded-[7px] border px-3 font-mono-label text-[8px] font-bold tracking-[0.1em] uppercase transition-colors sm:h-[52px] sm:min-w-[58px] md:min-w-0", !activeBrand ? "border-charcoal bg-charcoal text-paper-bright" : "border-charcoal/16 bg-paper-bright text-charcoal/65 hover:border-charcoal/45")}>
            All
          </button>
          {brands.map((brand) => {
            const active = activeBrand === brand.name;
            return (
              <button key={brand.slug} type="button" onClick={() => onSelect(active ? undefined : brand.name)} aria-pressed={active} className={clsx("flex h-11 min-w-[86px] snap-start items-center justify-center rounded-[7px] border bg-paper-bright px-2 transition-colors sm:h-[52px] sm:min-w-[96px] sm:px-3 md:min-w-0", active ? "border-signal-red ring-1 ring-signal-red" : "border-charcoal/16 hover:border-charcoal/45")}>
                <Image src={BRAND_LOGOS[brand.slug]} alt={brand.name} width={144} height={48} unoptimized className="h-8 w-auto max-w-full object-contain mix-blend-multiply sm:h-10" />
              </button>
            );
          })}
        </div>
        {scrollDirection && (
          <button type="button" onClick={scrollBrands} aria-label={`Show ${scrollDirection === "right" ? "more" : "previous"} brands`} className="absolute top-1/2 right-0 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-paper-bright text-charcoal shadow-sm md:hidden">
            {scrollDirection === "right" ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
