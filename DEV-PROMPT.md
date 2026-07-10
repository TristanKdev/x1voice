# X1 Voice — Developer Handoff & Work Prompt

Give this whole file to the developer. It says what the site is, how to run it, exactly
where to wire live data, and how the CSS/design system works so they can add features
without breaking the look.

---

## What this is

Marketing site for **X1 Voice** — an AI phone agent for restaurants (answers calls, takes
the full order, collects payment, drops a ticket into the POS, texts the customer on status
changes). It is a **Next.js 16 (App Router, React Server Components) + React 19 + Tailwind
CSS v4 + TypeScript** app. Animations use **`motion/react`** (v12). Content (blog, solutions,
compare, integrations, locations) is file-based (MDX + typed data modules).

> ⚠️ **This Next.js is a modified build** — see `AGENTS.md`. Some APIs/conventions differ
> from a stock Next 16. Read `node_modules/next/dist/docs/` for the relevant area before
> changing routing, metadata, or build config. Component/CSS work is normal.

### Run it
```bash
npm install
npm run dev        # local dev at http://localhost:3000
npm run lint       # eslint — must be clean
npm run build      # production build — must pass (currently 103 static pages)
npm start          # serve the production build
```
Deploys to **Vercel** (project `x1voice`, team `x1-suite`). Preview deploy: `vercel deploy`.
Production: `vercel deploy --prod` (points at x1voice.com).

---

## Architecture map (where things live)

| Area | Path |
|---|---|
| Pages / routes | `app/**/page.tsx` |
| Reusable sections | `components/blocks/*` |
| Site chrome (header, footer, nav) | `components/site/*` |
| UI primitives (Button, Card, Sheet…) | `components/ui/*` |
| Typed data (single source of truth) | `data/*` |
| File content (blog, solutions, compare…) | `content/**`, `lib/content/*` |
| SEO route registry + metadata | `lib/seo/*` |
| API routes | `app/api/**/route.ts` |
| Design tokens + custom CSS | `app/globals.css` |

**Rule:** every user-facing number/string lives in `data/*` or `content/*`, never hardcoded
in a component. Change data, not JSX.

---

## LIVE DATA — what is mocked and exactly how to make it real

Everything below is intentionally stubbed. Each has a `TODO(x1voice)` or `WIRE (dev)` comment
at the spot to edit.

1. **Contact form** — `app/api/contact/route.ts`
   Validates the payload (zod) and returns `{ ok: true }` but **does not send email**. Wire a
   provider (Resend recommended: `npm i resend`, add `RESEND_API_KEY` to Vercel env) and send
   to `CONTACT.salesEmail` (`data/site.ts`). Client form: `components/blocks/contact-form.tsx`.

2. **Login** — `app/login/page.tsx` + `components/blocks/login-card.tsx`
   UI only, no auth backend. On submit it honestly tells the user dashboards are provisioned at
   onboarding. Replace with real auth (the product dashboard likely lives on a separate app /
   subdomain — point "Sign in" there, or implement auth here).

3. **Inbound demo call webhook** — `app/api/demo-call/route.ts`
   Stub for the telephony provider (Twilio/etc.) inbound-call + status webhook. `WIRE (dev)`
   comment marks where to log the calling number + timestamp + **consent** and push to the CRM
   (GHL). Do not store numbers without consent.

4. **Feature request** — `app/api/feature-request/route.ts` (used by `/request-feature`).
   Validates only; wire delivery like the contact form.

5. **Product dashboard numbers** — `components/blocks/product-dashboard.tsx` +
   `components/blocks/live-counter.tsx`
   The KPI cards (Revenue / Orders / Voice AI Calls / Active orders) use `LiveCounter`, which
   animates from a `base` value with `{clampLow, clampHigh}` bounds — it is a **visual demo**,
   not real data. To show a customer's real metrics, replace the `base` props with values
   fetched from your metrics API (Server Component `fetch`, or a client SWR call), keeping
   `LiveCounter` only if you still want the count-up animation.

6. **Testimonials / reviews** — `data/site.ts` → `REVIEWS` and `TESTIMONIALS`
   `verified: true` entries are real; **`verified: false` entries are illustrative samples and
   MUST be replaced with real, permissioned reviews before launch** (see the ⚠️ comment in the
   file). FTC: no fabricated testimonials. Rotating wall: `components/blocks/testimonials-columns.tsx`.

7. **Demo phone number** — `data/site.ts` → `DEMO_LINE` (`{ tel, display }`) is a placeholder
   (555). Set the real demo line; it feeds the header nav rail, `DemoCall`, and support page.

