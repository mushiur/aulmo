"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PoleSelector from "@/components/circuit-breaker/PoleSelector";
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
      { key: "brand", label: "Brand", options: uniq(poleProducts.map((p) => brandName(p.brandSlug))) },
      { key: "ratedCurrent", label: "Rated Current", options: uniq(poleProducts.map((p) => p.ratedCurrent)) },
      { key: "curveType", label: "Curve Type", options: uniq(poleProducts.map((p) => p.curveType)) },
      { key: "breakingCapacity", label: "Breaking Capacity", options: uniq(poleProducts.map((p) => p.breakingCapacity)) },
      { key: "voltage", label: "Voltage", options: uniq(poleProducts.map((p) => p.voltage)) },
      { key: "series", label: "Series", options: uniq(poleProducts.map((p) => p.series)) },
    ];
  }, [poleProducts, brandName]);

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

  return (
    <div>
      {hasPoles && (
        <div className="mb-6">
          <PoleSelector active={pole} onSelect={setPole} />
        </div>
      )}

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

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
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
            className="relative max-h-[80vh] w-full overflow-y-auto rounded-t-[20px] bg-paper-bright p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono-label text-[11px] font-bold tracking-[0.18em] uppercase">Filter</span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="bg-transparent font-mono-label text-[10px] tracking-[0.16em] uppercase opacity-50"
              >
                Close ✕
              </button>
            </div>
            <CircuitBreakerFilters
              groups={filterGroups}
              selected={filters}
              onToggle={toggleFilter}
              onClear={() => setFilters({})}
            />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-charcoal py-3.5 font-mono-label text-[11px] font-bold tracking-[0.18em] text-paper uppercase"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
