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
  /** True once this specific color/finish has been retired, independent of
   *  its sub-series or siblings (e.g. L50 keeps selling in black/gold but not
   *  gray/white). The finish stays selectable and its photos stay visible —
   *  the finish selector and gallery just flag it as unavailable instead of
   *  removing it. Defaults to false/absent (available). */
  isDeleted?: boolean;
};

/**
 * Product hierarchy — the permanent Category -> Series -> Sub-series structure.
 * This is the single source of truth for the products mega-menu, /products
 * routes, and any related-product navigation. See src/data/product-hierarchy.json.
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
  /** True once this item has been retired from sale. It is never removed from
   *  product-hierarchy.json — everywhere it already appears keeps showing it,
   *  with a "Currently Unavailable" sticker instead of the item disappearing,
   *  so the content (and the option to bring it back) isn't lost. Defaults to
   *  false/absent (available). */
  isDeleted?: boolean;
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

/**
 * Circuit Breaker — a separate product vertical alongside the switch/socket
 * hierarchy above (distributed third-party brands, not AULMO's own
 * manufactured line). Kept as its own small data model rather than forced
 * into ProductSeries/ProductSubSeries, since it has a genuinely different
 * shape: brand-led, spec-filtered, pole-selected, mock/placeholder imagery
 * pending real product photography.
 */
export type CircuitBreakerPole = "SP" | "DP" | "TP";

export type CircuitBreakerBrand = {
  slug: string;
  name: string;
  /** Real brand logo URL, set by editing src/data/circuit-breaker-catalog.json. Empty/absent until supplied — BrandGrid stays text-only until then. */
  logo?: string;
};

export type CircuitBreakerCategory = {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  /** Whether this category is selected by pole (MCB, MCCB) or not (Magnetic Contactor). */
  hasPoles: boolean;
  image: ImageRef;
  /** Real nav/mega-menu icon URL, set via circuit-breaker-catalog.json. Empty/absent until supplied — nav falls back to a pole-icon stand-in. */
  navIcon?: string;
};

/**
 * A single mock/placeholder listing — not a verified real SKU. Ratings use
 * common industry-standard values (16A, C-curve, 6kA, 230/400V, etc.) as
 * illustrative examples, not a claim that this exact product/spec
 * combination is in stock. Replace with real catalog data before this
 * section goes live with actual inventory.
 */
export type CircuitBreakerProduct = {
  id: string;
  categorySlug: string;
  brandSlug: string;
  pole?: CircuitBreakerPole;
  name: string;
  series?: string;
  model?: string;
  ratedCurrent: string;
  curveType?: string;
  breakingCapacity?: string;
  voltage: string;
  madeIn?: string;
  image: ImageRef;
};
