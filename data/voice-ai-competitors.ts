/**
 * How X1 Voice compares to the main restaurant voice-AI vendors.
 *
 * Positioning is factual (sourced from the market landscape). X1 Voice is
 * framed favorably but every competitor cell is defensible, no fabricated
 * weaknesses, and where a competitor is strong we say so. Update as the
 * market moves.
 */

export type Cell = "yes" | "no" | "partial" | string

export type VoiceVendor = {
  name: string
  isUs?: boolean
  category:
    | "Phone ordering"
    | "Reservations / answering"
    | "Enterprise QSR"
    | "General receptionist"
    | "Missed-call recovery"
  buyer: string
  pricingModel: string
  /** Whether the vendor publishes prices openly. */
  transparentPricing: boolean
  pricingNote: string
  cells: {
    answering: Cell
    ordering: Cell
    posWrite: "deep" | "basic" | "none"
    payments: Cell
    independents: Cell
    fastSetup: Cell
  }
}

export const MATRIX_DIMENSIONS: { key: keyof VoiceVendor["cells"]; label: string }[] = [
  { key: "answering", label: "24/7 phone answering" },
  { key: "ordering", label: "Off-premise order-taking" },
  { key: "posWrite", label: "Deep POS order write" },
  { key: "payments", label: "Payment on the call" },
  { key: "independents", label: "Built for independents" },
  { key: "fastSetup", label: "Setup in minutes" },
]

export const COMPARE_INTRO =
  "Most restaurant voice tools do one thing well, answering, or reservations, or enterprise drive-thru. X1 Voice is built for independents and growing groups that need the whole job done: answer every call, take the full order, collect payment, and drop a clean ticket into the POS. Here's how the field lines up."

export const VOICE_VENDORS: VoiceVendor[] = [
  {
    name: "X1 Voice",
    isUs: true,
    category: "Phone ordering",
    buyer: "Independents & growing groups",
    pricingModel: "Flat per location",
    transparentPricing: true,
    pricingNote: "$250/mo Starter, 750 minutes included. Public pricing.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "yes",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Slang.ai",
    category: "Reservations / answering",
    buyer: "Full-service independents & groups",
    pricingModel: "Flat per location",
    transparentPricing: true,
    pricingNote: "Public: Core $399/mo, Premium $599/mo. Strong on reservations.",
    cells: {
      answering: "yes",
      ordering: "no",
      posWrite: "basic",
      payments: "no",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Loman AI",
    category: "Reservations / answering",
    buyer: "Small independents (1 to 3 units)",
    pricingModel: "Per minute",
    transparentPricing: false,
    pricingNote: "Good at call recovery; weaker on complex modified orders.",
    cells: {
      answering: "yes",
      ordering: "partial",
      posWrite: "basic",
      payments: "no",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Popmenu",
    category: "General receptionist",
    buyer: "Independents buying a marketing bundle",
    pricingModel: "Bundle subscription",
    transparentPricing: true,
    pricingNote: "~$149/mo entry; voice is one module inside a marketing suite.",
    cells: {
      answering: "yes",
      ordering: "partial",
      posWrite: "basic",
      payments: "no",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Kea AI",
    category: "Phone ordering",
    buyer: "Independents & multi-unit QSR",
    pricingModel: "Per location (quote)",
    transparentPricing: false,
    pricingNote: "Order-accuracy focus; Toast/Square/Clover/SpotOn integrations.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Maple AI",
    category: "Phone ordering",
    buyer: "Mid-market groups (5 to 15 units)",
    pricingModel: "Subscription (quote)",
    transparentPricing: false,
    pricingNote: "Inventory-aware ordering on Toast/SkyTab; upsell-focused.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "ConverseNow",
    category: "Enterprise QSR",
    buyer: "High-volume QSR / pizza chains",
    pricingModel: "Enterprise negotiated",
    transparentPricing: false,
    pricingNote: "Deep QSR/pizza focus; enterprise contracts, not independents.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "no",
      fastSetup: "no",
    },
  },
  {
    name: "SoundHound",
    category: "Enterprise QSR",
    buyer: "Enterprise QSR chains",
    pricingModel: "Enterprise negotiated",
    transparentPricing: false,
    pricingNote: "Owns its own speech stack; enterprise rollouts and hardware.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "no",
      fastSetup: "no",
    },
  },
  {
    name: "VOICEplug",
    category: "Phone ordering",
    buyer: "Independents & mid-market",
    pricingModel: "Subscription + usage (quote)",
    transparentPricing: false,
    pricingNote: "Omnichannel ordering middleware over your phone/POS.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "yes",
      fastSetup: "partial",
    },
  },
  {
    name: "Bite Buddy",
    category: "Phone ordering",
    buyer: "High-volume, complex menus",
    pricingModel: "Per order",
    transparentPricing: false,
    pricingNote: "~$300/mo mid-volume; Toast/Square/Clover/Olo native.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "PolyAI",
    category: "Enterprise QSR",
    buyer: "National / international chains",
    pricingModel: "Enterprise negotiated",
    transparentPricing: false,
    pricingNote: "Enterprise-grade conversational voice; not for independents.",
    cells: {
      answering: "yes",
      ordering: "yes",
      posWrite: "deep",
      payments: "partial",
      independents: "no",
      fastSetup: "no",
    },
  },
  {
    name: "Goodcall",
    category: "General receptionist",
    buyer: "SMB service businesses (multi-industry)",
    pricingModel: "Per seat + usage",
    transparentPricing: true,
    pricingNote: "~$60+/mo public; general receptionist, shallow POS depth.",
    cells: {
      answering: "yes",
      ordering: "no",
      posWrite: "none",
      payments: "no",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Numa",
    category: "Missed-call recovery",
    buyer: "Casual / fast-casual",
    pricingModel: "Subscription",
    transparentPricing: false,
    pricingNote: "Text-back on missed calls; not full voice order-taking.",
    cells: {
      answering: "partial",
      ordering: "no",
      posWrite: "none",
      payments: "no",
      independents: "yes",
      fastSetup: "yes",
    },
  },
  {
    name: "Rosie AI",
    category: "Reservations / answering",
    buyer: "Small independents",
    pricingModel: "Low-cost subscription",
    transparentPricing: false,
    pricingNote: "24/7 answering; Zapier connections, not deep native POS.",
    cells: {
      answering: "yes",
      ordering: "no",
      posWrite: "basic",
      payments: "no",
      independents: "yes",
      fastSetup: "yes",
    },
  },
]
