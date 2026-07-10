# Spec: X1 Voice site redesign — cinematic premium overhaul

Date: 2026-07-10
Route: BRANCH C (single worktree, human diff approval before merge, no auto-merge)
Tier: STANDARD (frontend only; no payments/schema/secrets files touched)
Repo: ~/projects/x1voice (x1voice.com, Vercel)

## Goal

Replace the current homepage's visual layer with the premium/cinematic component
language the owner supplied (GSAP scroll hero, bento features, live voice demo,
dark pricing, POS logo systems, real testimonials), while preserving the site's
existing content architecture, SEO infrastructure, and honest-claims discipline.

## Non-goals

- No route changes. All existing pages (about, blog, compare, contact, features,
  integrations, locations, pricing, privacy, solutions, terms) keep their URLs.
- No copy rewrites outside the new sections. `data/*.ts` stays the source of truth.
- No backend/API work. `app/api` untouched.
- No new analytics, no new external services.

## New dependencies

| Package | Why |
|---|---|
| `gsap` | Cinematic hero scroll timeline (ScrollTrigger) |
| `motion` | Pricing switch layout animation, InfiniteSlider |
| `@number-flow/react` | Animated price transitions monthly↔yearly |

All homepage-only heavy code loads via `next/dynamic` so the rest of the site
pays nothing. **Per AGENTS.md: read `node_modules/next/dist/docs/` before writing
any Next 16 code** — dynamic import, metadata, and client-component conventions
may differ from prior versions.

## Sections (homepage, top to bottom)

### 1. Cinematic hero — adapted `CinematicHero`
Adapt the supplied GSAP component to X1 Voice:
- `brandName="X1"`, taglines: "Every call answered," / "every order captured."
- Deep-blue premium depth card (`#162C6D → #0A101D` gradient) with mouse-tracked
  sheen; iPhone mockup shows an **incoming call being answered by X1 Voice**:
  live-call widget, order line-items appearing, progress ring counts **orders
  captured** (metric label "Orders captured"). Floating glass badges:
  "Order sent to POS" and "Payment collected".
- Card heading: "Your phone, answered." Description from `SITE_DESCRIPTION`.
- CTA stage: replace App Store / Google Play buttons with the site's real CTAs:
  primary "Book a demo" (existing demo-dialog / Cal.com embed), secondary
  "See pricing" → `/pricing`. Keep the tactile button treatment.
- **Reduced-motion + mobile fallback [lock_guard]:** when
  `prefers-reduced-motion: reduce`, or viewport < `md`, or JS disabled, render a
  static hero (headline, description, CTAs, static phone mockup) with **no pin,
  no scroll hijack**. The 7000px pinned timeline runs only on motion-tolerant
  desktop. Content must be reachable by keyboard/AT in both variants.

### 2. Live voice demo — "Hear it in action"
Adapt supplied `AIVoiceInput` (mic button, 48-bar visualizer, timer) as a
self-running demo section (`demoMode`), paired with a short scripted call
transcript that types out (caller orders, X1 confirms, ticket lands in POS).
No fake "recording" claim — label it "Simulated call".
`Math.random()` bar heights only after client mount (component already guards
with `isClient`; keep that hydration-safety pattern) **[lock_guard]**.

### 3. Features bento — adapted tailus `Features` grid
6-col bento using existing `Card`. Five cells, real X1 content:
1. Sourced stat cell: `MISSED_CALLS_STAT` via existing `SourcedStat` — replaces
   the "100%" scribble cell. **Sourcing pattern is lock-critical [lock_guard]:
   every stat renders through SourcedStat, no unsourced numbers.**
2. "Answers around the clock" — clock/wave SVG (adapt supplied artwork).
3. "Orders hit your POS in seconds" — chart SVG cell.
4. "Sounds like your best host" — waveform/heartbeat SVG cell.
5. "Payment on the phone" — avatar/flow cell, reworded to payment-capture flow.
Copy pulled from existing feature descriptions in `data/` where present;
lorem-ipsum from the supplied component is all replaced.

