import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SeriesSubCard from "@/components/products/SeriesSubCard";
import { getSeriesBySlug, getSeriesParams, getCoverImage } from "@/lib/products";

export async function generateStaticParams() {
  return getSeriesParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string }>;
}): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);
  if (!series) return {};
  return {
    title: series.name,
    description: series.description,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);
  if (!series) notFound();

  const [featured, ...rest] = series.subSeries;

  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      {/* Hero */}
      <section data-theme="light" className="relative grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-[14vh] md:px-[4.5vw] md:py-[16vh]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: series.name },
            ]}
          />
          {series.theme && (
            <div className="mt-6 flex items-center gap-3.5">
              <span className="font-mono-label text-[9.5px] tracking-[0.24em] text-signal-red">
                {series.theme}
              </span>
              <span className="h-px w-[60px] bg-current/20" />
            </div>
          )}
          <h1 className="m-0 mt-6 text-[clamp(38px,6vw,84px)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            {series.name}
          </h1>
          {series.quote && (
            <p className="m-0 mt-4 max-w-[36ch] text-pretty text-[19px] leading-[1.35] font-semibold tracking-[-0.01em]">
              &ldquo;{series.quote}&rdquo;
            </p>
          )}
          <p className="m-0 mt-5 max-w-[46ch] text-pretty text-[14px] leading-[1.68] opacity-60">
            {series.description}
          </p>
        </div>
        <div className="relative min-h-[42vh] overflow-hidden bg-bone-deep md:min-h-0">
          {series.image && (
            <Image
              src={series.image.src}
              alt={series.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ objectPosition: series.imagePosition ?? "50% 50%" }}
              className="object-cover"
              priority
            />
          )}
        </div>
      </section>

      {/* Sub-series — one large featured item, the rest in a supporting row */}
      <section data-theme="light" className="relative px-6 py-[8vh] md:px-[4.5vw] md:py-[9vh]">
        <SeriesSubCard
          href={`/products/${series.slug}/${featured.slug}`}
          spec={featured.spec}
          name={featured.name}
          description={featured.description}
          image={getCoverImage(featured)}
          featured
        />

        {rest.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rest.map((sub) => (
              <SeriesSubCard
                key={sub.slug}
                href={`/products/${series.slug}/${sub.slug}`}
                spec={sub.spec}
                name={sub.name}
                description={sub.description}
                image={getCoverImage(sub)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Closing — a distinct statement, not a repeat of the footer's phone CTA */}
      <section data-theme="dark" className="relative bg-ink px-6 py-[9vh] text-paper md:px-[4.5vw] md:py-[11vh]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[46ch]">
            <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-50">
              ONE STANDARD. ENDLESS POSSIBILITIES.
            </span>
            <h2 className="m-0 mt-4 text-[clamp(24px,3.2vw,42px)] leading-[1.05] font-extrabold tracking-[-0.03em] uppercase [font-stretch:114%]">
              Designed to elevate every space.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 border border-paper/26 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:border-paper/70 hover:bg-paper/6"
          >
            Explore all series
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
