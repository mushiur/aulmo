"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 500;

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
      <div className="aulmo-product-loader text-charcoal" aria-label="Loading" role="status" />
    </div>
  );
}
