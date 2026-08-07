# Blog expansion: writing + metadata brief (300 posts)

Every new post in `content/blog/*.mdx` must satisfy this brief. It exists because
the site's whole SEO/AEO/GEO position depends on the posts reading like they were
written by someone who has actually stood behind a restaurant counter — not like
generated filler.

## Frontmatter contract (exact)

```yaml
---
title: "Sentence-case title, 40–65 characters"
description: "One or two sentences, 140–160 characters, no trailing ellipsis."
publishedAt: "YYYY-MM-DD"
faqs:
  - question: "..."
    answer: "..."
---
```

- `title` is rendered as `<title>` with ` — X1 Voice` appended by the layout
  template. Keep it under 65 characters so the full SERP title survives.
  No pipes, no ALL CAPS, no clickbait, no year stuffing unless the post is
  genuinely dated content.
- `description` is the meta description AND the OG/Twitter description. It must
  describe what the reader gets, contain the primary phrase once, naturally, and
  never start with "In this article" or "Learn how".
- `publishedAt` is assigned per post in the manifest. Do not invent one.
- 4–5 `faqs`. Each answer is 40–90 words, answers the question in the FIRST
  sentence, then adds the qualification. These become FAQPage JSON-LD and are the
  main AEO surface — write them so a model can quote one sentence and be correct.
- Do not add fields the loader doesn't read (`lib/content/blog.ts` reads
  `title`, `description`, `publishedAt`, `updatedAt`, `faqs`).
- YAML: double-quote every string; escape internal double quotes; never let a
  value start with `-`, `:`, `@`, or `%`.

## Body contract

- 1,100–1,600 words of MDX. No H1 (the page renders one from `title`).
- 4–7 `##` sections. `###` only where a section genuinely splits.
- Section headings are specific claims or questions, not labels. Good: "What it
  actually costs to leave the phone unanswered". Bad: "Key Benefits", "Why It
  Matters", "Conclusion".
- Open with the substance. No throat-clearing, no scene-setting about the
  restaurant industry, no "In today's competitive market".
- At most two bullet lists in the whole piece, each ≤5 items, each item a full
  thought rather than a two-word label.
- End on a concrete last paragraph — an implication, a test to run, a decision
  rule. Never a summary of what you just read, never a heading called
  "Conclusion" or "Final thoughts", never a sales pitch.
- Second person. Address an owner or GM. Assume they know their business and
  don't know voice AI.

## Internal links (3–6 per post, inline in prose)

Link with markdown to real paths on this site only. Every target must exist:
- any slug in `content/blog/` (`/blog/<slug>`), including the other new posts in
  the same manifest — check the manifest before linking so you never link a slug
  that isn't in it;
- `/pricing`, `/features`, `/integrations`, `/integrations/square`,
  `/integrations/clover`, `/integrations/ordercounter`, `/solutions`,
  `/compare`, `/locations`, `/languages`, `/support`, `/contact`.
Anchor text is the phrase itself, never "click here" and never the bare URL.
No external links unless the source is a real, checkable primary source
(a government or standards-body page). If unsure, cite nothing.

## Facts, numbers, claims

- Never invent a statistic, a study, a percentage, a customer, or a quote.
- No "studies show", "research indicates", "industry data suggests".
- Dollar figures are allowed only as clearly-labeled ranges from ordinary
  restaurant arithmetic ("a $30 ticket", "roughly $250–$400/month for an
  answering service"), never as a cited finding.
- Product claims must match the site: X1 Voice integrates directly with Square,
  Clover and OrderCounter, and reaches Toast, Lightspeed, TouchBistro, SpotOn,
  Aloha, Revel, PAR Brink, Micros and others through Deliverect. Plans start at
  $250/month. Setup is typically under 24 hours. Do not promise anything else.
- Where a competitor is named, describe only what is publicly and generally
  known about the category. No accusations, no invented pricing, no claims about
  their failure rates.

## Banned AI tells (a single instance is a defect)

Vocabulary: delve, tapestry, landscape (figurative), realm, robust, seamless,
leverage (verb), utilize, elevate, unlock, harness, navigate (figurative),
streamline, game-changer, revolutionize, cutting-edge, state-of-the-art,
transformative, holistic, synergy, paradigm, testament, pivotal, crucial,
vital, myriad, plethora, embark, foster, underscore, showcase, ensure that,
it's worth noting, needless to say, in today's fast-paced world, at the end of
the day, when it comes to, in the realm of, the world of restaurants.

Constructions:
- "It's not just X — it's Y." and every variant of that negative parallelism.
- "Whether you're a X or a Y, ..." openers.
- Rule-of-three lists used as rhythm ("faster, cheaper, and more reliable").
- Sentences ending in "-ing" clauses that restate the sentence ("...cutting
  costs, improving accuracy, and driving growth").
- "Here's the thing:", "The bottom line:", "Let's dive in", "Let's break it
  down", "That said," used more than once.
- Bold-lead bullet lists where every item is **Label:** followed by a sentence,
  repeated section after section.
- Headings that are a noun phrase plus a colon.
- Em dashes more than roughly one per 300 words. Use commas and periods.
- Uniform paragraph length. Vary it: some paragraphs are one sentence.
- Hedging stacks ("may potentially be able to help").
- Restating the question before answering it in FAQs.
- The words "AI-powered" and "cutting-edge" applied to X1 Voice. The product is
  described by what it does.

## Voice reference

Read `content/blog/what-is-call-containment.mdx` and
`content/blog/voice-ai-vs-qr-code-ordering.mdx` before writing. Match that
register: plain, specific, willing to say when something is a bad idea or when a
metric is misleading. Skepticism about the category is a feature — a post that
only praises voice AI reads as marketing and converts worse.

## Self-check before writing the file

1. Does any sentence contain a banned word or construction? Rewrite it.
2. Is every number either arithmetic the reader can redo, or absent?
3. Does every internal link point at a slug that exists or is in the manifest?
4. Is the title ≤65 characters and the description 140–160?
5. Does each FAQ answer stand alone as a quotable paragraph?
6. Read the first three sentences aloud. If they could open any article on any
   topic, delete them and start at the third paragraph.
