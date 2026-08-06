export type ImageRef = {
  src: string;
  alt: string;
};

/**
 * A single physical color/finish of a product. Carries its own photography —
 * a hero shot plus whatever supporting gallery images exist for that finish
 * specifically (detail close-ups, lifestyle/interior installs). Not every
 * finish has the same amount of photography; `gallery` is simply omitted or
 * shorter where fewer images exist. Never backfilled with another finish's
 * images.
 */
export type ProductVariant = {
  code: string;
  name: string;
  swatch: string;
  hero: ImageRef;
  gallery?: ImageRef[];
};

/**
 * Product hierarchy — the permanent Category -> Series -> Sub-series structure.
 * This is the single source of truth for the products mega-menu, /products
 * routes, and any related-product navigation. See src/data/product-hierarchy.ts.
 *
 * A sub-series either has `variants` (multiple real color/finish options —
 * enables the finish selector + gallery on its detail page) or a plain
 * `image` (a single photo, no finish choice — the original simple shape,
 * still used by K/S). A sub-series should not carry both.
 */
export type ProductSubSeries = {
  code: string;
  slug: string;
  name: string;
  description: string;
  spec?: string;
  image?: ImageRef;
  variants?: ProductVariant[];
  /** Real configurations/SKUs this line ships as, sourced from actual catalog sheets — not photographed individually, so shown as text, not images. */
  configurations?: string[];
};

export type ProductSeries = {
  code: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image?: ImageRef;
  imagePosition?: string;
  /** One-word theme for the series page's hero (e.g. "DESIGN", "SECURE") —
   *  client-supplied marketing direction, distinct from `tagline`. */
  theme?: string;
  /** Short marketing quote paired with `theme`, client-supplied verbatim. */
  quote?: string;
  subSeries: ProductSubSeries[];
};

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};
