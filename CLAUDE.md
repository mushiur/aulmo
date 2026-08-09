# CLAUDE.md — AULMO Project Rules

This file is the permanent source of truth for this project. Read it before making
any change. It documents what the project **is**, what it is **not**, and the
conventions that keep it that way.

## What this project is

AULMO is a **static, public-facing product catalogue website** for an electrical
switches/sockets/control-panel brand (AULMO Electric International). Visitors browse
categories and series, view specifications, and contact the company by email.

**It is explicitly NOT e-commerce.** There is no registration, login, cart, checkout,
payment, or pricing anywhere on the site, and none should be added.

## What this project has — and does not have

There is **no database, CMS, admin panel, authentication, Supabase, S3, or
backend/API of any kind.** All content is static TypeScript data compiled into the
site at build time. **Do not introduce any of these unless the user explicitly
changes this requirement.** If a future task asks for an admin panel or database,
treat that as a deliberate architecture change to discuss, not something to infer.

Keep the site premium in presentation but simple in architecture. Avoid
over-engineering: no Redux, no state-management library, no unnecessary
abstractions. A bug fix or content update should not require touching more than a
couple of files.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React Server Components by default)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** — configured entirely in `src/app/globals.css` via `@theme`;
  there is no `tailwind.config.js`
- **Framer Motion** — scroll reveals, parallax, scroll-progress bar
- **clsx** — conditional className composition

Only add a new dependency when the task genuinely requires it.

## Directory structure

```
src/
├── app/                          Routes (Next.js App Router)
│   ├── layout.tsx                 Root shell: fonts, Navbar, Footer, Loader, cursor
│   ├── page.tsx                    Homepage
│   ├── about-us/
│   │   ├── page.tsx                 About Aulmo (company story)
│   │   └── workshop/page.tsx         Workshop — manufacturing floor photography
│   ├── products/
│   │   ├── page.tsx                 Products overview (all 5 series)
│   │   ├── [series]/page.tsx         One series' sub-series
│   │   └── [series]/[subseries]/page.tsx   Sub-series detail (gallery + finish selector)
│   ├── certificate/page.tsx
│   ├── contact/page.tsx
│   └── sitemap.ts / robots.ts       SEO — both derived from getProductHierarchy(),
│                                      never hand-maintained
├── components/
│   ├── layout/                    Navbar (+ mega menu), Footer
│   ├── home/                      Homepage sections only (Hero, ProductGallery,
│   │                                InteriorGallery, InteractiveProductView,
│   │                                FashionEditorial, HomeClosingCta)
│   ├── products/                  SeriesSubCard, FinishSelector, ProductGallery,
│   │                                ProductVariantExperience — all reusable, all
│   │                                driven by data, none hardcoded to one product
│   └── ui/                        Generic, reusable across any page (Reveal,
│                                    MagneticLink, Breadcrumb, Lightbox,
│                                    ImagePlaceholder, Loader, CustomCursor,
│                                    ChatWidget, ...)
├── data/                          Static content as plain TypeScript objects
│   ├── product-hierarchy.ts        THE product hierarchy — see below
│   ├── types.ts                    Shared content types (incl. ProductVariant)
│   ├── chat.ts                      Fixed Q&A for the chat widget
│   └── hero.ts                     Homepage storytelling content
├── lib/
│   ├── products.ts                Accessors for the product hierarchy
│   ├── content.ts                 Accessors for homepage storytelling content
│   └── seo.ts                     SITE_URL / SITE_NAME — single source of truth
public/
├── brand/                         Logo only
├── marketing/                     Homepage editorial imagery (not tied to one SKU)
├── products/<series>/<subseries>/<finish>/  Per-finish photography (see below)
├── workshop/                      Real manufacturing-floor photography, used only
│                                    by /about-us/workshop
└── video/                         Hero background video
```

## Exact navigation

The top-level navigation is fixed and must read exactly:

```
HOME · ABOUT US · PRODUCTS · CERTIFICATE · CONTACT
```

`PRODUCTS` opens the mega menu (hover on desktop, tap on mobile); it is not a page
of its own in the nav bar, though `/products` exists as a real route. `ABOUT US`
opens a small dropdown (hover on desktop, tap on mobile) with two pages — About
Aulmo (`/about-us`) and Workshop (`/about-us/workshop`) — it is not a page of its
own either. Do not rename, reorder, or add to this list without the user explicitly
asking.

