import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import { CompassIcon, GlobeIcon, LayersIcon, ShieldIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 1996 as Zhejiang Aulmo Industrial Co., Ltd. — AULMO builds switches, sockets and control panels exported across the Middle East, Australia, Europe, Africa and South America.",
};

const STATS: {
  icon: typeof GlobeIcon | null;
  badge?: string;
  value?: string;
  label: string;
  detail: string;
}[] = [
  {
    icon: null,
    badge: "/about-aulmo/century-badge.png",
    label: "LEGACY OF TRUST",
    detail: "A century of specialized switch craftsmanship",
  },
  {
    icon: GlobeIcon,
    value: "5",
    label: "REGIONS EXPORTED",
    detail: "Middle East, Australia, Europe, Africa, South America",
  },
  {
    icon: ShieldIcon,
    value: "1996",
    label: "ESTABLISHED",
    detail: "Founded in Wenzhou, Zhejiang, China",
  },
  {
    icon: LayersIcon,
    value: "5",
    label: "SERIES, ONE MODULE",
    detail: "L, D, M, K and S share the same 86mm aperture",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      {/* Hero */}
      <section data-theme="dark" className="relative grid grid-cols-1 overflow-hidden bg-ink text-paper md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-[16vh] md:px-[4.5vw] md:py-[18vh]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <div className="mt-6 flex items-center gap-3.5">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-50">ABOUT AULMO</span>
            <span className="h-px w-[60px] bg-current/20" />
          </div>
          <h1 className="m-0 mt-6 text-[clamp(34px,5.4vw,72px)] leading-[1.02] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            Built on <span className="text-signal-yellow">experience.</span>
            <br />
            Driven by <span className="text-signal-yellow">innovation.</span>
          </h1>
          <Reveal as="p" className="m-0 mt-6 max-w-[46ch] text-pretty text-[15px] leading-[1.7] opacity-70">
            Since 1996, AULMO has been dedicated to the research, development, design and
            manufacturing of switches, sockets and control panels — built to a single 86&nbsp;mm
            module and exported across five regions.
          </Reveal>
          <div className="mt-9">
            <MagneticLink
              href="/products"
              arrow
              className="rounded-full border border-paper/26 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:border-paper/70 hover:bg-paper/6"
            >
              Explore our products
            </MagneticLink>
          </div>
        </div>
        <div className="relative min-h-[42vh] overflow-hidden md:min-h-0" aria-hidden="true">
          {/* Atmospheric only — not a claim that AULMO operates a facility
              here. See DESIGN.md for why this specific photo was used. */}
          <Image
            src="/about-aulmo/design-heritage.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectPosition: "50% 25%" }}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink/40 md:bg-gradient-to-r" />
        </div>
      </section>

      {/* Stat bar */}
      <section data-theme="dark" className="relative border-t border-paper/10 bg-ink-raised px-6 py-[7vh] text-paper md:px-[4.5vw]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={i > 0 ? "md:border-l md:border-paper/12 md:pl-6" : ""}
            >
              {stat.icon ? (
                <stat.icon className="h-7 w-7 text-signal-yellow" />
              ) : (
                <Image src={stat.badge!} alt="" width={56} height={49} className="h-12 w-auto" />
              )}
              {stat.value && (
                <div className="mt-3 text-[clamp(22px,2.4vw,32px)] font-extrabold tracking-[-0.02em]">
                  {stat.value}
                </div>
              )}
              <div className="mt-1.5 font-mono-label text-[9px] tracking-[0.16em] text-signal-yellow">
                {stat.label}
              </div>
              <p className="m-0 mt-1.5 max-w-[24ch] text-pretty text-[12.5px] leading-[1.5] opacity-55">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our story */}
      <section data-theme="light" className="relative bg-paper-bright px-6 py-[10vh] text-charcoal md:px-[4.5vw] md:py-[12vh]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[5vw] md:items-center">
          <div>
            <SectionEyebrow label="OUR STORY" className="mb-6" />
            <h2 className="m-0 max-w-[14ch] text-[clamp(28px,3.8vw,50px)] leading-[1.04] font-extrabold tracking-[-0.035em] uppercase [font-stretch:114%]">
              From a vision to a global brand.
            </h2>
            <Reveal as="p" className="m-0 mt-6 max-w-[48ch] text-pretty text-[14.5px] leading-[1.68] opacity-75">
              Zhejiang Aulmo Industrial Co., Ltd. was established in 1996, focused on the
              research, development, design, manufacturing and sale of switches, sockets and
              related electrical products.
            </Reveal>
            <Reveal delay={80} as="p" className="m-0 mt-4 max-w-[48ch] text-pretty text-[14.5px] leading-[1.68] opacity-75">
              With modern production facilities, advanced technology and a team of skilled
              professionals, the company develops products to meet the real needs of different
              users — rather than a single fixed catalogue.
            </Reveal>
            <Reveal delay={160} as="p" className="m-0 mt-4 max-w-[48ch] text-pretty text-[14.5px] leading-[1.68] opacity-75">
              That commitment to quality, innovation and service has earned recognition from
              partners, industry organizations and government departments across the markets
              AULMO ships to.
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-[16px] bg-bone-deep">
              <Image
                src="/products/l-series/lg30/matte-gold/detail.jpg"
                alt="AULMO LG30 matte gold family, full range"
                fill
                sizes="(min-width: 768px) 24vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[16px] bg-bone-deep">
              <Image
                src="/products/d-series/dz/black/hero.jpg"
                alt="AULMO DZ Series switch, black finish"
                fill
                sizes="(min-width: 768px) 24vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[#F2C300]">
              <Image
                src="/about-aulmo/global-brand.jpg"
                alt="AULMO in the global world — exported to the Middle East, Australia, Europe, Africa and South America"
                fill
                sizes="(min-width: 768px) 24vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[16px] bg-bone-deep p-8">
              <Image
                src="/about-aulmo/wordmark.png"
                alt="AULMO"
                width={1149}
                height={289}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section data-theme="dark" className="relative overflow-hidden bg-ink text-paper">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-[9vh] md:px-[4.5vw] md:py-[11vh]">
            <SectionEyebrow label="OUR COMMITMENT" className="mb-6 opacity-70" />
            <h2 className="m-0 max-w-[14ch] text-[clamp(26px,3.4vw,44px)] leading-[1.04] font-extrabold tracking-[-0.03em] uppercase [font-stretch:114%]">
              Quality in every detail.
            </h2>
            <Reveal as="p" className="m-0 mt-5 max-w-[42ch] text-pretty text-[14.5px] leading-[1.66] opacity-65">
              International standards and strict quality control at every stage of production,
              verified by independent testing bodies — not a claim we make ourselves.
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["ISO", "OHSAS", "CE"].map((mark) => (
                <span
                  key={mark}
                  className="rounded-full border border-paper/22 px-5 py-2.5 font-mono-label text-[10px] font-bold tracking-[0.16em]"
                >
                  {mark}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/certificate"
                className="inline-flex items-center gap-2.5 border-b border-signal-yellow/50 pb-1.5 font-mono-label text-[10px] tracking-[0.18em] text-signal-yellow"
              >
                <CompassIcon className="h-3.5 w-3.5" />
                VIEW CERTIFICATION DOCUMENTS →
              </Link>
            </div>
          </div>
          <div className="relative flex min-h-[42vh] items-center justify-center overflow-hidden bg-ink-raised p-12 md:min-h-0">
            <Image
              src="/about-aulmo/century-badge.png"
              alt="AULMO Electric International — 100 Year"
              width={314}
              height={275}
              className="w-full max-w-[220px]"
            />
          </div>
        </div>
      </section>

      {/* Looking ahead */}
      <section data-theme="light" className="relative border-t border-charcoal/12 bg-paper-bright px-6 py-[8vh] md:px-[4.5vw]">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-[52ch]">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] text-signal-red">LOOKING AHEAD</span>
            <p className="m-0 mt-3 text-pretty text-[14.5px] leading-[1.66] opacity-70">
              AULMO will continue to invest in innovative technology and design, delivering
              products and service that meet the real needs of users — from the first-time
              buyer to the specifier with exacting requirements.
            </p>
          </div>
          <Image
            src="/about-aulmo/wordmark.png"
            alt="AULMO"
            width={1149}
            height={289}
            className="ml-auto h-10 w-auto opacity-70 md:h-14"
          />
        </div>
      </section>
    </main>
  );
}
