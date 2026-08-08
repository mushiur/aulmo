"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import MagneticLink from "@/components/ui/MagneticLink";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  FactoryIcon,
  GridIcon,
  HomeIcon,
  PinIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/ui/Icon";
import type { ProductSeries } from "@/data/types";
import { getCoverImage } from "@/lib/products";

// useLayoutEffect runs before paint, avoiding a flash of the wrong nav theme
// on load; it's a no-op (and warns) during SSR, so fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type FeaturedEntry = { series: ProductSeries; subSeries: ProductSeries["subSeries"][number] };

type NavbarProps = {
  series: ProductSeries[];
  featured: FeaturedEntry[];
};

const ABOUT_LINKS = [
  { href: "/about-us", label: "About Aulmo", detail: "Our story, since 1996", icon: DocumentIcon },
  {
    href: "/about-us/workshop",
    label: "Workshop",
    detail: "Inside the manufacturing floor",
    icon: FactoryIcon,
  },
];

export default function Navbar({ series, featured }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();

  const closeMenus = () => {
    setMegaOpen(false);
    setAboutOpen(false);
  };

  // Navbar lives in the root layout and never remounts across client-side
  // navigations, so `[data-theme]` zones must be re-queried on every check —
  // and re-run whenever `pathname` changes — otherwise this keeps checking
  // detached elements from whichever page was first loaded, and silently
  // falls back to the dark theme forever after the first navigation.
  useIsomorphicLayoutEffect(() => {
    let ticking = false;

    const apply = () => {
      ticking = false;
      setScrolled(window.scrollY > 30);

      const zones = document.querySelectorAll<HTMLElement>("[data-theme]");
      let found = false;
      for (const zone of zones) {
        const r = zone.getBoundingClientRect();
        if (r.top <= 42 && r.bottom > 42) {
          setLight(zone.dataset.theme === "light");
          found = true;
          break;
        }
      }
      if (!found) setLight(false);
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
  }, [pathname]);

  const isLight = light && !megaOpen;
  const showBg = scrolled && !megaOpen;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[200] flex items-center justify-between gap-6 border-b transition-[padding,background-color,color,border-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]",
          scrolled ? "px-6 py-3 md:px-10 md:py-3" : "px-6 py-5 md:px-10 md:py-6",
          isLight ? "text-charcoal" : "text-paper",
          showBg
            ? isLight
              ? "border-charcoal/10 bg-paper-bright/85 backdrop-blur-xl"
              : "border-paper/10 bg-ink/70 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          onClick={scrollToTop}
          onMouseEnter={closeMenus}
          className="flex-none"
        >
          <Image
            src="/brand/aulmo-logo.png"
            alt="AULMO"
            width={975}
            height={245}
            className={clsx("h-6 w-auto transition-[filter] duration-500", !isLight && "invert hue-rotate-180")}
            priority
          />
        </Link>

        <nav
          className={clsx(
            "hidden items-center gap-6 rounded-full border px-6 py-3.5 font-mono-label text-[10.5px] font-semibold tracking-[0.17em] uppercase backdrop-blur-xl transition-[border-color,background-color] duration-500 lg:flex lg:gap-8",
            isLight ? "border-charcoal/14 bg-paper-bright/50" : "border-paper/14 bg-ink-raised/40",
          )}
        >
          <NavLink href="/" onClick={scrollToTop} onMouseEnter={closeMenus}>
            Home
          </NavLink>
          <div
            className="relative"
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setAboutOpen((v) => !v);
                setMegaOpen(false);
              }}
              onMouseEnter={() => {
                setAboutOpen(true);
                setMegaOpen(false);
              }}
              className="flex items-center gap-2 bg-transparent p-0 opacity-80 transition-opacity duration-300 hover:opacity-100"
            >
              About Us
              <span
                className={clsx(
                  "block h-1 w-1 border-r border-b border-current transition-transform duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)]",
                  aboutOpen ? "-translate-y-0.5 rotate-[225deg]" : "-translate-y-0.5 rotate-45",
                )}
              />
            </button>
            {aboutOpen && (
              // pt-3 (not mt-3) keeps the visual gap *inside* this element's own
              // hoverable box, so the cursor never crosses a dead zone between
              // the button and the panel — that gap was closing the dropdown
              // before a visitor could reach it.
              <div className="absolute left-0 top-full w-64 pt-3">
                <div className="rounded-2xl border border-paper/14 bg-ink-raised/95 p-2 text-paper normal-case backdrop-blur-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                  {ABOUT_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setAboutOpen(false)}
                      className="block rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-paper/8"
                    >
                      <span className="block text-[13px] font-bold tracking-wide">{l.label}</span>
                      <span className="mt-0.5 block text-[11px] tracking-normal opacity-50">
                        {l.detail}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setMegaOpen((v) => !v);
              setAboutOpen(false);
            }}
            onMouseEnter={() => {
              setMegaOpen(true);
              setAboutOpen(false);
            }}
            className="flex items-center gap-2 bg-transparent p-0 opacity-80 transition-opacity duration-300 hover:opacity-100"
          >
            Products
            <span
              className={clsx(
                "block h-1 w-1 border-r border-b border-current transition-transform duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)]",
                megaOpen ? "-translate-y-0.5 rotate-[225deg]" : "-translate-y-0.5 rotate-45",
              )}
            />
          </button>
          <NavLink href="/certificate" onMouseEnter={closeMenus}>
            Certificate
          </NavLink>
          <NavLink href="/contact" onMouseEnter={closeMenus}>
            Contact
          </NavLink>
        </nav>

        <div className="flex flex-none items-center gap-4 md:gap-5">
          <MagneticLink
            href="tel:+8801720310552"
            arrow
            onMouseEnter={closeMenus}
            className={clsx(
              "rounded-full border px-5 py-3.5 font-mono-label text-[10px] font-bold tracking-[0.18em] uppercase backdrop-blur-xl transition-colors duration-[400ms] hover:border-signal-red hover:bg-signal-red hover:text-paper-bright",
              isLight ? "border-charcoal/24 bg-paper-bright/50" : "border-paper/26 bg-ink-raised/40",
            )}
          >
            Contact
          </MagneticLink>
          <button
            type="button"
            onClick={() => setMegaOpen((v) => !v)}
            className="flex items-center gap-2 bg-transparent font-mono-label text-[10px] font-bold tracking-[0.16em] uppercase lg:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      {megaOpen && (
        <MegaMenu series={series} featured={featured} onClose={() => setMegaOpen(false)} />
      )}
    </>
  );
}

