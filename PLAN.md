# AULMO Development Plan

Technical/project implementation progress. Keep this synchronized with the
actual state of the code — move items between sections as they happen, don't
leave completed work marked as pending or vice versa.

## Completed

**Codebase cleanup (previous pass)**
- Next.js 16 + TypeScript + Tailwind v4 app scaffolded and flattened to the
  project root.
- Legacy Claude Design handoff bundle removed after confirming every asset
  still needed was migrated into `public/`.
- Navigation corrected to the exact required set: Home / About Us / Products /
  Certificate / Contact.
- Routes built: `/`, `/about`, `/products`, `/products/[series]`,
  `/products/[series]/[subseries]`, `/certificate`, `/contact`.
- Navbar and Footer promoted into the root layout, shared by every route.
- Fixed a latent CSS bug (unlayered `a { color: inherit }` beating layered
  Tailwind `text-*` utilities — moved base rules into `@layer base`) and a
  `react-hooks/set-state-in-effect` lint error in `Loader.tsx`.

**L/D/M Series implementation + homepage redesign (this pass)**
- Recursively inspected the newly supplied `Image/` asset library (L Series:
  L50/L60/L80/LG20/LG30 sub-folders; D Series and M Series flat) via four
  parallel visual-inspection passes covering every one of the ~90 source files.
- Discovered the real hierarchy differs from the earlier assumption: L Series
  actually has **L50, L60, L80, LG20, LG30** (not L620/L630); M Series has
  **only M30** (no M50 anywhere in the assets); D Series is a single product,
  **DZ**, in five finishes. Old hierarchy corrected to match reality.
- Migrated ~60 real photos into `public/products/<series>/<subseries>/<finish>/`,
  de-duplicating exact byte-identical files (shared dimension diagrams across
  finishes, etc.) along the way. Nothing was deleted from the source `Image/`
  folder — see Remaining.
- Designed and implemented a reusable finish/variant data model
  (`ProductVariant` in `src/data/types.ts`) — a sub-series has either a plain
  `image` (K/S, unchanged) or `variants` (L/D/M, real finishes with their own
  hero + gallery images).
- Built three reusable client components: `FinishSelector`, `ProductGallery`,
  `ProductVariantExperience` — one implementation drives every L/D/M product's
  finish-switching UI, not one-off per-product code.
- Rebuilt `src/app/products/[series]/[subseries]/page.tsx` to render the new
  variant experience when present, falling back to the old single-image layout
  for K/S.
- Redesigned the homepage below the hero (hero itself untouched, per
  instruction): retired `ModuleSpec`, `Finishes`, `BrandIdentity`, `Interiors`
  (generic, stock-photo-driven sections) in favor of `LSeriesShowcase` (a
  5-way interactive sub-series switcher), `DSeriesShowcase` (full-bleed hero +
  5-finish crossfade), and `MSeriesShowcase` (lifestyle photo + finish
  swatches) — all driven by the real photography. Kept `Manifesto`,
  `ExplodedStory`, `HumanQuote`, `Marquee`, `ClosingCta` for pacing/variety.
- Cleanup following the retirements: deleted the 4 dead section components,
  `data/finishes.ts`, dead `Finish`/`Room` types, and 6 orphaned marketing
  images; renamed `data/rooms.ts` → `data/hero.ts` (only `heroStats` survived
  the cut); pruned `lib/content.ts` to match.
- Found and fixed two real bugs during verification: the Hero video's
  `poster` attribute pointed at a path deleted during migration (404 on every
  homepage load); and `MSeriesShowcase`'s default lifestyle image was actually
  a composite marketing poster with printed body copy baked into the same file
  as the photo — cropping it sliced through the text. Swapped to the clean
  art-directed shot for that slot.
- Verified thoroughly: every route screenshotted at desktop and mobile widths,
  every finish selector on every L/D/M product clicked through and confirmed
  to swap image + gallery + label together, touch-tap interaction confirmed on
  the homepage L Series switcher and mobile finish selectors, zero console
  errors/warnings across the whole crawl, mega menu re-verified against the
  corrected data.

**Codebase optimization pass**
- Removed dead code confirmed unused since the homepage rebuild: `getSwitchParts()`
  in `lib/content.ts`, the `Spec`/`SwitchPart` types in `data/types.ts`, and
  `data/parts.ts` outright (its only consumer, the old `ExplodedStory` section,
  was deleted in an earlier pass; nothing else imported it).
