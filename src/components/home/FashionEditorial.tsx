import Image from "next/image";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { RevealWords } from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";

export default function FashionEditorial() {
  return (
    <section
      data-theme="dark"
      className="relative h-[58vh] min-h-[420px] overflow-hidden bg-ink text-paper md:h-[88vh]"
    >
      <Image
        src="/marketing/craftsmanship.jpg"
        alt="AULMO matte gold switch held in hand"
        fill
        sizes="100vw"
        className="object-cover object-[72%_38%] md:object-[60%_42%]"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/40 to-ink/10" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-[5vw]">
        <div className="max-w-[min(54ch,56vw)]">
          <SectionEyebrow label="THE OBJECT, WORN" className="mb-6 opacity-70" />
          <h2 className="m-0 text-pretty text-[clamp(28px,4.4vw,64px)] leading-[1.06] font-semibold tracking-[-0.03em]">
            <RevealWords
              tokens={[
                { text: "Designed" },
                { text: "with the same" },
                { text: "discipline as", break: true },
                { text: "a wristwatch —", className: "text-signal-yellow" },
                { text: "or a doorplate." },
              ]}
            />
          </h2>
          <MagneticLink
            href="/about-us"
            arrow
            className="mt-7 inline-flex items-center gap-2.5 border-b border-signal-yellow/50 pb-1.5 font-mono-label text-[10px] tracking-[0.18em] text-signal-yellow"
          >
            Discover more
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
