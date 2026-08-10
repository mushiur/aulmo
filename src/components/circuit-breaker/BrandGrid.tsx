import type { CircuitBreakerBrand } from "@/data/types";

/** Text-only brand chips — no logo assets exist yet, and using another company's
 *  logo without one on file would risk implying a relationship that isn't verified. */
export default function BrandGrid({ brands }: { brands: CircuitBreakerBrand[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {brands.map((brand) => (
        <span
          key={brand.slug}
          className="rounded-full border border-charcoal/16 px-4 py-2.5 font-mono-label text-[10px] font-bold tracking-[0.14em] uppercase opacity-70"
        >
          {brand.name}
        </span>
      ))}
    </div>
  );
}
