import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import MagneticLink from "@/components/ui/MagneticLink";
import ProductVariantExperience from "@/components/products/ProductVariantExperience";
import { getSubSeries, getSubSeriesParams, getProductHierarchy, getCoverImage } from "@/lib/products";

export async function generateStaticParams() {
  return getSubSeriesParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string; subseries: string }>;
}): Promise<Metadata> {
  const { series, subseries } = await params;
  const result = await getSubSeries(series, subseries);
  if (!result) return {};
  return {
    title: result.subSeries.name,
    description: result.subSeries.description,
  };
}

export default async function SubSeriesPage({
  params,
}: {
  params: Promise<{ series: string; subseries: string }>;
}) {
  const { series: seriesSlug, subseries: subSlug } = await params;
  const result = await getSubSeries(seriesSlug, subSlug);
  if (!result) notFound();
  const { series, subSeries } = result;

  const siblings = series.subSeries.filter((sub) => sub.slug !== subSeries.slug);
  const allSeries = await getProductHierarchy();
  const otherSeries = allSeries.filter((s) => s.slug !== series.slug);
  const cover = getCoverImage(subSeries);

  return (
    <main data-theme="light" className="relative min-h-screen bg-paper-bright text-charcoal">
      <div className="grid grid-cols-1 gap-10 px-6 pt-[16vh] pb-[8vh] md:grid-cols-2 md:gap-[5vw] md:px-[4.5vw] md:pt-[18vh]">
        <div>
          {subSeries.variants && subSeries.variants.length > 0 ? (
            <ProductVariantExperience variants={subSeries.variants} />
          ) : cover ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-deep">
              <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" priority />
            </div>
          ) : (
            <ImagePlaceholder className="relative aspect-[4/3] w-full" />
          )}
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: series.name, href: `/products/${series.slug}` },
              { label: subSeries.name },
            ]}
          />
          <h1 className="m-0 mt-6 text-[clamp(32px,5vw,68px)] leading-[0.94] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
            {subSeries.name}
          </h1>
          <p className="m-0 mt-5 max-w-[48ch] text-pretty text-[15px] leading-[1.66] opacity-70">
            {subSeries.description}
          </p>
          {subSeries.spec && (
            <div className="mt-6 border-t border-charcoal/14 pt-4">
              <div className="font-mono-label text-[9px] tracking-[0.18em] opacity-45">MODULE</div>
              <div className="mt-1.5 text-base font-semibold">{subSeries.spec}</div>
            </div>
          )}
          {subSeries.configurations && subSeries.configurations.length > 0 && (
            <div className="mt-6 border-t border-charcoal/14 pt-4">
              <div className="mb-2.5 font-mono-label text-[9px] tracking-[0.18em] opacity-45">
                ALSO AVAILABLE AS
              </div>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {subSeries.configurations.map((c) => (
                  <li key={c} className="text-[13.5px] opacity-75">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-6 max-w-[48ch] text-pretty text-sm leading-[1.6] opacity-50">
            Full specifications, finishes and CAD/BIM files are available on request from our
            technical office.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink
              href="/contact"
              arrow
              className="bg-charcoal px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-300 hover:bg-signal-red"
            >
              Request specification
            </MagneticLink>
            <MagneticLink
              href={`/products/${series.slug}`}
              className="border border-charcoal/24 px-6 py-4 font-mono-label text-[10.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:border-charcoal/65"
            >
              Back to {series.name}
            </MagneticLink>
          </div>
        </div>
      </div>

      {siblings.length > 0 && (
        <div className="border-t border-charcoal/12 px-6 py-[8vh] md:px-[4.5vw]">
          <div className="font-mono-label text-[9px] tracking-[0.2em] opacity-45">
            MORE IN {series.name.toUpperCase()}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {siblings.map((sub) => (
              <Link
                key={sub.slug}
                href={`/products/${series.slug}/${sub.slug}`}
                className="border border-charcoal/20 px-4 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-charcoal/60"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-charcoal/12 px-6 py-[8vh] md:px-[4.5vw]">
        <div className="font-mono-label text-[9px] tracking-[0.2em] opacity-45">
          EXPLORE OTHER SERIES
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {otherSeries.map((s) => (
            <Link
              key={s.slug}
              href={`/products/${s.slug}`}
              className="border border-charcoal/20 px-4 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-charcoal/60"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
