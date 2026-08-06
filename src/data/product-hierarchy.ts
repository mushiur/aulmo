import type { ProductSeries } from "./types";

/**
 * The permanent AULMO product hierarchy: Series -> Sub-series -> (optionally)
 * color/finish Variants.
 *
 * This is the single source of truth for the products mega-menu, the
 * /products routes, and related-product navigation. Do not duplicate this
 * structure elsewhere — components and pages should read through
 * src/lib/products.ts instead of importing this file directly.
 *
 * L, D and M Series below are built directly from the real photography in
 * the supplied asset library (migrated into public/products/) — names,
 * finishes and specs are only included where a real photo or a printed
 * dimension/label confirms them. Where a sub-series has multiple real
 * finishes, `variants` drives the finish selector + gallery on its detail
 * page. K and S Series are untouched from the previous pass and still use
 * the simpler single-`image` shape pending their own asset libraries.
 *
 * T Series (Power Track) has been removed at the client's request — it never
 * had any real photography or asset library to begin with.
 */
export const productHierarchy: ProductSeries[] = [
  {
    code: "L",
    slug: "l-series",
    name: "L Series",
    tagline: "Fashion design, precision production.",
    theme: "DESIGN",
    quote: "Quality From the Inside Out.",
    description:
      "One mechanism across five sub-series, finished in pearl white, water-ink black, carbon gray, matte silver or matte gold to match any interior.",
    image: {
      src: "/products/l-series/banner.png",
      alt: "AULMO L Series switch lineup across six finishes",
    },
    heroStyle: "banner",
    cardImage: {
      src: "/products/l-series/l50/black/hero.jpg",
      alt: "AULMO L Series switch, ink black",
    },
    subSeries: [
      {
        code: "L50",
        slug: "l50",
        name: "L50 Series",
        description: "One-gang architectural switch with a flat stilt-board face.",
        spec: "86 × 90 mm module",
        parameters: [
          { label: "Color", value: "White / Gray / Gold / Black" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 90 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        variants: [
          {
            code: "black",
            name: "Ink Black",
            swatch: "#17171A",
            hero: {
              src: "/products/l-series/l50/black/hero.jpg",
              alt: "AULMO L50 Series switch, ink black",
              label: "Front",
            },
            gallery: [
              {
                src: "/products/l-series/l50/black/detail.jpg",
                alt: "AULMO L50 Series switch detail, ink black",
                label: "Detail",
              },
              {
                src: "/products/l-series/l50/black/architecture.png",
                alt: "AULMO L50 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/l-series/l50/black/profiling-diagram.png",
                alt: "AULMO L50 Series exploded switch profiling diagram",
                fit: "contain",
                label: "Exploded View",
              },
            ],
          },
          {
            code: "gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/l50/gold/hero.jpg", alt: "AULMO L50 Series switch, matte gold" },
          },
          {
            code: "gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/l50/gray/hero.jpg", alt: "AULMO L50 Series switch, carbon gray" },
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/l50/white/hero.jpg", alt: "AULMO L50 Series switch, pearl white" },
          },
        ],
      },
      {
        code: "L60",
        slug: "l60",
        name: "L60 Series",
        description: "Two-gang switch and socket range with a woven-texture face.",
        spec: "86 × 90 mm module",
        variants: [
          {
            code: "gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/l60/gold/hero.jpg", alt: "AULMO L60 Series switch, matte gold" },
          },
          {
            code: "gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/l60/gray/hero.jpg", alt: "AULMO L60 Series switch, carbon gray" },
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/l60/white/hero.jpg", alt: "AULMO L60 Series switch, pearl white" },
          },
        ],
      },
      {
        code: "L80",
        slug: "l80",
        name: "L80 Series",
        description: "Four-gang control plate with a curved profile and glowing accent edge.",
        spec: "86 × 90 mm module",
        variants: [
          {
            code: "black",
            name: "Matte Black",
            swatch: "#17171A",
            hero: { src: "/products/l-series/l80/black/hero.jpg", alt: "AULMO L80 Series control plate, matte black" },
          },
          {
            code: "gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/l80/gold/hero.jpg", alt: "AULMO L80 Series control plate, matte gold" },
          },
          {
            code: "gray",
            name: "Graphite Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/l80/gray/hero.jpg", alt: "AULMO L80 Series control plate, graphite gray" },
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/l80/white/hero.jpg", alt: "AULMO L80 Series control plate, pearl white" },
          },
        ],
      },
      {
        code: "LG20",
        slug: "lg20",
        name: "LG20 Series",
        description:
          "The widest configuration range in the L Series — switches from one to six gangs, USB and Type-C sockets, TEL/NET/TV and satellite jacks, dimmers and curtain switches, all sharing one face.",
        spec: "86 × 90 mm module",
        configurations: [
          "1–6 gang switches",
          "USB & Type-C sockets",
          "TEL / NET / TV / satellite sockets",
          "Dimmers & curtain switches",
          "Large-format 3×6 plates",
          "Junction boxes",
        ],
        variants: [
          {
            code: "matte-gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/lg20/matte-gold/hero.jpg", alt: "AULMO LG20 Series switch, matte gold" },
          },
          {
            code: "silvery",
            name: "Silvery",
            swatch: "linear-gradient(105deg,#C7C4BE,#E9E7E2 44%,#AFACA6)",
            hero: { src: "/products/l-series/lg20/silvery/hero.jpg", alt: "AULMO LG20 Series switch, silvery" },
            gallery: [
              { src: "/products/l-series/lg20/silvery/detail.jpg", alt: "AULMO LG20 Series switch and socket detail, silvery" },
            ],
          },
          {
            code: "water-ink",
            name: "Water Ink",
            swatch: "#15161A",
            hero: { src: "/products/l-series/lg20/water-ink/hero.jpg", alt: "AULMO LG20 Series switch, water ink" },
            gallery: [
              { src: "/products/l-series/lg20/water-ink/detail.jpg", alt: "AULMO LG20 Series switch and socket detail, water ink" },
            ],
          },
          {
            code: "carbon-gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/lg20/carbon-gray/hero.jpg", alt: "AULMO LG20 Series switch, carbon gray" },
            gallery: [
              { src: "/products/l-series/lg20/carbon-gray/detail.jpg", alt: "AULMO LG20 Series switch detail, carbon gray" },
            ],
          },
          {
            code: "pearl-white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/lg20/pearl-white/hero.jpg", alt: "AULMO LG20 Series switch, pearl white" },
            gallery: [
              { src: "/products/l-series/lg20/pearl-white/family-lineup.jpg", alt: "AULMO LG20 Series product family, pearl white" },
            ],
          },
        ],
      },
      {
        code: "LG30",
        slug: "lg30",
        name: "LG30 Series",
        description:
          "A double-layer embossed panel in four finishes, built for hospitality and residential interiors.",
        spec: "86 × 90 mm module",
        variants: [
          {
            code: "carbon-gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/lg30/carbon-gray/hero.jpg", alt: "AULMO LG30 Series switch, carbon gray" },
            gallery: [
              { src: "/products/l-series/lg30/carbon-gray/detail.jpg", alt: "AULMO LG30 Series product group, carbon gray" },
            ],
          },
          {
            code: "matte-gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/lg30/matte-gold/hero.jpg", alt: "AULMO LG30 Series switch, matte gold" },
            gallery: [
              { src: "/products/l-series/lg30/matte-gold/detail.jpg", alt: "AULMO LG30 Series product group, matte gold" },
            ],
          },
          {
            code: "water-ink",
            name: "Water Ink",
            swatch: "#15161A",
            hero: { src: "/products/l-series/lg30/water-ink/hero.png", alt: "AULMO LG30 Series switch, water ink" },
            gallery: [
              { src: "/products/l-series/lg30/water-ink/detail.jpg", alt: "AULMO LG30 Series product group, water ink" },
            ],
          },
          {
            code: "pearl-white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/lg30/pearl-white/hero.jpg", alt: "AULMO LG30 Series switch, pearl white" },
          },
        ],
      },
    ],
  },
  {
    code: "D",
    slug: "d-series",
    name: "D Series",
    tagline: "Five finishes, one switch and socket line.",
    theme: "SECURE",
    quote: "Exquisite yet safe. Safeguarding Life.",
    description: "A clean, versatile design offered in five studio finishes — from ivory to matte black.",
    image: { src: "/products/d-series/dz/gold/hero.jpg", alt: "AULMO DZ Series switch, champagne gold" },
    imagePosition: "50% 40%",
    subSeries: [
      {
        code: "DZ",
        slug: "dz",
        name: "DZ Series",
        description: "Two-gang switch offered across five finishes.",
        spec: "86 × 90 mm module",
        variants: [
          {
            code: "black",
            name: "Graphite Black",
            swatch: "#17171A",
            hero: { src: "/products/d-series/dz/black/hero.jpg", alt: "AULMO DZ Series switch, graphite black with gold trim" },
          },
          {
            code: "gold",
            name: "Champagne Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/d-series/dz/gold/hero.jpg", alt: "AULMO DZ Series switch, champagne gold" },
          },
          {
            code: "gray",
            name: "Silver Gray",
            swatch: "#8B8D90",
            hero: { src: "/products/d-series/dz/gray/hero.jpg", alt: "AULMO DZ Series switch, gray with silver trim" },
          },
          {
            code: "ivory",
            name: "Ivory",
            swatch: "#E8E1CF",
            hero: { src: "/products/d-series/dz/ivory/hero.jpg", alt: "AULMO DZ Series switch, ivory" },
          },
          {
            code: "white",
            name: "White",
            swatch: "#F4F2ED",
            hero: { src: "/products/d-series/dz/white/hero.jpg", alt: "AULMO DZ Series switch, white with gold trim" },
          },
        ],
      },
    ],
  },
  {
    code: "M",
    slug: "m-series",
    name: "M Series",
    tagline: "Champagne gold, German design.",
    theme: "MATERIAL",
    quote: "Selected materials, durable and long-lasting.",
    description:
      "A diamond-embossed trim border in four finishes — champagne gold, graphite black, gray and pearl white.",
    image: { src: "/products/m-series/m30/gold/hero.jpg", alt: "AULMO M30 Series switch, champagne gold" },
    imagePosition: "50% 42%",
    subSeries: [
      {
        code: "M30",
        slug: "m30",
        name: "M30 Series",
        description: "Two-gang switch with a diamond-embossed trim border, engineered in Germany.",
        spec: "86 × 92 mm module",
        configurations: [
          "1–4 gang switches",
          "Switch + socket combinations",
          "TEL / NET / TV sockets",
          "USB & Type-C sockets",
          "Dimmers & curtain switches",
          "45A switches & junction boxes",
        ],
        variants: [
          {
            code: "black",
            name: "Nebula Ash",
            swatch: "#17171A",
            hero: { src: "/products/m-series/m30/black/hero.jpg", alt: "AULMO M30 Series switch, Nebula Ash black" },
          },
          {
            code: "gold",
            name: "Champagne Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/m-series/m30/gold/hero.jpg", alt: "AULMO M30 Series switch, champagne gold" },
            gallery: [
              { src: "/products/m-series/m30/gold/detail.jpg", alt: "AULMO M30 Series switch detail, champagne gold" },
            ],
          },
          {
            code: "gray",
            name: "Graphite Gray",
            swatch: "#6E7175",
            hero: { src: "/products/m-series/m30/gray/hero.jpg", alt: "AULMO M30 Series switch, graphite gray" },
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/m-series/m30/white/hero.jpg", alt: "AULMO M30 Series switch, pearl white" },
            gallery: [
              { src: "/products/m-series/m30/white/detail.jpg", alt: "AULMO M30 Series switch and socket, pearl white" },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "K",
    slug: "k-series",
    name: "K Series",
    tagline: "Precision switches and outlets.",
    theme: "COLOUR",
    quote: "Fantastic colors, stunning at first glance.",
    description: "A dedicated switch and outlet range within the AULMO product family.",
    image: { src: "/products/k-series/k40/hero.jpg", alt: "AULMO K40 Series switch" },
    imagePosition: "50% 46%",
    subSeries: [
      {
        code: "K30",
        slug: "k30",
        name: "K30 Series",
        description: "K Series K30 module.",
        image: { src: "/products/k-series/k30/hero.jpg", alt: "AULMO K30 Series switch" },
      },
      {
        code: "K40",
        slug: "k40",
        name: "K40 Series",
        description: "K Series K40 module.",
        image: { src: "/products/k-series/k40/hero.jpg", alt: "AULMO K40 Series switch" },
      },
      {
        code: "K50",
        slug: "k50",
        name: "K50 Series",
        description: "K Series K50 module.",
        image: { src: "/products/k-series/k50/hero.jpg", alt: "AULMO K50 Series switch" },
      },
      {
        code: "K60",
        slug: "k60",
        name: "K60 Series",
        description: "K Series K60 module.",
        image: { src: "/products/k-series/k60/hero.jpg", alt: "AULMO K60 Series switch" },
      },
    ],
  },
  {
    code: "S",
    slug: "s-series",
    name: "S Series",
    tagline: "Crystal glass panels, multi-colour.",
    theme: "LIFETIME",
    quote: "Durable and durable with plug and play resistance.",
    description:
      "Glass-crafted panels with a metal inner frame. The face is available in several colour schemes so a single series can be tuned room by room.",
    image: { src: "/marketing/s60-lineup.jpg", alt: "AULMO S Series lineup" },
    imagePosition: "50% 42%",
    subSeries: [
      { code: "S20", slug: "s20", name: "S20 Series", description: "Part of the S Series glass-panel range." },
      { code: "S30", slug: "s30", name: "S30 Series", description: "Part of the S Series glass-panel range." },
      { code: "S50", slug: "s50", name: "S50 Series", description: "Part of the S Series glass-panel range." },
      {
        code: "S60",
        slug: "s60",
        name: "S60 Series",
        description: "Crystal glass panel switch and socket range.",
        image: { src: "/products/s-series/s60/hero.jpg", alt: "AULMO S60 Series glass-panel switch" },
      },
      { code: "S70", slug: "s70", name: "S70 Series", description: "Part of the S Series glass-panel range." },
      { code: "S80", slug: "s80", name: "S80 Series", description: "Part of the S Series glass-panel range." },
      { code: "S90", slug: "s90", name: "S90 Series", description: "Part of the S Series glass-panel range." },
    ],
  },
];
