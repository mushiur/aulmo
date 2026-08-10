"use client";

import clsx from "clsx";
import { CheckIcon } from "@/components/ui/Icon";
import type { CircuitBreakerPole } from "@/data/types";

const POLES: { code: CircuitBreakerPole; label: string }[] = [
  { code: "SP", label: "Single Pole" },
  { code: "DP", label: "Double Pole" },
  { code: "TP", label: "Triple Pole" },
];

export default function PoleSelector({
  active,
  onSelect,
}: {
  active: CircuitBreakerPole;
  onSelect: (pole: CircuitBreakerPole) => void;
}) {
  return (
    <>
      {/* Mobile — a joined segmented control, matching the compact tab pattern of
          the reference design. Individual finish-style cards read as too sparse
          at this width. */}
      <div
        className="flex overflow-hidden rounded-[10px] border border-charcoal/16 sm:hidden"
        role="radiogroup"
        aria-label="Pole"
      >
        {POLES.map((pole, i) => {
          const isActive = pole.code === active;
          return (
            <button
              key={pole.code}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onSelect(pole.code)}
              className={clsx(
                "flex-1 py-3 text-center font-mono-label text-[12px] font-bold tracking-[0.04em] transition-colors duration-200",
                isActive ? "bg-signal-red text-paper-bright" : "bg-paper-bright text-charcoal/70",
                i > 0 && "border-l border-charcoal/16",
              )}
            >
              {pole.code}
            </button>
          );
        })}
      </div>

      {/* Desktop/tablet — the FinishSelector-style card grid, unchanged. */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-2" role="radiogroup" aria-label="Pole">
        {POLES.map((pole) => {
          const isActive = pole.code === active;
          return (
            <button
              key={pole.code}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onSelect(pole.code)}
              className={clsx(
                "group relative flex flex-col items-start gap-2 rounded-[12px] border bg-paper-bright p-2.5 text-left transition-colors duration-300",
                isActive ? "border-charcoal" : "border-charcoal/14 hover:border-charcoal/40",
              )}
            >
              {isActive && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-charcoal text-paper-bright">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
              )}
              <span
                className={clsx(
                  "flex h-10 w-10 flex-none items-center justify-center rounded-[8px] border font-mono-label text-[11px] font-bold tracking-[0.02em]",
                  isActive ? "border-charcoal bg-charcoal text-paper-bright" : "border-charcoal/14 text-charcoal/70",
                )}
              >
                {pole.code}
              </span>
              <span className="text-[12px] font-bold tracking-[-0.005em]">{pole.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
