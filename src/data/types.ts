export type ImageRef = {
  src: string;
  alt: string;
  /** "cover" (default) full-bleeds photography, cropping to fill the box.
   *  "contain" shows the whole image uncropped — use for diagrams/line-art
   *  (dimension drawings, exploded views) where cropping would cut off
   *  labels or measurements. */
  fit?: "cover" | "contain";
  /** Short caption shown under this image's thumbnail in the product
   *  gallery (e.g. "Front", "Detail", "Dimensions"). Optional — thumbnails
   *  without a label just show no caption. */
  label?: string;
  /** Real intrinsic pixel size — only needed where an image renders at its
   *  own natural aspect ratio instead of a fixed `fill` box (e.g.
   *  `familyImages`, which vary from landscape to tall portrait). */
  width?: number;
  height?: number;
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
  /** Real product-parameter sheet (color range, material, ratings), client-supplied verbatim — rendered as a label/value table on the sub-series detail page. */
  parameters?: { label: string; value: string }[];
  /** Longer client-supplied design/brand narrative for this sub-series — shared
   *  across every finish/color, shown as its own passage on the sub-series
   *  detail page. Distinct from the short `description` used in meta tags,
   *  the mega menu, and cards, which stays short by design. */
  story?: string;
  /** Composite marketing collage/lineup shots (real product photography
   *  with printed headline, body copy, or an exploded/material diagram
   *  baked into the same file) that don't fit the per-finish `gallery` —
   *  cropping these tightly cuts through the text. Shown uncropped in
   *  their own section on the detail page instead of forced into a
   *  gallery thumbnail. One image renders full-width; two or more render
   *  side by side on desktop. */
  familyImages?: ImageRef[];
};

export type ProductSeries = {
  code: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image?: ImageRef;
  imagePosition?: string;
  /** Overrides `image` on the /products overview card only — lets that
   *  thumbnail use a different real photo than the series detail page's
   *  hero banner. Falls back to `image` when absent. */
  cardImage?: ImageRef;
  /** Series-page hero layout. "split" (default) is the text/image side-by-side
   *  hero. "banner" is a full-bleed photo with text overlaid — only use this
   *  when `image` is a genuine landscape shot; forcing a portrait photo into
   *  a full-bleed banner reintroduces the upscale-blur problem this was built
   *  to avoid. Switch a series to "banner" once it has real landscape hero
   *  photography, not before. */
  heroStyle?: "split" | "banner";
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
