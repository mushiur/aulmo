import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import MagneticLink from "@/components/ui/MagneticLink";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import ProductVariantExperience from "@/components/products/ProductVariantExperience";
import { getSubSeries, getSubSeriesParams, getProductHierarchy, getCoverImage } from "@/lib/products";
import type { ImageRef } from "@/data/types";
import { SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return getSubSeriesParams();
}

function hasRealPhotography(subSeries: { image?: ImageRef; variants?: { hero: ImageRef }[] }) {
  return Boolean(subSeries.image) || Boolean(subSeries.variants && subSeries.variants.length > 0);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string; subseries: string }>;
}): Promise<Metadata> {
  const { series: seriesSlug, subseries } = await params;
  const result = await getSubSeries(seriesSlug, subseries);
  if (!result) return {};
  const { series, subSeries } = result;
  const title = `${subSeries.name} Switch`;
  const description = `AULMO ${subSeries.name} switch — ${subSeries.description}`;
  const cover = getCoverImage(subSeries);
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${series.slug}/${subSeries.slug}` },
    // Thin, photography-less stub pages currently share near-identical boilerplate
    // copy across several sub-series — indexing them as-is risks reading as thin/
    // duplicate content and diluting the site's overall quality signal. They stay
    // fully accessible to visitors and crawlable (follow), just not indexed until
    // they have real photography and their own real copy.
    robots: hasRealPhotography(subSeries) ? undefined : { index: false, follow: true },
    openGraph: cover ? { title, description, images: [{ url: cover.src, alt: cover.alt }] } : undefined,
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
  const canonicalUrl = `${SITE_URL}/products/${series.slug}/${subSeries.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: series.name, item: `${SITE_URL}/products/${series.slug}` },
      { "@type": "ListItem", position: 4, name: subSeries.name, item: canonicalUrl },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `AULMO ${subSeries.name}`,
    description: subSeries.description,
    brand: { "@type": "Brand", name: "AULMO" },
    category: series.name,
    url: canonicalUrl,
    ...(cover && { image: `${SITE_URL}${cover.src}` }),
    ...(subSeries.parameters && {
      additionalProperty: subSeries.parameters.map((p) => ({
        "@type": "PropertyValue",
        name: p.label,
        value: p.value,
      })),
    }),
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper-bright text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div
        data-theme="light"
        className="relative flex flex-col gap-10 px-6 pt-[16vh] pb-[8vh] md:flex-row md:items-start md:gap-x-[5vw] md:px-[4.5vw] md:pt-[18vh]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[8%] left-[6%] h-[55vh] w-[55vh] rounded-full bg-gradient-to-br from-signal-red/10 via-signal-yellow/6 to-transparent blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[62%] right-[4%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-tr from-signal-yellow/9 via-signal-red/6 to-transparent blur-[120px]"
        />
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

      {subSeries.story && (
        <section data-theme="dark" className="relative overflow-hidden bg-ink text-paper">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative flex flex-col justify-center px-6 py-[9vh] md:px-[4.5vw] md:py-[11vh]">
              <SectionEyebrow label="DESIGN PHILOSOPHY" className="mb-6 opacity-70" />
              <Reveal
                as="p"
                className="m-0 max-w-[46ch] text-pretty text-[20px] leading-[1.55] font-medium tracking-[-0.01em] md:text-[25px]"
              >
                {subSeries.story}
              </Reveal>
            </div>
            <div className="relative min-h-[42vh] overflow-hidden bg-ink-raised p-10 md:min-h-0 md:p-14">
              {cover && (
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {subSeries.familyImages && subSeries.familyImages.length > 0 && (
        <section data-theme="light" className="relative border-t border-charcoal/12 bg-paper-bright px-6 py-[8vh] md:px-[4.5vw] md:py-[10vh]">
          <div
            className={clsx(
              "mx-auto",
              subSeries.familyImages.length > 1
                ? "grid max-w-[1600px] grid-cols-1 gap-8 md:grid-cols-2"
                : "max-w-[900px]",
            )}
          >
            <SectionEyebrow
              label="THE FAMILY"
              className={clsx("mb-6", subSeries.familyImages.length > 1 && "md:col-span-2")}
            />
            {subSeries.familyImages.map((image, i) => (
              <Reveal key={image.src} delay={i * 90} y={20} className="relative w-full overflow-hidden rounded-[16px] bg-bone-deep">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 1700}
                  height={image.height ?? 1465}
                  className="h-auto w-full"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div data-theme="light" className="relative border-t border-charcoal/12">
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
