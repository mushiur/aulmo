"use client";

import { useEffect, useRef } from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import { RevealLines, Reveal } from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import type { StatItem } from "@/data/types";

export default function Hero({ stats }: { stats: StatItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let ticking = false;
    const apply = () => {
      ticking = false;
      const p = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      video.style.transform = `translate3d(0, ${(p * 90).toFixed(1)}px, 0) scale(${(1 + p * 0.08).toFixed(4)})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      data-theme="dark"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/products/l-series/l60/gray/hero.jpg"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      >
        <source src="/video/hero-switches.mp4" type="video/mp4" />
      </video>

      {/* Vertical scrim: keeps the nav and stat row readable regardless of video content */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/25 to-ink/85" />
      {/* Horizontal scrim: darkens the left reading column */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />

      <div className="relative z-[2] flex flex-1 flex-col justify-between gap-10 px-6 pt-[19vh] pb-10 md:px-[4.5vw] md:pt-[17vh] md:pb-[5vh]">
        <div>
          <div className="mb-7 flex items-center gap-3.5">
            <span className="h-[2px] w-[34px] bg-signal-red" />
            <span className="font-mono-label text-[11.5px] tracking-[0.26em] opacity-55">
              AULMO ELECTRIC INTERNATIONAL <br></br><span className="text-signal-yellow"><b>SPECIALIZED IN SWITCHES</b></span>
            </span>
          </div>
          <h1 className="m-0 text-[clamp(38px,min(6.6vw,8.4vh),108px)] leading-[0.95] font-extrabold tracking-[-0.035em] uppercase [font-stretch:116%]">
            <RevealLines
              lines={[
                { text: "One hundred" },
                { text: "years of" },
                { text: "one object.", className: "text-signal-yellow" },
              ]}
            />
          </h1>
          <Reveal delay={200} as="p" className="mt-7 max-w-[42ch] text-pretty text-[15px] leading-[1.66] opacity-70">
            Switches, sockets and control panels built to a single 86&nbsp;mm module — glass,
            wood, antique bronze and high-gloss finishes for contemporary architecture.
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink
              href="#series"
              arrow
              className="bg-signal-red px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-paper-bright uppercase transition-colors duration-300 hover:bg-signal-yellow hover:text-ink"
            >
              Explore the collection
            </MagneticLink>
            <MagneticLink
              href="#engineering"
              className="border border-paper/26 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:border-paper/70 hover:bg-paper/6"
            >
              Inside the switch
            </MagneticLink>
          </div>
        </div>

        <div className="grid max-w-[720px] grid-cols-2 gap-x-6 gap-y-6 border-t border-paper/14 pt-5 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={i > 0 ? "sm:border-l sm:border-paper/14 sm:pl-4" : ""}
            >
              <div className="text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.02em] [font-stretch:112%]">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 font-mono-label text-[8.5px] leading-[1.5] tracking-[0.16em] whitespace-pre-line opacity-45">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-[16vh] left-[-26px] hidden origin-center -rotate-90 font-mono-label text-[9px] tracking-[0.34em] whitespace-nowrap opacity-40 md:block"
      >
        SCROLL
      </div>
    </section>
  );
}
