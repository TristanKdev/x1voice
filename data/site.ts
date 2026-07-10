import { POS_VIA_DELIVERECT_COUNT } from "./pos-systems"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://x1voice.com"

export const SITE_NAME = "X1 Voice"

export const SITE_TAGLINE =
  "The phone agent that picks up when your staff can't."

export const SITE_DESCRIPTION =
  "X1 Voice answers your restaurant's phone, takes the order, and sends it to your POS. It picks up around the clock, including when the line is slammed."

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
    "Each missed call is usually a lost order. That's $25–$50 in ticket value going to whoever does pick up.",
  source: {
    label: "X1 Voice analysis of anonymized customer call logs",
    url: undefined as string | undefined,
    asOf: "2026-01",
  },
}

export type Testimonial = {
  initials: string
  roleLabel: string
  segment: string
  quote: string
  /** True only for feedback actually received from a customer. */
  verified: boolean
  /** Where the quote came from. */
  source: "customer feedback"
}

/**
 * Real customer feedback, anonymized on purpose (names withheld at the
 * owner's instruction). Quotes are lightly edited for spelling and clarity
 * only — sentence meaning unchanged. Never add a quote here that wasn't
 * actually received.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "RO",
    roleLabel: "Restaurant owner",
    segment: "Name withheld · verified customer feedback",
    quote:
      "Faster service — love it. The machine was so clear and perfect. The delivery was great and faster.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "OP",
    roleLabel: "Operator",
    segment: "Name withheld · verified customer feedback",
    quote:
      "So easy to use and it sounds great. Service was quick and no problems so far.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "GM",
    roleLabel: "General manager",
    segment: "Name withheld · verified customer feedback",
    quote:
      "Set it and forget it. The software handles the phone for us so we can focus on the work.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "OW",
    roleLabel: "Owner",
    segment: "Name withheld · verified customer feedback",
    quote:
      "It paid for itself the first day. We captured tons of orders that were slipping through the cracks before.",
    verified: true,
    source: "customer feedback",
  },
]

export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "x1voice/demo"

export const HOME_FAQS: { question: string; answer: string }[] = [
  {
    question: "Does X1 Voice replace my phone number?",
    answer:
      "No. It answers calls to your existing number. Setup means forwarding that number to X1 Voice, not getting a new one.",
  },
  {
    question: "What happens if the AI can't handle a call?",
    answer:
      "Calls it can't confidently resolve, like a complaint or a request outside the menu, get transferred to your staff or sent to voicemail with a transcript. You set the rules for that.",
  },
  {
    question: "Which POS systems does it work with?",
    answer: `Square, Clover, OrderCounter, and OrderOut directly, plus ${POS_VIA_DELIVERECT_COUNT} more POS systems — Toast, Lightspeed, TouchBistro, SpotOn, and others — through our Deliverect connection. See /integrations for setup details.`,
  },
  {
    question: "How long does setup take?",
    answer:
      "Most single-location restaurants are live within a day: menu import, call forwarding, and a short test-call review before it starts taking real orders.",
  },
]