## The product hierarchy — evidence-based, not assumed

The permanent Category → Series → Sub-series → Finish structure, **built directly
from the real AULMO photography supplied in the `Image/` asset library** (since
migrated into `public/products/` — the original `Image/` folder can be removed once
a future session confirms nothing new needs migrating from it):

```
L Series  — L50 (black/gold/gray/white), L60 (black/gold/gray/white),
            L80 (black/gold/gray/white), LG20 (matte gold/silvery/water ink/carbon
            gray/pearl white), LG30 (carbon gray/matte gold/water ink/pearl white)
D Series  — DZ (black/gold/gray/ivory/white)
M Series  — M30 (Nebula Ash black/champagne gold/graphite gray/pearl white),
            M50 (espresso walnut/golden oak — wood-veneer trim, not metal-look)
K Series  — K30 (ink black/champagne gold/silver gray/pearl white), K40 (gold only —
            coffee gold/red/bright gold are named in the parameter table but have no
            isolated hero photo yet, only a group shot), K50 (yellow wood grain only —
            pine color/red wood grain are named but have no isolated hero photo, only
            a group shot), K60 (bright gold/bronze/copper/rose gold — ornate embossed
            border, a distinct decorative line from K30/K40/K50's plain finishes)
S Series  — S20, S30, S50, S60, S70, S80, S90   (untouched — only S60 has a photo)
```

T Series (Power Track) was removed from the hierarchy entirely at the
client's explicit request — it never had any photography or asset library,
so there was nothing to preserve.

**Important, learned the hard way:** an earlier pass assumed L620/L630 and M50
existed because a client brief once named them. When the real photography arrived,
neither was anywhere in it — they were removed. **Never assume a sub-series or
finish exists because it was named in a spec; only add it once a real photo (or an
unambiguous printed label on a real asset) confirms it.** If a name is mentioned in
marketing copy but never photographed (e.g. LG30's "matte silver" is named in body
copy but has zero photography), leave it out rather than add an empty entry.
M50 is the example of the other direction: removed for lack of photography in that
earlier pass, then correctly re-added later once real photos (espresso walnut and
golden oak, wood-veneer finish) actually arrived — the rule is evidence either way,
not a one-time verdict. L620/L630 remain removed; no photography for those has
surfaced since.

L/D/M Series are fully built with real finish photography. K30, K40, K50 and K60
were upgraded the same way once their own asset libraries arrived — none are part
of the "untouched" group anymore. K40 and K50 each currently have only one
isolated finish (K40: Gold; K50: Yellow Wood Grain); their other named colors
(K40: coffee gold, red, bright gold; K50: pine color, red wood grain) are visible
only in a real group photo (`familyImages`), not given their own `variants` entry,
since no per-finish studio shot exists for them yet. K60 got a full 4-finish
build (bright gold/bronze/copper/rose gold), each with its own gallery. Only
K series' own top-level banner (`image` on the K-series object itself) is still
unresolved — see the note below. All of S Series remains intentionally untouched
(simpler single-`image` shape, mostly `ImagePlaceholder`) pending its own asset
library — do not build out its visuals without new photography to work from.

**K series banner:** the first upload named `K series banner image.png` turned
out to be byte-for-byte identical to `m-series/banner.png` — genuine M-series
photography, not K-series — so it was rejected rather than wired in with a
mismatched photo. A correct, distinct K-series lifestyle photo was uploaded
afterward (`public/products/k-series/banner.png`, real dark/gunmetal K30-style
switch installed on a wall) and is now the K-series `heroStyle: "banner"` image,
with `cardImage` set separately to K30's Ink Black studio shot so the `/products`
overview grid is unaffected.

**This structure lives in exactly one place: `src/data/product-hierarchy.ts`.**
It is the single source of truth for the products mega-menu, `/products` routes,
and related-product navigation. Never hardcode series or sub-series names/slugs in
a component — always read through `src/lib/products.ts`.

## The finish/variant architecture

