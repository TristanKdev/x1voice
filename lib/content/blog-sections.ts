import type { BlogPost } from "@/lib/content/blog"

/**
 * Sections are derived from the slug, not from frontmatter, so a new post
 * files itself the moment it lands — no per-post category field to forget.
 * Rules are evaluated top to bottom and the first match wins, which is why
 * the restaurant-type rule sits above the keyword rules: a post about pizza
 * shops belongs under its format even if it mentions pricing.
 */
const SECTION_RULES = [
  {
    section: "By restaurant type",
    id: "restaurant-type",
    blurb: "What changes when the menu, the rush, and the caller change.",
    match: (slug: string) => slug.startsWith("voice-ai-for-"),
  },
  {
    section: "Phone systems & setup",
    id: "phone-systems",
    blurb: "Carriers, numbers, forwarding, and the plumbing behind the line.",
    keywords: [
      "call-forwarding", "sip-", "voip", "phone-number", "-number-", "cnam",
      "stir-shaken", "robocall", "porting", "ringcentral", "ooma", "vonage",
      "grasshopper", "google-voice", "hunt-group", "call-routing",
      "after-hours", "overflow", "voicemail", "network-requirements",
      "jitter", "toll-free", "vanity", "second-phone-line", "caller-id",
      "spam-likely", "phone-tree", "simultaneous-ring",
    ],
  },
  {
    section: "Compliance & legal",
    id: "compliance",
    blurb: "Recording consent, payments, allergens, and the rules around them.",
    keywords: [
      "consent", "recording", "tcpa", "10dlc", "pci", "gdpr", "ccpa", "bipa",
      "-laws", "-law-", "liability", "disclosure", "ada-", "tty", "privacy",
      "age-verification", "retention", "data-processing", "compliance",
      "insurance", "surcharge", "junk-fee", "alcohol", "tobacco",
    ],
  },
  {
    section: "AI search & local SEO",
    id: "ai-search",
    blurb: "Being found and quoted by assistants, maps, and search.",
    keywords: [
      "chatgpt", "perplexity", "ai-overviews", "gemini", "copilot",
      "llms-txt", "crawler", "schema", "-seo-", "seo-", "google-business",
      "nap-consistency", "apple-business", "bing-places", "yelp",
      "voice-search", "siri-alexa", "entity-", "citations", "answer-engine",
      "answer-first", "ai-search", "reputation", "reviews", "referral-traffic",
    ],
  },
  {
    section: "POS & integrations",
    id: "integrations",
    blurb: "How the order gets from the call into the system you already run.",
    keywords: [
      "square", "toast", "clover", "lightspeed", "touchbistro", "spoton",
      "revel", "par-brink", "micros", "aloha", "ordercounter", "epos-now",
      "snackpass", "deliverect", "otter", "chowly", "olo", "doordash",
      "uber-direct", "grubhub", "slice", "menufy", "pos-", "-pos", "kds",
      "menu-sync", "86", "integration",
    ],
  },
  {
    section: "Metrics & ROI",
    id: "metrics",
    blurb: "What to measure, what it costs, and what it pays back.",
    keywords: [
      "roi", "cost", "pricing", "payback", "budget", "metrics", "kpi",
      "analytics", "attribution", "tracking", "forecasting", "conversion-rate",
      "containment", "handle-time", "first-call", "accuracy-measurement",
      "labor-hours", "economics", "statistics", "qa", "ab-testing",
      "acquisition", "lifetime-value", "abandoned-call", "utm",
    ],
  },
  {
    section: "Seasonal playbooks",
    id: "seasonal",
    blurb: "The dates that break the phone, and how to be ready for them.",
    keywords: [
      "thanksgiving", "christmas", "new-years", "cinco-de-mayo", "halloween",
      "march-madness", "graduation", "back-to-school", "ramadan", "lent",
      "passover", "july-fourth", "labor-day", "memorial-day",
      "restaurant-week", "game-day", "super-bowl", "easter", "valentines",
      "prom-night", "tourist-season", "heat-wave", "snow-day", "holiday",
    ],
  },
  {
    section: "Multi-location & franchise",
    id: "multi-location",
    blurb: "Running phone operations across more than one address.",
    keywords: [
      "franchise", "multi-unit", "multi-location", "rollout", "enterprise",
      "area-developer", "private-equity", "central-kitchen", "regional-",
      "sso-", "50-locations", "second-location", "restaurant-group",
      "vendor-consolidation", "reporting-rollups",
    ],
  },
  {
    section: "Buying guides",
    id: "buying",
    blurb: "Choosing a vendor, and the questions that separate them.",
    keywords: [
      "-vs-", "alternatives", "evaluating", "contract", "onboarding", "pilot",
      "switching", "buyers", "what-to-ask", "vendor", "objections",
      "demo-what-to-test", "msa", "sla", "offboarding", "proof-of-concept",
      "buying", "budget-approval", "overview", "building-vs-buying",
      "white-label", "case-studies", "lessons",
    ],
  },
  {
    section: "How it works",
    id: "how-it-works",
    blurb: "The mechanics, in plain terms.",
    keywords: ["how-", "what-", "can-", "does-", "why-", "feature-", "glossary"],
  },
] as const

const FALLBACK_SECTION = {
  section: "Operations",
  id: "operations",
  blurb: "Everything that happens on the floor once the phone is handled.",
}

export type Group = {
  section: string
  id: string
  blurb: string
  posts: BlogPost[]
}

export function sectionForSlug(slug: string) {
  for (const rule of SECTION_RULES) {
    if ("match" in rule && rule.match(slug)) return rule
    if ("keywords" in rule && rule.keywords.some((k) => slug.includes(k))) {
      return rule
    }
  }
  return FALLBACK_SECTION
}

export function groupPosts(posts: BlogPost[]): Group[] {
  const order = [...SECTION_RULES.map((r) => r.section), FALLBACK_SECTION.section]
  const byName = new Map<string, Group>()
  for (const post of posts) {
    const rule = sectionForSlug(post.slug)
    const existing = byName.get(rule.section)
    if (existing) existing.posts.push(post)
    else
      byName.set(rule.section, {
        section: rule.section,
        id: rule.id,
        blurb: rule.blurb,
        posts: [post],
      })
  }
  return order
    .map((name) => byName.get(name))
    .filter((g): g is Group => Boolean(g))
}

