import clsx from "clsx";

/**
 * Honest empty state for a product/series that has no photography yet.
 * Never a broken-image icon or an illustrated placeholder — just a clean
 * tile with a mono label, consistent with the rest of the UI.
 */
export default function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center bg-ink-raised text-paper",
        className,
      )}
    >
      <span className="font-mono-label text-[9px] tracking-[0.2em] opacity-40">
        PHOTOGRAPHY ON REQUEST
      </span>
    </div>
  );
}
