# Decisions

Dated architectural choices. Append; don't rewrite history.

## 2026-07-10 — cinematic redesign (redesign/cinematic-2026-07)

- **Static-first hero.** The server always renders a complete conventional
  hero; the GSAP pinned experience is a client-side upgrade, dynamically
  imported (`next/dynamic`, `ssr: false`) and gated on
  `(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)`
  plus top-of-page scroll. Crawlers, no-JS, mobile, touch, and
  reduced-motion visitors never download gsap.
- **All user-facing numbers derive from data.** Prices and discount labels
  from `data/pricing.ts` (`annualMonthlyPrice`, `MAX_ANNUAL_DISCOUNT_PCT`),
  POS counts from `data/pos-systems.ts` (`POS_TOTAL`,
  `POS_VIA_DELIVERECT_COUNT`), the missed-calls stat via `SourcedStat`.
- **POS framing.** POS systems are integration partners, rendered as styled
  text wordmarks ("works with" language) — never logos we don't have rights
  to, never framed as customers. Direct integrations (with `/integrations`
  pages) are kept distinct from Deliverect-routed ones (`DELIVERECT_POS`)
  so channel attribution stays truthful.
- **Testimonials.** `TESTIMONIALS` in `data/site.ts` holds only real,
  received customer feedback: anonymized (owner's instruction), `verified`
  flag, `source` field, edited for spelling/clarity only. The placeholder
  system was retired when the first four real quotes landed.
- **Tier CTAs point at `/contact`** (2026-07-10): `/register` doesn't exist
  and 404'd from every pricing card. Revisit when a real signup flow ships.
- **Homepage pricing is a dark section by design** (matches the hero card's
  deep-blue physical aesthetic) while the rest of the site stays theme-aware.
