import Image from "next/image";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import MagneticLink from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";

export default function HomeClosingCta() {
  return (
    <section data-theme="dark" className="relative bg-ink px-6 py-[10vh] text-paper md:px-[5vw] md:py-[12vh]">
      <div className="relative overflow-hidden rounded-[24px] bg-ink-raised px-6 py-10 md:px-12 md:py-14">
        <div className="absolute inset-y-0 left-0 hidden w-[220px] md:block" aria-hidden="true">
          <Image
            src="/products/d-series/dz/black/hero.jpg"
            alt=""
            fill
            sizes="220px"
            style={{ objectPosition: "70% 55%" }}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-raised" />
        </div>

        <div className="relative z-10 flex flex-col gap-6 md:ml-[190px] md:flex-row md:items-center md:justify-between">
          <div>
            <SectionEyebrow label="HAVE A PROJECT?" className="mb-4 opacity-70" />
            <Reveal as="h2" className="m-0 max-w-[20ch] text-[clamp(24px,3.2vw,40px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
              Let&rsquo;s build something great together.
            </Reveal>
            <Reveal delay={100} as="p" className="m-0 mt-3 max-w-[42ch] text-pretty text-[13.5px] leading-[1.6] opacity-65">
              For product enquiries, bulk orders or project support, our team is ready to assist
              you.
            </Reveal>
          </div>
          <Reveal delay={180}>
            <MagneticLink
              href="tel:+8801720310552"
              arrow
              className="flex-none bg-signal-red px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-paper-bright uppercase transition-colors duration-300 hover:bg-signal-yellow hover:text-ink"
            >
              Call now 01720-310552
            </MagneticLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
