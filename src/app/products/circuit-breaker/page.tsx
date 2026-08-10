import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SeriesSubCard from "@/components/products/SeriesSubCard";
import BrandGrid from "@/components/circuit-breaker/BrandGrid";
import { Reveal } from "@/components/ui/Reveal";
import { getCircuitBreakerCategories, getCircuitBreakerBrands } from "@/lib/circuit-breakers";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Circuit Breakers",
  description:
    "MCB, MCCB and Magnetic Contactor circuit protection from Schneider Electric, ABB, Legrand, Hyundai, CHINT and more — distributed by AULMO.",
  alternates: { canonical: `${SITE_URL}/products/circuit-breaker` },
};

export default async function CircuitBreakerPage() {
  const [categories, brands] = await Promise.all([getCircuitBreakerCategories(), getCircuitBreakerBrands()]);

  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      <section
        data-theme="dark"
        className="relative flex min-h-[42vh] items-end overflow-hidden bg-ink text-paper sm:min-h-[48vh] md:min-h-[58vh]"
      >
        <Image
          src="/images/products/circuit-breaker/banner-placeholder.png"
          alt="Circuit breaker protection — MCB, MCCB and Magnetic Contactor"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/10" />
        <div className="relative w-full px-6 pt-[10vh] pb-[6vh] md:px-[4.5vw] md:pt-[14vh] md:pb-[8vh]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Circuit Breaker" }]} />
          <div className="mt-6 flex items-center gap-3.5">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-60">CIRCUIT PROTECTION</span>
            <span className="h-px w-[60px] bg-current/20" />
          </div>
          <Reveal as="h1" className="m-0 mt-6 text-[clamp(32px,5.6vw,80px)] leading-[0.94] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
            Circuit Breaker.
          </Reveal>
          <Reveal delay={100} as="p" className="m-0 mt-6 max-w-[52ch] text-pretty text-[15px] leading-[1.66] opacity-75">
            Reliable protection for residential, commercial and industrial installations —
            distributed from leading global and regional manufacturers.
          </Reveal>
        </div>
      </section>

      <section data-theme="light" className="px-6 py-[8vh] md:px-[4.5vw]">
        <SectionEyebrow label="BROWSE BY TYPE" className="mb-6" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={i * 90} y={24}>
              <SeriesSubCard
                href={`/products/circuit-breaker/${category.slug}`}
                spec={category.name}
                name={category.fullName}
                description={category.description}
                image={category.image}
                ctaLabel="VIEW PRODUCTS →"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section data-theme="light" className="border-t border-charcoal/12 px-6 py-[7vh] md:px-[4.5vw]">
        <SectionEyebrow label="SHOP BY BRAND" className="mb-6" />
        <BrandGrid brands={brands} />
      </section>
    </main>
  );
}
