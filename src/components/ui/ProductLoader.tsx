"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MIN_VISIBLE_MS = 600;
const BAR_COUNT = 5;

export default function ProductLoader() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setVisible(false));
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();

    const hide = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      setTimeout(() => {
        setClosing(true);
        setTimeout(() => setVisible(false), 300);
      }, wait);
    };

    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      }),
    ]).then(hide);

    const timeout = setTimeout(hide, 4000);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-center justify-center bg-paper-bright transition-opacity duration-300"
      style={{ opacity: closing ? 0 : 1 }}
    >
      {/* An original "power meter" loop — bars charge up in sequence, hold,
          then fade, like a game HUD energy bar. Pure opacity/scale tweens,
          so it's smooth by construction (no sprite frames). */}
      <div className="flex flex-col items-center gap-5" aria-label="Loading" role="status">
        <div className="flex items-end gap-1.5">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              className="relative w-3 overflow-hidden rounded-[2px] bg-charcoal/10"
              style={{ height: 12 + i * 6 }}
            >
              <motion.div
                className="absolute inset-0 rounded-[2px]"
                style={{
                  transformOrigin: "bottom",
                  background: i === BAR_COUNT - 1 ? "var(--color-signal-yellow)" : "var(--color-signal-red)",
                }}
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: [0, 1, 1, 0], scaleY: [0.5, 1, 1, 0.5] }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.2, 0.75, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.14,
                }}
              />
            </div>
          ))}
        </div>
        <span className="font-mono-label text-[10px] font-bold tracking-[0.24em] text-charcoal/55">
          POWERING UP
        </span>
      </div>
    </div>
  );
}
