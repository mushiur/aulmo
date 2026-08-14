# AULMO

A static product-catalogue website for AULMO Electric International — switches,
sockets and control panels built to a single 86&nbsp;mm module — plus a distributed
Circuit Breaker catalogue (MCB/MCCB/Magnetic Contactor from Schneider Electric, ABB,
Legrand, Hyundai, CHINT and others). No e-commerce, no backend: every page is
statically generated from TypeScript content at build time. Primary contact is
WhatsApp (`wa.me`), with `tel:` links wherever a button is explicitly labeled "Call."

See [`CLAUDE.md`](./CLAUDE.md) for the full project rules (architecture, product
hierarchy, Circuit Breaker vertical, design preservation) and
[`PLAN.md`](./PLAN.md) / [`DESIGN.md`](./DESIGN.md) for current progress.

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
├── app/                 Routes: /, /about-us (+ /workshop), /products,
│                        /products/[series], /products/[series]/[subseries],
│                        /products/circuit-breaker (+ /[category]),
│                        /certificate, /contact
├── components/
│   ├── layout/           Navbar (+ mega menu, About Us dropdown, mobile
│   │                      drill-down accordion), Footer — shared by every page
│   ├── home/              Homepage-only sections (Hero, ProductGallery,
│   │                      InteriorGallery, InteractiveProductView, BrandBand, ...)
│   ├── products/         SeriesSubCard, FinishSelector, ProductGallery,
│   │                      ProductVariantExperience — reusable across every product
│   ├── circuit-breaker/  PoleSelector, CircuitBreakerCard, CircuitBreakerFilters,
│   │                      CircuitBreakerListing, BrandGrid
│   └── ui/                Reusable primitives (Reveal, MagneticLink, Lightbox,
│                          Breadcrumb, ImagePlaceholder, Loader, ChatWidget, ...)
├── data/                 Static content — hand-editable JSON where the client
│                         edits it: product-hierarchy.json (switches/sockets)
│                         and circuit-breaker-catalog.json (distributed brands)
│                         are separate data models, not merged
└── lib/                  Accessor functions — pages read content through here,
                          never straight from src/data/
public/
├── brand/                Logo
├── marketing/            Homepage editorial imagery (not tied to one SKU)
├── products/<series>/<subseries>/<finish>/   Per-finish photography (real)
├── images/products/circuit-breaker/<category>/  Placeholder imagery (mock,
│                        predictable filenames — swap for real product photos later)
├── workshop/             Real manufacturing-floor photography (/about-us/workshop)
└── video/                Hero background video
```

## The product hierarchy

Five series, all with real photography and color/finish variants now. T Series
(Power Track) was removed at the client's request — it never had any
photography. Only S50 and S80 remain unbuilt, pending their own asset
libraries.

```
L Series  — L50 (black/gold/gray/white), L60 (black/gold/gray/white),
            L80 (black/gold/gray/white),
            LG20 (matte gold/silvery/water ink/carbon gray/pearl white),
            LG30 (carbon gray/matte gold/water ink/pearl white)
D Series  — DZ (black/gold/gray/ivory/white)
M Series  — M30 (Nebula Ash black/champagne gold/graphite gray/pearl white),
            M50 (espresso walnut/golden oak — wood-veneer, not metal-look)
K Series  — K30 (ink black/champagne gold/silver gray/pearl white),
            K40 (gold only so far), K50 (yellow wood grain only so far),
            K60 (bright gold/bronze/copper/rose gold)
S Series  — S20 (black/gold/gray/white), S30 (black/gold/gray/white),
            S60 (black/gray/gold/white/red), S90 (black/blue/orange/wine red)
            — S50 and S80 not built yet
