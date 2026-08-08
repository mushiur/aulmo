import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import { CompassIcon, LayersIcon, ShieldIcon, StoreIcon } from "@/components/ui/Icon";
import { SITE_URL } from "@/lib/seo";
import StagesGallery from "./StagesGallery";

export const metadata: Metadata = {
  title: "Workshop",
  description:
    "Inside the AULMO workshop — injection molding, hand assembly, precision tooling and testing behind every switch and socket.",
  alternates: { canonical: `${SITE_URL}/about-us/workshop` },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about-us` },
    { "@type": "ListItem", position: 3, name: "Workshop", item: `${SITE_URL}/about-us/workshop` },
  ],
};

const STAGES = [
  {
    src: "/workshop/assembly-line.jpg",
    alt: "AULMO assembly line — switch components hand-assembled and inspected",
    label: "Assembly",
    detail: "Components hand-assembled and checked at every station.",
  },
  {
    src: "/workshop/injection-molding-line.jpg",
    alt: "AULMO injection molding production line",
    label: "Injection Molding",
    detail: "Precision molding lines forming every panel and housing.",
  },
  {
    src: "/workshop/mold-storage.jpg",
    alt: "AULMO precision mold and tooling storage",
    label: "Tooling & Molds",
    detail: "Every mold maintained and catalogued for consistent output.",
  },
  {
    src: "/workshop/warehouse.jpg",
    alt: "AULMO parts warehouse and inventory storage",
    label: "Warehouse",
    detail: "Organized inventory, ready for dispatch worldwide.",
  },
];

export default function WorkshopPage() {
  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      {/* Hero */}
      <section
        data-theme="dark"
        className="relative flex min-h-[52vh] items-end overflow-hidden bg-ink text-paper sm:min-h-[58vh] md:min-h-[74vh]"
      >
        <Image
          src="/workshop/workshop-banner.jpg"
          alt="Inside the AULMO workshop — testing and quality control"
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 40%" }}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/10" />
        <div className="relative w-full px-6 pt-[10vh] pb-[6vh] md:px-[4.5vw] md:pt-[18vh] md:pb-[10vh]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about-us" },
              { label: "Workshop" },
            ]}
          />
          <div className="mt-6 flex items-center gap-3.5">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-60">
              INSIDE AULMO
            </span>
            <span className="h-px w-[60px] bg-current/20" />
          </div>
          <Reveal
            as="h1"
            className="m-0 mt-6 text-[clamp(36px,6.4vw,88px)] leading-[0.94] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]"
          >
            The workshop.
          </Reveal>
          <Reveal
            delay={100}
            as="p"
            className="m-0 mt-6 max-w-[52ch] text-pretty text-[15px] leading-[1.68] opacity-75"
          >
            Since 1996, every AULMO switch and socket has been designed, molded, assembled and
            tested under one roof — from raw tooling to the finished module.
          </Reveal>
        </div>
      </section>

      {/* Manufacturing floor */}
      <section
        data-theme="light"
        className="relative bg-paper-bright px-6 py-[10vh] text-charcoal md:px-[4.5vw] md:py-[12vh]"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-[5vw]">
          <div>
            <SectionEyebrow label="THE MANUFACTURING FLOOR" className="mb-6" />
            <h2 className="m-0 max-w-[16ch] text-[clamp(28px,3.8vw,50px)] leading-[1.04] font-extrabold tracking-[-0.035em] uppercase [font-stretch:114%]">
              Built where it&rsquo;s made.
            </h2>
            <Reveal
              as="p"
              className="m-0 mt-6 max-w-[48ch] text-pretty text-[14.5px] leading-[1.68] opacity-75"
            >
              Our injection molding lines run in parallel, each module shaped to the same 86&nbsp;mm
              standard that every AULMO series shares — L, D, M, K and S alike.
            </Reveal>
            <Reveal
              delay={80}
              as="p"
              className="m-0 mt-4 max-w-[48ch] text-pretty text-[14.5px] leading-[1.68] opacity-75"
            >
              Skilled operators oversee every machine on the floor, checking tolerances and finish
              as parts come off the line — not just at final inspection.
            </Reveal>
          </div>
          <Reveal delay={60} y={30} className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-bone-deep">
            <Image
              src="/workshop/factory-floor.jpg"
              alt="AULMO injection molding production floor"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Every stage grid */}
      <section
        data-theme="dark"
        className="relative bg-ink px-6 py-[10vh] text-paper md:px-[4.5vw] md:py-[12vh]"
      >
        <SectionEyebrow label="EVERY STAGE, EVERY DETAIL" className="mb-6 opacity-70" />
        <h2 className="m-0 max-w-[18ch] text-[clamp(26px,3.4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.03em] uppercase [font-stretch:114%]">
          From tooling to dispatch.
        </h2>
        <StagesGallery stages={STAGES} />
      </section>

      {/* Standards tie-in */}
      <section
        data-theme="light"
        className="relative border-t border-charcoal/12 bg-paper-bright px-6 py-[9vh] md:px-[4.5vw] md:py-[11vh]"
      >
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-[48ch]">
            <SectionEyebrow label="VERIFIED, NOT JUST STATED" className="mb-5" />
            <h2 className="m-0 text-[clamp(24px,3vw,38px)] leading-[1.05] font-extrabold tracking-[-0.03em] uppercase [font-stretch:114%]">
              Quality checked at every stage.
            </h2>
            <p className="m-0 mt-4 max-w-[48ch] text-pretty text-[14px] leading-[1.66] opacity-65">
              What happens on this floor is verified by independent testing bodies — Intertek,
              IECEE and Gulf/Saudi conformity programmes — not a claim we make on our own.
            </p>
            <div className="mt-7">
              <MagneticLink
                href="/certificate"
                arrow
                className="inline-flex items-center gap-2.5 bg-charcoal px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-300 hover:bg-signal-red"
              >
                <ShieldIcon className="h-4 w-4" />
                View certification documents
              </MagneticLink>
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-charcoal/20">
                <LayersIcon className="h-4 w-4" />
              </span>
              <span className="font-mono-label text-[10px] font-bold tracking-[0.16em]">
                ONE 86MM MODULE
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-charcoal/20">
                <StoreIcon className="h-4 w-4" />
              </span>
              <span className="font-mono-label text-[10px] font-bold tracking-[0.16em]">
                EXPORTED TO 5 REGIONS
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-charcoal/20">
                <CompassIcon className="h-4 w-4" />
              </span>
              <span className="font-mono-label text-[10px] font-bold tracking-[0.16em]">
                FOUNDED IN 1996
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section data-theme="dark" className="relative bg-ink px-6 py-[9vh] text-paper md:px-[4.5vw] md:py-[11vh]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[46ch]">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-50">
              SEE THE FULL STORY
            </span>
            <h2 className="m-0 mt-4 text-[clamp(24px,3.2vw,42px)] leading-[1.05] font-extrabold tracking-[-0.03em] uppercase [font-stretch:114%]">
              From workshop to worldwide.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticLink
              href="/about-us"
              arrow
              className="inline-flex items-center gap-2.5 border border-paper/26 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:border-paper/70 hover:bg-paper/6"
            >
              About Aulmo
            </MagneticLink>
            <MagneticLink
              href="/products"
              arrow
              className="inline-flex items-center gap-2.5 bg-paper px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:bg-signal-yellow"
            >
              Explore products
            </MagneticLink>
          </div>
        </div>
      </section>

      {/* Wordmark band */}
      <section data-theme="light" className="relative bg-paper-bright px-6 py-[8vh] md:px-[4.5vw] md:py-[10vh]">
        <Reveal className="flex justify-center">
          <Image
            src="/workshop/aulmo-wordmark-white.png"
            alt="AULMO"
            width={1149}
            height={289}
            className="h-auto w-full max-w-[560px]"
          />
        </Reveal>
      </section>
    </main>
  );
}
