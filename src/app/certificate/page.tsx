import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import CertificateGrid, { type Certificate } from "@/components/certificate/CertificateGrid";
import { GlobeIcon, DocumentIcon, ShieldIcon, EyeIcon } from "@/components/ui/Icon";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Certificate",
  description:
    "AULMO switches and sockets are independently tested and certified by Intertek under the IECEE CB Scheme, EU CE conformity, and Gulf/Saudi (GSO/SASO) conformity programmes.",
  alternates: { canonical: `${SITE_URL}/certificate` },
};

const CERTIFICATES: Certificate[] = [
  {
    src: "/certificates/gulf-certificate-20171002.jpg",
    name: "Gulf Type Examination Certificate",
    number: "CN-GSOG-20171002",
    issuer: "Intertek",
  },
  {
    src: "/certificates/gulf-certificate-20170908.jpg",
    name: "Gulf Type Examination Certificate",
    number: "CN-GSOG-20170908",
    issuer: "Intertek",
  },
  {
    src: "/certificates/iec-cb-test-se-88762.jpg",
    name: "IEC CB Test Certificate",
    number: "SE-88762",
    issuer: "Intertek Semko",
  },
  {
    src: "/certificates/iec-cb-test-se-88637.jpg",
    name: "IEC CB Test Certificate",
    number: "SE-88637",
    issuer: "Intertek Semko",
  },
  {
    src: "/certificates/iec-cb-test-se-89054.jpg",
    name: "IEC CB Test Certificate",
    number: "SE-89054",
    issuer: "Intertek Semko",
  },
  {
    src: "/certificates/iec-cb-test-se-88638.jpg",
    name: "IEC CB Test Certificate",
    number: "SE-88638",
    issuer: "Intertek Semko",
  },
  {
    src: "/certificates/ce-conformity-170601486.jpg",
    name: "Test Verification of Conformity (CE)",
    number: "170601486SHA-V1",
    issuer: "Intertek Shanghai",
  },
  {
    src: "/certificates/ce-conformity-170601478.jpg",
    name: "Test Verification of Conformity (CE)",
    number: "170601478SHA-V1",
    issuer: "Intertek Shanghai",
  },
  {
    src: "/certificates/ce-conformity-170601481.jpg",
    name: "Test Verification of Conformity (CE)",
    number: "170601481SHA-V1",
    issuer: "Intertek Shanghai",
  },
  {
    src: "/certificates/saudi-cap-ksa-310867.jpg",
    name: "Saudi CAP Statement for Registration",
    number: "KSA R-310867",
    issuer: "Intertek (SASO)",
  },
  {
    src: "/certificates/saudi-cap-ksa-310863.jpg",
    name: "Saudi CAP Statement for Registration",
    number: "KSA R-310863",
    issuer: "Intertek (SASO)",
  },
  {
    src: "/certificates/saudi-cap-ksa-310866.jpg",
    name: "Saudi CAP Statement for Registration",
    number: "KSA R-310866",
    issuer: "Intertek (SASO)",
  },
];

const FEATURES = [
  {
    icon: ShieldIcon,
    title: "INTERNATIONAL STANDARDS",
    body: "Manufactured to IEC 60669 / 60884 and tested against Gulf and Saudi (GSO/SASO) requirements.",
  },
  {
    icon: EyeIcon,
    title: "QUALITY ASSURED",
    body: "Independently tested by Intertek for safety, performance and EU CE conformity.",
  },
  {
    icon: GlobeIcon,
    title: "GLOBAL COMPLIANCE",
    body: "Certified for markets across the Gulf, the EU and beyond — not a single-market product.",
  },
  {
    icon: DocumentIcon,
    title: "FULL TRANSPARENCY",
    body: "Every certificate on this page is the real scanned document — view or download it directly.",
  },
];

