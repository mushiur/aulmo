import SectionEyebrow from "@/components/ui/SectionEyebrow";
import MagneticLink from "@/components/ui/MagneticLink";
import type { ProductSeries } from "@/data/types";

const BRAND_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/certificate", label: "Certificate" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ series }: { series: ProductSeries[] }) {
  return (
    <footer data-theme="dark" className="relative bg-ink px-6 pt-[10vh] pb-10 md:px-[4.5vw] md:pt-[13vh]">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-[5vw]">
        <div>
          <SectionEyebrow label="GET IN TOUCH" className="mb-6" />
          <h2 className="m-0 text-[clamp(30px,5.2vw,84px)] leading-[0.9] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
            Call the
            <br />
            showroom
          </h2>
          <MagneticLink
            href="tel:+8801720310552"
            arrow
            className="mt-8 border-b border-paper/28 pb-2.5 text-[clamp(18px,2.4vw,34px)] font-semibold tracking-[-0.02em]"
          >
            01720-310552
          </MagneticLink>
          <div className="mt-8 flex flex-col gap-2 text-[13.5px] opacity-70">
            <span>Khaza Electric Market, 153 Nawabpur Rd, Dhaka 1100</span>
            <a
              href="https://www.facebook.com/aulmoepbd2020/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-100"
            >
              facebook.com/aulmoepbd2020
            </a>
          </div>
          <div className="mt-10 flex gap-1.5">
            <span className="h-1.5 w-11 bg-signal-red" />
            <span className="h-1.5 w-11 bg-signal-yellow" />
            <span className="h-1.5 w-11 bg-paper/30" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-2 md:pt-[5vh]">
          <div>
            <div className="mb-4 font-mono-label text-[9px] tracking-[0.2em] opacity-42">
              CATALOGUE
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {series.map((s) => (
                <a key={s.slug} href={`/products/${s.slug}`}>
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono-label text-[9px] tracking-[0.2em] opacity-42">
              BRAND
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {BRAND_LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-8 mb-4 font-mono-label text-[9px] tracking-[0.2em] opacity-42">
              DOCUMENTS
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px] opacity-50">
              <span>Datasheets — on request</span>
              <span>CAD / BIM — on request</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[11vh] flex flex-wrap items-center justify-between gap-5 border-t border-paper/14 pt-5.5 font-mono-label text-[9px] tracking-[0.16em] opacity-42">
        <span>AULMO ELECTRIC INTERNATIONAL INC — A CENTURY OF SPECIALIZED SWITCHES</span>
        <span>© 2026 — ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
