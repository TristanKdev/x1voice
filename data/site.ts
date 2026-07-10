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

/**
 * The public "call it yourself" demo line. Calling is the consent event
 * (recording + marketing follow-up), disclosed on the DemoCall section.
 *
 * WIRE (dev): replace with the live demo number. `tel` is the dialable
 * form (E.164, no spaces); `display` is what renders on screen.
 */
export const DEMO_LINE = {
  tel: process.env.NEXT_PUBLIC_DEMO_TEL ?? "+15558675309",
  display: process.env.NEXT_PUBLIC_DEMO_DISPLAY ?? "(555) 867-5309",
}

export const HOME_FAQS: { question: string; answer: string }[] = [
  {
    question: "What can X1 Voice handle on a call?",
    answer:
      "Pickup and delivery orders, payments, menu and allergen questions, hours and directions, wait times, order status, catering inquiries, and smart routing to your team. It supports multiple languages and syncs clean tickets to your systems.",
  },
  {
    question: "Can AI phone ordering take payments over the phone?",
    answer:
      "Yes. X1 Voice securely takes credit and debit card payments over the phone for both pickup and delivery orders. It integrates directly with your POS, so customers can place an order and pay instantly without staff intervention.",
  },
  {
    question: "How fast is setup and what do we need?",
    answer:
      "X1 Voice can get you up and running in under 24 hours. Connect your POS, import the menu, choose a greeting, set hours and rules, then test. Most restaurants go live in under a day, and our team handles white-glove setup if you want it done for you.",
  },
  {
    question: "Does it work for multi-location and franchise groups?",
    answer:
      "Yes. Manage a shared menu with per-store overrides, local numbers, store-specific hours and holidays, and region-based routing. Analytics roll up by location, so you see call volume, conversion, and average ticket per store.",
  },
  {
    question: "What happens with edge cases or unhappy callers?",
    answer:
      "X1 Voice detects intent and either solves it or hands off cleanly. It can transfer to a live line, capture a voicemail with transcript, or message your team with caller info and context so guests get fast, human follow-up.",
  },
  {
    question: "Which POS systems does it work with?",
    answer: `Square, Clover, OrderCounter, and OrderOut directly, plus ${POS_VIA_DELIVERECT_COUNT} more POS systems — Toast, Lightspeed, TouchBistro, SpotOn, and others — through our Deliverect connection. See /integrations for setup details.`,
  },
]
