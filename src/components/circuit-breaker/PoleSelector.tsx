"use client";

import clsx from "clsx";
import Image from "next/image";
import { CheckIcon } from "@/components/ui/Icon";
import type { CircuitBreakerPole } from "@/data/types";
import { POLE_ICONS } from "@/components/circuit-breaker/poleIcons";

export type PoleFilter = CircuitBreakerPole | "ALL";

const POLES: { code: CircuitBreakerPole; label: string }[] = [
  { code: "SP", label: "Single Pole" },
  { code: "DP", label: "Double Pole" },
  { code: "TP", label: "Triple Pole" },
];

export default function PoleSelector({
  active,
  onSelect,
}: {
  active: PoleFilter;
  onSelect: (pole: PoleFilter) => void;
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
        <button
          type="button"
          role="radio"
          aria-checked={active === "ALL"}
          onClick={() => onSelect("ALL")}
          className={clsx(
            "flex-1 py-3 text-center font-mono-label text-[12px] font-bold tracking-[0.04em] transition-colors duration-200",
            active === "ALL" ? "bg-signal-red text-paper-bright" : "bg-paper-bright text-charcoal/70",
          )}
        >
          <span className="flex h-6 items-center justify-center font-mono-label text-[12px] font-bold tracking-[0.06em]">All</span>
        </button>
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
                "flex-1 border-l border-charcoal/16 py-3 text-center font-mono-label text-[12px] font-bold tracking-[0.04em] transition-colors duration-200",
                isActive ? "bg-signal-red text-paper-bright" : "bg-paper-bright text-charcoal/70",
              )}
            >
              <span className="flex flex-col items-center gap-1">
                <Image src={POLE_ICONS[pole.code]} alt="" width={28} height={28} className="h-6 w-6 object-contain" />
                <span className="font-mono-label text-[10px] font-bold tracking-[0.06em]">{pole.code}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop/tablet — the FinishSelector-style card grid, unchanged. */}
      <div className="hidden sm:grid sm:grid-cols-4 sm:gap-2" role="radiogroup" aria-label="Pole">
        <button
          type="button"
          role="radio"
          aria-checked={active === "ALL"}
          onClick={() => onSelect("ALL")}
          className={clsx(
            "group relative flex flex-col items-center gap-2 rounded-[12px] border p-2.5 text-center transition-colors duration-300",
            active === "ALL" ? "border-signal-red bg-signal-red text-paper-bright" : "border-charcoal/14 bg-paper-bright hover:border-charcoal/40",
          )}
        >
          {active === "ALL" && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-paper-bright text-signal-red">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
          )}
          <span
            className={clsx(
              "flex h-11 w-11 flex-none items-center justify-center rounded-[8px] border font-mono-label text-[13px] font-bold",
              active === "ALL" ? "border-paper-bright/50 bg-paper-bright/10" : "border-charcoal/14",
            )}
          >
            All
          </span>
          <span className="text-[12px] font-bold tracking-[-0.005em]">All Poles</span>
        </button>
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
                "group relative flex flex-col items-center gap-2 rounded-[12px] border p-2.5 text-center transition-colors duration-300",
                isActive ? "border-signal-red bg-signal-red text-paper-bright" : "border-charcoal/14 bg-paper-bright hover:border-charcoal/40",
              )}
            >
              {isActive && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-paper-bright text-signal-red">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
              )}
              <span className={clsx("flex h-11 w-11 flex-none items-center justify-center rounded-[8px] border", isActive ? "border-paper-bright/50 bg-paper-bright/10" : "border-charcoal/14")}>
                <Image src={POLE_ICONS[pole.code]} alt="" width={32} height={32} className={clsx("h-7 w-7 object-contain", isActive && "brightness-0 invert")} />
              </span>
              <span className="text-[12px] font-bold tracking-[-0.005em]">{pole.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