function NavLink({
  href,
  onClick,
  onMouseEnter,
  children,
}: {
  href: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  children: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="group relative opacity-80 transition-opacity duration-300 hover:opacity-100"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100" />
    </Link>
  );
}

function MegaMenu({
  series,
  featured,
  onClose,
}: {
  series: ProductSeries[];
  featured: FeaturedEntry[];
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const flagship = featured[0];
  const flagshipCover = flagship ? getCoverImage(flagship.subSeries) : undefined;

  return (
    <div
      ref={panelRef}
      onMouseLeave={onClose}
      className="fixed inset-x-0 top-0 z-[190] max-h-[100svh] overflow-y-auto border-b border-paper/10 bg-ink-raised px-6 pt-24 pb-10 md:px-10 md:pt-28"
    >
      <MobileQuickNav pathname={pathname} onClose={onClose} />

      <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.2fr] md:gap-12">
        <div>
          <div className="mb-5 font-mono-label text-[9px] tracking-[0.22em] opacity-40">
            SERIES
          </div>
          <div className="flex flex-col">
            {series.map((s) => (
              <a
                key={s.slug}
                href={`/products/${s.slug}`}
                onClick={onClose}
                className="group flex items-baseline justify-between gap-3.5 border-b border-paper/8 py-2.5 text-lg font-medium tracking-tight transition-[padding-left,color] duration-300 hover:pl-2.5 hover:text-signal-yellow"
              >
                {s.name}
                <span className="font-mono-label text-[9.5px] opacity-35">{s.subSeries.length}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 font-mono-label text-[9px] tracking-[0.22em] opacity-40">
            FEATURED PRODUCTS
          </div>
          <div className="flex flex-col gap-3.5">
            {featured.map(({ series: s, subSeries: sub }) => {
              const cover = getCoverImage(sub);
              return (
              <a
                key={sub.slug}
                href={`/products/${s.slug}/${sub.slug}`}
                onClick={onClose}
                className="flex items-start gap-3.5"
              >
                {cover ? (
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-none bg-ink-raised object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 flex-none items-center justify-center bg-ink text-center font-mono-label text-[6px] tracking-[0.1em] opacity-40">
                    ON REQUEST
                  </span>
                )}
                <span>
                  <span className="block text-[14.5px] font-bold tracking-wide">{sub.name}</span>
                  <span className="mt-1 block max-w-[28ch] text-xs leading-relaxed opacity-50">
                    {sub.description}
                  </span>
                </span>
              </a>
              );
            })}
          </div>
        </div>

        {flagship && (
          <div>
            <div className="mb-5 font-mono-label text-[9px] tracking-[0.22em] opacity-40">
              FEATURED — {flagship.series.name.toUpperCase()}
            </div>
            {flagshipCover ? (
              <Image
                src={flagshipCover.src}
                alt={flagshipCover.alt}
                width={480}
                height={230}
                className="h-[230px] w-full bg-ink-raised object-cover"
              />
            ) : (
              <div className="flex h-[230px] w-full items-center justify-center bg-ink font-mono-label text-[9px] tracking-[0.2em] opacity-40">
                PHOTOGRAPHY ON REQUEST
              </div>
            )}
            <div className="mt-3.5 flex items-baseline justify-between">
              <div>
                <div className="text-xl font-extrabold tracking-tight">
                  {flagship.series.name.toUpperCase()}
                </div>
                <div className="mt-1 text-xs opacity-50">{flagship.series.tagline}</div>
              </div>
              <a
                href={`/products/${flagship.series.slug}`}
                onClick={onClose}
                className="font-mono-label text-[10px] tracking-[0.16em] text-signal-yellow"
              >
                EXPLORE →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileQuickNav({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [aboutOpen, setAboutOpen] = useState(pathname.startsWith("/about-us"));
  const isProducts = pathname.startsWith("/products");
  const isAbout = pathname.startsWith("/about-us");

  const tabClass = (active: boolean) =>
    clsx(
      "flex flex-1 flex-col items-center gap-1.5 bg-transparent py-1 transition-colors duration-200",
      active ? "text-signal-yellow" : "text-paper/65",
    );

  return (
    <div className="mb-8 border-b border-paper/10 pb-6 lg:hidden">
      <div className="flex gap-1">
        <Link href="/" onClick={onClose} className={tabClass(pathname === "/")}>
          <HomeIcon className="h-5 w-5" />
          <span className="font-mono-label text-[8.5px] tracking-[0.1em] uppercase">Home</span>
        </Link>
        <button
          type="button"
          onClick={() => setAboutOpen((v) => !v)}
          className={tabClass(isAbout || aboutOpen)}
        >
          <UsersIcon className="h-5 w-5" />
          <span className="font-mono-label text-[8.5px] tracking-[0.1em] uppercase">About Us</span>
        </button>
        <Link href="/products" onClick={onClose} className={tabClass(isProducts)}>
          <GridIcon className="h-5 w-5" />
          <span className="font-mono-label text-[8.5px] tracking-[0.1em] uppercase">Products</span>
        </Link>
        <Link href="/certificate" onClick={onClose} className={tabClass(pathname === "/certificate")}>
          <ShieldIcon className="h-5 w-5" />
          <span className="font-mono-label text-[8.5px] tracking-[0.1em] uppercase">Certificate</span>
        </Link>
        <Link href="/contact" onClick={onClose} className={tabClass(pathname === "/contact")}>
          <PinIcon className="h-5 w-5" />
          <span className="font-mono-label text-[8.5px] tracking-[0.1em] uppercase">Contact</span>
        </Link>
      </div>

      {aboutOpen && (
        <div className="mt-5 rounded-2xl border border-paper/10 bg-ink-raised/50 p-2">
          <button
            type="button"
            onClick={() => setAboutOpen(false)}
            className="flex w-full items-center justify-between bg-transparent px-3 py-2.5 font-mono-label text-[9px] tracking-[0.2em] uppercase opacity-50"
          >
            About Us
            <ChevronDownIcon className="h-3.5 w-3.5 rotate-180" />
          </button>
          <div className="flex flex-col gap-1">
            {ABOUT_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className={clsx(
                    "flex items-center gap-3.5 rounded-xl px-3 py-3 transition-colors duration-200",
                    active ? "bg-paper/8" : "hover:bg-paper/5",
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-9 w-9 flex-none items-center justify-center rounded-full border",
                      active ? "border-signal-yellow text-signal-yellow" : "border-paper/20 opacity-70",
                    )}
                  >
                    <l.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={clsx("block text-[13px] font-bold tracking-wide", active && "text-signal-yellow")}>
                      {l.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] tracking-normal opacity-50">{l.detail}</span>
                  </span>
                  <ChevronRightIcon className={clsx("h-4 w-4 flex-none", active ? "text-signal-yellow" : "opacity-35")} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
