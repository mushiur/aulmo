import hierarchyFile from "@/data/product-hierarchy.json";
import type { ProductSeries, ProductSubSeries, ImageRef } from "@/data/types";

/**
 * Accessors for the product hierarchy. Components and pages should read
 * through this module rather than importing src/data/product-hierarchy.json
 * directly, so a future admin panel / database only means editing this file.
 *
 * The hierarchy itself is authored in product-hierarchy.json (a hand-editable
 * content file, own `_instructions` block at the top) — adding a sub-series,
 * retiring one via `isDeleted`, or updating any photo/spec is a JSON edit,
 * not a code change. `isDeleted` items are never filtered out of the raw
 * hierarchy: they keep appearing everywhere they already do (mega menu,
 * series grid, their own detail page) with a "Currently Unavailable" sticker
 * — see SeriesSubCard.tsx — except `getFeaturedSubSeries`, which skips them
 * so a retired item is never actively promoted on the homepage/mega menu.
 */

const productHierarchy = hierarchyFile.productHierarchy as ProductSeries[];

export async function getProductHierarchy() {
  return productHierarchy;
}

export async function getSeriesBySlug(seriesSlug: string) {
  return productHierarchy.find((s) => s.slug === seriesSlug);
}

export async function getSubSeries(seriesSlug: string, subSeriesSlug: string) {
  const series = await getSeriesBySlug(seriesSlug);
  if (!series) return undefined;
  const subSeries = series.subSeries.find((sub) => sub.slug === subSeriesSlug);
  if (!subSeries) return undefined;
  return { series, subSeries };
}

export async function getSeriesParams() {
  return productHierarchy.map((s) => ({ series: s.slug }));
}

export async function getSubSeriesParams() {
  return productHierarchy.flatMap((s) =>
    s.subSeries.map((sub) => ({ series: s.slug, subseries: sub.slug })),
  );
}

/** One representative sub-series per top-level series, for the mega menu and homepage — skips `isDeleted` items so a retired sub-series is never featured. */
export async function getFeaturedSubSeries() {
  return productHierarchy
    .map((s) => ({ series: s, subSeries: s.subSeries.find((sub) => !sub.isDeleted) }))
    .filter((entry): entry is { series: ProductSeries; subSeries: ProductSubSeries } => Boolean(entry.subSeries));
}

/**
 * A sub-series either carries a plain `image` (K/S, no finish choice) or
 * `variants` (L/D/M, real color/finish options) — never both. Use this
 * wherever a single representative photo is needed (cards, thumbnails)
 * instead of reading `.image` directly. Prefers a variant that isn't
 * `isDeleted`, so a card/thumbnail doesn't default to showing a retired
 * finish just because it happens to be first in the array.
 */
export function getCoverImage(subSeries: ProductSubSeries): ImageRef | undefined {
  const variant = subSeries.variants?.find((v) => !v.isDeleted) ?? subSeries.variants?.[0];
  return subSeries.image ?? variant?.hero;
}
