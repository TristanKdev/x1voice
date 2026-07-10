# X1 Voice — Developer Handoff

This site is a **presentational front end**. The landing and its sections are
built to be plugged into real data and logic by your team. Nothing here talks to
a backend yet — every interactive element is marked **WIRE** in the code where a
handler/endpoint goes.

Stack: **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript**.
Run it: `npm install && npm run dev` → http://localhost:3000.
Ship check: `npm run lint && npm run build`.

---

## 1. Design tokens (fonts, colors, radius) — one place

**All colors, the brand hue, radius, and the dark-band palette live in
`app/globals.css`** in the `:root { … }` block (and a mirrored `.dark { … }`).
Change a value there and it updates site-wide — nothing is hardcoded in
components except a handful of documented brand-logo colors.

Key tokens:

| Token | Meaning | Rebrand by… |
|---|---|---|
| `--background` / `--foreground` | page base + ink | editing the value |
| `--brand` / `--brand-bright` | electric blue accent + hover | change hue to rebrand |
| `--band` / `--band-2` / `--band-foreground` / `--band-muted` / `--band-border` | the intentional **dark sections** (hero, dashboard, stat, CTA) | |
| `--tech-cyan/-blue/-indigo/-violet/-ember` | the "molten" ring + tech-glow ramp | |
| `--radius` | global corner radius | |
| `--muted`, `--secondary`, `--border`, `--ring` | neutrals | |

Tokens are exposed to Tailwind via the `@theme inline { … }` map at the top of
`globals.css`, so utilities like `bg-brand`, `text-band-foreground`,
`bg-band-2`, `text-brand-bright` all resolve to those vars. **Add a new color:**
add `--x: …` in `:root`, then `--color-x: var(--x)` in the `@theme` block →
`bg-x` etc. now exist.

**Fonts** are wired in `app/layout.tsx` via `next/font` (Geist sans/mono) and
exposed as `--font-geist-sans` / `--font-geist-mono`. The display style is the
`.font-display` utility (globals.css) — same family, tighter tracking. Swap the
`next/font` import to change typefaces globally.

**Custom utilities** (globals.css `@layer components`): `.tech-grid` /
`.tech-grid-dark` (blueprint overlay), `.video-scrim` (hero legibility),
`.molten-ring` (animated iridescent ring — wrap a sized element, put content in
a centered child), `.tech-glow`. All respect `prefers-reduced-motion`.

---

## 2. Where to plug in logic (search the code for `WIRE`)

| What | File | Note |
|---|---|---|
| **Demo phone line** | `data/site.ts` → `DEMO_LINE` | Placeholder number. Set `NEXT_PUBLIC_DEMO_TEL` / `NEXT_PUBLIC_DEMO_DISPLAY` or edit the constant. Used by the hero CTA, `demo-call.tsx`, and `cta-section.tsx`. Calling it is the consent event (recording + marketing) — copy is on `demo-call.tsx`. **You handle the actual telephony + logging every inbound number.** |
| **Request-a-feature form** | `app/request-feature/page.tsx` | `<form>` posts nowhere. Add an `action`/endpoint (GHL form or `/api/…`) + success/error states. Field names are set. |
| **Contact form** | `components/blocks/contact-form.tsx` | Presentational; wire submission. |
| **Dashboard data** | `components/blocks/product-dashboard.tsx` | All numbers are illustrative mock UI. Replace with live metrics. Mirrors the real app dashboard layout. |
| **Login / app** | `components/site/header.tsx` → `/login` | Route doesn't exist yet (404s, and the header prefetch logs a console 404). Point at the real app subdomain or remove. |
| **POS logos** | `components/blocks/pos-logos.tsx` | Lightweight SVG recreations, not official brand files. If Brand supplies official SVGs, drop them in `public/pos/<slug>.svg` and swap the `Mark` render — the grid doesn't change. Colors are tagged per entry. |
| **Cal.com demo booking** | *removed* | The old `demo-dialog.tsx` (Cal embed, was 404ing) is deleted. Demo = the call line now; "Book a demo" links to `/contact`. Re-add a booking flow if you want one. |

Content/data (edit, no code): `data/pricing.ts` (plans), `data/pos-systems.ts`
(POS list + derived counts), `data/voice-ai-competitors.ts` (compare matrix),
`data/site.ts` (testimonials, FAQ, stat, contact), `data/nav.ts` (nav).

---

## 3. Homepage section order (`app/page.tsx`)

Hero (video) → Demo call → Molten stat → How it works → Benefits → Dashboard →
Deliverect flow → POS grid → Comparison → Testimonials → Plans → FAQ → CTA.

Each is a self-contained component in `components/blocks/`. Dark bands: hero,
demo-call, molten stat, dashboard, CTA.

---

## 4. Media

Hero background is `public/media/hero.mp4` (H.264 1080p, ~3 MB, muted, looping)
with poster `public/media/hero-poster.jpg`. Source was a 4K HEVC file transcoded
for web. Swap both to change the hero footage. Reduced-motion visitors see the
poster only.

---

## 5. Known gaps / TODO for the team

- **`/login`** 404s (see above) and **`/favicon.ico`** is missing (only
  `app/icon.svg` exists) — both log a benign console 404.
- Interior pages (`/features`, `/solutions`, `/compare/[slug]`, `/locations`,
  `/about`, etc.) render and inherit the new theme, but were **not** given the
  full landing-grade redesign this pass — they're clean but plainer. Prioritize
  as needed.
- Real customer testimonials live in `data/site.ts` (`TESTIMONIALS`) — anonymized
  by request. Add more there.
- Blog has 17 articles in `content/blog/*.mdx`. Blog is intentionally **not** in
  the top nav (SEO backlink from the footer only).

Blue + white "high-tech" is the committed direction (light base, electric-blue
accent, a few dark bands). To flip the whole site dark, the `.dark` token block
is already maintained — apply the `dark` class on `<html>` (theme toggle does
this).