### 4. POS integrations — two-tier presentation
Data: new `data/pos-systems.ts` — full Deliverect list (~85 systems, from the
owner's paste) as `{ name, slug?, highlighted }`.
- Highlighted (have or will have dedicated pages / recognizable brands):
  Square, Toast, Clover, Lightspeed, TouchBistro, SpotOn, Aloha Cloud,
  Micros Simphony, Revel, Epos Now (final set = every slug in
  `data/integrations.ts` + owner's "square, toast, clover, etc.").
- Tier A: pixel-canvas hover grid (adapted supplied `LogoCard`/`PixelCanvas`)
  for highlighted systems, center text block: "Works with the POS you already
  run" + link to `/integrations`. Highlighted cards link to their
  `/integrations/[slug]` page when one exists.
- Tier B: `InfiniteSlider` + `ProgressiveBlur` marquee of the remaining names.
- **Logo honesty [lock_guard]:** these are *integration partners via
  Deliverect*, never presented as "customers" or "trusted by". Heading language
  must say works-with/integrates. Logos: use text wordmarks styled consistently
  (no fabricated or hotlinked logo assets; no tailus placeholder logos like
  Nvidia/Nike ship to prod). Real SVGs can replace wordmarks later, one data edit.

### 5. Testimonials — real quotes, anonymized
Replace `PLACEHOLDER_TESTIMONIALS` in `data/site.ts` with the owner-supplied
real quotes, names bleeped per instruction:
- "Faster service — love it. The machine was so clear and perfect. The delivery
  was great and faster." — Restaurant owner
- "So easy to use and it sounds great. Service was quick and no problems so far."
- "Set it and forget it — the software handles the phone for us so we can focus
  on the work."
- "It paid for itself the first day. We captured tons of orders that were
  slipping through the cracks before."
Type gains `verified: true` + `source: "customer feedback"` fields; keep
initials/segment anonymization. **No fabricated attribution [lock_guard]** —
render exactly the anonymized form. Light copyedit for spelling only, meaning
unchanged. Rendered in existing `testimonial-marquee` restyled to match new look.

### 6. Pricing — adapted dark pricing section
Adapt supplied `PricingSection6` to render `PRICING_TIERS` from
`data/pricing.ts` (Starter $250 / Professional $750 highlighted / Business
$1500 + custom): NumberFlow price morph, monthly↔yearly switch honoring
`annualDiscountPct`, blue-glow highlighted card, sparkle/grid backdrop
(sparkles implemented as lightweight canvas or skipped if it costs >~5KB —
implementer's call, note in PR). Homepage shows the 3-tier section;
`/pricing` page keeps its detailed `pricing-table` + disclaimer, restyled
tokens only. **Displayed prices must come from `data/pricing.ts` — no
hardcoded numbers in components [lock_guard].**

### 7. Final CTA
Keep existing `cta-section` content, restyle to the tactile-button language.

## Global styling

- Tailwind v4 tokens in `app/globals.css`: extend with the deep-blue accent
  ramp used by hero card + pricing glow. Site stays theme-aware
  (next-themes); the hero card and pricing section are intentionally dark in
  both themes (supplied components hardcode dark—that's the look).
- Film-grain + grid overlays scoped to hero only.
- Fonts unchanged.

## File plan

| File | Action |
|---|---|
| `app/page.tsx` | Recompose section order |
| `components/blocks/cinematic-hero.tsx` | new (client) |
| `components/blocks/voice-demo.tsx` | new (client) |
| `components/blocks/bento-features.tsx` | rework |
| `components/blocks/pos-grid.tsx`, `pos-marquee.tsx` | new |
| `components/blocks/pricing-section.tsx` | new (homepage variant) |
| `components/ui/infinite-slider.tsx`, `progressive-blur.tsx`, `pixel-canvas.tsx` | new |
| `data/pos-systems.ts` | new (full Deliverect list) |
| `data/site.ts` | testimonials swap (typed, anonymized) |
| `app/globals.css` | token additions |
| `package.json` | +gsap, +motion, +@number-flow/react |

## Invariants (lock-critical summary)

1. Stats only through `SourcedStat` / `MISSED_CALLS_STAT` pattern.
2. Testimonials: real quotes only, anonymized, no fabricated names/attribution.
3. POS list framed as integrations, never customers; no placeholder brand logos in prod.
4. Prices render from `data/pricing.ts` only.
5. Reduced-motion/mobile/no-JS users get full content without scroll hijack.
6. Hydration safety: no `Math.random()`/`Date.now()` in initial render output.

## Verification

- LINT: `npm run lint` (pinned, verbatim).
- BUILD: `npm run build` (no test suite exists in repo; build is the gate —
  policy fallback has empty test command, so this is stated, not guessed).
- Manual: dev server pass over `/`, `/pricing`, `/integrations` in light+dark,
  desktop+mobile emulation, `prefers-reduced-motion` emulation.
- Critic pass on the diff before gate.

## Risks

- GSAP pin + Next 16 App Router: timeline must init in `useEffect` with
  `gsap.context` cleanup (supplied code does this) — verify against Next 16 docs
  for any hydration/streaming changes.
- 7000px pinned scroll is aggressive; keep total pin ≤ ~4000px if it feels
  sluggish (implementer judgment, note deviation in PR).
- Bundle: gsap+motion+number-flow ≈ 60–80KB gz on homepage. Acceptable for a
  marketing page; dynamic-import hero to keep first paint clean.