- Removed 3 duplicate binary assets after confirming byte-for-byte identity
  via checksum: `products/m-series/base.jpg` and `products/d-series/base.jpg`
  (both exact copies of each series' `hero-artistic.jpg`, and both already
  unreferenced after the Series-page blur fixes pointed `series.image`
  elsewhere) and a leftover copy of the L-series banner in
  `public/Product page/` (the canonical copy already lives in
  `public/products/l-series/`).
- Extracted `components/ui/Lightbox.tsx` — the full-screen viewer chrome
  (backdrop, close/prev/next, keyboard nav, counter) was duplicated nearly
  verbatim between the homepage `ProductGallery` and `CertificateGrid`; both
  now share one implementation, with the image/caption content still
  supplied per-caller via children so the two can keep their different
  layouts (a 1100px-wide product photo vs. a 520px-wide certificate scan
  with a download button).
- Removed two `priority` misuses on `next/image` calls: the homepage's
  `ProductGallery` and `InteriorGallery` were both marking their first
  visible image `priority` despite sitting well below the full-viewport-height
  Hero — eagerly preloading an image no visitor sees without scrolling first,
  which competes with the actually-critical above-the-fold requests instead
  of helping LCP. Every remaining `priority` usage was checked against its
  page and is on a genuinely above-the-fold hero image.
- Audited all 26 component default exports for at least one real importer —
  none were orphaned beyond what's listed above.

## In Progress

- Nothing currently in progress.

## Remaining

- **The source `Image/` folder has not been deleted yet.** Every file needed
  was confirmed migrated, but per-product dimension diagrams
  (`architecture.png`) and a few marketing collages/lifestyle extras were
  migrated into `public/products/...` but are not yet wired into any page (see
  `CLAUDE.md` → Photography rules). Confirm nothing else is wanted from
  `Image/` before removing it.
- K and S Series are explicitly untouched this pass — no new photography, no
  visual work. S60 and the K-series still use the old single-`image` shape;
  most of S still shows the honest placeholder. T Series (Power Track) was
  removed from the product hierarchy entirely at the client's request — it
  never had any photography or asset library.
- Visual/design polish beyond "functional and on-brand" is tracked in
  `DESIGN.md`, one item at a time.
- A brand-name discrepancy surfaced in the source assets ("RULMO" printed on
  several catalog sheets vs. "AULMO" everywhere the client writes it) — flagged
  in `CLAUDE.md`, not resolved. The site continues to say AULMO. Someone should
  ask the client which is correct on the actual manufactured hardware. A third
  spelling, "OULMO," has since turned up printed on real Intertek/IEC
  certificates too (see Completed → Codebase optimization pass).

## Known Issues

- **K30 and K50's product photos are byte-identical** (`public/products/k-series/k30/hero.jpg`
  and `.../k50/hero.jpg` are the same file). Both pages render correctly and
  neither is broken, but a visitor comparing the two sub-series would see the
  exact same photo for what are supposed to be different products — an asset
  library gap, not a code bug. Not fixed (no distinct K50 photo exists to
  swap in) — flag for the client if/when new K-series photography arrives.
- `public/products/l-series/base.jpg` (362×578, too low-res to use) is
  unreferenced in code after the hero-image blur fix, but was left in place
  rather than deleted, since it's original client-supplied material, not a
  confirmed duplicate of anything else — unlike `m-series/base.jpg` and
  `d-series/base.jpg`, which the optimization pass did remove, because those
  two were confirmed byte-identical to files still actively in use elsewhere.

## Testing

No automated test suite exists yet (no test runner is configured). Verification
is: `npm run typecheck`, `npm run lint`, `npm run build`, plus headless-browser
visual checks (including click-through of every finish selector) at desktop and
mobile widths. If test coverage is wanted later, that's a scope change to
discuss first — don't add a test framework speculatively.

## Deployment Readiness

- `npm run build` succeeds; all 33 routes prerender as static content (down
  from 34 — the fictional M50 sub-series page no longer exists).
- No environment variables are required (fully static, no backend).
- Suitable for any static-friendly Next.js host (Vercel, or `next start` behind
  a Node process). No server-side secrets, database, or API to provision.
