import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
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

  const subSeries = series.subSeries;
  const gridCols =
    subSeries.length === 1
      ? ""
      : subSeries.length === 2
        ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
        : "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3";

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: series.name },
  ];

  return (
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      {/* Hero */}
      {series.heroStyle === "banner" ? (
        <section
          data-theme="dark"
          className="relative flex min-h-[48vh] items-end overflow-hidden bg-ink text-paper sm:min-h-[56vh] md:min-h-[74vh]"
        >
          {series.image && (
            <Image
              src={series.image.src}
              alt={series.image.alt}
              fill
              sizes="100vw"
              style={{ objectPosition: series.imagePosition ?? "50% 50%" }}
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/10" />
          <div className="relative w-full px-6 pt-[10vh] pb-[6vh] md:px-[4.5vw] md:pt-[18vh] md:pb-[10vh]">
            <Breadcrumb items={breadcrumbItems} />
            {series.theme && (
              <div className="mt-6 flex items-center gap-3.5">
                <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-60">
                  {series.theme}
                </span>
                <span className="h-px w-[60px] bg-current/20" />
              </div>
            )}
            <h1 className="m-0 mt-6 text-[clamp(36px,6.4vw,96px)] leading-[0.9] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
              {series.name}
            </h1>
            {series.quote && (
              <p className="m-0 mt-6 max-w-[36ch] text-pretty text-[19px] leading-[1.35] font-semibold tracking-[-0.01em]">
                &ldquo;{series.quote}&rdquo;
              </p>
            )}
            <p className="m-0 mt-4 max-w-[46ch] text-pretty text-[14px] leading-[1.68] opacity-75">
              {series.description}
            </p>
          </div>
        </section>
      ) : (
        <section data-theme="light" className="relative grid grid-cols-1 md:grid-cols-2">
          <div className="relative flex flex-col justify-center overflow-hidden px-6 py-[14vh] md:px-[4.5vw] md:py-[16vh]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[15%] -left-[15%] h-[46vh] w-[46vh] rounded-full bg-gradient-to-br from-signal-red/16 via-signal-yellow/8 to-transparent blur-[100px]"
            />
            <Breadcrumb items={breadcrumbItems} />
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
      )}

      {/* Sub-series — a single centered showcase at 1 item, an even grid otherwise */}
      <section
        data-theme="light"
        className="relative overflow-hidden px-6 py-[8vh] md:px-[4.5vw] md:py-[9vh]"
      >
        {subSeries.length === 1 && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-signal-yellow/10 via-signal-red/8 to-transparent blur-[100px]"
          />
        )}
        <div
          className={
            subSeries.length === 1
              ? "relative mx-auto max-w-[720px]"
              : clsx("relative", gridCols)
          }
        >
          {subSeries.map((sub) => (
            <SeriesSubCard
              key={sub.slug}
              href={`/products/${series.slug}/${sub.slug}`}
              spec={sub.spec}
              name={sub.name}
              description={sub.description}
              image={getCoverImage(sub)}
              featured={subSeries.length === 1}
            />
          ))}
        </div>
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
