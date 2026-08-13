"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PoleSelector from "@/components/circuit-breaker/PoleSelector";
import BrandSelector from "@/components/circuit-breaker/BrandSelector";
import CircuitBreakerFilters, { type FilterGroup } from "@/components/circuit-breaker/CircuitBreakerFilters";
import CircuitBreakerCard from "@/components/circuit-breaker/CircuitBreakerCard";
import { ChevronDownIcon, FilterIcon } from "@/components/ui/Icon";
import type { CircuitBreakerBrand, CircuitBreakerPole, CircuitBreakerProduct } from "@/data/types";

type FilterState = Record<string, string[]>;
type SortBy = "featured" | "name" | "current";

const FILTER_FIELD: Record<string, keyof CircuitBreakerProduct> = {
  brand: "brandSlug",
  ratedCurrent: "ratedCurrent",
  curveType: "curveType",
  breakingCapacity: "breakingCapacity",
  voltage: "voltage",
  series: "series",
};

export default function CircuitBreakerListing({
  categoryName,
  categoryFullName,
  hasPoles,
  products,
  brands,
}: {
  categoryName: string;
  categoryFullName: string;
  hasPoles: boolean;
  products: CircuitBreakerProduct[];
  brands: CircuitBreakerBrand[];
}) {
  const searchParams = useSearchParams();
  const initialPole = (searchParams.get("pole")?.toUpperCase() as CircuitBreakerPole) || "SP";
  const [pole, setPole] = useState<CircuitBreakerPole>(hasPoles ? initialPole : "SP");
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState<SortBy>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const brandName = useCallback(
    (slug: string) => brands.find((b) => b.slug === slug)?.name ?? slug,
    [brands],
  );

  const poleProducts = useMemo(
    () => (hasPoles ? products.filter((p) => p.pole === pole) : products),
    [products, hasPoles, pole],
  );

  const filterGroups: FilterGroup[] = useMemo(() => {
    const uniq = (values: (string | undefined)[]) => [...new Set(values.filter(Boolean) as string[])];
    return [
      { key: "ratedCurrent", label: "Rated Current", options: uniq(poleProducts.map((p) => p.ratedCurrent)) },
      { key: "curveType", label: "Curve Type", options: uniq(poleProducts.map((p) => p.curveType)) },
      { key: "breakingCapacity", label: "Breaking Capacity", options: uniq(poleProducts.map((p) => p.breakingCapacity)) },
      { key: "voltage", label: "Voltage", options: uniq(poleProducts.map((p) => p.voltage)) },
      { key: "series", label: "Series", options: uniq(poleProducts.map((p) => p.series)) },
    ];
  }, [poleProducts]);

  const filtered = useMemo(() => {
    return poleProducts.filter((p) => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        if (key === "brand") return values.includes(brandName(p.brandSlug));
        const field = FILTER_FIELD[key];
        return values.includes(String(p[field] ?? ""));
      });
    });
  }, [poleProducts, filters, brandName]);

  const sorted = useMemo(() => {
    if (sortBy === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "current") {
      return [...filtered].sort((a, b) => parseInt(a.ratedCurrent, 10) - parseInt(b.ratedCurrent, 10));
    }
    return filtered;
  }, [filtered, sortBy]);

  const activeFilterCount = useMemo(
    () => Object.values(filters).reduce((n, values) => n + values.length, 0),
    [filters],
  );

  const toggleFilter = (groupKey: string, value: string) => {
    setFilters((prev) => {
      const current = prev[groupKey] ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [groupKey]: next };
    });
  };

  const selectBrand = (brand: string | undefined) => {
    setFilters((previous) => ({ ...previous, brand: brand ? [brand] : [] }));
  };

  return (
    <div>
      {hasPoles && (
        <section className="mb-7 max-w-3xl">
          <span className="mb-3 block font-mono-label text-[10px] font-bold tracking-[0.18em] uppercase">Pole</span>
          <PoleSelector active={pole} onSelect={setPole} />
        </section>
      )}

      <section className="mb-7 border-y border-charcoal/10 py-5">
        <BrandSelector brands={brands} activeBrand={filters.brand?.[0]} onSelect={selectBrand} />
      </section>

      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-mono-label text-[10px] tracking-[0.18em] text-signal-red">
          {filtered.length} {filtered.length === 1 ? "PRODUCT" : "PRODUCTS"} FOUND
        </span>
      </div>

      {/* Mobile-only Filter/Sort toolbar — the checkbox list lives in a slide-up
          drawer here instead of the always-open sidebar, which read as too static
          and took up most of the screen before a visitor saw a single product. */}
      <div className="mb-6 flex items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-charcoal/16 bg-transparent py-3 font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase"
        >
          <FilterIcon className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-signal-red text-[9px] text-paper-bright">
              {activeFilterCount}
            </span>
          )}
        </button>
        <div className="relative flex-1">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="w-full appearance-none rounded-[10px] border border-charcoal/16 bg-transparent py-3 pr-8 pl-4 font-mono-label text-[11px] font-bold tracking-[0.1em] uppercase"
          >
            <option value="featured">Sort: Featured</option>
            <option value="name">Sort: Name</option>
            <option value="current">Sort: Current</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2" />
        </div>
      </div>

      <div className="grid max-w-[1500px] grid-cols-1 gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden md:block">
          <CircuitBreakerFilters
            groups={filterGroups}
            selected={filters}
            onToggle={toggleFilter}
            onClear={() => setFilters({})}
          />
        </aside>

        <div>
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {sorted.map((product) => (
                <CircuitBreakerCard
                  key={product.id}
                  product={product}
                  brandName={brandName(product.brandSlug)}
                  categoryName={categoryFullName || categoryName}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[16px] border border-charcoal/12 px-6 py-16 text-center">
              <p className="m-0 text-[14px] opacity-60">No products match the selected filters.</p>
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-[250] flex items-end md:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/60" />
          <div
            className="relative flex max-h-[80vh] w-full flex-col rounded-t-[20px] bg-paper-bright"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-none items-center justify-between border-b border-charcoal/10 px-5 py-4">
              <span className="font-mono-label text-[11px] font-bold tracking-[0.18em] uppercase">Filter</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex items-center gap-1.5 rounded-full bg-signal-red px-3.5 py-2 font-mono-label text-[10px] font-bold tracking-[0.16em] text-paper uppercase transition-transform duration-200 active:scale-95"
              >
                Close ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <CircuitBreakerFilters
                groups={filterGroups}
                selected={filters}
                onToggle={toggleFilter}
                onClear={() => setFilters({})}
                variant="mobile"
              />
            </div>
            <div className="flex-none border-t border-charcoal/10 p-5">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-charcoal py-3.5 font-mono-label text-[11px] font-bold tracking-[0.18em] text-paper uppercase"
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
