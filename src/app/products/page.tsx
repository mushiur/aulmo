import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SeriesSubCard from "@/components/products/SeriesSubCard";
import { getProductHierarchy } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the AULMO product range — L, D, M, K and S Series switches and sockets.",
};

export default async function ProductsPage() {
  const series = await getProductHierarchy();

  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      <section
        data-theme="dark"
        className="relative flex min-h-[48vh] items-end overflow-hidden bg-ink text-paper sm:min-h-[56vh] md:min-h-[74vh]"
      >
        <Image
          src="/marketing/products-overview-banner.png"
          alt="The full AULMO product range"
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 35%" }}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/10" />
        <div className="relative w-full px-6 pt-[10vh] pb-[6vh] md:px-[4.5vw] md:pt-[18vh] md:pb-[10vh]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <div className="mt-6 flex items-center gap-3.5">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-60">
              PRODUCTS
            </span>
            <span className="h-px w-[60px] bg-current/20" />
          </div>
          <h1 className="m-0 mt-6 text-[clamp(36px,6.4vw,96px)] leading-[0.9] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
            The full range.
          </h1>
          <p className="m-0 mt-6 max-w-[56ch] text-pretty text-[15px] leading-[1.66] opacity-75">
            Five series, one shared 86 mm module. Select a series to view its sub-series and
            specifications.
          </p>
        </div>
      </section>

      <section
        data-theme="light"
        className="grid grid-cols-1 gap-10 px-6 py-[8vh] sm:grid-cols-2 md:grid-cols-3 md:px-[4.5vw]"
      >
        {series.map((s) => (
          <SeriesSubCard
            key={s.slug}
            href={`/products/${s.slug}`}
            spec={s.theme}
            name={s.name}
            description={s.quote ?? s.tagline}
            image={s.cardImage ?? s.image}
            ctaLabel="READ MORE →"
          />
        ))}
      </section>
    </main>
  );
}
