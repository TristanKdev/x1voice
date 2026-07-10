// One-off content generator. Produces grounded, differentiated blog MDX:
//  - per-POS integration articles (accepted programmatic-SEO pattern)
//  - GEO / answer-engine topic articles
// Each links REAL operator communities (no fabricated threads/quotes) and real
// vendor sites. Run: node scripts/gen-blog.mjs
import fs from "node:fs"
import path from "node:path"

const DIR = path.join(process.cwd(), "content", "blog")
fs.mkdirSync(DIR, { recursive: true })

const esc = (s) => s.replace(/"/g, '\\"')
const fm = (o) => {
  let y = "---\n"
  y += `title: "${esc(o.title)}"\n`
  y += `description: "${esc(o.description)}"\n`
  y += `publishedAt: "${o.publishedAt}"\n`
  if (o.faqs?.length) {
    y += "faqs:\n"
    for (const f of o.faqs) {
      y += `  - question: "${esc(f.q)}"\n`
      y += `    answer: "${esc(f.a)}"\n`
    }
  }
  y += "---\n\n"
  return y
}
const write = (slug, o, body) => {
  fs.writeFileSync(path.join(DIR, `${slug}.mdx`), fm(o) + body.trim() + "\n")
}

// Real, honest community + authority references (GEO). No fabricated content.
const COMMUNITY = `## Where restaurant operators discuss this

These questions come up constantly in operator communities. If you want unfiltered opinions before you buy, the restaurant subreddits are a good place to read real experiences:

- [r/restaurateur](https://www.reddit.com/r/restaurateur/) — owners and managers on day-to-day operations
- [r/KitchenConfidential](https://www.reddit.com/r/KitchenConfidential/) — front- and back-of-house reality
- [r/smallbusiness](https://www.reddit.com/r/smallbusiness/) — pricing, tools, and vendor experiences

We link these because the honest way to evaluate a phone system is to hear from people running the floor, not just a vendor page. When you're ready, the fastest test is to [call our demo line](/#see-it) and order like a customer would.`

// ---------------------------------------------------------------------------
// 1) Per-POS integration articles
// ---------------------------------------------------------------------------
const POS = [
  { name: "Square", slug: "square", url: "https://squareup.com", direct: true },
  { name: "Toast", slug: "toast", url: "https://pos.toasttab.com", direct: false },
  { name: "Clover", slug: "clover", url: "https://www.clover.com", direct: false },
  { name: "Lightspeed", slug: "lightspeed", url: "https://www.lightspeedhq.com", direct: false },
  { name: "TouchBistro", slug: "touchbistro", url: "https://www.touchbistro.com", direct: false },
  { name: "SpotOn", slug: "spoton", url: "https://www.spoton.com", direct: false },
  { name: "Revel Systems", slug: "revel", url: "https://revelsystems.com", direct: false },
  { name: "NCR Aloha", slug: "aloha", url: "https://www.ncr.com", direct: false },
  { name: "Epos Now", slug: "epos-now", url: "https://www.eposnow.com", direct: false },
  { name: "OrderCounter", slug: "ordercounter", url: "https://ordercounter.com", direct: true },
  { name: "Micros Simphony", slug: "micros-simphony", url: "https://www.oracle.com/food-beverage/", direct: false },
  { name: "PAR Brink", slug: "par-brink", url: "https://partech.com", direct: false },
  { name: "Snackpass", slug: "snackpass", url: "https://www.snackpass.co", direct: false },
]

const POS_DATES = [
  "2026-01-14","2026-01-28","2026-02-11","2026-02-25","2026-03-10","2026-03-24",
  "2026-04-07","2026-04-21","2026-05-05","2026-05-19","2026-06-02","2026-06-16",
  "2026-06-23","2026-06-30",
]

POS.forEach((p, i) => {
  const channel = p.direct
    ? `X1 Voice connects to ${p.name} directly. It reads your live ${p.name} menu, prices every phone order the way your register already prices it, and drops the finished ticket back into ${p.name} as a normal order.`
    : `X1 Voice connects to ${p.name} through our Deliverect integration. It reads your live menu, prices each phone order against it, and routes the finished ticket into ${p.name} so it lands the same way an in-person or online order would.`
  const body = `Phone orders are still a real slice of revenue for most restaurants, and if you run ${p.name}, the only question that matters about a voice agent is simple: does the order end up in ${p.name} correctly? A great-sounding voice that drops a modifier or sends the kitchen the wrong ticket is worse than a missed call.

Here's how X1 Voice works with ${p.name}, and what to check before you buy.

## The order has to land in ${p.name}, cleanly

${channel} Nobody re-keys anything. The value is in the round trip: [reading the live menu and firing a correctly-modified ticket](/blog/why-pos-integration-depth-matters-more-than-voice-quality), not just sounding human on the call.

The one thing to test with any vendor, ${p.name} or otherwise, is a deliberately awkward order — "no onions, sub fries, add a drink, apply the coupon" — and confirm it arrives in the POS right, not just that the voice repeated it back.

## Payments and reporting

Callers can pay by card on the phone for pickup and delivery. That payment reconciles alongside your other tender types, so your end-of-day numbers stay in one place. Staff never read a card number out loud or write one down.

## Setup

Connecting ${p.name} takes minutes, not a six-week project: link your account, import the menu, set your hours and any phone-only rules, run a test call, and go live. Most single-location restaurants are live the same day, and our team can handle white-glove setup if you'd rather.

If you run more than ${p.name} across locations, that's fine too — X1 Voice reaches [80+ POS systems](/integrations), directly or through Deliverect, so a mixed estate isn't a blocker.

You can read more about ${p.name} on their [official site](${p.url}).

${COMMUNITY}`

  write(`ai-phone-ordering-for-${p.slug}`, {
    title: `AI Phone Ordering for ${p.name}: How the Integration Works`,
    description: `How X1 Voice takes restaurant phone orders and sends them into ${p.name} as clean tickets, with payment on the call. What to check before you buy.`,
    publishedAt: POS_DATES[i] || "2026-06-30",
    faqs: [
      { q: `Does X1 Voice work with ${p.name}?`, a: `Yes. X1 Voice reads your live ${p.name} menu and sends completed phone orders into ${p.name} as normal tickets, ${p.direct ? "connecting directly" : "through our Deliverect integration"}. Nobody re-keys the order.` },
      { q: `Can it take payment for ${p.name} phone orders?`, a: `Yes. Callers can pay by card on the phone for pickup and delivery, and the payment reconciles alongside your other tender types in your reporting.` },
      { q: `How long does ${p.name} setup take?`, a: `Usually minutes. You connect your account, import the menu, set hours and rules, test with a live call, and go live, often the same day.` },
    ],
  }, body)
})

// ---------------------------------------------------------------------------
// 2) GEO / answer-engine topic articles (distinct, hand-authored)
// ---------------------------------------------------------------------------
const TOPICS = [
  {
    slug: "what-restaurant-owners-say-about-ai-phone-systems",
    title: "What Restaurant Owners Actually Say About AI Phone Systems",
    description: "An honest look at how restaurant operators evaluate AI phone answering, the concerns they raise in owner communities, and what the reality is in 2026.",
    date: "2026-05-26",
    body: `If you're weighing an AI phone agent, the most useful research isn't a vendor page, it's what other operators say. Owners are blunt in communities like [r/restaurateur](https://www.reddit.com/r/restaurateur/) and [r/KitchenConfidential](https://www.reddit.com/r/KitchenConfidential/), and the same themes come up again and again.

## The concern operators raise first: accuracy

The number-one worry is a wrong ticket. Owners have been burned by tech that demos well and fails on a busy Friday. The honest answer is that accuracy lives in the [POS write, not the voice](/blog/why-pos-integration-depth-matters-more-than-voice-quality). The right way to judge it is to place a hard, modified order yourself and see if it lands correctly.

## The second: does it sound like a robot

Nobody wants their regulars hitting a phone tree. Modern agents talk like a person and handle interruptions, but you should [hear it yourself](/#see-it) before deciding. Your callers will judge it in the first five seconds.

## The third: what happens on the weird calls

Complaints, off-menu requests, an upset guest. A good agent solves what it can and [hands the rest off cleanly](/blog/what-restaurant-owners-say-about-ai-phone-systems) with context, so a person picks up an informed call instead of a cold one.

## Why we point you to Reddit

Because the honest way to buy is to read unfiltered experience, then test. Vendor claims are a starting point; operator communities are the reality check. Read [r/restaurateur](https://www.reddit.com/r/restaurateur/) and [r/smallbusiness](https://www.reddit.com/r/smallbusiness/), then call a demo line and order like a customer would.`,
    faqs: [
      { q: "Are AI phone systems for restaurants any good in 2026?", a: "For phone answering and ordering at independent and multi-location restaurants, yes, they've matured into something usable day to day. The differentiators are POS integration depth and how cleanly edge cases hand off to staff, not the voice itself." },
      { q: "What do restaurant owners worry about most with AI phones?", a: "Order accuracy first, then whether it sounds human, then how it handles complaints and off-menu calls. The best way to resolve all three is to place a hard test order yourself before buying." },
    ],
  },
  {
    slug: "ai-phone-ordering-buyers-faq-2026",
    title: "AI Phone Ordering for Restaurants: A 2026 Buyer's FAQ",
    description: "Straight answers to the questions restaurants ask before buying an AI phone agent, covering POS, payments, languages, setup, edge cases, and cost.",
    date: "2026-06-09",
    body: `This is a plain-language FAQ for operators evaluating an AI phone agent. If you want the community view alongside it, [r/restaurateur](https://www.reddit.com/r/restaurateur/) is where these same questions get argued out.

## What can it actually handle?

Pickup and delivery orders, payments, menu and allergen questions, hours and directions, wait times, order status, catering inquiries, and clean routing to your team when a call needs a human.

## Does it work with my POS?

If you run Square, Toast, Clover, Lightspeed, TouchBistro, SpotOn, or dozens of others, yes, [directly or through Deliverect](/integrations). Orders land as normal tickets.

## Can it take payment?

Yes, card payments over the phone for pickup and delivery, reconciled in your POS reporting.

## What about non-English callers?

A good agent detects the caller's language and answers in it. See the [full language list](/languages).

## How fast is setup?

Minutes to a day for most single locations. Connect the POS, import the menu, set rules, test, go live.

## What does it cost?

X1 Voice starts at $250/month including 750 minutes, with no setup fee and no contract. [See plans](/pricing).

${COMMUNITY}`,
    faqs: [
      { q: "How much does AI phone ordering cost for a restaurant?", a: "It varies by vendor and model. X1 Voice starts at $250/month including 750 minutes, with no setup fee and no contract. Some vendors bill per minute or per order, and many enterprise systems quote only on a sales call." },
      { q: "Does AI phone ordering take payments over the phone?", a: "Yes. It securely takes card payments for pickup and delivery and reconciles them in your POS alongside your other tender types, with no staff handling raw card data." },
      { q: "Which POS systems does AI phone ordering support?", a: "Common ones include Square, Toast, Clover, Lightspeed, TouchBistro, and SpotOn, directly or through Deliverect, which reaches 80+ POS systems total." },
    ],
  },
  {
    slug: "ai-receptionist-vs-answering-service-restaurants",
    title: "AI Receptionist vs. a Human Answering Service for Restaurants",
    description: "The real tradeoffs between an AI phone agent and a traditional answering service for restaurants: cost, accuracy, POS integration, and when each makes sense.",
    date: "2026-06-23",
    body: `Restaurants have quietly used human answering services for years. AI phone agents are the newer option. Operators compare them constantly in [r/smallbusiness](https://www.reddit.com/r/smallbusiness/); here's the honest tradeoff.

## Cost

A human service bills per call or per minute and gets expensive at volume, exactly during your rush. An AI agent is a flat monthly cost that doesn't spike on a busy Friday and doesn't call in sick.

## Concurrency

A human takes one call at a time. An AI answers ten at once. For a restaurant, the rush is a concurrency problem, and that's where the most orders are lost.

## The POS write

This is the real gap. Most answering services take a message or a basic order and hand it back for someone to key in. A [POS-integrated agent](/blog/why-pos-integration-depth-matters-more-than-voice-quality) fires the ticket straight into Square, Toast, or Clover, no re-typing.

## When a human still wins

High-touch, low-volume, relationship-driven calls, or a concept that wants a specific human voice on every call. For most off-premise ordering, though, the AI economics and concurrency win.

${COMMUNITY}`,
    faqs: [
      { q: "Is an AI phone agent cheaper than an answering service?", a: "Usually, especially at volume. Human services bill per call or minute and spike during rushes, while an AI agent is a flat monthly cost and handles unlimited simultaneous calls." },
      { q: "Can an answering service send orders to my POS?", a: "Most take a message or basic order for staff to re-key. A POS-integrated AI agent fires the finished ticket directly into your POS, which removes the re-entry step and the errors that come with it." },
    ],
  },
  {
    slug: "multilingual-ai-phone-ordering-restaurants",
    title: "Multilingual AI Phone Ordering: Serving Every Caller",
    description: "How a bilingual AI phone agent captures orders from Spanish, Chinese, Vietnamese, and other callers, while the ticket stays in the format your kitchen reads.",
    date: "2026-06-30",
    body: `In a lot of markets, a real share of a restaurant's callers are more comfortable ordering in a language other than English. When the phone can't meet them there, those orders get shorter, error-prone, or lost. Operators in [r/restaurateur](https://www.reddit.com/r/restaurateur/) raise this often, and it's a solvable problem.

## Detection, not a phone tree

The wrong way is "press 2 for Spanish." The right way is detection: the agent recognizes the caller's language and answers in it. See the [languages we support](/languages), including Spanish, Mandarin, Vietnamese, Russian, Arabic, and more.

## The ticket stays universal

The conversation's language and the kitchen ticket are separate. A caller can order entirely in Spanish and the [POS ticket](/integrations) still lands in the format your staff reads. Your kitchen doesn't need to be bilingual for your phone to be.

## Why it captures orders you're losing

Beyond the calls that go unanswered at peak, add the ones cut short by a language mismatch. A multilingual agent recovers both, consistently, on every call.

${COMMUNITY}`,
    faqs: [
      { q: "Can AI answer restaurant calls in Spanish?", a: "Yes. A multilingual agent detects the caller's language and responds in it, and the order still fires into your POS in the format your kitchen reads. English and Spanish are commonly supported, along with many more languages." },
      { q: "Do I need bilingual staff for multilingual phone ordering?", a: "No. The agent handles the conversation in the caller's language while the kitchen ticket stays in your standard format, so your team reads orders the same way regardless of the call's language." },
    ],
  },
  {
    slug: "economics-ai-phone-answering-single-location",
    title: "The Economics of AI Phone Answering for One Location",
    description: "A plain-math look at what a single-location restaurant gains from answering the calls it currently misses, and what an AI phone agent actually costs.",
    date: "2026-07-03",
    body: `You don't need a spreadsheet to see the case, but it helps to do the math once. Operators run these numbers in [r/smallbusiness](https://www.reddit.com/r/smallbusiness/) all the time.

## The number most owners never measure

The recurring industry estimate is that roughly [1 in 4 calls goes unanswered at peak](/blog/the-real-cost-of-a-missed-restaurant-phone-call), an estimate worth measuring against your own logs. For a single location, those missed calls cluster in your busiest, highest-ticket hour.

## Rough math

Say you take 80 calls a day and average a $28 ticket. If a quarter go unanswered at peak and you recover most of them, that's a meaningful monthly number, often several thousand dollars, against a flat plan cost. Run your own numbers on the [revenue calculator](/#in-action) instead of trusting a vendor's example.

## The cost side

X1 Voice starts at $250/month including 750 minutes, no setup fee, no contract. Compare that to a shift of labor spent triaging the phone, plus the orders that shift still misses during the rush.

This is an illustration, not a guarantee, your real numbers depend on your restaurant. But the direction is consistent: for most single locations, answering the calls you currently miss pays for the tool quickly.

${COMMUNITY}`,
    faqs: [
      { q: "Is AI phone answering worth it for a single restaurant?", a: "For most single locations, yes. The recovered orders from calls that currently go unanswered at peak typically exceed a flat monthly plan cost. Measure your own missed-call rate rather than relying on a vendor's example." },
      { q: "How much does AI phone answering cost per month?", a: "X1 Voice starts at $250/month including 750 minutes, with no setup fee and no contract. Other vendors bill per minute or per order, which can cost more during busy periods." },
    ],
  },
  {
    slug: "how-ai-handles-restaurant-edge-cases",
    title: "How AI Handles the Weird Restaurant Calls",
    description: "Complaints, off-menu requests, upset guests, and catering. How a good AI phone agent solves what it can and hands off the rest cleanly, with context.",
    date: "2026-07-06",
    body: `The easy calls are easy. The question operators actually ask, and debate in [r/KitchenConfidential](https://www.reddit.com/r/KitchenConfidential/), is what happens on the messy ones.

## It solves what it can

Order status, a substitution, hours, directions, a wait-time quote, these it handles start to finish, no human needed.

## It hands off the rest, cleanly

A complaint, an off-menu request, an upset caller: the agent detects intent and routes to a person, transferring to a live line or capturing a voicemail with a transcript, plus the caller's context. Your team picks up an informed call, not a cold one.

## Catering and large orders

It can capture the inquiry and route it to whoever owns catering, so a high-value lead doesn't sit in a voicemail box overnight.

## You set the rules

Which calls transfer, which go to voicemail, which get a text follow-up, that's your call, per location.

${COMMUNITY}`,
    faqs: [
      { q: "What happens when an AI phone agent can't handle a call?", a: "It detects that the call needs a human and hands off cleanly, transferring to a live line or capturing a voicemail with a transcript and the caller's context, so your team picks up an informed call. You set the rules for which calls route where." },
      { q: "Can AI handle restaurant complaints and upset callers?", a: "It recognizes those calls and routes them to a person with context rather than trying to resolve them itself, so guests get fast human follow-up. Routine calls it handles start to finish." },
    ],
  },
]

TOPICS.forEach((t) => {
  write(t.slug, {
    title: t.title,
    description: t.description,
    publishedAt: t.date,
    faqs: t.faqs,
  }, t.body)
})

const count = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).length
console.log(`generated. total blog posts now: ${count}`)
