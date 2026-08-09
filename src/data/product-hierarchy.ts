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
        story:
          "AULMO focuses on details and never compromises. Every look touches the heart. Achieving a new ultra-thin design also requires brilliant technological innovation. Every detail from the inside to outside, we refine, conceive or redesign over and over again. It has not only achieved the beauty of art, but also filled with the beauty of amazing technology.",
        familyImages: [
          {
            src: "/products/l-series/l50/white/white-image1.png",
            alt: "AULMO L Series switches and sockets, product family",
            width: 1700,
            height: 1465,
          },
        ],
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
                src: "/products/l-series/l50/architecture.png",
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
            gallery: [
              {
                src: "/products/l-series/l50/architecture.png",
                alt: "AULMO L50 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/l50/gray/hero.jpg", alt: "AULMO L50 Series switch, carbon gray" },
            gallery: [
              {
                src: "/products/l-series/l50/gray/detail.png",
                alt: "AULMO L50 Series switch detail, carbon gray",
                label: "Detail",
              },
              {
                src: "/products/l-series/l50/gray/lifestyle.png",
                alt: "AULMO L50 Series switch installed on a wall, carbon gray",
                label: "Installed",
              },
              {
                src: "/products/l-series/l50/architecture.png",
                alt: "AULMO L50 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/l50/white/hero.jpg", alt: "AULMO L50 Series switch, pearl white" },
            gallery: [
              {
                src: "/products/l-series/l50/white/family-lineup.png",
                alt: "AULMO L50 Series product family, pearl white",
                label: "Configurations",
              },
              {
                src: "/products/l-series/l50/architecture.png",
                alt: "AULMO L50 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
        ],
      },
      {
        code: "L60",
        slug: "l60",
        name: "L60 Series",
        description: "Two-gang switch and socket range with a woven-texture face.",
        spec: "86 × 90 mm module",
        parameters: [
          { label: "Color", value: "White / Gray / Gold / Black" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 90 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/l-series/l60/family-lineup.jpg",
            alt: "AULMO L60 Series switch, pearl white, lifestyle installation",
            width: 1700,
            height: 2265,
          },
        ],
        variants: [
          {
            code: "black",
            name: "Ink Black",
            swatch: "#17171A",
            hero: { src: "/products/l-series/l60/black/hero.png", alt: "AULMO L60 Series switch, ink black" },
            gallery: [
              {
                src: "/products/l-series/l60/architecture.png",
                alt: "AULMO L60 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/l60/gold/hero.jpg", alt: "AULMO L60 Series switch, matte gold" },
            gallery: [
              {
                src: "/products/l-series/l60/architecture.png",
                alt: "AULMO L60 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/l60/gray/hero.jpg", alt: "AULMO L60 Series switch, carbon gray" },
            gallery: [
              {
                src: "/products/l-series/l60/architecture.png",
                alt: "AULMO L60 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/l60/white/hero.jpg", alt: "AULMO L60 Series switch, pearl white" },
            gallery: [
              {
                src: "/products/l-series/l60/lifestyle.jpg",
                alt: "AULMO L60 Series switch installed on a wall, pearl white",
                label: "Installed",
              },
              {
                src: "/products/l-series/l60/architecture.png",
                alt: "AULMO L60 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
        ],
      },
      {
        code: "L80",
        slug: "l80",
        name: "L80 Series",
        description: "Four-gang control plate with a curved profile and glowing accent edge.",
        spec: "86 × 90 mm module",
        parameters: [
          { label: "Color", value: "White / Gray / Gold / Black" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 90 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/l-series/l80/family-lineup.jpg",
            alt: "AULMO L80 Series control plate, pearl white, product lineup",
            width: 1700,
            height: 2430,
          },
        ],
        variants: [
          {
            code: "black",
            name: "Matte Black",
            swatch: "#17171A",
            hero: { src: "/products/l-series/l80/black/hero.jpg", alt: "AULMO L80 Series control plate, matte black" },
            gallery: [
              {
                src: "/products/l-series/l80/architecture.png",
                alt: "AULMO L80 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/l80/gold/hero.jpg", alt: "AULMO L80 Series control plate, matte gold" },
            gallery: [
              {
                src: "/products/l-series/l80/architecture.png",
                alt: "AULMO L80 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gray",
            name: "Graphite Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/l80/gray/hero.jpg", alt: "AULMO L80 Series control plate, graphite gray" },
            gallery: [
              {
                src: "/products/l-series/l80/architecture.png",
                alt: "AULMO L80 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/l80/white/hero.jpg", alt: "AULMO L80 Series control plate, pearl white" },
            gallery: [
              {
                src: "/products/l-series/l80/l80-series.png",
                alt: "AULMO L80 Series control plate detail, pearl white, glowing accent edge",
                label: "Detail",
              },
              {
                src: "/products/l-series/l80/architecture.png",
                alt: "AULMO L80 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
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
        parameters: [
          { label: "Color", value: "Water Ink Black / Carbon Gray / Matte Gold / Pearl White / Silvery" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 90 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/l-series/lg20/lg20-imag1.png",
            alt: "AULMO LG20 Series switches and sockets, pearl white, product configurations",
            width: 1700,
            height: 2103,
          },
          {
            src: "/products/l-series/lg20/material-description.png",
            alt: "AULMO LG20 Series material description and exploded view",
            width: 1700,
            height: 1966,
          },
        ],
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
            gallery: [
              {
                src: "/products/l-series/lg20/architecture.png",
                alt: "AULMO LG20 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/l-series/lg20/material-description.png",
                alt: "AULMO LG20 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "silvery",
            name: "Silvery",
            swatch: "linear-gradient(105deg,#C7C4BE,#E9E7E2 44%,#AFACA6)",
            hero: { src: "/products/l-series/lg20/silvery/hero.jpg", alt: "AULMO LG20 Series switch, silvery" },
            gallery: [
              { src: "/products/l-series/lg20/silvery/detail.jpg", alt: "AULMO LG20 Series switch and socket detail, silvery" },
              {
                src: "/products/l-series/lg20/architecture.png",
                alt: "AULMO LG20 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/l-series/lg20/material-description.png",
                alt: "AULMO LG20 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "water-ink",
            name: "Water Ink",
            swatch: "#15161A",
            hero: { src: "/products/l-series/lg20/water-ink/hero.jpg", alt: "AULMO LG20 Series switch, water ink" },
            gallery: [
              { src: "/products/l-series/lg20/water-ink/detail.jpg", alt: "AULMO LG20 Series switch and socket detail, water ink" },
              {
                src: "/products/l-series/lg20/architecture.png",
                alt: "AULMO LG20 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/l-series/lg20/material-description.png",
                alt: "AULMO LG20 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "carbon-gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/lg20/carbon-gray/hero.jpg", alt: "AULMO LG20 Series switch, carbon gray" },
            gallery: [
              { src: "/products/l-series/lg20/carbon-gray/detail.jpg", alt: "AULMO LG20 Series switch detail, carbon gray" },
              {
                src: "/products/l-series/lg20/architecture.png",
                alt: "AULMO LG20 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/l-series/lg20/material-description.png",
                alt: "AULMO LG20 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "pearl-white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/lg20/pearl-white/hero.jpg", alt: "AULMO LG20 Series switch, pearl white" },
            gallery: [
              { src: "/products/l-series/lg20/pearl-white/family-lineup.jpg", alt: "AULMO LG20 Series product family, pearl white" },
              {
                src: "/products/l-series/lg20/architecture.png",
                alt: "AULMO LG20 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/l-series/lg20/material-description.png",
                alt: "AULMO LG20 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
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
        parameters: [
          { label: "Color", value: "Water Ink Black / Carbon Gray / Matte Gold / Pearl White / Silvery" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 90 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/l-series/lg30/lg30-image1.png",
            alt: "AULMO, Touches the New World — LG30 Series brand statement",
            width: 1700,
            height: 1575,
          },
          {
            src: "/products/l-series/lg30/lg30-series.png",
            alt: "AULMO LG30 Series switch and socket, pearl white",
            width: 1700,
            height: 2285,
          },
        ],
        variants: [
          {
            code: "carbon-gray",
            name: "Carbon Gray",
            swatch: "#6E7175",
            hero: { src: "/products/l-series/lg30/carbon-gray/hero.jpg", alt: "AULMO LG30 Series switch, carbon gray" },
            gallery: [
              { src: "/products/l-series/lg30/carbon-gray/detail.jpg", alt: "AULMO LG30 Series product group, carbon gray" },
              {
                src: "/products/l-series/lg30/architecture.png",
                alt: "AULMO LG30 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "matte-gold",
            name: "Matte Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/l-series/lg30/matte-gold/hero.jpg", alt: "AULMO LG30 Series switch, matte gold" },
            gallery: [
              { src: "/products/l-series/lg30/matte-gold/detail.jpg", alt: "AULMO LG30 Series product group, matte gold" },
              {
                src: "/products/l-series/lg30/architecture.png",
                alt: "AULMO LG30 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "water-ink",
            name: "Water Ink",
            swatch: "#15161A",
            hero: { src: "/products/l-series/lg30/water-ink/hero.png", alt: "AULMO LG30 Series switch, water ink" },
            gallery: [
              { src: "/products/l-series/lg30/water-ink/detail.jpg", alt: "AULMO LG30 Series product group, water ink" },
              {
                src: "/products/l-series/lg30/architecture.png",
                alt: "AULMO LG30 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "pearl-white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/l-series/lg30/pearl-white/hero.jpg", alt: "AULMO LG30 Series switch, pearl white" },
            gallery: [
              {
                src: "/products/l-series/lg30/architecture.png",
                alt: "AULMO LG30 Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
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
    image: {
      src: "/products/d-series/banner.png",
      alt: "AULMO DZ Series switches — graphite black, champagne gold, and platinum gray — timeless design",
    },
    imagePosition: "50% 30%",
    heroStyle: "banner",
    cardImage: { src: "/products/d-series/dz/gold/hero.jpg", alt: "AULMO DZ Series switch, champagne gold" },
    subSeries: [
      {
        code: "DZ",
        slug: "dz",
        name: "DZ Series",
        description: "Two-gang switch offered across five finishes.",
        spec: "86 × 90 mm module",
        parameters: [
          { label: "Color", value: "White / Gray / Gold / Black / Ivory" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 90 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/d-series/dz/profiling-diagram.png",
            alt: "AULMO DZ Series socket profiling diagram",
            width: 1700,
            height: 1901,
          },
          {
            src: "/products/d-series/dz/black/detail.png",
            alt: "AULMO DZ Series switch detail, graphite black",
            width: 1700,
            height: 2105,
          },
        ],
        variants: [
          {
            code: "black",
            name: "Graphite Black",
            swatch: "#17171A",
            hero: { src: "/products/d-series/dz/black/hero.jpg", alt: "AULMO DZ Series switch, graphite black with gold trim" },
            gallery: [
              {
                src: "/products/d-series/dz/black/detail.png",
                alt: "AULMO DZ Series switch detail, graphite black",
                label: "Detail",
              },
              {
                src: "/products/d-series/dz/architecture.png",
                alt: "AULMO DZ Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/d-series/dz/profiling-diagram.png",
                alt: "AULMO DZ Series socket profiling diagram",
                fit: "contain",
                label: "Exploded View",
              },
            ],
          },
          {
            code: "gold",
            name: "Champagne Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/d-series/dz/gold/hero.jpg", alt: "AULMO DZ Series switch, champagne gold" },
            gallery: [
              {
                src: "/products/d-series/dz/architecture.png",
                alt: "AULMO DZ Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/d-series/dz/profiling-diagram.png",
                alt: "AULMO DZ Series socket profiling diagram",
                fit: "contain",
                label: "Exploded View",
              },
            ],
          },
          {
            code: "gray",
            name: "Silver Gray",
            swatch: "#8B8D90",
            hero: { src: "/products/d-series/dz/gray/hero.jpg", alt: "AULMO DZ Series switch, gray with silver trim" },
            gallery: [
              {
                src: "/products/d-series/dz/architecture.png",
                alt: "AULMO DZ Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/d-series/dz/profiling-diagram.png",
                alt: "AULMO DZ Series socket profiling diagram",
                fit: "contain",
                label: "Exploded View",
              },
            ],
          },
          {
            code: "ivory",
            name: "Ivory",
            swatch: "#E8E1CF",
            hero: { src: "/products/d-series/dz/ivory/hero.jpg", alt: "AULMO DZ Series switch, ivory" },
            gallery: [
              {
                src: "/products/d-series/dz/architecture.png",
                alt: "AULMO DZ Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/d-series/dz/profiling-diagram.png",
                alt: "AULMO DZ Series socket profiling diagram",
                fit: "contain",
                label: "Exploded View",
              },
            ],
          },
          {
            code: "white",
            name: "White",
            swatch: "#F4F2ED",
            hero: { src: "/products/d-series/dz/white/hero.jpg", alt: "AULMO DZ Series switch, white with gold trim" },
            gallery: [
              {
                src: "/products/d-series/dz/architecture.png",
                alt: "AULMO DZ Series dimension diagram, 86 x 90 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/d-series/dz/profiling-diagram.png",
                alt: "AULMO DZ Series socket profiling diagram",
                fit: "contain",
                label: "Exploded View",
              },
            ],
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
    image: {
      src: "/products/m-series/banner.png",
      alt: "AULMO M Series switches — champagne gold, graphite black, graphite gray, pearl white and natural wood veneer",
    },
    heroStyle: "banner",
    cardImage: { src: "/products/m-series/m30/gold/hero.jpg", alt: "AULMO M30 Series switch, champagne gold" },
    subSeries: [
      {
        code: "M30",
        slug: "m30",
        name: "M30 Series",
        description: "Two-gang switch with a diamond-embossed trim border, engineered in Germany.",
        spec: "86 × 92 mm module",
        parameters: [
          { label: "Color", value: "White / Gray / Gold / Black" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 92 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/m-series/m30/brand-statement.png",
            alt: "AULMO M30 Series — German design brand statement",
            width: 1700,
            height: 2478,
          },
          {
            src: "/products/m-series/m30/profiling-diagram.png",
            alt: "AULMO M30 Series switch profiling diagram",
            width: 1700,
            height: 1400,
          },
        ],
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
            gallery: [
              {
                src: "/products/m-series/architecture.png",
                alt: "AULMO M30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gold",
            name: "Champagne Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/m-series/m30/gold/hero.jpg", alt: "AULMO M30 Series switch, champagne gold" },
            gallery: [
              { src: "/products/m-series/m30/gold/detail.jpg", alt: "AULMO M30 Series switch detail, champagne gold" },
              {
                src: "/products/m-series/architecture.png",
                alt: "AULMO M30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gray",
            name: "Graphite Gray",
            swatch: "#6E7175",
            hero: { src: "/products/m-series/m30/gray/hero.jpg", alt: "AULMO M30 Series switch, graphite gray" },
            gallery: [
              {
                src: "/products/m-series/architecture.png",
                alt: "AULMO M30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/m-series/m30/white/hero.jpg", alt: "AULMO M30 Series switch, pearl white" },
            gallery: [
              { src: "/products/m-series/m30/white/detail.jpg", alt: "AULMO M30 Series switch and socket, pearl white" },
              {
                src: "/products/m-series/architecture.png",
                alt: "AULMO M30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
        ],
      },
      {
        code: "M50",
        slug: "m50",
        name: "M50 Series",
        description:
          "Two-gang switch with a diamond-embossed trim border in natural wood veneer, engineered in Germany.",
        spec: "86 × 92 mm module",
        familyImages: [
          {
            src: "/products/m-series/m30/brand-statement.png",
            alt: "AULMO M Series — German design brand statement",
            width: 1700,
            height: 2478,
          },
          {
            src: "/products/m-series/m30/profiling-diagram.png",
            alt: "AULMO M Series switch profiling diagram",
            width: 1700,
            height: 1400,
          },
        ],
        variants: [
          {
            code: "black",
            name: "Espresso Walnut",
            swatch: "linear-gradient(105deg,#7A4530,#A75235 46%,#4A2A1C)",
            hero: { src: "/products/m-series/m50/black/hero.png", alt: "AULMO M50 Series switch, espresso walnut" },
            gallery: [
              {
                src: "/products/m-series/architecture.png",
                alt: "AULMO M50 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "white",
            name: "Golden Oak",
            swatch: "linear-gradient(105deg,#D9A66B,#EDB680 46%,#B9814A)",
            hero: { src: "/products/m-series/m50/white/hero.png", alt: "AULMO M50 Series switch, golden oak" },
            gallery: [
              {
                src: "/products/m-series/architecture.png",
                alt: "AULMO M50 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
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
    image: { src: "/products/k-series/banner.png", alt: "AULMO K Series switch installed on a wall" },
    heroStyle: "banner",
    cardImage: { src: "/products/k-series/k30/black/hero.png", alt: "AULMO K30 Series switch, ink black" },
    subSeries: [
      {
        code: "K30",
        slug: "k30",
        name: "K30 Series",
        description: "Four-gang switch offered across four finishes.",
        spec: "86 × 92 mm module",
        parameters: [
          { label: "Color", value: "White / Gray / Gold / Black" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 92 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/k-series/k30/brand-statement.png",
            alt: "AULMO K30 Series switch and socket, ink black",
            width: 1700,
            height: 1948,
          },
          {
            src: "/products/k-series/k30/family-lineup.png",
            alt: "AULMO K30 Series switch and socket lineup, silver gray",
            width: 1700,
            height: 2400,
          },
          {
            src: "/products/k-series/k30/mechanism-detail.png",
            alt: "AULMO K30 Series internal mechanism detail",
            width: 1700,
            height: 955,
          },
          {
            src: "/products/k-series/k30/logo-detail.png",
            alt: "AULMO K30 Series logo detail, ink black",
            width: 1700,
            height: 780,
          },
        ],
        variants: [
          {
            code: "black",
            name: "Ink Black",
            swatch: "#17171A",
            hero: { src: "/products/k-series/k30/black/hero.png", alt: "AULMO K30 Series switch, ink black" },
            gallery: [
              {
                src: "/products/k-series/k30/architecture.png",
                alt: "AULMO K30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gold",
            name: "Champagne Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/k-series/k30/gold/hero.png", alt: "AULMO K30 Series switch, champagne gold" },
            gallery: [
              {
                src: "/products/k-series/k30/architecture.png",
                alt: "AULMO K30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "gray",
            name: "Silver Gray",
            swatch: "#8B8D90",
            hero: { src: "/products/k-series/k30/gray/hero.png", alt: "AULMO K30 Series switch, silver gray" },
            gallery: [
              {
                src: "/products/k-series/k30/architecture.png",
                alt: "AULMO K30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
          {
            code: "white",
            name: "Pearl White",
            swatch: "#F4F2ED",
            hero: { src: "/products/k-series/k30/white/hero.png", alt: "AULMO K30 Series switch, pearl white" },
            gallery: [
              {
                src: "/products/k-series/k30/architecture.png",
                alt: "AULMO K30 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
        ],
      },
      {
        code: "K40",
        slug: "k40",
        name: "K40 Series",
        description: "Four-gang switch offered across four finishes.",
        spec: "86 × 92 mm module",
        parameters: [
          { label: "Color", value: "Coffee Gold / Red / Gold / Bright Gold" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 92 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/k-series/k40/color-range.png",
            alt: "AULMO K40 Series switch, coffee gold, red, gold and bright gold",
            width: 1700,
            height: 2261,
          },
          {
            src: "/products/k-series/k40/lifestyle.png",
            alt: "AULMO K40 Series switch and socket installed, gold",
            width: 1700,
            height: 1847,
          },
        ],
        variants: [
          {
            code: "gold",
            name: "Gold",
            swatch: "linear-gradient(105deg,#C9A053,#E8CB8C 46%,#A9803A)",
            hero: { src: "/products/k-series/k40/gold/hero.png", alt: "AULMO K40 Series switch, gold" },
            gallery: [
              {
                src: "/products/k-series/k40/architecture.png",
                alt: "AULMO K40 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
        ],
      },
      {
        code: "K50",
        slug: "k50",
        name: "K50 Series",
        description: "Four-gang switch in a wood-grain finish, offered across three colors.",
        spec: "86 × 92 mm module",
        parameters: [
          { label: "Color", value: "Pine Color / Red Wood Grain / Yellow Wood Grain" },
          { label: "Material (panel)", value: "PC" },
          { label: "Size", value: "86 × 92 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/k-series/k50/craftsmanship.png",
            alt: "AULMO K50 Series — ecological wooden craftsmanship",
            width: 1700,
            height: 1749,
          },
          {
            src: "/products/k-series/k50/color-range.png",
            alt: "AULMO K50 Series switch, red wood grain, pine color and yellow wood grain",
            width: 1700,
            height: 1115,
          },
        ],
        variants: [
          {
            code: "yellow-wood-grain",
            name: "Yellow Wood Grain",
            swatch: "linear-gradient(105deg,#E8B23C,#F3CE7A 46%,#B8801E)",
            hero: {
              src: "/products/k-series/k50/yellow-wood-grain/hero.png",
              alt: "AULMO K50 Series switch, yellow wood grain",
            },
            gallery: [
              {
                src: "/products/k-series/k50/yellow-wood-grain/detail.png",
                alt: "AULMO K50 Series switch and socket detail, yellow wood grain",
              },
              {
                src: "/products/k-series/k50/architecture.png",
                alt: "AULMO K50 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
            ],
          },
        ],
      },
      {
        code: "K60",
        slug: "k60",
        name: "K60 Series",
        description: "Ornate embossed switch offered across four metallic finishes.",
        spec: "86 × 92 mm module",
        parameters: [
          { label: "Color", value: "Bright Gold / Copper / Bronze / Rose Gold" },
          { label: "Material (panel)", value: "PC+Zinc Alloy" },
          { label: "Size", value: "86 × 92 mm" },
          { label: "Max. Current", value: "16A" },
          { label: "Max. Voltage", value: "250V" },
        ],
        familyImages: [
          {
            src: "/products/k-series/k60/brand-statement.png",
            alt: "AULMO K60 Series — fashionable and minimalist design brand statement",
            width: 1700,
            height: 1389,
          },
          {
            src: "/products/k-series/k60/rose-gold/detail.png",
            alt: "AULMO K60 Series switch detail, rose gold",
            width: 1700,
            height: 1151,
          },
        ],
        variants: [
          {
            code: "bright-gold",
            name: "Bright Gold",
            swatch: "linear-gradient(105deg,#FCE9A8,#FBDC81 46%,#D9AE47)",
            hero: { src: "/products/k-series/k60/bright-gold/hero.png", alt: "AULMO K60 Series switch, bright gold" },
            gallery: [
              {
                src: "/products/k-series/k60/bright-gold/brand-statement.png",
                alt: "AULMO K60 Series switch and socket, bright gold",
                fit: "contain",
                label: "Detail",
              },
              {
                src: "/products/k-series/k60/architecture.png",
                alt: "AULMO K60 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/k-series/k60/materials-description.png",
                alt: "AULMO K60 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "bronze",
            name: "Bronze",
            swatch: "linear-gradient(105deg,#A8A8A8,#888888 46%,#5E5E5E)",
            hero: { src: "/products/k-series/k60/bronze/hero.png", alt: "AULMO K60 Series switch, bronze" },
            gallery: [
              {
                src: "/products/k-series/k60/bronze/detail.png",
                alt: "AULMO K60 Series switch detail, bronze",
                label: "Detail",
              },
              {
                src: "/products/k-series/k60/bronze/lifestyle.png",
                alt: "AULMO K60 Series switch installed on a wall, bronze",
                label: "Installed",
              },
              {
                src: "/products/k-series/k60/architecture.png",
                alt: "AULMO K60 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/k-series/k60/materials-description.png",
                alt: "AULMO K60 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "copper",
            name: "Copper",
            swatch: "linear-gradient(105deg,#8C5A4A,#4C3A3A 46%,#2E2020)",
            hero: { src: "/products/k-series/k60/copper/hero.png", alt: "AULMO K60 Series switch, copper" },
            gallery: [
              {
                src: "/products/k-series/k60/architecture.png",
                alt: "AULMO K60 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/k-series/k60/materials-description.png",
                alt: "AULMO K60 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
          {
            code: "rose-gold",
            name: "Rose Gold",
            swatch: "linear-gradient(105deg,#F5ECD8,#EADFC1 46%,#CBB98F)",
            hero: { src: "/products/k-series/k60/rose-gold/hero.png", alt: "AULMO K60 Series switch, rose gold" },
            gallery: [
              {
                src: "/products/k-series/k60/rose-gold/detail.png",
                alt: "AULMO K60 Series switch detail, rose gold",
                label: "Detail",
              },
              {
                src: "/products/k-series/k60/architecture.png",
                alt: "AULMO K60 Series dimension diagram, 86 x 92 mm",
                fit: "contain",
                label: "Dimensions",
              },
              {
                src: "/products/k-series/k60/materials-description.png",
                alt: "AULMO K60 Series material description and exploded view",
                fit: "contain",
                label: "Materials",
              },
            ],
          },
        ],
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
      { code: "S20", slug: "s20", name: "S20 Series", description: "S20 module in the AULMO S Series glass-panel switch and socket range." },
      { code: "S30", slug: "s30", name: "S30 Series", description: "S30 module in the AULMO S Series glass-panel switch and socket range." },
      { code: "S50", slug: "s50", name: "S50 Series", description: "S50 module in the AULMO S Series glass-panel switch and socket range." },
      {
        code: "S60",
        slug: "s60",
        name: "S60 Series",
        description: "Crystal glass panel switch and socket range.",
        image: { src: "/products/s-series/s60/hero.jpg", alt: "AULMO S60 Series glass-panel switch" },
      },
      { code: "S70", slug: "s70", name: "S70 Series", description: "S70 module in the AULMO S Series glass-panel switch and socket range." },
      { code: "S80", slug: "s80", name: "S80 Series", description: "S80 module in the AULMO S Series glass-panel switch and socket range." },
      { code: "S90", slug: "s90", name: "S90 Series", description: "S90 module in the AULMO S Series glass-panel switch and socket range." },
    ],
  },
];
