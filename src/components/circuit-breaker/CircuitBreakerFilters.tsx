"use client";

export type FilterGroup = { key: string; label: string; options: string[] };

export default function CircuitBreakerFilters({
  groups,
  selected,
  onToggle,
  onClear,
}: {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onToggle: (groupKey: string, value: string) => void;
  onClear: () => void;
}) {
  const activeCount = Object.values(selected).reduce((n, values) => n + values.length, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-mono-label text-[10px] tracking-[0.18em] opacity-45">FILTER BY</span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="bg-transparent font-mono-label text-[10px] font-bold tracking-[0.16em] text-signal-red uppercase"
          >
            Clear All
          </button>
        )}
      </div>
      {groups.map(
        (group) =>
          group.options.length > 0 && (
            <div key={group.key} className="border-t border-charcoal/10 pt-4">
              <div className="mb-3 font-mono-label text-[9.5px] tracking-[0.16em] uppercase opacity-60">
                {group.label}
              </div>
              <div className="flex flex-col gap-2">
                {group.options.map((option) => {
                  const checked = selected[group.key]?.includes(option) ?? false;
                  return (
                    <label key={option} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle(group.key, option)}
                        className="h-4 w-4 accent-charcoal"
                      />
                      <span className={checked ? "font-semibold" : "opacity-75"}>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ),
      )}
    </div>
  );
}
