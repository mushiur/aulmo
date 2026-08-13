# AULMO Design Progress

This file drives all future visual design work on this project.

## Workflow — read this before doing design work

1. Find the next unchecked `[ ]` item below.
2. Work on **one item at a time**. Don't jump ahead or bundle several items into
   one pass.
3. Implement it completely — reuse the shared components and design tokens
   documented in `CLAUDE.md` (`SectionEyebrow`, `Reveal`, `MagneticLink`,
   `PageHeader`, `ProductCard`, `FinishSelector`, `ProductGallery`,
   `ImagePlaceholder`, the `@theme` tokens in `globals.css`). Don't invent new
   colors, type scales, or one-off patterns.
4. Verify it actually works: load the page (desktop **and** mobile widths) and
   look at it. A successful build is not the same as it looking right. For
   anything with a finish selector, click through every finish, not just the
   default.
5. Only then change `[ ]` to `[x]` for that item.
6. Save this file.
7. Continue to the next unchecked item, unless blocked or user input is needed.

**Do not check an item off just because code exists for it.** It must be visually
polished and confirmed working first. When in doubt, leave it unchecked and say
so.

Design changes should normally live in the **presentation layer only**
(components, styling, layout, motion). The product hierarchy and content data
model (`src/data/product-hierarchy.ts` and friends) is settled — don't restructure
it as a side effect of design work. **The homepage hero is approved — do not
redesign it** without the user explicitly asking; bug fixes are fine.

## Global

- [x] Preloader
- [x] Navigation
- [x] Products Mega Menu
- [x] Typography System
- [x] Global Motion / Transitions

**Navigation + Products Mega Menu, extended since those were checked off:**
left unchecked below rather than silently re-checked, since none of this has
been visually confirmed in a real browser at any width this session — same
"lint/typecheck/build + code review only" caveat as everything else in this
file.

- [ ] `About Us` became a dropdown (hover on desktop, tap on mobile) with two
      pages — About Aulmo and a new Workshop page (see Pages below) — instead
      of a plain link straight to the old `/about` page. Desktop's dropdown
      panel sits directly under the trigger with no dead zone between them
      (a real bug hit and fixed: an earlier version used `mt-3` margin
      *outside* the panel to create the visual gap, which meant the cursor
      crossed empty space — outside both the button and the panel — on the
      way down, firing `onMouseLeave` before a visitor could reach it; fixed
      by moving the gap to `pt-3` padding *inside* the panel's own hoverable
      box instead, so the descendant relationship keeps the hover state
      alive across it).
- [ ] `PRODUCTS`'s own left column changed from a flat SERIES list to a
      two-item category switcher — `Switch & Socket` / `Circuit Breaker` —
      that swaps what the other columns show (`MegaMenu` in `Navbar.tsx`,
      `activeCategory` state, default `Switch & Socket`). The
      `Switch & Socket` path's content (Series / Featured Products /
      Flagship) is untouched, the exact same JSX as the original mega menu —
      just behind the switcher now instead of always visible, so this is
      additive, not a rebuild. `Circuit Breaker` shows MCB/MCCB/Magnetic
      Contactor (image + title + description + chevron) and a hardcoded
      "MCB Quick Select" SP/DP/TP shortcut row, matching a client-supplied
      reference screenshot. Grid went from 3 columns to 4
      (`md:grid-cols-[0.8fr_1fr_1fr_1.2fr]`) to fit the new always-visible
      category column without shrinking the existing three.
- [ ] Mobile's own `Products` tab changed from a direct `<Link href="/products">`
      to a tap-to-expand accordion — the same pattern already proven for
      `About Us` — now a genuine two-level drill-down: tap once for the
      category picker (`Switch & Socket` / `Circuit Breaker` cards), tap a
      category to drill into its series list or circuit-breaker types list.
      The previously-always-visible SERIES/FEATURED/FLAGSHIP grid is now
      `hidden md:grid` (desktop only) since mobile has its own dedicated
      accordion content instead of showing everything unconditionally.

## Homepage

Rebuilt below the hero **three times** now.
- Pass 1 (Manifesto, per-series showcases, Exploded Story, Human Quote,
  Marquee, old Closing CTA → five new sections) was rejected: no real
  gallery, floating images overlapping/colliding, still felt like oversized
  marketing sections.
