"use client";

import clsx from "clsx";
import { CheckIcon } from "@/components/ui/Icon";
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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Finish">
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
              "group relative flex flex-col items-start gap-2 rounded-[12px] border bg-paper-bright p-2.5 text-left transition-colors duration-300",
              active ? "border-charcoal" : "border-charcoal/14 hover:border-charcoal/40",
            )}
          >
            {active && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-charcoal text-paper-bright">
                <CheckIcon className="h-2.5 w-2.5" />
              </span>
            )}
            <span
              aria-hidden="true"
              className="h-10 w-10 flex-none rounded-[8px] border border-charcoal/10"
              style={{ background: variant.swatch }}
            />
            <span className="text-[12px] font-bold tracking-[-0.005em]">{variant.name}</span>
            <span aria-hidden="true" className="h-[2px] w-5 rounded-full" style={{ background: variant.swatch }} />
          </button>
        );
      })}
    </div>
  );
}
