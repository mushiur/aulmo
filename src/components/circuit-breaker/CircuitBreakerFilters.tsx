"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@/components/ui/Icon";

export type FilterGroup = { key: string; label: string; options: string[] };

export default function CircuitBreakerFilters({
  groups,
  selected,
  onToggle,
  onClear,
  onApply,
  variant = "desktop",
}: {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onToggle: (groupKey: string, value: string) => void;
  onClear: () => void;
  onApply?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="font-mono-label text-[10px] tracking-[0.18em] opacity-45">FILTER BY</span>
          <button type="button" onClick={onClear} className="bg-transparent font-mono-label text-[10px] font-bold tracking-[0.16em] text-signal-red uppercase">
            Clear All
          </button>
        </div>
        {groups.map((group) => group.options.length > 0 && (
          <div key={group.key} className="border-t border-charcoal/10 pt-4">
            <div className="mb-3 font-mono-label text-[9.5px] tracking-[0.16em] uppercase opacity-60">{group.label}</div>
            <div className="flex flex-col gap-2">
              {group.options.map((option) => {
                const checked = selected[group.key]?.includes(option) ?? false;
                return (
                  <label key={option} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
                    <input type="checkbox" checked={checked} onChange={() => onToggle(group.key, option)} className="h-4 w-4 accent-charcoal" />
                    <span className={checked ? "font-semibold" : "opacity-75"}>{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-charcoal/12 bg-paper-bright">
      <div className="flex items-center justify-between border-b border-charcoal/10 px-4 py-3.5">
        <span className="font-mono-label text-[9px] font-bold tracking-[0.16em] uppercase">Filter By</span>
        <button type="button" onClick={onClear} className="bg-transparent font-mono-label text-[8px] font-bold tracking-[0.12em] text-signal-red uppercase">
          Clear All ↻
        </button>
      </div>

      {groups.map((group) => {
        if (group.options.length === 0) return null;
        const isOpen = openGroup === group.key;
        const selectedCount = selected[group.key]?.length ?? 0;
        return (
          <div key={group.key} className="border-b border-charcoal/10 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenGroup(isOpen ? null : group.key)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 bg-transparent px-4 py-3 text-left font-mono-label text-[9px] font-bold tracking-[0.08em] uppercase"
            >
              <span>{group.label}</span>
              <span className="flex items-center gap-2">
                {selectedCount > 0 && <span className="rounded-full bg-signal-red px-1.5 py-0.5 text-[7px] text-paper-bright">{selectedCount}</span>}
                <ChevronDownIcon className={clsx("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-charcoal/8 bg-charcoal/[0.02] px-4 py-3">
                <div className="flex flex-col gap-2.5">
                  {group.options.map((option) => {
                    const checked = selected[group.key]?.includes(option) ?? false;
                    return (
                      <label key={option} className="flex cursor-pointer items-center gap-2.5 text-[12px]">
                        <input type="checkbox" checked={checked} onChange={() => onToggle(group.key, option)} className="h-3.5 w-3.5 accent-signal-red" />
                        <span className={checked ? "font-semibold" : "opacity-70"}>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="p-3">
        <button type="button" onClick={onApply} className="w-full rounded-[6px] bg-charcoal py-3 font-mono-label text-[9px] font-bold tracking-[0.14em] text-paper-bright uppercase transition-colors hover:bg-signal-red">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