- Pass 2 replaced the single-image "gallery" and the overlapping interior
  photos with genuine multi-image, non-overlapping components.
- Pass 3 (this one) restyles those same components to match a reference
  mockup the client shared, screenshotted from a design they liked: a
  multi-card visible product carousel (not stage+thumbnails), an
  interior row with a fixed text column beside equal-width images, a
  three-column product-experience layout with decorative orbit rings, and a
  fashion section that flows directly into a contained CTA banner with a
  product photo peeking from its edge. **Kept AULMO's existing color tokens**
  (signal-red/signal-yellow/charcoal/ink) rather than the mockup's gold
  accent — CLAUDE.md locks design tokens to `globals.css`, and the request
  read as "match this layout/structure," not "introduce a new brand color";
  flag this if a literal gold palette was actually wanted.

**Left unchecked below on purpose**, per instruction not to mark this done
until it's been visually confirmed stable — this session has no browser
tool, so only lint/typecheck/build and manual code review (overflow/z-index/
absolute-positioning read-through) have happened, not an actual rendered
look at desktop/tablet/mobile.

- [x] Hero (approved, untouched — its two CTA buttons still point at
      `#series` and `#engineering`, which live on `ProductGallery` and
      `InteractiveProductView` respectively, so those links work without
      touching `Hero.tsx`)
- [ ] Product Gallery (`ProductGallery.tsx`) — a real multi-card carousel:
      ALL/L/D/M filter pills rebuild the slide list from **every** sub-series
      in that series (not just one flagship), so L alone is ~19 slides across
      L50/L60/L80/LG20/LG30. Cards sit in a native `overflow-x-auto` +
      `snap-x snap-mandatory` track (so touch swipe/trackpad drag work for
      free, no custom drag physics needed), with prev/next arrow buttons
      calling `scrollBy` on the track, a dot-progress indicator (approximate —
      derived from scroll position, not pixel-exact per card), and a
      click-to-expand lightbox per card (arrow keys + Escape work inside it).
      Each card already represents one finish, so there's no separate
      `FinishSelector` here — browsing the cards **is** the finish switch.
      Fixed a real bug found during this pass: Framer Motion (used in pass 2's
      version) doesn't suppress `onClick` after a drag gesture, so a swipe
      could also pop the lightbox open — moot now since this version uses
      native scroll instead of `motion.div drag`, which has no such issue.
- [ ] Interior Gallery (`InteriorGallery.tsx`) — rebuilt again, this time with
      real photography the client uploaded directly to
      `public/interior-inspiration/` (renamed from `public/interior
      inspiration/` and from `Living room.png`-style names to kebab-case, to
      match every other folder under `public/` and avoid spaces in URLs):
      `living-room.png`, `bedroom.png`, `kitchen.png`, `bathroom.png`,
      `workspace.png` — five real, high-resolution renders, replacing the
      three cropped-composite product-lifestyle images pass 2 was using. The
      section is now an interactive coverflow-style 3D carousel: the active
      card sits centered and flat, neighbors fan out via `translateZ` +
      `rotateY` + `scale` (CSS 3D transforms on a `perspective`-parented
      stage), clickable to bring any visible card to center, plus arrow
      buttons, dot indicators, pointer drag/swipe (native `onPointerDown`/
      `onPointerUp` delta threshold, not a library), and arrow-key support.
      This is a legitimate "3D gallery" in the coverflow-UI sense — real 2D
      photos arranged with 3D transforms — not a claim that the room or
      product itself is a 3D model, so it doesn't conflict with the
      no-fake-3D rule established for the Product Experience section below.
      The stage has `overflow-hidden` so off-screen neighbor cards clip at
      the section edge instead of bleeding into the page. Worth a look before
      calling this done: the kitchen render shows "AULMO" branding on an
      oven — AULMO makes switches/sockets/control panels only, so that's
      either a stray label worth asking the client about or just decorative
      staging; not something I altered, just flagging it since it's a slightly
      odd fit for the brand.
