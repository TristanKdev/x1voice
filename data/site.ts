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
    "Each missed call is usually a lost order. That's $25 to $50 in ticket value going to whoever does pick up.",
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
 * only, sentence meaning unchanged. Never add a quote here that wasn't
 * actually received.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "RO",
    roleLabel: "Owner",
    segment: "",
    quote:
      "Faster service, love it. The machine was so clear and perfect. The delivery was great and faster.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "OP",
    roleLabel: "Operator",
    segment: "",
    quote:
      "So easy to use and it sounds great. Service was quick and no problems so far.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "GM",
    roleLabel: "General manager",
    segment: "",
    quote:
      "Set it and forget it. The software handles the phone for us so we can focus on the work.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "OW",
    roleLabel: "Owner",
    segment: "",
    quote:
      "It paid for itself the first day. We captured tons of orders that were slipping through the cracks before.",
    verified: true,
    source: "customer feedback",
  },
  {
    initials: "CU",
    roleLabel: "Customer",
    segment: "",
    quote:
      "Wow, that sounded great. I honestly could not tell it was AI.",
    verified: true,
    source: "customer feedback",
  },
]

export type Review = {
  initials: string
  role: string
  quote: string
  /** True only for feedback actually received. The rest are illustrative. */
  verified: boolean
}

/**
 * Reviews for the rotating wall. The first entries (verified: true) are the
 * real customer quotes. The rest are ILLUSTRATIVE SAMPLES written to fill the
 * rotation so the design reads full — they are NOT real customers.
 *
 * ⚠️ REPLACE the verified:false entries with real reviews before launch.
 * Publishing fabricated testimonials is deceptive and an FTC violation. This
 * array is the single place to edit them.
 */
export const REVIEWS: Review[] = [
  { initials: "RO", role: "Owner", verified: true, quote: "Faster service, love it. The machine was so clear and perfect. The delivery was great and faster." },
  { initials: "OP", role: "Operator", verified: true, quote: "So easy to use and it sounds great. Service was quick and no problems so far." },
  { initials: "GM", role: "General manager", verified: true, quote: "Set it and forget it. The software handles the phone for us so we can focus on the work." },
  { initials: "OW", role: "Owner", verified: true, quote: "It paid for itself the first day. We captured tons of orders that were slipping through the cracks before." },
  { initials: "CU", role: "Customer", verified: true, quote: "Wow, that sounded great. I honestly could not tell it was AI." },

  { initials: "DK", role: "Owner", verified: false, quote: "I was sure a robot would butcher my callers' orders. Two weeks in and the tickets are cleaner than what my staff typed." },
  { initials: "MR", role: "Franchisee", verified: false, quote: "Didn't believe the 'live in a day' pitch. We were taking real orders by dinner." },
  { initials: "TS", role: "Manager", verified: false, quote: "Friday rush used to mean a dozen missed calls. Now the phone just gets answered." },
  { initials: "LP", role: "Owner", verified: false, quote: "My hostess finally stops running to the phone every two minutes." },
  { initials: "JG", role: "General manager", verified: false, quote: "Thought it'd sound like a phone tree. It talks like a person." },
  { initials: "AV", role: "Pizzeria owner", verified: false, quote: "The half-and-half pizza orders come through right every time. That was my whole worry." },
  { initials: "BN", role: "Multi-unit operator", verified: false, quote: "We added a second location and just pointed the number at it. Done." },
  { initials: "CF", role: "Owner", verified: false, quote: "Card payments over the phone with zero staff involved. Big deal for us." },
  { initials: "HM", role: "Manager", verified: false, quote: "Skeptical is an understatement. It answered a Spanish call before I could even react." },
  { initials: "RK", role: "Owner", verified: false, quote: "Our average ticket went up because it actually offers the sides. My kids never remembered to." },
  { initials: "SD", role: "General manager", verified: false, quote: "No more 'sorry we were slammed' voicemails. It just picks up." },
  { initials: "EL", role: "Owner", verified: false, quote: "Setup took a coffee break. I kept waiting for the catch." },
  { initials: "PT", role: "Operator", verified: false, quote: "The dashboard showed me exactly how many calls I was losing. That number hurt." },
  { initials: "WsC", role: "Owner", verified: false, quote: "Cheaper than one shift of a person answering phones, and it never calls in sick." },
  { initials: "NB", role: "Manager", verified: false, quote: "Callers hang up happy. I listen to the recordings and they have no idea." },
  { initials: "QA", role: "Multi-unit owner", verified: false, quote: "I run three stores. The rolled-up reporting alone is worth it." },
  { initials: "VE", role: "General manager", verified: false, quote: "It caught a catering order at 11pm that we would've lost cold." },
  { initials: "FD", role: "Owner", verified: false, quote: "My line cooks stopped grabbing the phone mid-ticket. Kitchen's calmer." },
  { initials: "GH", role: "Owner", verified: false, quote: "Was ready to cancel in week one. Now I tell every operator I know." },
  { initials: "IZ", role: "Manager", verified: false, quote: "Handles the weird modifiers, no sauce on half, extra on the other. Nails it." },
  { initials: "OB", role: "Owner", verified: false, quote: "The number stayed the same. My customers didn't notice anything except we actually answer now." },
  { initials: "KM", role: "Owner", verified: false, quote: "Doubted the payment part would work with my POS. It just showed up in Square." },
  { initials: "RJ", role: "General manager", verified: false, quote: "It routed an angry caller straight to me with the whole context. Saved that guest." },
  { initials: "TnO", role: "Operator", verified: false, quote: "We're a ghost kitchen. The phone was our weak spot. Not anymore." },
  { initials: "YC", role: "Customer", verified: false, quote: "Honestly forgot it wasn't a person until I saw the transcript." },
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
    answer: `Square and OrderCounter directly, plus Clover and ${POS_VIA_DELIVERECT_COUNT} more POS systems, Toast, Lightspeed, TouchBistro, SpotOn, and others, through our Deliverect connection. See /integrations for setup details.`,
  },
]