```

This lives in **one file**, `src/data/product-hierarchy.json` — a
hand-editable JSON content file (see its own `_instructions` block) — and
drives the products mega-menu, the `/products` routes, the homepage series
showcases, and related-product links. Nothing else duplicates this structure.
Every sub-series carries an `isDeleted` flag (default `false`); flip it to
`true` to retire an item without losing its content — it keeps appearing
everywhere with a "Currently Unavailable" sticker instead of disappearing,
and is simply excluded from the homepage/mega-menu "featured" picks. See
`CLAUDE.md` → "The product hierarchy" for the evidence-based rule this is
built on (never add a finish because a spec names it — only once a real photo
confirms it) and the full per-series notes.

## Circuit Breaker — a second, separate catalogue

`/products/circuit-breaker` and `/products/circuit-breaker/[category]` (MCB,
MCCB, Magnetic Contactor) distribute third-party circuit-protection brands
(Schneider Electric, ABB, Legrand, Hyundai, CHINT, CNC Breaker, CNS Circuit
Breaker) alongside AULMO's own product line above. This is a **deliberately
separate data model** — `src/data/circuit-breaker-catalog.json` /
`src/lib/circuit-breakers.ts` — not part of `product-hierarchy.json`.

Every listing is **structured mock data**, not a verified real catalog: ratings
use common industry-standard values (16A, C-curve, 6kA, 230/400V) as
placeholders. Product images live at
`public/images/products/circuit-breaker/<category>/` with predictable
filenames (`mcb-sp-placeholder.png`, etc.) specifically so real photography can
replace them file-for-file later with no code changes. No prices, no cart —
"View Details" links to `/contact`, same as the real product pages. See
`CLAUDE.md` → "Circuit Breaker" for the full architecture notes.

### Adding a new product (no finish variants — K/S style)

1. Drop its photo in `public/products/<series-slug>/<subseries-slug>/hero.jpg`.
2. Add an entry under the right series in `src/data/product-hierarchy.json`:
   ```json
   {
     "code": "K70",
     "slug": "k70",
     "name": "K70 Series",
     "description": "…",
     "image": { "src": "/products/k-series/k70/hero.jpg", "alt": "…" },
     "isDeleted": false
   }
   ```
3. Done — the mega menu and all `/products` pages pick it up automatically
   (routes are statically generated from this file via `generateStaticParams`).

To retire an item instead of deleting it, set its `isDeleted` to `true` — it
keeps showing everywhere with a "Currently Unavailable" sticker instead of
disappearing (see `CLAUDE.md` → "The product hierarchy").

### Adding a new color/finish variant (L/D/M style)

Products with multiple real color options use `variants` instead of a plain
`image`. Each variant is self-contained — its own hero photo, and optionally its
own gallery of supporting shots.

1. Create a folder for the finish and drop its photo(s) in it:
   `public/products/<series-slug>/<subseries-slug>/<finish-slug>/hero.jpg`
   (add `detail.jpg`, `lifestyle.jpg`, etc. alongside it for extra gallery shots
   of **that finish specifically** — never reuse another finish's photo).
2. Add a `ProductVariant` entry to that sub-series's `variants` array:
   ```json
   {
     "code": "black",
     "name": "Ink Black",
     "swatch": "#17171A",
     "hero": { "src": "/products/l-series/l50/black/hero.jpg", "alt": "…" },
     "gallery": [
       { "src": "/products/l-series/l50/black/detail.jpg", "alt": "…" }
     ]
   }
   ```
   (`swatch` is the CSS color/gradient for the finish selector's swatch chip;
   `gallery` is optional — omit it if you only have the hero shot.)
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

Edit its entry in `src/data/product-hierarchy.json` directly — name, description,
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
  defined in `src/components/layout/Navbar.tsx`. `About Us` and `Products` are
  both dropdowns/mega-menus, not plain links — `Products`'s left column is a
  `Switch & Socket` / `Circuit Breaker` category switcher. Changing any of this
  is a deliberate content decision — confirm with the user before editing the
  required set in `CLAUDE.md`.
- Primary contact CTA is WhatsApp (`wa.me`), not a phone dialer — see
  `CLAUDE.md` → "Original brand assets" for which buttons stay `tel:` links.

## Deployment

The site is fully static (no environment variables, no backend). `npm run build`
static-generates every route (36 at last count — this will drift as content is
added, so treat it as a snapshot, not a promise); deploy the result to any
Next.js-compatible host
(Vercel, or `next start` behind a Node process).