A sub-series carries **either** `image` (a single plain photo, no finish choice —
still used by K/S) **or** `variants` (real color/finish options — used by every
L/D/M sub-series). Never both on the same sub-series. See `ProductVariant` in
`src/data/types.ts`:

```ts
type ProductVariant = {
  code: string;      // "black", "matte-gold" — also the asset folder name
  name: string;       // "Ink Black" — display name
  swatch: string;      // CSS color or gradient for the swatch chip
  hero: ImageRef;       // the finish's primary photo
  gallery?: ImageRef[];  // whatever supporting photography exists for THIS finish
                         // only (detail close-ups, real lifestyle installs) —
                         // never backfilled with another finish's images
};
```

- `components/products/FinishSelector.tsx` — swatch buttons, click-only (works
  identically on touch and desktop, no hover-dependent logic).
- `components/products/ProductGallery.tsx` — large image + thumbnail strip for
  whichever image set it's given.
- `components/products/ProductVariantExperience.tsx` — orchestrates the two: owns
  `variantIndex`/`imageIndex` state, resets the image index to 0 whenever the
  finish changes. This is the **one** reusable component every L/D/M product page
  renders through — never build per-product variant-switching logic again.

`src/app/products/[series]/[subseries]/page.tsx` renders
`<ProductVariantExperience>` when `subSeries.variants` exists, and falls back to a
single static image (or `ImagePlaceholder`) when it doesn't — this is what lets
K/S keep working unchanged.

### How to add a product or a finish

1. Add the photo(s) to `public/products/<series-slug>/<subseries-slug>/<finish-slug>/`
   (e.g. `public/products/l-series/l50/black/hero.jpg`). Extra shots for that
   finish go in the same folder (`detail.jpg`, `lifestyle.jpg`, ...).
2. In `src/data/product-hierarchy.ts`, add a `ProductVariant` entry to that
   sub-series's `variants` array with the `hero` (and `gallery`, if you added
   extra shots) pointing at the files from step 1.
3. Done — the finish selector, gallery, mega menu thumbnail, and homepage showcase
   all pick it up automatically; nothing else needs to change.

**Dimension diagrams (`architecture.png`) are one file per sub-series, not one
per finish.** The line drawing doesn't change with color, so it belongs at
`public/products/<series-slug>/<subseries-slug>/architecture.png` (sub-series
root, no finish folder) and every finish's `gallery` entry points at that same
single file. Do not save a separate copy into each finish folder — L50 and L60
both did this at one point (`black/architecture.png`, `gold/architecture.png`, ...,
byte-for-byte identical) and it was consolidated back down to one shared file
per sub-series. The same applies to any other genuinely finish-agnostic asset
(e.g. an exploded profiling diagram).

To add a whole new **sub-series** with its own finishes, add a new
`ProductSubSeries` object (with a `variants` array) to its series in the same
file. To add a new **series**, add a new top-level entry with its own
`subSeries` array. `generateStaticParams` in the `[series]` and `[subseries]`
route files picks up new entries automatically — no route code changes needed.

### Photography rules

- **Never fabricate, generate, or reuse a mismatched product photo.** If a
  sub-series or finish has no real photo, leave it out of `variants`/omit `image`
  entirely — the UI renders an honest "PHOTOGRAPHY ON REQUEST" placeholder
  (`components/ui/ImagePlaceholder.tsx`), never a broken-image icon or a stand-in.
- Watch for **composite marketing images** (a real product photo with printed
  headline/body copy baked into the same file, e.g. M30's original
  `Gold color interior 2.jpg`) — cropping these tightly in a gallery slice through
  the text band and looks broken. Either don't use them where a clean full-bleed
  crop is needed, or display them uncropped. Prefer the clean studio/art shot for
  hero/gallery slots and treat text composites as a copy source, not imagery.
- Homepage editorial imagery that isn't tied to one specific SKU (the exploded
  diagram, the brand quote background, the closing CTA detail shot) goes in
  `public/marketing/`, not `public/products/`.
- Some migrated assets aren't wired into any page yet (per-product dimension
  diagrams at `public/products/<series>/<subseries>/architecture.png`, a couple of
  marketing collages). They weren't deleted — check there before assuming a
  photo doesn't exist.

## Original brand assets

- Use the original AULMO logo at `public/brand/aulmo-logo.png` everywhere a logo
  is needed. Do not recreate, redraw, or approximate it with styled text.