8. **Pricing** — `data/pricing.ts` is the single source of truth. Plans share ONE feature set
   (`SHARED_FEATURES`); they differ ONLY by `minutes` and `overagePerMin`
   (Starter 750 min / $0.35, Pro 2,000 / $0.30, Business 6,000 / $0.25). `minutesLabel()` /
   `overageLabel()` / `annualMonthlyPrice()` are the only display helpers — never inline the math.
   The ROI calculator's own assumptions live at the top of
   `components/blocks/roi-calculator.tsx` (`OVERAGE_PER_MIN` etc.) — keep them in sync with the
   pricing data if rates change.

9. **Blog auto-posting** — articles are MDX in `content/blog/*.mdx` (frontmatter: `title`,
   `description`, `publishedAt`, `faqs`). `lib/content/blog.ts#getAllBlogPosts()` reads them;
   `scripts/gen-blog.mjs` is the generator. To auto-post, have your content pipeline write new
   `.mdx` files here (or an API + DB source) — the blog index, sitemap, and Article+FAQ JSON-LD
   pick them up automatically.

### POS connection model (already applied — keep it consistent)
**Native = Square + OrderCounter** (direct). **Everything else, including Clover, Toast,
Lightspeed, and 80+ more, connects via Deliverect.** This is reflected across the homepage,
POS grid, Deliverect flow, integration pages (`connection: "native" | "deliverect"` field),
and `/support/integrations`. **OrderOut has been removed entirely — we do not work with them.**
If you add a POS, set its `connection` in `data/integrations.ts` and keep this native-vs-Deliverect
wording consistent.

---

## CSS / DESIGN SYSTEM — how to add features without breaking the look

All theming is **design tokens in `app/globals.css`**, exposed to Tailwind v4 via
`@theme inline`. **Never hardcode a hex color in a component** — use the token utilities.

### Tokens (in `:root`, dark overrides in `.dark`)
- Brand: `--brand` (electric blue) → utilities `bg-brand`, `text-brand`, `text-brand-foreground`,
  `bg-brand-bright`.
- Dark "band" sections (hero, footer): `--band`, `--band-2`, `--band-foreground`, `--band-muted`,
  `--band-border` → `bg-band`, `text-band-foreground`, etc.
- Surfaces: `bg-background`, `bg-card`, `bg-secondary`, `text-muted-foreground`, `border`.
- Tech accent ramp: `--tech-cyan/-blue/-indigo/-violet/-ember`.

### Custom utilities (defined in `globals.css`)
- `.text-wave` — seamless two-band animated color sweep on headline text.
- `.molten-ring`, `.drawn-ring-path` — the hand-drawn gradient ring (SVG `pathLength` anim).
- `.tech-grid`, `.tech-grid-dark` — faint background grids (add a radial `mask-image` to fade).
- `.video-scrim`, `.tech-glow`, `.premium-depth-card`, `.iphone-bezel`.

### Add a new homepage section (the standard recipe)
1. Create `components/blocks/my-section.tsx`. Server component by default; add `"use client"`
   only if it needs state/motion/browser APIs.
2. Use token classes (`bg-card`, `text-brand`, `border`) so it inherits the theme.
3. Import it into `app/page.tsx` and wrap in `<Reveal>…</Reveal>` (`components/blocks/reveal.tsx`)
   for the scroll rise-in. Respect `prefers-reduced-motion` (helpers already do).
4. Responsive + no horizontal overflow: relative units, `max-w-*`, and wrap wide tables in an
   `overflow-x-auto` container (see the comparison table).

### Add a new route/page
- Create `app/<route>/page.tsx`, export `metadata` via `buildMetadata()` (`lib/seo/metadata.ts`;
  set `noIndex: true` to keep it out of search).
- **Register it in `lib/seo/routes.ts`** (`STATIC_ROUTES`, or a dynamic getter). That file is the
  single source for `app/sitemap.ts` and `llms.txt` — unregistered pages won't be in the sitemap.

### Client/server boundary gotcha
Data crossing into a client component must be **serializable** — no functions. Pattern already
in the repo: `components/blocks/pos-logos.tsx` holds plain serializable data; the client
`pos-lockup.tsx` holds the render logic. Follow that split.

### Motion
`motion/react` (import from `"motion/react"`, not `framer-motion`). Scroll effects use
`useScroll` / `useTransform` and always branch on `useReducedMotion()`.

---

## Pre-launch checklist
- [ ] Wire contact + feature-request email delivery (Resend) — `RESEND_API_KEY` in Vercel env.
- [ ] Real auth for `/login` (or redirect to the product app).
- [ ] Telephony webhook for `/api/demo-call` with consent capture.
- [ ] Replace `verified:false` reviews with real, permissioned ones (`data/site.ts`).
- [ ] Real demo phone number (`DEMO_LINE` in `data/site.ts`).
- [ ] `npm run lint` clean + `npm run build` passes.

See also `HANDOFF.md` (design tokens + POS logo drop-in details).
