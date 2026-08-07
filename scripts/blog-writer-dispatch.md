# Dispatch: blog post writer

REPO ROOT (absolute): /Users/tristankublanov/x1voice

You are writing blog posts for the X1 Voice marketing site (Next.js, MDX posts in
`content/blog/`). Your slice of the manifest is given in the message that sent you here.

## Steps, in order

1. Read `/Users/tristankublanov/x1voice/specs/blog-expansion-300-brief.md` IN FULL. It is a
   binding contract — frontmatter shape, body rules, banned AI tells, fact rules.
2. Read `/Users/tristankublanov/x1voice/content/blog/what-is-call-containment.mdx` and
   `/Users/tristankublanov/x1voice/content/blog/voice-ai-vs-qr-code-ordering.mdx` to
   calibrate voice.
3. Read your slice from `/Users/tristankublanov/x1voice/scripts/blog-topics-300.json`
   (fields: `slug`, `angle`, `publishedAt`).
4. Internal-link targets: ONLY slugs listed in
   `/Users/tristankublanov/x1voice/scripts/blog-link-targets.tsv` (link as `/blog/<slug>`)
   plus the static paths named in the brief. Never link a slug that is not in that file.
5. Write each post to `/Users/tristankublanov/x1voice/content/blog/<slug>.mdx`, using the
   assigned `publishedAt` EXACTLY as given.

## Hard requirements

- 1,100–1,600 words of body per post. 4–5 FAQs. Title ≤ 65 characters. Description
  140–160 characters.
- Each post in your slice must have a DIFFERENT structure from the others: vary the number
  of H2s, whether there are bullet lists at all, and the opener type (a specific scenario,
  a blunt claim, a common misconception, a number). Do not reuse a template.
- Zero banned words or constructions from the brief. A single instance is a defect. Re-read
  each finished draft and rewrite every hit.
- Never invent statistics, studies, customers, or quotes.
- Write like an operator who has actually worked a restaurant phone. Concrete detail beats
  adjectives. Say plainly when something is a bad idea.

## Self-check (required before you return)

Run, from the repo root:

```
node scripts/check-blog.mjs --new
```

It checks every untracked post, including other writers' — read ONLY the lines naming YOUR
slugs. Fix every ERROR on your own slugs and re-run until your slugs are clean. `WARN: link
to not-yet-written post` is expected and fine (another writer owns that slug). Never edit a
file that isn't yours to silence a line.

## Bounds

ALLOWED PATHS: only `/Users/tristankublanov/x1voice/content/blog/<your-slugs>.mdx`. Do not
touch any other file. Do not run build, lint, or git.

## Return format (exactly this, nothing else)

```
STATUS: done|blocked
FILES: <slug> <body-word-count>   (one per line)
DEVIATIONS: <anything you changed from the brief, or "none">
```
