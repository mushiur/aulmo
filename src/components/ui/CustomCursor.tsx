"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let big = false;
    let shown = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
      }
      const target = e.target as HTMLElement | null;
      big = !!target?.closest?.(
        "a, button, [data-card], [data-magnetic], [data-series-panel]",
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      cx += (x - cx) * 0.17;
      cy += (y - cy) * 0.17;
      dot.style.transform = `translate3d(${(cx - 30).toFixed(1)}px, ${(cy - 30).toFixed(1)}px, 0) scale(${big ? 1 : 0.24})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9990] h-[60px] w-[60px] rounded-full border border-paper/55 opacity-0 mix-blend-difference will-change-transform"
      style={{ transition: "opacity .35s ease, transform .16s cubic-bezier(.2,.7,.2,1)" }}
      aria-hidden="true"
    />
  );
}
