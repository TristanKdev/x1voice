import type { Faq } from "./solutions"

export type PricingSnapshot = {
  planName: string
  priceLabel: string
  billingNote?: string
}

export type FeatureMatrixRow = {
  feature: string
  x1voice: boolean | string
  competitor: boolean | string
  note?: string
}

export type ComparePage = {
  slug: string
  competitorName: string
  competitorUrl: string
  summary: string
  pricingComparison: {
    x1voice: PricingSnapshot
    competitor: PricingSnapshot
    /** ISO date the competitor pricing snapshot was taken. */
    asOf: string
    /** Link to the competitor's own public pricing page, required, not optional. */
    sourceUrl: string
  }
  featureMatrix: FeatureMatrixRow[]
  /** Min 3, feeds FAQPage JSON-LD too. */
  faqs: Faq[]
  /** ISO date, surfaced on-page as a recurring content-ops obligation. */
  lastReviewedAt: string
  metaDescription: string
}

/**
 * Consolidates the old site's separate /compare/vs-X and /alternatives/X
 * pages (13 pages, zero citations, one had a math error) into one sourced
 * page per competitor. Every price claim must render through
 * <PricingDisclaimer>, never state a competitor's price as bare fact.
 */
export const comparePages: ComparePage[] = [
  {
    slug: "kea-ai",
    competitorName: "Kea AI",
    competitorUrl: "https://kea.ai/",
    summary:
      "Kea AI sells a flat-rate voice AI built for single-location restaurants. Its price runs lower than X1 Voice's comparable tier, but the rate is typically sold on an annual contract and charged per location, with no multi-location bundle. X1 Voice bills month to month at published prices and bundles multiple locations under one plan.",
    pricingComparison: {
      x1voice: {
        planName: "Professional",
        priceLabel: "From $250/mo",
        billingNote: "No contract required; includes phone payment collection.",
      },
      competitor: {
        planName: "Flat-rate plan (per location)",
        priceLabel: "~$450/mo",
        billingNote:
          "Kea advertises this as an all-in flat rate (calls, orders, payment collection) but typically requires an annual commitment. Confirm current contract terms before signing.",
      },
      asOf: "2026-01",
      sourceUrl: "https://kea.ai/",
    },
    featureMatrix: [
      { feature: "24/7 call answering", x1voice: true, competitor: true },
      { feature: "Order-taking synced to POS", x1voice: true, competitor: true },
      { feature: "Phone payment collection", x1voice: true, competitor: true, note: "Both include this at their all-in tier." },
      { feature: "Monthly, no-contract billing", x1voice: true, competitor: "Typically annual contract" },
      {
        feature: "Multi-location bundling under one plan",
        x1voice: "Up to 5 locations on Business plan",
        competitor: "Priced per location",
        note: "Kea's flat rate is per single location; a 3-location group pays 3x, with no bundled discount published.",
      },
      { feature: "Multi-language call handling", x1voice: true, competitor: "Not documented publicly" },
      { feature: "Centralized multi-location reporting", x1voice: "Business plan and up", competitor: "Not documented publicly" },
      { feature: "Published, self-serve pricing", x1voice: true, competitor: true, note: "Rare among AI phone-agent vendors; most require a sales call." },
    ],
    faqs: [
      {
        question: "Is Kea AI cheaper than X1 Voice?",
        answer:
          "On the monthly number, yes. Kea's published flat rate (about $450/mo) is lower than X1 Voice's Professional plan ($750/mo), which is the closest match on features like phone payment collection. Kea's rate is typically tied to an annual contract, though, so compare total first-year cost rather than the monthly figure alone, and confirm current terms directly with Kea before signing.",
      },
      {
        question: "Does Kea AI work for multi-location restaurant groups?",
        answer:
          "It's sold per location, and Kea doesn't publicly document a multi-location bundle or centralized reporting. X1 Voice's Business plan covers up to 5 locations under one plan with a shared analytics dashboard, which is typically simpler for a growing group to manage.",
      },
      {
        question: "Do both handle phone payments?",
        answer:
          "Yes. Kea's flat-rate plan and X1 Voice's Professional plan both support collecting payment during the call. On X1 Voice, payment collection is a Professional-tier feature; the Starter plan ($250/mo) doesn't include it.",
      },
      {
        question: "Is switching from Kea AI to X1 Voice difficult?",
        answer:
          "If you're on an annual Kea contract, check your cancellation terms first. Once your account is created, menu and POS setup on X1 Voice typically takes a few business days. See /integrations for POS-specific setup steps.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs Kea AI: pricing with sources, what the contract terms mean for total cost, and where the two AI phone services differ on features.",
  },
  {
    slug: "hungerrush",
    competitorName: "HungerRush OrderAI",
    competitorUrl: "https://www.hungerrush.com/products/orderai-ai-ordering-system/",
    summary:
      "OrderAI is HungerRush's voice-ordering add-on, built for restaurant groups already running the company's own POS, and its pricing isn't published; you have to talk to sales. X1 Voice publishes its pricing and works with several POS systems, including Square and OrderCounter directly plus Clover and 80+ more via Deliverect, rather than requiring you to run a specific POS.",
    pricingComparison: {
      x1voice: {
        planName: "Business",
        priceLabel: "From $250/mo",
        billingNote: "Covers up to 5 locations with centralized reporting.",
      },
      competitor: {
        planName: "OrderAI Talk (quote-based)",
        priceLabel: "Custom (contact sales)",
        billingNote:
          "HungerRush doesn't publish OrderAI pricing; it's marketed primarily to multi-unit groups and generally requires running HungerRush's own POS. Get a quote directly from HungerRush before comparing costs.",
      },
      asOf: "2026-01",
      sourceUrl: "https://www.hungerrush.com/products/orderai-ai-ordering-system/",
    },
    featureMatrix: [
      { feature: "24/7 call answering", x1voice: true, competitor: true },
      { feature: "Order-taking synced to POS", x1voice: true, competitor: true },
      {
        feature: "Works with your existing POS",
        x1voice: "Square, OrderCounter (direct) + Clover, Toast & 80+ via Deliverect",
        competitor: "Requires HungerRush POS",
        note: "OrderAI is built for HungerRush's own POS ecosystem; it isn't sold as a standalone add-on for other POS systems.",
      },
      { feature: "Phone payment collection", x1voice: true, competitor: true },
      { feature: "Published, self-serve pricing", x1voice: true, competitor: false },
      {
        feature: "Track record at very large multi-unit scale",
        x1voice: "Growing",
        competitor: "10M+ AI orders processed, per HungerRush",
        note: "HungerRush has publicly cited tens of millions of AI phone orders processed across its customer base. If you're already a HungerRush customer, that scale is a real advantage.",
      },
      { feature: "Minimum location count for onboarding", x1voice: "None; works for 1 location", competitor: "Typically marketed to 10+ locations" },
      { feature: "Multi-language call handling", x1voice: true, competitor: "Not documented publicly" },
    ],
    faqs: [
      {
        question: "Do I need HungerRush's POS to use OrderAI?",
        answer:
          "HungerRush's own product pages present OrderAI Talk as built around its POS ecosystem. If you're not already on HungerRush, switching POS systems is a much bigger project than adding a phone AI on top of what you have. Confirm directly with HungerRush if you're considering it.",
      },
      {
        question: "How much does HungerRush OrderAI cost?",
        answer:
          "There's no published price for OrderAI; HungerRush gives you a quote after a sales conversation. X1 Voice's plans are public and start at $250/mo. If you want to compare costs before getting on a sales call, that's a real difference.",
      },
      {
        question: "Is HungerRush OrderAI a good fit for a single-location restaurant?",
        answer:
          "It's mostly marketed toward multi-unit groups with 10 or more locations already on HungerRush's platform. A single independent restaurant is more likely to find a faster, cheaper setup elsewhere. X1 Voice is one such option; it has no minimum location requirement.",
      },
      {
        question: "Can I keep my current POS if I switch to X1 Voice?",
        answer:
          "Yes, as long as it's one of X1 Voice's supported integrations, Square and OrderCounter directly, or Clover and 80+ more via Deliverect. See /integrations for setup details on each.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs HungerRush OrderAI: one publishes pricing and works across POS systems, the other is quote-based and built for HungerRush's own POS.",
  },
  {
    slug: "slang-ai",
    competitorName: "Slang AI",
    competitorUrl: "https://www.slang.ai/",
    summary:
      "Slang AI centers on reservations, hospitality-style call handling, and guest messaging. What it doesn't do, per its own published materials, is take a phone order directly: callers who want to order get a text with a link to your online ordering page. X1 Voice is built to complete the order, including payment, on the call itself.",
    pricingComparison: {
      x1voice: {
        planName: "Professional",
        priceLabel: "From $250/mo",
        billingNote: "Includes order-taking with payment collection on the call.",
      },
      competitor: {
        planName: "Core (per location)",
        priceLabel: "~$399/mo",
        billingNote:
          "Slang's published starting price for its Core plan; Premium starts around $599/mo and adds custom branding and bilingual support. Confirm current tiers with Slang directly.",
      },
      asOf: "2026-01",
      sourceUrl: "https://www.slang.ai/pricing",
    },
    featureMatrix: [
      { feature: "24/7 call answering", x1voice: true, competitor: true },
      {
        feature: "Completes order-taking on the call",
        x1voice: true,
        competitor: "Texts a link to order online instead",
        note: "Per Slang's own materials, callers who want to order are sent an SMS link rather than having the order taken and confirmed on the phone.",
      },
      { feature: "Phone payment collection", x1voice: true, competitor: false },
      {
        feature: "Reservation platform integrations (OpenTable, SevenRooms, Yelp)",
        x1voice: "Not a core focus",
        competitor: true,
        note: "Slang's plans are built around reservation and hospitality workflows. If reservations are your main phone volume, that focus is a genuine strength.",
      },
      { feature: "Order-taking synced to POS", x1voice: true, competitor: false },
      { feature: "Multi-language call handling", x1voice: true, competitor: "Bilingual Spanish support (Premium add-on)" },
      { feature: "Published, self-serve pricing", x1voice: true, competitor: true },
      { feature: "Setup time", x1voice: "Typically a few business days", competitor: "Not publicly documented" },
    ],
    faqs: [
      {
        question: "Does Slang AI take food orders over the phone?",
        answer:
          "Not directly, going by Slang's own published materials. When a caller wants to place an order, Slang sends them a text with a link to your online ordering page rather than completing the order on the call. X1 Voice takes and confirms the order, including payment, during the call itself.",
      },
      {
        question: "Is Slang AI a better fit for reservation-heavy restaurants?",
        answer:
          "It can be. Slang's plans are built around reservations and integrate with platforms like OpenTable, SevenRooms, and Yelp. If reservations are most of your phone volume and phone ordering isn't a priority, weigh that against X1 Voice's order-first focus.",
      },
      {
        question: "How does pricing compare?",
        answer:
          "Slang's published Core plan starts around $399/mo per location, less than X1 Voice's Professional plan at $750/mo. But Slang's plans don't take orders on the call, so the two aren't doing the same job at those price points. Confirm current Slang pricing directly before comparing.",
      },
      {
        question: "Can X1 Voice also handle reservations?",
        answer:
          "X1 Voice is built primarily around order-taking and call answering rather than reservation-platform integrations. If dedicated reservation-system integration is your top priority, ask our team whether your specific platform is supported before switching.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs Slang AI: sourced pricing and one big functional difference. Slang texts callers an ordering link; X1 Voice takes the order on the call.",
  },
  {
    slug: "loman-ai",
    competitorName: "Loman AI",
    competitorUrl: "https://loman.ai/",
    summary:
      "Loman AI answers restaurant phones at what appears to be a lower starting price than X1 Voice, though Loman's own pricing page currently asks you to contact sales rather than listing current numbers, so that price is an estimate. Both products offer full order-taking with POS integration on their higher tiers.",
    pricingComparison: {
      x1voice: {
        planName: "Professional",
        priceLabel: "From $250/mo",
        billingNote: "Includes order-taking with payment collection on the call.",
      },
      competitor: {
        planName: "Premium (order-taking + POS)",
        priceLabel: "~$299/mo (estimated)",
        billingNote:
          "Loman's own pricing page currently requests a quote rather than listing prices; this estimate is based on third-party pricing trackers as of late 2025/early 2026 and may be out of date. Confirm current pricing directly with Loman.",
      },
      asOf: "2026-01",
      sourceUrl: "https://loman.ai/pricing",
    },
    featureMatrix: [
      { feature: "24/7 call answering", x1voice: true, competitor: true },
      { feature: "Order-taking synced to POS", x1voice: true, competitor: "Premium plan only" },
      { feature: "Phone payment collection", x1voice: true, competitor: "Premium plan only" },
      {
        feature: "High simultaneous call capacity",
        x1voice: true,
        competitor: "Up to 50 simultaneous calls, per Loman",
        note: "Loman publishes a specific concurrent-call number; X1 Voice also handles concurrent calls but doesn't publish a fixed cap.",
      },
      { feature: "Published, self-serve pricing", x1voice: true, competitor: false, note: "Loman's site currently requires contacting sales for a quote." },
      { feature: "Multi-language call handling", x1voice: true, competitor: "Not documented publicly" },
      { feature: "Centralized multi-location reporting", x1voice: "Business plan and up", competitor: "Not documented publicly" },
      { feature: "Setup fee", x1voice: false, competitor: "Reported by some third-party sources; not listed on Loman's current site" },
    ],
    faqs: [
      {
        question: "Is Loman AI cheaper than X1 Voice?",
        answer:
          "Possibly, on paper. Third-party pricing trackers put Loman's order-capable Premium plan around $299/mo, well under X1 Voice's Professional plan at $750/mo. But Loman's own site no longer lists prices and asks you to contact sales, so treat that estimate as a starting point rather than a quote, and confirm current numbers before deciding.",
      },
      {
        question: "Does Loman AI's cheaper plan also take orders?",
        answer:
          "Loman's published feature lists put full order-taking and POS integration on their Premium tier, not their entry Starter tier. Make sure you're comparing the plan that actually includes ordering rather than call answering alone.",
      },
      {
        question: "How many calls can each handle at once?",
        answer:
          "Loman publishes a specific figure: up to 50 simultaneous calls. X1 Voice also answers calls concurrently, so a rush doesn't produce busy signals, but we don't publish a fixed numeric cap. Ask our team for details relevant to your call volume.",
      },
      {
        question: "Why doesn't Loman list its current prices?",
        answer:
          "We don't know; pricing pages change. That's exactly why any competitor price you see here (including ours for Loman) is labeled as an estimate with a source and a date, rather than stated as fact.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs Loman AI: pricing estimates labeled with sources and dates, plus a feature breakdown of order-taking, POS sync, and call capacity.",
  },
  {
    slug: "answering-service",
    competitorName: "a traditional answering service",
    competitorUrl: "https://smith.ai/pricing/receptionists",
    summary:
      "A traditional live answering service puts a human on the line to take a message or transfer the call. It's a real, proven option. It generally isn't built to take restaurant orders, apply your menu pricing, or sync anything to your POS, though. That's the basic split: X1 Voice was built to take orders, and a live answering service was built to take messages and route calls.",
    pricingComparison: {
      x1voice: {
        planName: "Starter",
        priceLabel: "From $250/mo",
        billingNote: "500 minutes/mo included; order-taking with POS sync.",
      },
      competitor: {
        planName: "Human-staffed plan, low call volume",
        priceLabel: "$300-$800+/mo",
        billingNote:
          "Based on a published live-answering-service rate card (a general business/legal answering provider, not restaurant-specific): plans typically start around $300/mo for a low call allotment, with per-call overage fees that add up quickly at real restaurant call volumes. Restaurant-specific answering services vary; confirm pricing with whichever provider you're evaluating.",
      },
      asOf: "2026-01",
      sourceUrl: "https://smith.ai/pricing/receptionists",
    },
    featureMatrix: [
      { feature: "24/7 availability", x1voice: true, competitor: "Varies by provider and shift coverage purchased" },
      { feature: "Takes and prices menu orders", x1voice: true, competitor: false, note: "Most live answering services take a message or transfer the call rather than pricing an order against your menu." },
      { feature: "Order synced to POS", x1voice: true, competitor: false },
      { feature: "Phone payment collection", x1voice: true, competitor: "Rarely offered" },
      { feature: "Human warmth for sensitive or unusual calls", x1voice: "AI voice, escalates to staff when needed", competitor: true, note: "A live human agent can use judgment on unusual or emotionally sensitive calls in ways a voice AI is still catching up to." },
      { feature: "Billed per call/minute with overage risk", x1voice: false, competitor: true, note: "Flat monthly rate vs. per-call/per-minute billing that scales with volume." },
      { feature: "Setup time", x1voice: "Typically a few business days", competitor: "Often same-day, since no menu/POS training is required" },
    ],
    faqs: [
      {
        question: "Is a live answering service cheaper than X1 Voice?",
        answer:
          "At low call volumes, published rate cards for general live answering services often start a bit above X1 Voice's $250/mo Starter plan, and per-call overage fees push costs up as volume grows. The bigger difference usually isn't price at all. Most answering services take a message; they don't price and confirm an order against your menu.",
      },
      {
        question: "Can a traditional answering service take food orders?",
        answer:
          "Some can, but it's not the default. Many general-purpose answering services are built for message-taking and call transfer rather than menu pricing and POS sync. If order-taking is what you need, confirm that capability specifically before signing up with any answering service.",
      },
      {
        question: "Do answering services integrate with restaurant POS systems?",
        answer:
          "Generally no. POS integration isn't a standard feature for traditional live answering services, which are built for a wide range of businesses, not restaurants specifically. X1 Voice syncs directly with Square and OrderCounter, plus Clover and 80+ more via Deliverect.",
      },
      {
        question: "What's the real advantage of a human answering service?",
        answer:
          "Judgment. A live agent can improvise on unusual, sensitive, or ambiguous calls in ways a voice AI is still improving on. For routine order-taking and reservation-style calls, that flexibility usually isn't needed, but it's a fair reason some businesses choose a human-staffed option.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs a traditional answering service: real pricing ranges, and the difference between taking a message and taking an order synced to your POS.",
  },
  {
    slug: "hiring-staff",
    competitorName: "hiring phone staff",
    competitorUrl:
      "https://www.bls.gov/ooh/food-preparation-and-serving/food-and-beverage-serving-and-related-workers.htm",
    summary:
      "An employee who answers your phones can also host, run food, and handle whatever comes up in person. No AI voice agent can do that. But a person covers only the hours they're on shift, and on a pure monthly-cost basis for phone coverage specifically, one employee's loaded labor cost for a single shift runs well above X1 Voice's monthly price. The math below shows exactly how we get that number.",
    pricingComparison: {
      x1voice: {
        planName: "Starter",
        priceLabel: "From $250/mo",
        billingNote: "500 minutes/mo included, 24/7, unlimited concurrent calls.",
      },
      competitor: {
        planName: "One employee, single shift (~40 hrs/week)",
        priceLabel: "~$3,100-$3,800/mo",
        billingNote:
          "Estimated loaded cost (base wages plus payroll taxes and typical turnover/training overhead) for one employee covering phones during a standard 40-hour week, at roughly $18-22/hr loaded. Base wage range is anchored to BLS median hourly wages for food and beverage serving roles (~$14.92/hr, May 2024); the $18-22/hr loaded estimate adds ~25-40% for employer-side costs, a common industry rule of thumb, not a BLS figure. Actual cost varies by market, benefits offered, and turnover rate.",
      },
      asOf: "2026-01",
      sourceUrl:
        "https://www.bls.gov/ooh/food-preparation-and-serving/food-and-beverage-serving-and-related-workers.htm",
    },
    featureMatrix: [
      { feature: "Covers a full 40-hour week for the price shown", x1voice: "N/A; flat monthly rate regardless of hours", competitor: true },
      { feature: "Covers hours outside that one shift (nights, early morning)", x1voice: true, competitor: false, note: "Extending human coverage to more hours means adding more shifts and more cost." },
      { feature: "Handles multiple calls at the exact same time", x1voice: true, competitor: false, note: "A single staffer can only be on one call at a time; simultaneous callers get a busy signal or hold." },
      { feature: "Can perform in-person tasks (hosting, running food, bussing)", x1voice: false, competitor: true, note: "A real, fair advantage of a human hire: an AI voice agent only handles the phone." },
      { feature: "Order synced to POS automatically", x1voice: true, competitor: "Manual entry" },
      { feature: "Consistent order accuracy under pressure", x1voice: true, competitor: "Varies by individual and shift" },
      { feature: "Cost scales with locations", x1voice: "Bundled up to 5 locations on Business plan", competitor: "Separate hire per location" },
      { feature: "Sick days, turnover, and retraining risk", x1voice: false, competitor: true },
    ],
    faqs: [
      {
        question: "Is X1 Voice really cheaper than hiring someone to answer the phone?",
        answer:
          "For phone coverage specifically, usually yes. One employee covering phones for a standard 40-hour week costs an estimated $3,100-$3,800/mo in loaded labor (wages plus payroll taxes and typical turnover overhead), versus $250/mo for X1 Voice's Starter plan. Using the numbers above, that's roughly 12-15x. That comparison covers the same ~40 hours a week, though; it doesn't include the added cost of also covering nights, early mornings, or full 24/7 phone coverage with additional shifts, which would raise the human-staffing cost further.",
      },
      {
        question: "What does 'loaded cost' mean here?",
        answer:
          "It's the base hourly wage plus the employer-side costs that come with any hire: payroll taxes, and typically some allowance for turnover and retraining, since restaurant staff turnover is high. We anchor the base wage to BLS's published median for food and beverage serving roles and add a commonly cited 25-40% for those employer costs. It's an estimate, not a quote for your specific market.",
      },
      {
        question: "Doesn't a human do more than just answer the phone?",
        answer:
          "Yes, and it's a genuine advantage of a human hire. A person can host, run food, bus tables, and handle whatever comes up on the floor, while X1 Voice only handles phone calls. If you're weighing a hire against X1 Voice, the fairest comparison is the value of phone coverage specifically, not the full value of an employee's shift.",
      },
      {
        question: "Can X1 Voice replace all my phone staff?",
        answer:
          "For most restaurants it replaces the need to have someone dedicated to answering the phone during a rush, but it doesn't replace staff who also work the floor, host, or run food. Many customers use it alongside their existing team rather than as a full staff replacement.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs hiring phone staff: what one phone-covering shift costs in loaded labor, with sources, next to a flat monthly rate for AI answering.",
  },
  {
    slug: "ivr-systems",
    competitorName: "an IVR/phone-tree system",
    competitorUrl: "https://www.twilio.com/en-us/voice/pricing/us",
    summary:
      "At very low call volume, a traditional IVR (\"press 1 for hours, press 2 for the menu\") is often the cheapest option, and it works with almost any phone hardware. But it can't take a real order or hold a natural conversation, and callers who don't fit its menu tree usually give up or call back. X1 Voice understands natural speech and completes the order instead of routing the caller through a menu.",
    pricingComparison: {
      x1voice: {
        planName: "Starter",
        priceLabel: "From $250/mo",
        billingNote: "Flat rate, includes order-taking with POS sync.",
      },
      competitor: {
        planName: "Usage-based platform (e.g. Twilio Voice) + build/maintenance",
        priceLabel: "~$0.013-$0.02/min + build cost",
        billingNote:
          "Raw platform usage on a service like Twilio is inexpensive at low volume (roughly $0.013/min inbound plus $1-2/mo per phone number), but that excludes the developer or vendor time to build and maintain the call-tree logic itself. A working restaurant IVR commonly runs several hundred dollars a month in ongoing platform/vendor costs on top of usage fees. Costs vary widely by how the IVR is built and hosted.",
      },
      asOf: "2026-01",
      sourceUrl: "https://www.twilio.com/en-us/voice/pricing/us",
    },
    featureMatrix: [
      { feature: "Understands natural speech (no menu-tree required)", x1voice: true, competitor: false },
      { feature: "Takes and prices a full menu order", x1voice: true, competitor: false, note: "A phone tree can route a call or take a simple touch-tone input, but it can't hold a real ordering conversation." },
      { feature: "Order synced to POS", x1voice: true, competitor: "Only with custom integration work" },
      { feature: "Works with basic/legacy phone hardware", x1voice: "Requires a cloud/VoIP-capable number", competitor: true, note: "A real advantage of IVR platforms: simple, mature technology that runs on almost any phone system." },
      { feature: "Low cost at very low call volume", x1voice: "Flat rate regardless of volume", competitor: "Can be cheaper at very low volume before build/maintenance cost", note: "Below a certain call volume, bare usage fees on an IVR platform can undercut a flat monthly rate, at least before accounting for what it costs to build and maintain the call flow." },
      { feature: "Caller can reach a resolution without pressing through menu options", x1voice: true, competitor: false },
      { feature: "Setup time", x1voice: "Typically a few business days", competitor: "Days to weeks, depending on how custom the call flow is" },
      { feature: "Ongoing maintenance as menu/hours change", x1voice: "Update through your account", competitor: "Often requires a developer or vendor to edit the call flow" },
    ],
    faqs: [
      {
        question: "Isn't a basic phone tree cheaper than an AI phone agent?",
        answer:
          "The raw usage fees on a platform like Twilio (a fraction of a cent per minute) can indeed be cheaper than a flat monthly rate at very low call volume. But that number doesn't include what it costs to actually build and maintain the call-tree logic, which is usually the bigger expense: commonly several hundred dollars a month in developer or vendor time for a working setup.",
      },
      {
        question: "Can an IVR take a real food order?",
        answer:
          "Not in the way a caller would expect. A phone tree can route calls or capture simple touch-tone input, but it can't hold a natural conversation, ask clarifying questions, or price a customized order the way X1 Voice can.",
      },
      {
        question: "Why would anyone still use an IVR?",
        answer:
          "It's mature, well-understood technology that works with almost any existing phone system, and at very low call volumes with simple needs (like routing calls to the right department), it can be the cheapest option. It's a reasonable fit if you just need basic call routing, not order-taking.",
      },
      {
        question: "What happens when a caller doesn't fit the menu options?",
        answer:
          "On a typical IVR, they either repeat through the menu, get stuck, or hang up and call back. X1 Voice is designed to understand what the caller actually wants and handle it directly, without forcing them through a fixed set of options.",
      },
    ],
    lastReviewedAt: "2026-01-15",
    metaDescription:
      "X1 Voice vs a traditional IVR/phone-tree system: honest cost breakdown and why natural-language ordering beats a press-1-for-menu call flow.",
  },
]
