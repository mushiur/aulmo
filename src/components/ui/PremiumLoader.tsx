"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PremiumLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome" | "closing" | "done">("loading");
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setPhase("done"));
      return;
    }

    document.body.style.overflow = "hidden";

    let ready = false;
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      }),
    ]).then(() => {
      ready = true;
    });
    const readyTimeout = setTimeout(() => {
      ready = true;
    }, 4500);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      const mark = markRef.current;
      if (mark) mark.style.transform = `translate3d(${(dx * 18).toFixed(1)}px, ${(dy * 12).toFixed(1)}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const start = performance.now();
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener("mousemove", onMove);
      document.body.style.overflow = "";
      setPhase("welcome");
      setTimeout(() => setPhase("closing"), 300);
      setTimeout(() => setPhase("done"), 1600);
    };

    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / 2200);
      let p = Math.floor((1 - Math.pow(1 - t, 2.2)) * 100);
      if (!ready) p = Math.min(p, 90);
      setProgress(p);
      if (p >= 100) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(readyTimeout);
      window.removeEventListener("mousemove", onMove);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9995] flex flex-col items-center justify-center gap-8 bg-ink transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(.76,0,.24,1)]"
      style={{
        clipPath: phase === "closing" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}
    >
      <div
        ref={markRef}
        className="flex flex-col items-center gap-4 transition-[opacity,transform] duration-500"
        style={{
          opacity: phase === "closing" ? 0 : 1,
          transitionDuration: phase === "closing" ? "400ms, 800ms" : "0ms",
          transform: phase === "closing" ? "translate3d(0,-18px,0)" : undefined,
        }}
      >
        <Image
          src="/brand/aulmo-logo.png"
          alt="AULMO"
          width={205}
          height={41}
          className="h-[30px] w-auto invert hue-rotate-180"
          priority
        />
        <div className="font-mono-label text-[9px] tracking-[0.46em] opacity-40 pl-[0.46em]">
          A CENTURY OF SPECIALIZED SWITCHES
        </div>
      </div>
      <div className="relative h-[2px] w-[min(320px,58vw)] bg-paper/10">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-signal-red to-signal-yellow"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-4 font-mono-label text-[9.5px] tracking-[0.26em] opacity-40">
        <span>{String(progress).padStart(2, "0")}</span>
        <span>{phase === "loading" ? "ENTERING THE SHOWROOM" : "WELCOME"}</span>
      </div>
    </div>
  );
}
