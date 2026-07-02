export type PricingTier = {
  name: string
  monthlyPrice: number | "custom"
  annualDiscountPct: number
  description: string
  minutesIncluded: string
  features: string[]
  highlighted?: boolean
  ctaLabel: string
  ctaHref: string
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 250,
    annualDiscountPct: 15,
    description: "One location, trying AI call answering for the first time.",
    minutesIncluded: "500 minutes/mo included",
    features: [
      "24/7 call answering",
      "Order-taking with POS sync",
      "1 location",
      "Email support",
    ],
    ctaLabel: "Get started",
    ctaHref: "/register",
  },
  {
    name: "Professional",
    monthlyPrice: 750,
    annualDiscountPct: 15,
    description: "Where most restaurants land. Full feature set, one location.",
    minutesIncluded: "2,000 minutes/mo included",
    features: [
      "Everything in Starter",
      "Payment collection on phone orders",
      "Custom menu training",
      "Priority support",
    ],
    highlighted: true,
    ctaLabel: "Get started",
    ctaHref: "/register",
  },
  {
    name: "Business",
    monthlyPrice: 1500,
    annualDiscountPct: 15,
    description: "Groups running several locations that want reporting in one place.",
    minutesIncluded: "6,000 minutes/mo included",
    features: [
      "Everything in Professional",
      "Up to 5 locations",
      "Centralized analytics dashboard",
      "Dedicated onboarding",
    ],
    ctaLabel: "Get started",
    ctaHref: "/register",
  },
  {
    name: "Enterprise",
    monthlyPrice: "custom",
    annualDiscountPct: 0,
    description: "6+ locations, custom integrations, or franchise rollouts.",
    minutesIncluded: "Custom minute allowance",
    features: [
      "Everything in Business",
      "Unlimited locations",
      "Custom POS/integration work",
      "Dedicated account manager",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
  },
]

export const PRICING_COMPARISON_ROWS: {
  feature: string
  starter: boolean | string
  professional: boolean | string
  business: boolean | string
  enterprise: boolean | string
}[] = [
  { feature: "24/7 call answering", starter: true, professional: true, business: true, enterprise: true },
  { feature: "POS order sync", starter: true, professional: true, business: true, enterprise: true },
  { feature: "Phone payment collection", starter: false, professional: true, business: true, enterprise: true },
  { feature: "Locations included", starter: "1", professional: "1", business: "Up to 5", enterprise: "Unlimited" },
  { feature: "Analytics dashboard", starter: "Basic", professional: "Basic", business: "Centralized, multi-location", enterprise: "Centralized, multi-location" },
  { feature: "Support", starter: "Email", professional: "Priority", business: "Priority + onboarding", enterprise: "Dedicated account manager" },
  { feature: "Setup fees", starter: false, professional: false, business: false, enterprise: false },
  { feature: "Contract required", starter: false, professional: false, business: false, enterprise: "Negotiable" },
]
