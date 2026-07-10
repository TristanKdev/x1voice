# Pitfalls

Confirmed traps in this codebase. Append; don't rewrite history.

## 2026-07-10 — cinematic redesign

- **Never live-swap a GSAP-pinned section.** ScrollTrigger's pin wraps the
  section in a pin-spacer div outside React's knowledge. Unmounting that
  subtree on a media-query change (e.g. resize desktop→mobile) throws
  `NotFoundError: removeChild` and takes the whole page down. Lock the
  hero mode once per pageload (`cinematic-hero.tsx`).
- **Progressive-upgrade + scroll restoration collide.** Swapping in a
  ~4500px pinned hero after hydration shifts everything below it; a reload
  mid-page teleports the reader. Only upgrade when `window.scrollY < 4`.
- **`react-hooks/set-state-in-effect` bans the classic `setMounted(true)`
  pattern.** Use `useSyncExternalStore` (see `lib/use-media-query.ts`) or an
  async callback (rAF/timeout) for one-shot post-hydration upgrades.
- **Hand-written counts drift.** "85+ POS systems" was false against our own
  `data/pos-systems.ts` within one edit. Any count shown to users must derive
  from the data array (`POS_TOTAL`, `POS_VIA_DELIVERECT_COUNT`,
  `MAX_ANNUAL_DISCOUNT_PCT`) — never a literal in copy, and especially never
  in FAQ answers that feed JSON-LD.
- **`visibility: hidden` (GSAP `autoAlpha`) removes content from the
  accessibility tree.** Any scroll-staged content that matters must have an
  sr-only equivalent (see the sr-only block in `cinematic-stage.tsx`).
- **`min-width` alone is not "desktop".** iPads pass `min-width: 1024px`;
  gate pointer-driven experiences on `(pointer: fine)` too.
- **`/login` is still a dead link** in `components/site/header.tsx` (404s,
  and the header prefetch logs a console error on every page). `/register`
  links were repointed to `/contact` on 2026-07-10; the login link needs a
  real destination (app subdomain?) or removal. `robots.ts` already
  disallows both paths.
- **`/favicon.ico` 404s** — only `app/icon.svg` exists. Harmless but noisy;
  add an `.ico` if the log noise bothers anyone.