- [ ] Product Experience (`InteractiveProductView.tsx`, `id="engineering"`) —
      three-column layout (copy / tilt card / feature list), still the same
      honest pointer-tilt interaction (no real 3D/360° photography exists,
      so this is `rotateX/Y` bound to cursor position, gated to
      `pointerType === "mouse"` so touch just gets finish-switching). Added
      two new icons (`TiltIcon`, `ZoomIcon` in `components/ui/Icon.tsx`) for
      an honest "TILT TO EXPLORE" / "ZOOM ON HOVER" feature list — the
      reference mockup also listed "ROTATE" and an "OPEN 3D VIEWER" button,
      both dropped since neither is real. The dashed circles around the card
      are decorative only, not a claim of rotation.
- [ ] Fashion / Lifestyle Campaign (`FashionEditorial.tsx`) — single
      full-bleed image (`marketing/craftsmanship.jpg`) with a linear gradient
      overlay, one headline, and now a "Discover more" link to `/about` (a
      real page). Still no floating second image/overlap.
- [ ] Minimal CTA (`HomeClosingCta.tsx`) — rebuilt as one contained banner
      (`rounded-[24px]`, its own `overflow-hidden`) rather than a bare
      section: a real product photo (`dz/black/hero.jpg`) peeks in from the
      banner's own left edge, faded into the banner's background via an
      internal gradient — contained entirely within that one banner box, not
      overlapping any sibling section, so it doesn't reintroduce the
      cross-section collision problem pass 1 had. Hidden below `md:` (mobile
      just gets text + button) to avoid a cramped image at narrow widths.
      Copy/CTA now matches the reference mockup's direct tone ("Let's build
      something great together" / "Call now 01720-310552").
- [ ] Dedicated Featured-Products grid — a distinct individual-SKU showcase,
      separate from the series-level gallery above. Still not built;
      `ProductGallery` may already cover the need — revisit before building it.

Two homepage-only leftovers from the pre-redesign version were intentionally
**not** deleted, since removing them would mean touching the data layer this
pass was scoped to leave alone: `getSwitchParts()`/`src/data/parts.ts` (fed
the now-deleted Exploded Story). That data is unused by any page today — safe
to delete in a future pass once confirmed nothing else needs it.

## Pages

Functional, on-brand, and (for product pages) genuinely interactive — but none
have received dedicated visual-design attention beyond the shared component
patterns, so all stay unchecked.

