export type PricingTier = {
  name: string
  monthlyPrice: number | "custom"
  /** Included minutes per month. */
  minutes: number | "custom"
  /** Billed per minute past the included minutes. */
  overagePerMin: number | "custom"
  annualDiscountPct: number
  description: string
  highlighted?: boolean
  ctaLabel: string
  ctaHref: string
}

/**
 * Every plan ships the SAME feature set. The only thing that changes between
 * plans is the number of included minutes and the per-minute overage rate.
 * This list is the single source of truth for "what you get", shown on every
 * plan card so the difference is unmistakably just minutes + overage.
 */
export const SHARED_FEATURES: string[] = [
  "24/7 answering, unlimited simultaneous calls",
  "Full order-taking with modifiers, synced to your POS",
  "Phone payment collection",
  "Texts the customer as the order status changes",
  "Answers in the caller's language",
  "Custom menu training & greeting",
  "Analytics dashboard",
  "No setup fee, no contract, cancel anytime",
]

/**
 * Discounted per-month price when billed annually. Single rounding rule,
 * every surface that shows an annual price must use this, never inline math.
 */
export function annualMonthlyPrice(monthly: number, discountPct: number) {
  return Math.round(monthly * (1 - discountPct / 100))
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 250,
    minutes: 750,
    overagePerMin: 0.35,
    annualDiscountPct: 15,
    description: "Every feature, sized for one busy location.",
    ctaLabel: "Get started",
    ctaHref: "/contact",
  },
  {
    name: "Professional",
    monthlyPrice: 750,
    minutes: 2000,
    overagePerMin: 0.32,
    annualDiscountPct: 15,
    description: "Same features, more minutes and a lower overage rate.",
    highlighted: true,
    ctaLabel: "Get started",
    ctaHref: "/contact",
  },
  {
    name: "Enterprise",
    monthlyPrice: "custom",
    minutes: "custom",
    overagePerMin: "custom",
    annualDiscountPct: 0,
    description: "Ultra-high volume or franchise rollouts, custom minutes and rate.",
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
  },
]

/** "750 minutes/mo included" / "Custom minutes". */
export function minutesLabel(tier: PricingTier): string {
  return tier.minutes === "custom"
    ? "Custom minutes"
    : `${tier.minutes.toLocaleString()} minutes/mo included`
}

/** "then $0.15/min" / "Custom rate". */
export function overageLabel(tier: PricingTier): string {
  return tier.overagePerMin === "custom"
    ? "Custom overage rate"
    : `then $${tier.overagePerMin.toFixed(2)}/min`
}

/**
 * Highest annual discount across paid tiers, the only number switch/badge
 * labels ("save X%") may show. Derives from tier data so it can't drift.
 */
export const MAX_ANNUAL_DISCOUNT_PCT = Math.max(
  ...PRICING_TIERS.filter((t) => typeof t.monthlyPrice === "number").map(
    (t) => t.annualDiscountPct
  )
)

/**
 * Plan comparison. The first two rows are the ONLY things that differ between
 * plans; every feature row below is identical across all four columns, on
 * purpose, so the table reads "same product, pick your minutes".
 */
export const PRICING_COMPARISON_ROWS: {
  feature: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}[] = [
  { feature: "Minutes included / month", starter: "750", professional: "2,000", enterprise: "Custom" },
  { feature: "Overage, per minute after", starter: "$0.35", professional: "$0.32", enterprise: "Talk to us" },
  { feature: "24/7 call answering", starter: true, professional: true, enterprise: true },
  { feature: "Order-taking with POS sync", starter: true, professional: true, enterprise: true },
  { feature: "Phone payment collection", starter: true, professional: true, enterprise: true },
  { feature: "Texts customer on status change", starter: true, professional: true, enterprise: true },
  { feature: "Multilingual answering", starter: true, professional: true, enterprise: true },
  { feature: "Custom menu training", starter: true, professional: true, enterprise: true },
  { feature: "Analytics dashboard", starter: true, professional: true, enterprise: true },
  { feature: "Setup fee", starter: "None", professional: "None", enterprise: "None" },
  { feature: "Contract required", starter: false, professional: false, enterprise: "Negotiable" },
]