- The homepage hero background video lives at `public/video/hero-switches.mp4`.
  It must stay full-bleed, `autoPlay muted loop playsInline`, `object-cover`, with
  a readable overlay behind the nav and hero copy. **The hero section itself is
  approved and should not be redesigned** without the user explicitly asking —
  bug fixes (e.g. a broken poster path) are fine, visual changes are not.
- **Brand-name discrepancy, flagged not resolved:** the flat, clearly-legible
  printed text on several supplied catalog sheets and posters (not the stylized
  embossed marks on the physical products) consistently reads "**RULMO**" /
  "RULMO® ELECTRIC INTERNATIONAL INC", while all copy the client has provided
  directly (this brief, the email domain, page text) says "AULMO". The site
  continues to say **AULMO** throughout — that's the client's clear intent — but
  this is worth surfacing to the client rather than silently ignoring, in case
  "RULMO" is the actual OEM/factory name on manufactured hardware.

## Design preservation rules

This codebase went through a cleanup/refactor pass and a below-the-hero homepage
redesign — the **hero itself stays as approved**. Design tokens (colors, type
scale, easing curves) are defined once in `src/app/globals.css` under `@theme` —
reuse them via Tailwind utilities (`bg-ink`, `text-signal-red`, `font-mono-label`,
etc.) rather than introducing new hex values or one-off styles.

Reuse existing shared components instead of rebuilding their pattern:

| Need | Use |
|---|---|
| Section eyebrow (`01 — LABEL ———`) | `components/ui/SectionEyebrow.tsx` |
| Scroll-triggered fade/word/line reveal | `components/ui/Reveal.tsx` |
| A button/link with the pointer-follow effect | `components/ui/MagneticLink.tsx` |
| A product/series listing card (full-bleed photo + overlay text) | `components/products/SeriesSubCard.tsx` |
| A color/finish switcher | `components/products/FinishSelector.tsx` |
| An image-set with thumbnails, drag-to-explore, fullscreen | `components/products/ProductGallery.tsx` |
| A fullscreen image viewer (prev/next, swipe, keyboard, counter) | `components/ui/Lightbox.tsx` |
| Missing photography | `components/ui/ImagePlaceholder.tsx` |

Visual/design changes belong to the **`DESIGN.md`** workflow (one checklist item
at a time, verified before being checked off) — not to ad-hoc changes made while
doing unrelated work.

## Coding conventions

- Pages under `src/app` are **async Server Components** by default; they fetch
  data via `src/lib/*` accessors and pass plain props down. Add `"use client"`
  only to the specific component that needs interactivity/browser APIs, not to
  whole pages.
- Every top-level page section needs a `data-theme="light"` or `data-theme="dark"`
  wrapper — the Navbar's scroll listener reads this attribute to decide its own
  text/background color. Forgetting it makes the nav invisible on that page.
- A sub-series's representative image (for cards/thumbnails) is never read via
  `.image` directly — call `getCoverImage(subSeries)` from `src/lib/products.ts`,
  which falls back to `variants[0].hero` when there's no plain `.image`.
- Internal links: use `MagneticLink` (routes automatically through `next/link`
  for internal paths) or plain `next/link`. Only use a raw `<a>` for `mailto:`,
  external URLs, or same-page anchors.
- No fabricated data: certifications, specs, colors, or configurations not backed
  by a real asset or the client's own words must stay generic and honest
  ("available on request") — never invented specifics. `configurations` on a
  `ProductSubSeries` should only list SKUs actually visible on a real catalog
  sheet (see LG20/M30 for the pattern).
- Custom base styles (`html`, `body`, `a`, `img`) live inside `@layer base` in
  `globals.css`. Keep them there — an unlayered rule always beats a layered
  Tailwind utility regardless of specificity, which previously made colored
  button text invisible on some pages. Don't add new unlayered global rules.

## Verifying a change

Before considering a change done:

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass. If you changed anything visual, actually load the affected
route in a browser (or a headless one) and look at it — a passing build proves the
code compiles, not that the page looks right. For anything with a finish
selector, actually click through every finish and confirm the image, gallery and
label all change together — a screenshot of the default state isn't enough.