- [ ] About Us — rebuilt **twice**. Pass 1 used a custom interactive 3D
      milestone carousel (`components/about/OriginTimeline.tsx`, the same
      coverflow technique as the homepage's Interior Gallery, adapted for
      text cards); rejected as "not approved" in favor of a client-supplied
      reference screenshot showing a more conventional layout (image-split
      hero, 4-stat bar, "Our Story" text+photo-grid, "Quality" text+badges+
      photo, closing band) — `OriginTimeline.tsx` was deleted as unused
      rather than left as dead code. Pass 2 (current) follows that reference
      structure, built only from real material in `public/about-aulmo/`
      (`about.txt`, `global-brand.jpg`, `design-heritage.jpg`, `wordmark.png`,
      `century-badge.png` — renamed from their original spaced/typo'd
      filenames to kebab-case) plus **a newly-discovered asset**:
      `public/Certificate/` turned out to already contain 12 real third-party
      certificate scans (Intertek CE/IEC test reports, a Gulf/GSO conformity
      certificate, a Saudi CAP registration) that were sitting completely
      unused — the current `/certificate` page is still text-only, "on
      request." Those scans confirm "Zhejiang Aulmo Industrial Co., Ltd.,
      No.99, Dingxiang Road, Binhai Park, Wenzhou Economic and Technical
      Development Zone" verbatim against `about.txt`, and genuinely verify
      ISO/OHSAS/CE — so the About page's "ISO / OHSAS / CE" badges are real,
      not the placeholder-turned-fabrication risk they'd have been without
      this discovery. **Deliberately not done this pass:** actually wiring
      those 12 scans into `/certificate` — that's its own scoped piece of
      work (reading all 12 to caption them correctly, building a real
      document gallery) and wasn't part of what was asked for the About page;
      flagged for a future pass rather than done half-attentively here.
      The reference's "Our Story" 2×2 photo grid called for an aerial
      factory shot, a manufacturing-floor shot and a warehouse shot that
      don't exist in this project's asset library — used two real product
      photos (`lg30/matte-gold/detail.jpg`, `dz/black/hero.jpg`) for the two
      cells that could be genuine, and `ImagePlaceholder` (never an invented
      stock photo) for the two that couldn't. Also didn't carry over the
      reference's specific "80+ countries" / "300+ professionals" stats —
      neither is in the client's source material, so they'd have been
      fabricated; used only what's verifiable instead (5 named export
      regions, 1996 founding year, 6 product series).
      **Worth flagging, not resolved:** `about.txt` says AULMO was founded in
      1996 (~30 years), while the site's established "century"/"100 years"
      branding (Hero, badges, taglines — and the reference mockup itself,
      which shows a "100 YEAR" badge directly beside "1996 ESTABLISHED")
      implies ~100. This is a real discrepancy in the client's own material,
      on top of the already-noted RULMO/AULMO spelling issue and a third
      variant, "OULMO," found printed on the newly-discovered certificates
      alongside "Aulmo." Left the existing "100 years" copy alone since it's
      approved brand language used everywhere and the client's own reference
      design repeats it unprompted — but worth surfacing to the client
      rather than silently reconciling one way or the other.
      Also: `wordmark.png` (used in the "Our Story" grid and the "Looking
      Ahead" closing band) was briefly swapped out for `/brand/aulmo-logo.png`
      on the assumption it was another RULMO-stylization instance — the
      client confirmed it's their genuine logo, just the same
      ambiguous-glyph typeface as everywhere else in this discrepancy, and
      asked for it back (repositioned/enlarged in the closing band, not
      replaced). Reverted; `/brand/aulmo-logo.png` isn't used on this page.
      **Since then:** this page moved from `/about` to `/about-us` (its
      content/design untouched) to become the first child of a new `About Us`
      parent section — see the next entry.
- [ ] Workshop (`/about-us/workshop`, new) — a first pass built entirely from
      real photography the client uploaded to `public/workshop/` (renamed
      from spaced/mixed-case names to kebab-case): a banner hero
      (`workshop-banner.jpg`), a "Manufacturing Floor" feature
      (`factory-floor.jpg`), a 2×2 grid of the four same-aspect-ratio
      (686×876) portrait shots — assembly line, injection molding, mold
      storage, warehouse — mirroring the About page's own "Our Story" grid
      pattern, and a closing band with `aulmo-wordmark-white.png`. Copy stays
      generic/honest (real 1996 founding date, 86mm module, 5 export
      regions, Intertek/IECEE certification — all already established
      elsewhere on the site) rather than inventing manufacturing statistics
      the photography doesn't back. Not yet visually confirmed in a browser.
- [ ] Products Overview — **pass 2**: the client asked to bring the same
      premium card language here as the per-series pages below, using the
      real marketing copy already sitting unused in
      `public/Product page/information.txt`. Swapped the generic
      `ProductCard` grid for `SeriesSubCard.tsx` (same component the series
      pages use) — `spec` slot now shows each series' one-word `theme`
      (DESIGN/SECURE/MATERIAL/COLOUR/LIFETIME) instead of a sub-series count,
      `description` shows the verbatim `quote`, and the CTA reads
      "READ MORE →" via `SeriesSubCard`'s new `ctaLabel` prop (defaults to
      "EXPLORE SERIES" everywhere else, so the series pages didn't need
      changes for this). **`ProductCard.tsx` is now unused by any page** —
      left in place rather than deleted speculatively; safe to remove in a
      future pass once confirmed nothing else needs it.
