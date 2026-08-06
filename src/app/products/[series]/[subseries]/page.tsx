import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import MagneticLink from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import ProductVariantExperience from "@/components/products/ProductVariantExperience";
import { getSubSeries, getSubSeriesParams, getProductHierarchy, getCoverImage } from "@/lib/products";
import type { ImageRef } from "@/data/types";

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
    <main data-theme="light" className="relative min-h-screen overflow-hidden bg-paper-bright text-charcoal">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[8%] left-[6%] h-[55vh] w-[55vh] rounded-full bg-gradient-to-br from-signal-red/10 via-signal-yellow/6 to-transparent blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[62%] right-[4%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-tr from-signal-yellow/9 via-signal-red/6 to-transparent blur-[120px]"
      />
      <div className="relative flex flex-col gap-10 px-6 pt-[16vh] pb-[8vh] md:flex-row md:items-start md:gap-x-[5vw] md:px-[4.5vw] md:pt-[18vh]">
        {/* Mobile-only intro — hidden at md: the same content re-appears inside the
            text column below so desktop keeps a single, naturally-sized column
            instead of splitting intro/details across a shared grid row (which
            forced a tall empty gap when the two didn't add up to the image's
            height). */}
        <div className="md:hidden">
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
        </div>

        <div className="md:flex-1">
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

        <div className="md:flex-1">
          <div className="hidden md:block">
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
          </div>
          {subSeries.spec && (
            <div className="mt-6 border-t border-charcoal/14 pt-4">
              <div className="font-mono-label text-[9px] tracking-[0.18em] opacity-45">MODULE</div>
              <div className="mt-1.5 text-base font-semibold">{subSeries.spec}</div>
            </div>
          )}
          {subSeries.parameters && subSeries.parameters.length > 0 && (
            <div className="mt-6 border-t border-charcoal/14 pt-4">
              <div className="mb-2.5 font-mono-label text-[9px] tracking-[0.18em] opacity-45">
                PRODUCT PARAMETERS
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {subSeries.parameters.map((p) => (
                  <div key={p.label} className="flex items-baseline justify-between gap-4 border-b border-charcoal/8 py-1.5">
                    <dt className="text-[12.5px] opacity-55">{p.label}</dt>
                    <dd className="m-0 text-right text-[13.5px] font-semibold">{p.value}</dd>
                  </div>
                ))}
              </dl>
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

      <div className="relative border-t border-charcoal/12">
        {siblings.length > 0 && (
          <div className="relative px-6 pt-[6vh] pb-[5vh] md:px-[4.5vw]">
            <div className="font-mono-label text-[9px] tracking-[0.2em] opacity-45">
              MORE IN {series.name.toUpperCase()}
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              {siblings.map((sub, i) => (
                <CrossLinkCard
                  key={sub.slug}
                  href={`/products/${series.slug}/${sub.slug}`}
                  name={sub.name}
                  thumb={getCoverImage(sub)}
                  delay={i * 70}
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative border-t border-charcoal/8 px-6 pt-[5vh] pb-[6vh] md:px-[4.5vw]">
          <div className="font-mono-label text-[9px] tracking-[0.2em] opacity-45">
            EXPLORE OTHER SERIES
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            {otherSeries.map((s, i) => (
              <CrossLinkCard
                key={s.slug}
                href={`/products/${s.slug}`}
                name={s.name}
                thumb={s.cardImage ?? s.image}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function CrossLinkCard({
  href,
  name,
  thumb,
  delay,
}: {
  href: string;
  name: string;
  thumb?: ImageRef;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={16}>
      <Link
        href={href}
        className="group block w-36 overflow-hidden border border-charcoal/15 transition-colors duration-300 hover:border-charcoal/50"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-deep">
          {thumb ? (
            <Image
              src={thumb.src}
              alt={thumb.alt}
              fill
              sizes="144px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}
        </div>
        <div className="px-3 py-2.5 text-sm font-medium">{name}</div>
      </Link>
    </Reveal>
  );
}