export default function CertificatePage() {
  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      {/* Hero */}
      <section data-theme="dark" className="relative grid grid-cols-1 overflow-hidden bg-ink text-paper md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-[16vh] md:px-[4.5vw] md:py-[18vh]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Certificate" }]} />
          <div className="mt-6 flex items-center gap-3.5">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-50">CERTIFICATION</span>
            <span className="h-px w-[60px] bg-current/20" />
          </div>
          <h1 className="m-0 mt-6 text-[clamp(34px,5.4vw,72px)] leading-[1.02] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            Certified <span className="text-signal-yellow">excellence.</span>
          </h1>
          <Reveal as="p" className="m-0 mt-6 max-w-[46ch] text-pretty text-[15px] leading-[1.7] opacity-70">
            Every AULMO switch and socket is independently tested and certified — not a claim we
            make ourselves, but one verified by Intertek under the IECEE CB Scheme, EU CE
            conformity, and Gulf/Saudi conformity programmes.
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["INTERTEK", "IEC · IECEE", "CE", "GSO · SASO"].map((mark) => (
              <span
                key={mark}
                className="rounded-full border border-paper/22 px-5 py-2.5 font-mono-label text-[10px] font-bold tracking-[0.16em]"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[42vh] overflow-hidden md:min-h-0">
          <Image
            src="/products/l-series/lg30/carbon-gray/hero.jpg"
            alt="AULMO LG30 Series switch, carbon gray finish"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Our certificates */}
      <section data-theme="dark" className="relative bg-ink-raised px-6 py-[10vh] text-paper md:px-[4.5vw] md:py-[12vh]">
        <SectionEyebrow label="DOCUMENTATION" className="mb-6 opacity-70" />
        <h2 className="m-0 max-w-[16ch] text-[clamp(26px,3.6vw,48px)] leading-[1.02] font-extrabold tracking-[-0.03em] uppercase [font-stretch:114%]">
          Our certificates.
        </h2>
        <Reveal as="p" className="m-0 mt-5 max-w-[52ch] text-pretty text-[14px] leading-[1.66] opacity-60">
          Twelve real, independently issued documents — click any thumbnail to view it full size,
          or download it directly.
        </Reveal>

        <div className="mt-10 md:mt-[6vh]">
          <CertificateGrid certificates={CERTIFICATES} />
        </div>
      </section>

      {/* Trust features */}
      <section data-theme="dark" className="relative border-t border-paper/10 bg-ink px-6 py-[7vh] text-paper md:px-[4.5vw]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={i > 0 ? "md:border-l md:border-paper/12 md:pl-6" : ""}>
              <f.icon className="h-6 w-6 text-signal-yellow" />
              <div className="mt-3 font-mono-label text-[9.5px] font-bold tracking-[0.16em]">{f.title}</div>
              <p className="m-0 mt-2 max-w-[26ch] text-pretty text-[12.5px] leading-[1.55] opacity-55">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section data-theme="dark" className="relative overflow-hidden bg-ink px-6 py-[12vh] text-paper md:px-[4.5vw] md:py-[15vh]">
        <Image
          src="/certificates/world-map.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative z-10 max-w-[640px]">
          <span className="font-mono-label text-[9.5px] tracking-[0.24em] text-signal-red">BUILT ON TRUST</span>
          <h2 className="m-0 mt-4 text-[clamp(28px,4vw,52px)] leading-[1.02] font-extrabold tracking-[-0.035em] uppercase [font-stretch:114%]">
            Certified for the world.
          </h2>
          <Reveal as="p" className="m-0 mt-5 max-w-[46ch] text-pretty text-[14.5px] leading-[1.66] opacity-70">
            Have a project that needs specific certification or a market not shown here? Our
            technical office can confirm exactly which documents apply.
          </Reveal>
          <div className="mt-8">
            <MagneticLink
              href="/contact"
              arrow
              className="bg-signal-red px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-paper-bright uppercase transition-colors duration-300 hover:bg-signal-yellow hover:text-ink"
            >
              Contact us
            </MagneticLink>
          </div>
        </div>
      </section>
    </main>
  );
}
