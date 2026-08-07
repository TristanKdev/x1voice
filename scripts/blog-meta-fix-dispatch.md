# Dispatch: blog metadata tightening

REPO ROOT (absolute): /Users/tristankublanov/x1voice

You are fixing SEO metadata in existing posts under `content/blog/`. You are NOT rewriting
article bodies. The list of slugs you own is in the message that sent you here.

## What to change, and only this

For each of your slugs, open `/Users/tristankublanov/x1voice/content/blog/<slug>.mdx` and fix
the frontmatter `title` and/or `description` so that:

- **title**: 40–62 characters INCLUSIVE of spaces. The rendered `<title>` is now exactly this
  string with no site-name suffix, so 62 is the hard ceiling before Google truncates. Keep the
  primary phrase near the front. Most over-long titles are `Main Claim: a long trailing
  clause` — usually the fix is to cut or compress the clause after the colon, not to mangle the
  head. The title must still describe the article accurately and read like a human wrote it.
- **description**: 140–160 characters INCLUSIVE. This is the meta description and the OG and
  Twitter description. It must say what the reader gets, contain the primary phrase once and
  naturally, and never open with "In this article", "Learn how", "Discover", or "Explore".
  Write it as a rich, specific sentence or two — a description that could describe any article
  on the topic is a failure even if the length is right.

Count characters exactly (`len(str)`), do not estimate. Verify with a command rather than by eye.

## Hard constraints

- Do NOT touch the body, the `faqs`, or `publishedAt`.
- Do NOT introduce any word from the banned list in
  `/Users/tristankublanov/x1voice/specs/blog-expansion-300-brief.md` (delve, robust, seamless,
  leverage, elevate, unlock, harness, streamline, cutting-edge, ensure that, when it comes to,
  and the rest of that section). Read that section before you start.
- Keep YAML valid: the value stays on ONE line, wrapped in double quotes, with no unescaped
  double quotes inside it. A colon inside a quoted string is fine.
- Titles must stay unique across the whole blog — if your shortened title collides with
  another post's, differentiate it.

## Verify before returning

```
node scripts/check-blog.mjs --strict
```
Read only the lines naming YOUR slugs; they must show no ERROR. Then confirm your lengths:

```
python3 - <<'PY'
import re
for slug in ["<your>","<slugs>"]:
    s=open(f"content/blog/{slug}.mdx").read()
    t=re.search(r'^title:\s*"(.*)"$',s,re.M).group(1)
    d=re.search(r'^description:\s*"(.*)"$',s,re.M).group(1)
    print(len(t),len(d),slug)
PY
```
Every title must be 40–62 and every description 140–160.

## Return format (exactly this, nothing else)

```
STATUS: done|blocked
FILES: <slug> title=<n> desc=<n>   (one per line)
DEVIATIONS: <anything you could not satisfy, or "none">
```
