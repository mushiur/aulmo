import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function BrandBand() {
  return (
    <section data-theme="light" className="relative bg-paper-bright px-6 py-[6vh] md:px-[5vw] md:py-[7vh]">
      {/* Desktop/tablet — the real composite banner, still legible at this width. */}
      <Reveal className="mx-auto hidden w-full max-w-[1100px] md:block">
        <Image
          src="/marketing/l-series-brand-band.jpg"
          alt="AULMO L Series — fashion design, precision production, available in pearl white, water ink black, carbon gray and matte gold"
          width={1700}
          height={460}
          sizes="1100px"
          className="h-auto w-full"
        />
      </Reveal>

      {/* Mobile — the same banner's baked-in text turns unreadable at this
          width, so only the logo mark stays an image and the real copy
          renders as actual, always-legible text instead. */}
      <Reveal className="mx-auto flex max-w-[420px] flex-col items-center gap-5 text-center md:hidden">
        <Image
          src="/marketing/l-series-logo-mark.jpg"
          alt="AULMO L Series"
          width={420}
          height={460}
          className="h-24 w-auto"
        />
        <p className="m-0 text-pretty text-[13.5px] leading-[1.7] text-charcoal/70">
          L&rsquo;Series switches and sockets adhere to &ldquo;fashion design, precision
          production&rdquo; — improving luster and texture with a unique stilt-board
          appearance, exquisite high-gloss baking paint and PU coating. The classic
          all-match colors — pearl white, water ink black, carbon gray and matte gold
          — harmonize perfectly with your home.
        </p>
      </Reveal>
    </section>
  );
}
