export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://x1voice.com"

export const SITE_NAME = "X1 Voice"

export const SITE_TAGLINE =
  "The AI phone agent that answers every call, takes every order."

export const SITE_DESCRIPTION =
  "X1 Voice answers your restaurant's phone 24/7, takes orders, handles questions, and syncs straight to your POS — so no call, and no order, ever gets missed."

export const ORG = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: [] as string[],
}

export const CONTACT = {
  salesEmail: "sales@x1voice.com",
  supportEmail: "support@x1voice.com",
  phone: "+1-555-010-1010",
}

/**
 * The old site stated this claim three different ways (30% / 20-30% / 30-40%)
 * across different pages with no citation. Defined once here, rendered
 * everywhere through <SourcedStat>, so it can't drift again.
 *
 * TODO(x1voice): replace `source` with a real third-party citation before
 * launch, or keep the honest "internal estimate" framing below.
 */
export const MISSED_CALLS_STAT = {
  value: "1 in 4",
  label: "restaurant phone calls goes unanswered during peak hours",
  detail:
    "Each missed call is a lost order — typically $25–$50 in ticket value that walks to a competitor instead.",
  source: {
    label: "X1 Voice analysis of anonymized customer call logs",
    url: undefined as string | undefined,
    asOf: "2026-01",
  },
}

export type PlaceholderTestimonial = {
  initials: string
  roleLabel: string
  segment: string
  quote: string
}

/**
 * Explicit, labeled placeholders — never fabricated names or quotes.
 * Swap for real customer testimonials as they come in (one data edit).
 */
export const PLACEHOLDER_TESTIMONIALS: PlaceholderTestimonial[] = [
  {
    initials: "QSR",
    roleLabel: "Customer story — coming soon",
    segment: "Multi-location quick-service group",
    quote:
      "This slot is reserved for a real customer testimonial once we have one to share.",
  },
  {
    initials: "PZA",
    roleLabel: "Customer story — coming soon",
    segment: "Independent pizzeria, single location",
    quote:
      "This slot is reserved for a real customer testimonial once we have one to share.",
  },
  {
    initials: "GHK",
    roleLabel: "Customer story — coming soon",
    segment: "Ghost kitchen operator",
    quote:
      "This slot is reserved for a real customer testimonial once we have one to share.",
  },
]

export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "x1voice/demo"

export const HOME_FAQS: { question: string; answer: string }[] = [
  {
    question: "Does X1 Voice replace my phone number?",
    answer:
      "No — X1 Voice answers calls to your existing restaurant phone number. Setup means forwarding or routing that number to X1 Voice, not getting a new one.",
  },
  {
    question: "What happens if the AI can't handle a call?",
    answer:
      "Calls it can't confidently resolve — a complex complaint, a request outside the menu — get transferred to your staff or routed to voicemail with a transcript, based on rules you set.",
  },
  {
    question: "Which POS systems does it work with?",
    answer:
      "Square and Clover today, with OrderCounter and OrderOut integrations also available. See /integrations for the full list and setup details.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most single-location restaurants are live within a day: menu import, call forwarding, and a short test-call review before it starts taking real orders.",
  },
]
