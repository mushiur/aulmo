import Image from "next/image";
import type { CircuitBreakerBrand } from "@/data/types";

export default function BrandGrid({ brands }: { brands: CircuitBreakerBrand[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
      {brands.map((brand) => (
        <div key={brand.slug} className="flex h-20 items-center justify-center rounded-[12px] border border-charcoal/12 bg-paper-bright p-3">
          {brand.logo ? (
            <Image src={brand.logo} alt={brand.name} width={144} height={48} unoptimized className="h-12 w-auto max-w-full object-contain mix-blend-multiply" />
          ) : (
            <span className="font-mono-label text-[11px] font-bold tracking-[0.08em] uppercase opacity-70">{brand.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
