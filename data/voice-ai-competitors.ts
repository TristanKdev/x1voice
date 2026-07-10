/**
 * How X1 Voice compares to the main restaurant voice-AI vendors.
 *
 * 24/7 answering is table stakes (everyone does it), so it's not a column.
 * The columns are the features that actually differ across the field. Every
 * competitor cell is defensible, no fabricated weaknesses, and where a
 * competitor is strong we say so. Update as the market moves.
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
  pricingNote: string
  cells: {
    ordering: Cell
    posWrite: "deep" | "basic" | "none"
    payments: Cell
    sms: Cell
    pricing: Cell
    fastSetup: Cell
  }
}

export const MATRIX_DIMENSIONS: { key: keyof VoiceVendor["cells"]; label: string }[] = [
  { key: "ordering", label: "Takes the full order" },
  { key: "posWrite", label: "Deep POS order write" },
  { key: "payments", label: "Payment on the call" },
  { key: "sms", label: "Texts order updates" },
  { key: "pricing", label: "Transparent pricing" },
  { key: "fastSetup", label: "Setup in minutes" },
]

export const COMPARE_INTRO =
  "Everyone answers the phone 24/7, so that's not the question. The question is whether it takes the whole order, writes it cleanly to your POS, takes payment, keeps the customer posted, and does it without a sales call. Here's how the field lines up."

export const VOICE_VENDORS: VoiceVendor[] = [
  {
    name: "X1 Voice",
    isUs: true,
    category: "Phone ordering",
    buyer: "Independents & growing groups",
    pricingModel: "Flat per location",
    pricingNote: "$250/mo Starter, 750 minutes included. Public pricing.",
    cells: { ordering: "yes", posWrite: "deep", payments: "yes", sms: "yes", pricing: "yes", fastSetup: "yes" },
  },
  {
    name: "Slang.ai",
    category: "Reservations / answering",
    buyer: "Full-service independents & groups",
    pricingModel: "Flat per location",
    pricingNote: "Public: Core $399/mo, Premium $599/mo. Strong on reservations.",
    cells: { ordering: "no", posWrite: "basic", payments: "no", sms: "yes", pricing: "yes", fastSetup: "partial" },
  },
  {
    name: "Loman AI",
    category: "Reservations / answering",
    buyer: "Small independents (1–3 units)",
    pricingModel: "Per minute",
    pricingNote: "Good at call recovery; weaker on complex modified orders.",
    cells: { ordering: "partial", posWrite: "basic", payments: "no", sms: "partial", pricing: "no", fastSetup: "partial" },
  },
  {
    name: "Popmenu",
    category: "General receptionist",
    buyer: "Independents buying a marketing bundle",
    pricingModel: "Bundle subscription",
    pricingNote: "~$149/mo entry; voice is one module in a marketing suite.",
    cells: { ordering: "partial", posWrite: "basic", payments: "no", sms: "yes", pricing: "yes", fastSetup: "partial" },
  },
  {
    name: "Kea AI",
    category: "Phone ordering",
    buyer: "Independents & multi-unit QSR",
    pricingModel: "Per location (quote)",
    pricingNote: "Order-accuracy focus; Toast/Square/Clover/SpotOn integrations.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "partial", pricing: "no", fastSetup: "partial" },
  },
  {
    name: "Maple AI",
    category: "Phone ordering",
    buyer: "Mid-market groups (5–15 units)",
    pricingModel: "Subscription (quote)",
    pricingNote: "Inventory-aware ordering on Toast/SkyTab; upsell-focused.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "partial", pricing: "no", fastSetup: "partial" },
  },
  {
    name: "ConverseNow",
    category: "Enterprise QSR",
    buyer: "High-volume QSR / pizza chains",
    pricingModel: "Enterprise negotiated",
    pricingNote: "Deep QSR/pizza focus; enterprise contracts, not independents.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "no", pricing: "no", fastSetup: "no" },
  },
  {
    name: "SoundHound",
    category: "Enterprise QSR",
    buyer: "Enterprise QSR chains",
    pricingModel: "Enterprise negotiated",
    pricingNote: "Owns its own speech stack; enterprise rollouts and hardware.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "no", pricing: "no", fastSetup: "no" },
  },
  {
    name: "VOICEplug",
    category: "Phone ordering",
    buyer: "Independents & mid-market",
    pricingModel: "Subscription + usage (quote)",
    pricingNote: "Omnichannel ordering middleware over your phone/POS.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "partial", pricing: "no", fastSetup: "partial" },
  },
  {
    name: "Bite Buddy",
    category: "Phone ordering",
    buyer: "High-volume, complex menus",
    pricingModel: "Per order",
    pricingNote: "~$300/mo mid-volume; Toast/Square/Clover/Olo native.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "partial", pricing: "no", fastSetup: "partial" },
  },
  {
    name: "PolyAI",
    category: "Enterprise QSR",
    buyer: "National / international chains",
    pricingModel: "Enterprise negotiated",
    pricingNote: "Enterprise-grade conversational voice; not for independents.",
    cells: { ordering: "yes", posWrite: "deep", payments: "partial", sms: "no", pricing: "no", fastSetup: "no" },
  },
  {
    name: "Goodcall",
    category: "General receptionist",
    buyer: "SMB service businesses (multi-industry)",
    pricingModel: "Per seat + usage",
    pricingNote: "~$60+/mo public; general receptionist, shallow POS depth.",
    cells: { ordering: "no", posWrite: "none", payments: "no", sms: "partial", pricing: "yes", fastSetup: "yes" },
  },
  {
    name: "Numa",
    category: "Missed-call recovery",
    buyer: "Casual / fast-casual",
    pricingModel: "Subscription",
    pricingNote: "Text-back on missed calls; not full voice order-taking.",
    cells: { ordering: "no", posWrite: "none", payments: "no", sms: "yes", pricing: "no", fastSetup: "yes" },
  },
  {
    name: "Rosie AI",
    category: "Reservations / answering",
    buyer: "Small independents",
    pricingModel: "Low-cost subscription",
    pricingNote: "24/7 answering; Zapier connections, not deep native POS.",
    cells: { ordering: "no", posWrite: "basic", payments: "no", sms: "yes", pricing: "no", fastSetup: "yes" },
  },
]
