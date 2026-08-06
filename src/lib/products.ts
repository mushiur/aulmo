import { productHierarchy } from "@/data/product-hierarchy";
import type { ProductSubSeries, ImageRef } from "@/data/types";

/**
 * Accessors for the product hierarchy. Components and pages should read
 * through this module rather than importing src/data/product-hierarchy.ts
 * directly, so a future admin panel / database only means editing this file.
 */

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

/** One representative sub-series per top-level series, for the mega menu and homepage. */
export async function getFeaturedSubSeries() {
  return productHierarchy.map((s) => ({ series: s, subSeries: s.subSeries[0] }));
}

/**
 * A sub-series either carries a plain `image` (K/S, no finish choice) or
 * `variants` (L/D/M, real color/finish options) — never both. Use this
 * wherever a single representative photo is needed (cards, thumbnails)
 * instead of reading `.image` directly.
 */
export function getCoverImage(subSeries: ProductSubSeries): ImageRef | undefined {
  return subSeries.image ?? subSeries.variants?.[0]?.hero;
}
