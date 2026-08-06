# AULMO

A static product-catalogue website for AULMO Electric International — switches,
sockets and control panels built to a single 86&nbsp;mm module. No e-commerce, no
backend: every page is statically generated from TypeScript content at build time.

See [`CLAUDE.md`](./CLAUDE.md) for the full project rules (architecture, product
hierarchy, design preservation) and [`PLAN.md`](./PLAN.md) /
[`DESIGN.md`](./DESIGN.md) for current progress.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) (configured in `src/app/globals.css`, no `tailwind.config.js`)
- [Framer Motion](https://motion.dev) for scroll reveals and micro-interactions

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (static-generates every route) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Run `lint`, `typecheck`, and `build` before considering any change finished — see
[`CLAUDE.md`](./CLAUDE.md#verifying-a-change).

## Project structure

```
src/
├── app/                 Routes: /, /about, /products, /products/[series],
│                        /products/[series]/[subseries], /certificate, /contact
├── components/
│   ├── layout/           Navbar (+ mega menu), Footer — shared by every page
│   ├── home/              Homepage-only sections (Hero, ProductGallery,
│   │                      InteriorGallery, InteractiveProductView, ...)
│   ├── products/         SeriesSubCard, FinishSelector, ProductGallery,
│   │                      ProductVariantExperience — reusable across every product
│   └── ui/                Reusable primitives (Reveal, MagneticLink, Lightbox,
│                          Breadcrumb, ImagePlaceholder, Loader, ChatWidget, ...)
├── data/                 Static content, plain TypeScript objects/arrays
└── lib/                  Accessor functions — pages read content through here,
                          never straight from src/data/
public/
├── brand/                Logo
├── marketing/            Homepage editorial imagery (not tied to one SKU)
├── products/<series>/<subseries>/<finish>/   Per-finish photography
└── video/                Hero background video
```

## The product hierarchy

Five series. L, D and M have real photography and color/finish variants; K and
S are still placeholders pending their own asset libraries. T Series (Power
Track) was removed at the client's request — it never had any photography.

```
L Series  — L50 (black/gold/gray/white), L60 (gold/gray/white),
            L80 (black/gold/gray/white),
            LG20 (matte gold/silvery/water ink/carbon gray/pearl white),
            LG30 (carbon gray/matte gold/water ink/pearl white)
D Series  — DZ (black/gold/gray/ivory/white)
M Series  — M30 (Nebula Ash black/champagne gold/graphite gray/pearl white)
K Series  — K30, K40, K50, K60
S Series  — S20, S30, S50, S60, S70, S80, S90
```

This lives in **one file**, `src/data/product-hierarchy.ts`, and drives the
products mega-menu, the `/products` routes, the homepage series showcases, and
related-product links. Nothing else duplicates this structure.

### Adding a new product (no finish variants — K/S style)

1. Drop its photo in `public/products/<series-slug>/<subseries-slug>/hero.jpg`.
2. Add an entry under the right series in `src/data/product-hierarchy.ts`:
   ```ts
   {
     code: "K70",
     slug: "k70",
     name: "K70 Series",
     description: "…",
     image: { src: "/products/k-series/k70/hero.jpg", alt: "…" },
   }
   ```
3. Done — the mega menu and all `/products` pages pick it up automatically
   (routes are statically generated from this file via `generateStaticParams`).

### Adding a new color/finish variant (L/D/M style)

Products with multiple real color options use `variants` instead of a plain
`image`. Each variant is self-contained — its own hero photo, and optionally its
own gallery of supporting shots.

1. Create a folder for the finish and drop its photo(s) in it:
   `public/products/<series-slug>/<subseries-slug>/<finish-slug>/hero.jpg`
   (add `detail.jpg`, `lifestyle.jpg`, etc. alongside it for extra gallery shots
   of **that finish specifically** — never reuse another finish's photo).
2. Add a `ProductVariant` entry to that sub-series's `variants` array:
   ```ts
   {
     code: "black",
     name: "Ink Black",
     swatch: "#17171A",              // CSS color or gradient for the swatch chip
     hero: { src: "/products/l-series/l50/black/hero.jpg", alt: "…" },
     gallery: [                       // optional — omit if you only have the hero shot
       { src: "/products/l-series/l50/black/detail.jpg", alt: "…" },
     ],
   }
   ```
3. Done — the finish selector, the gallery, the mega-menu thumbnail, and (for L
   Series) the homepage showcase all update automatically. No component code
   changes needed.

**If a color/finish has no real photo yet, don't add it.** Leave it out of
`variants` rather than adding an entry with no image — the UI has no fake-image
fallback for variants, by design. See `CLAUDE.md` → "Photography rules" for the
reasoning (and a real gotcha we hit: some supplied images are marketing
composites with printed text baked into the photo — check before using one as a
clean gallery image).

### Updating an existing product or finish

Edit its entry in `src/data/product-hierarchy.ts` directly — name, description,
spec, swatch color, or image paths. No other file needs to change.

### Adding a new sub-series or series

Add a new `ProductSubSeries` object (with its own `variants` or `image`) to a
series's `subSeries` array, or a whole new top-level series object to the
`productHierarchy` array. Both the `/products/[series]` and
`/products/[series]/[subseries]` routes are statically generated from this file
via `generateStaticParams` — no route code changes needed either way.

## Brand assets & navigation

- Logo: `public/brand/aulmo-logo.png` — always use this file; don't recreate it.
- Hero video: `public/video/hero-switches.mp4`. The homepage hero is approved —
  don't redesign it without asking first.
- Top navigation (`Home · About Us · Products · Certificate · Contact`) is
  defined in `src/components/layout/Navbar.tsx`. Changing it is a deliberate
  content decision — confirm with the user before editing the required set in
  `CLAUDE.md`.

## Deployment

The site is fully static (no environment variables, no backend). `npm run build`
static-generates all 33 routes; deploy the result to any Next.js-compatible host
(Vercel, or `next start` behind a Node process).
