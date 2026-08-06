"use client";

import clsx from "clsx";
import type { ProductVariant } from "@/data/types";

export default function FinishSelector({
  variants,
  activeIndex,
  onSelect,
}: {
  variants: ProductVariant[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Finish">
      {variants.map((variant, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={variant.code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(i)}
            className={clsx(
              "group flex items-center gap-2.5 border px-3 py-2.5 text-left transition-colors duration-300",
              active ? "border-charcoal" : "border-charcoal/20 hover:border-charcoal/50",
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                "h-7 w-7 flex-none border transition-shadow",
                active ? "border-charcoal shadow-[0_0_0_2px_rgba(20,20,18,0.12)]" : "border-charcoal/25",
              )}
              style={{ background: variant.swatch }}
            />
            <span className="text-[13px] font-semibold tracking-[-0.01em]">{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
}
