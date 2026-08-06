import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import LayeredImage from "@/components/ui/LayeredImage";
import { CompassIcon, DocumentIcon, FacebookIcon, PhoneIcon, PinIcon, StoreIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit the AULMO showroom, call the technical office, or find us on Facebook.",
};

const PHONE_DISPLAY = "01720-310552";
const PHONE_TEL = "tel:+8801720310552";
const FACEBOOK_URL = "https://www.facebook.com/aulmoepbd2020/";
const MAPS_QUERY = "Aulmo Electric Company, Nawabpur Road, Dhaka 1100, Bangladesh";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export default function ContactPage() {
  return (
    <main className="relative bg-paper-bright text-charcoal">
      {/* Hero — the product photo bleeds into the ink background via a soft
          radial mask; no visible image rectangle. */}
      <section
        data-theme="dark"
        className="relative isolate overflow-hidden bg-ink px-6 pt-[16vh] pb-[23vh] text-paper md:px-[6vw] md:pt-[19vh] md:pb-[27vh]"
      >
        <LayeredImage
          src="/marketing/contact-page-banner.jpg"
          alt="AULMO two-gang switch, black finish, illuminated rocker indicators"
          focal="56% 58%"
          spread="72% 70%"
          sizes="(min-width: 768px) 46vw, 84vw"
          className="absolute inset-x-0 bottom-0 mx-auto aspect-[1700/2170] w-[80%] max-w-[420px] md:inset-x-auto md:right-[3%] md:bottom-auto md:top-1/2 md:mx-0 md:h-[86%] md:w-auto md:max-w-none md:-translate-y-1/2"
          parallax
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent md:via-ink/30" />

        <div className="relative z-10 max-w-[46rem]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <SectionEyebrow label="CONTACT AULMO" className="mt-7 opacity-60" />
          <h1 className="m-0 mt-6 text-[clamp(40px,7vw,92px)] leading-[0.92] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
            Visit. Call.
            <br />
            <span className="text-signal-yellow">Connect.</span>
          </h1>
          <Reveal as="p" className="m-0 mt-6 max-w-[38ch] text-pretty text-[15px] leading-[1.7] opacity-70">
            Product enquiries, technical guidance and showroom visits — reach the AULMO shop
            directly.
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticLink
              href={PHONE_TEL}
              arrow
              className="flex items-center gap-2.5 rounded-full bg-signal-red px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-signal-yellow hover:text-ink"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </MagneticLink>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-paper/25 bg-paper/5 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase backdrop-blur-xl transition-colors duration-300 hover:border-paper/60"
            >
              <CompassIcon className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Floating action cluster — overlaps the hero/page seam instead of
          sitting in its own bordered strip. */}
      <section data-theme="light" className="relative z-20 -mt-[9vh] px-6 md:-mt-[11vh] md:px-[6vw]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          <ChipCard
            icon={<PhoneIcon className="h-[18px] w-[18px]" />}
            label="CALL US"
            value={PHONE_DISPLAY}
            sub="Baiged Ahmed Pranto — Owner"
            href={PHONE_TEL}
            lift
          />
          <ChipCard
            icon={<PinIcon className="h-[18px] w-[18px]" />}
            label="VISIT US"
            value="Khaza Electric Market"
            sub="153 Nawabpur Rd, Dhaka"
            href={MAPS_LINK}
            external
          />
          <ChipCard
            icon={<FacebookIcon className="h-[17px] w-[17px]" />}
            label="FOLLOW US"
            value="facebook.com/aulmoepbd2020"
            sub="Updates & new products"
            href={FACEBOOK_URL}
            external
            lift
          />
          <ChipCard
            icon={<DocumentIcon className="h-[18px] w-[18px]" />}
            label="DOCUMENTS"
            value="Certificates & Datasheets"
            sub="On request"
            href="/certificate"
          />
        </div>
      </section>

      {/* Showroom — the wood-panel photo is the section's background
          texture, not a photo card; the map floats above it as a rounded,
          shadowed sheet. */}
      <section
        id="showroom"
        data-theme="dark"
        className="relative isolate mt-[16vh] overflow-hidden bg-ink px-6 py-[13vh] text-paper md:mt-[19vh] md:px-[6vw] md:py-[16vh]"
      >
        <LayeredImage
          src="/products/m-series/m30/black/hero.jpg"
          alt="AULMO M30 Series switch, black finish"
          focal="48% 42%"
          sizes="(min-width: 768px) 50vw, 78vw"
          className="absolute inset-y-0 right-0 w-[78%] max-w-[760px] sm:w-[62%] md:w-[50%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />

        <div className="relative z-10 grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-16">
          <div>
            <SectionEyebrow label="VISIT OUR SHOWROOM" className="mb-6 opacity-70" />
            <h2 className="m-0 text-[clamp(28px,3.8vw,50px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              Experience AULMO up close.
            </h2>
            <p className="mt-4 max-w-[38ch] text-pretty text-[14.5px] leading-[1.66] opacity-70">
              See the finish and build quality of every series in person. Our showroom at Khaza
              Electric Market is open to architects, designers, dealers and customers.
            </p>
            <ul className="mt-7 flex flex-col gap-4 text-[14px]">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-paper/20">
                  <StoreIcon className="h-4 w-4" />
                </span>
                <span>
                  <span className="font-semibold">Product display</span>
                  <span className="opacity-55"> — every series and finish, on the wall.</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-paper/20">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="font-semibold">Technical guidance</span>
                  <span className="opacity-55"> — specification and gang-schedule advice.</span>
                </span>
              </li>
            </ul>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 border-b border-signal-yellow/50 pb-1.5 font-mono-label text-[10px] tracking-[0.18em] text-signal-yellow"
            >
              <CompassIcon className="h-3.5 w-3.5" />
              OPEN IN GOOGLE MAPS
            </a>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[26px] border border-paper/14 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.65)]">
              <iframe
                src={MAPS_EMBED_SRC}
                title="AULMO showroom location — Khaza Electric Market, Nawabpur Road, Dhaka"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[400px] w-full border-0 md:h-[460px]"
              />
            </div>
            <div className="absolute -bottom-7 -left-4 hidden max-w-[240px] items-start gap-3 rounded-2xl border border-paper/14 bg-ink-raised/85 p-4 shadow-xl backdrop-blur-xl sm:flex">
              <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-paper/10">
                <PinIcon className="h-4 w-4" />
              </span>
              <span className="text-[12.5px] leading-snug opacity-80">
                Khaza Electric Market
                <br />
                153 Nawabpur Rd, Dhaka 1100
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section data-theme="light" className="relative px-6 py-[13vh] md:px-[6vw]">
        <div className="flex flex-col gap-8 border-t border-charcoal/12 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow label="HAVE A PROJECT?" className="mb-6" />
            <h2 className="m-0 max-w-[20ch] text-[clamp(26px,3.4vw,46px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
              Let&rsquo;s build something great together.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticLink
              href={PHONE_TEL}
              arrow
              className="flex items-center gap-2.5 bg-charcoal px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-300 hover:bg-signal-red"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </MagneticLink>
            <Link
              href="/certificate"
              className="flex items-center gap-2.5 border border-charcoal/24 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:border-charcoal/65"
            >
              <DocumentIcon className="h-4 w-4" />
              Certificate & Documents
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChipCard({
  icon,
  label,
  value,
  sub,
  href,
  external = false,
  lift = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  href: string;
  external?: boolean;
  lift?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={clsx(
        "group flex min-w-0 flex-col gap-3 rounded-[22px] border border-charcoal/10 bg-paper-bright/85 p-5 shadow-[0_24px_48px_-28px_rgba(20,20,18,0.35)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5",
        lift && "md:-translate-y-4",
      )}
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-charcoal text-paper-bright transition-colors duration-300 group-hover:bg-signal-red">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-mono-label text-[8.5px] tracking-[0.2em] opacity-45">{label}</div>
        <div className="mt-1.5 text-[14px] font-semibold break-words leading-snug">{value}</div>
        {sub && <div className="mt-1 text-[12px] break-words opacity-55">{sub}</div>}
      </div>
    </a>
  );
}