- [ ] Series Page (`/products/[series]`) — rebuilt **twice**. Pass 1 followed
      a client reference design literally (split hero, 5-item generic icon
      feature strip, uniform 3-col `ProductCard`-style grid, a dark "explore
      everything" tile, a closing "Call the Showroom" band). Pass 2 (current)
      fixes real problems the client found by screenshotting the live L-series
      page:
      - **The hero image was blurry.** `series.image` for L, D and M all
        pointed at 362×578 source files (`base.jpg`) — the same
        too-small-to-enlarge problem hit before on the Contact and homepage
        heroes. Fixed with real, higher-resolution, non-duplicate images:
        L now uses a new client-supplied banner,
        `products/l-series/three-finishes-banner.png` (1774×887, moved from
        `public/Product page/` and renamed to kebab-case); D uses
        `dz/gold/hero.jpg` (855×1160) instead of black, since black is
        already the DZ grid card's cover image; M uses `m30/gold/hero.jpg`
        for the same reason. K's hero was also swapped from `k30/hero.jpg` to
        `k40/hero.jpg` — not blurry, but identical to the K30 grid card, so
        swapped to a different real K-series photo instead to stop that
        duplication too.
      - **"Call the Showroom" appeared twice** — once in this page's own
        closing band, once immediately after in the shared global Footer,
        both with the same phone number. Since the Footer already owns that
        moment sitewide, the page's closing section was rewritten as a
        distinct statement ("One standard. Endless possibilities." → explore
        all series) with no phone number and no product image, rather than
        repeating the Footer's content one section above it.
      - **The sub-series grid read as generic e-commerce**, not an
        architectural catalogue. Replaced the boxed "photo tile + separate
        white text block" `ProductCard` pattern with `SeriesSubCard.tsx`:
        full-bleed image, gradient, and text overlaid directly on the photo.
      - **Pass 3 fixed a real bug pass 2 introduced**: pass 2's layout always
        destructured `[featured, ...rest] = series.subSeries` and rendered
        the first sub-series in a giant `aspect-[16/10] md:aspect-[21/9]`
        box. For D and M (one sub-series each) `rest` was empty, so the page
        was just one isolated stretched card — the client flagged this as
        "extremely odd," and the wide box was forcing the ~855px-wide
        portrait source photos to upscale ~2×, which is what read as blur.
        Fixed by making `SeriesSubCard` use the **same `aspect-[4/3]` box
        for every card regardless of `featured`** (which now only bumps type
        scale, never box shape), and by replacing the featured/rest split in
        `/products/[series]/page.tsx` with a count-aware branch: 1
        sub-series → a single card centered at `max-w-[720px]`, 2 →
        `sm:grid-cols-2`, 3+ → `sm:grid-cols-2 md:grid-cols-3`. Same
        component drives L (5, grid), K (4, grid), S (7, grid), D and M (1
        each, centered showcase) with no per-series branching in the
        template — adding or removing a sub-series just changes which count
        branch renders.
      - **Pass 4**: client asked whether a color gradient vibe would feel
        more premium. Prototyped on D-series only first (a soft ambient
        radial glow blending the existing `signal-red`/`signal-yellow`
        tokens — no new hex values — blurred and low-opacity, sitting behind
        the hero and, for single-sub-series pages, behind the centered
        showcase card). Approved, then rolled out to all five series pages
        and to the `/products` overview header for consistency.
      - **Removed the generic 5-icon feature strip and the dark "explore
        everything" grid tile** — both read as filler once the client shared
        `public/Product page/information.txt` with real per-series marketing
        direction: a one-word `theme` and a verbatim `quote` for each series
        (L "DESIGN" / "Quality From the Inside Out.", D "SECURE" / "Exquisite
        yet safe. Safeguarding Life.", M "MATERIAL" / "Selected materials,
        durable and long-lasting.", K "COLOUR" / "Fantastic colors, stunning
        at first glance.", S "LIFETIME" / "Durable and durable with plug and
        play resistance." — kept verbatim including the repeated "durable,"
        since it's the client's own copy, not mine to silently edit). Added
        `theme?`/`quote?` to `ProductSeries` in `data/types.ts` rather than
        hardcoding this copy in the component, consistent with the
        single-source-of-truth architecture. Each series page's hero now
        shows its own theme word + quote instead of five identical icons —
        this is also what makes each series page visually distinct rather
        than "five identical cards," per the client's explicit complaint.
      One template still drives all five series without any hardcoded series
      name — L (5 sub-series), D/M (1 each), K/S (plain `image`,
      `ImagePlaceholder` filling in for S's mostly-unphotographed lineup) all
      render correctly from the same code. `information.txt` also specifies
      per-series card copy and a "READ MORE →" CTA for the **Products
      Overview** page specifically (`/products`, not this one) — not acted on
      here since that page was explicitly out of scope for this pass; noted
      for whenever that page is revisited.
      **T Series (Power Track) was removed from the product hierarchy
      entirely** at the client's explicit request, not just left untouched —
      it never had any photography or asset library to begin with, so there
      was nothing to preserve. Removed from `product-hierarchy.ts` (which
      cascades to the mega menu, `/products`, and `generateStaticParams`
      automatically, per the single-source-of-truth architecture) and swept
      every doc reference (`CLAUDE.md`, `README.md`, `PLAN.md`, the About
      page's "6 series" stat) from "six/K,S,T" down to "five/K,S." Verified
      `/products/t-series` now 404s and no "T Series" text remains anywhere
      in rendered HTML.
- [ ] Product Detail Page — the finish selector + gallery
      (`ProductVariantExperience`) is fully built and verified working for every
      L/D/M product (finish click swaps hero + gallery + label together, tested
      on desktop and mobile/touch). K/S still fall back to a plain single-image
      layout. Layout/typography beyond the functional baseline hasn't had a
      dedicated design pass. T Series (Power Track) was removed from the
      product hierarchy entirely at the client's request.
- [ ] Certificate — rebuilt from a text-only "documentation on request" page
      into a real certificate showcase, following a client-supplied reference
      design. `public/Certificate/` (12 real Intertek/IECEE/Gulf/Saudi scans,
      previously undiscovered and completely unused anywhere on the site) was
      renamed to `public/certificates/` with descriptive kebab-case filenames
      (was cryptic upload IDs like `1686996604250339.jpg`) — see the About
      page's entry above for how this folder was found. Every certificate
      name/number on the page (Gulf Type Examination, IEC CB Test, CE Test
      Verification of Conformity, Saudi CAP Statement for Registration, each
      with its real reference number) was read directly off that specific
      scan, not templated or guessed. `CertificateGrid.tsx`
      (`components/certificate/`) is a real interactive gallery — click any
      thumbnail for a full-size lightbox (arrow keys + Escape), and every
      thumbnail and the lightbox both have a genuine `<a download>` on the
      actual file, since these are real static assets that actually download.
      No "Download All" button — that would need server-side zip generation
      this static site doesn't have, so it was left out rather than faked.
      The hero's 4 certifying-body badges (Intertek, IEC/IECEE, CE, GSO/SASO)
      and the trust-feature strip below the grid are worded to match only
      what's visible on these 12 scans — "ISO/OHSAS" from the About page's
      `about.txt` source were deliberately *not* repeated here, since no ISO
      or OHSAS certificate scan actually exists in this folder to back them.
      The closing section's world-map graphic (`certificates/world-map.png`)
      is a generic decorative "global network" illustration the client
      supplied for this exact purpose — unlabeled glowing dots/lines, not a
      claim of specific verified shipping routes or office locations.
- [x] Contact — rebuilt a second time as a layered, non-boxy "Visit. Call.
      Connect." composition: a new `LayeredImage` component (`components/ui/`)
      masks each background photo with a radial gradient so it fades into the
      section's own ink background rather than sitting in a visible rectangle
      (with a subtle scroll parallax on the hero shot); a floating glass-chip
      action cluster (Call/Visit/Facebook/Documents, `components/ui/Icon.tsx`
      stroke icon set) overlaps the hero/body seam instead of a bordered
      info-strip grid; the showroom map floats as a rounded, shadowed sheet
      over the wood-panel backdrop image instead of sitting in an even
      50/50 grid. The duplicate documentation mentions (the showroom list's
      "Documentation on request" line and the separate boxed DOCUMENTATION
      column) are gone — there is now exactly one Documents chip plus one
      closing-CTA link, both pointing at `/certificate`. No email address
      exists for AULMO, so none is shown or invented; the phone number is a
      `tel:` link throughout; no contact form, since there is no submission
      destination. The showroom backdrop is an already-cataloged real asset,
      `products/m-series/m30/black/hero.jpg` (855×1160). The hero backdrop is
      `marketing/contact-page-banner.jpg` (1700×2170) — a high-res render the
      client supplied directly in chat and saved into the repo themselves
      (this session has no mechanism to extract image bytes pasted into
      chat, so that file has to land on disk before it can be wired in);
      sized to its own `aspect-[1700/2170]` box so `object-cover` shows the
      whole product with no crop, per the client's explicit request. Note:
      this specific photo has "RULMO" embossed on the product itself — a
      known discrepancy already flagged elsewhere in this file — the client
      was told and chose to use it anyway. Earlier attempts pointed
      `LayeredImage` at each series' `hero-artistic.jpg` (only 362×578 —
      full-bleed stretched them ~5x into a blurry smear) before landing here;
      `LayeredImage` grew `className`/`sizes`/`spread`/`objectPosition` props
      during that back-and-forth, all now reused across the homepage rebuild
      below. Lint/typecheck/build pass. Responsive breakpoints reviewed at
      the code level (mobile-first stacking, chip stagger scoped to `md:` and
      up, `min-w-0`/`break-words` fix for the Facebook chip's long URL on
      narrow widths); not yet confirmed with live screenshots at every width.
- [ ] Circuit Breaker — a whole new, deliberately separate catalogue built to
      an explicit client spec (with two reference screenshots): a landing page
      (`/products/circuit-breaker`, dark banner hero, "Browse by Type" grid of
      the three categories via the existing `SeriesSubCard`, a "Shop by Brand"
      chip row), a category listing page
      (`/products/circuit-breaker/[category]`), and a full pole/filter/sort
      UX for MCB/MCCB (Magnetic Contactor has no poles). Data model
      (`src/data/circuit-breakers.ts` / `src/lib/circuit-breakers.ts`) is
      **intentionally separate** from `product-hierarchy.ts` — not merged into
      the switches/sockets hierarchy. Per the client's own explicit written
      spec (not the reference screenshots, which showed prices/a cart): no
      pricing, no Add to Cart anywhere — every card's CTA is "View Details" →
      `/contact`, matching the real product pages. All product data is
      **structured mock data** (real, publicly-known industry line names —
      Acti9 iC60N, S200, DX³, etc., already visible in the client's own
      reference screenshot — paired with generic/illustrative ratings), an
      explicit one-time, client-authorized exception to the project's
      no-fabricated-data rule; brand chips are text-only, no logos, since
      using a real company's logo with none on file would risk implying an
      unverified partnership. Placeholder photography lives at predictable
      `public/images/products/circuit-breaker/<category>/*-placeholder.png`
      paths specifically so real product photos can replace them file-for-file
      later with zero code changes.
      Mobile listing UX went through a second pass after the client flagged
      the first as "so static" against a reference screenshot: `PoleSelector`
      now renders a joined segmented control on mobile (card grid kept on
      desktop/tablet), and the always-open filter sidebar became a slide-up
      bottom-sheet drawer (`flex flex-col` with a `flex-none` header, a
      `flex-1 overflow-y-auto` scrollable filter list, and a `flex-none`
      footer) so the "Show N Results" action button and the Close button stay
      pinned in view while only the filter checkboxes themselves scroll — a
      genuine bug from the first pass this fixes: the whole drawer used to
      scroll as one block, pushing the results button off-screen on longer
      filter lists. The Close button is a solid `bg-signal-red` pill
      (reusing the site's existing Lightbox close-button pattern) rather than
      a low-contrast icon-only control, after the client reported it was
      hard to see. Mega menu and mobile nav both extended to reach this
      catalogue (see `## Global` above) without touching the existing
      Switch & Socket paths' JSX. Not yet visually confirmed in a browser at
      any width this session.

## Responsive Polish

- [ ] Desktop
- [ ] Tablet
- [ ] Mobile

## Final Polish

- [ ] Animations
- [ ] Page Transitions
- [ ] Hover / Micro-interactions
- [ ] Visual Consistency
- [ ] Performance

The Responsive Polish and Final Polish sections are cross-cutting — they depend
on every item in **Pages** being checked off first. Don't check them prematurely
just because the homepage alone looks right.
