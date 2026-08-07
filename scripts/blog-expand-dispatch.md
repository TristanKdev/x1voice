# Dispatch: expand thin legacy posts

REPO ROOT (absolute): /Users/tristankublanov/x1voice

These posts predate the current content standard. They are thin (some under 300 words) and/or
carry fewer than four FAQs, which is a real ranking liability, not a cosmetic one. Your job is
to bring your assigned slugs up to the standard WITHOUT changing what they argue.

## Read first

1. `/Users/tristankublanov/x1voice/specs/blog-expansion-300-brief.md` — binding. Body rules,
   banned AI tells, fact rules, link rules.
2. `/Users/tristankublanov/x1voice/content/blog/what-is-call-containment.mdx` for voice.
3. The existing post you are expanding. Its argument, its claims and its stance stay. You are
   deepening it, not replacing it.

## What to produce, per slug

- Body 1,100–1,600 words. Keep every existing section that works; add the sections the piece
  is missing — the specifics an operator would ask for next: what it looks like on a real
  shift, the failure mode, the numbers to check, the decision rule.
- 4–5 FAQs in frontmatter, each answer 40–90 words, answering in the first sentence.
- `title` 40–62 characters (rendered with NO site-name suffix, so 62 is the hard ceiling).
- `description` 140–160 characters, specific, no "Learn how"/"Discover"/"In this article".
- 3–6 internal links in prose to real slugs. Valid targets: any file in
  `/Users/tristankublanov/x1voice/content/blog/` (link as `/blog/<slug>`), plus `/pricing`,
  `/features`, `/integrations`, `/integrations/square`, `/integrations/clover`,
  `/integrations/ordercounter`, `/solutions`, `/compare`, `/locations`, `/languages`,
  `/support`, `/contact`. Check the file exists before linking it.
- Keep `publishedAt` EXACTLY as it is. Add `updatedAt: "2026-08-06"` to frontmatter, since the
  post has genuinely been revised.

## Do not

- Do not invent statistics, studies, customers, or quotes. If the original made an unsourced
  numeric claim, keep it no stronger than the original stated it, or reframe it as arithmetic
  the reader can redo.
- Do not use any banned word or construction from the brief. One instance is a defect.
- Do not touch any file that is not on your list.

## Verify before returning

```
node scripts/check-blog.mjs --strict
```
Your slugs must show zero ERROR lines. Re-run until they do.

## Return format (exactly this, nothing else)

```
STATUS: done|blocked
FILES: <slug> words=<n> faqs=<n>   (one per line)
DEVIATIONS: <or "none">
```
