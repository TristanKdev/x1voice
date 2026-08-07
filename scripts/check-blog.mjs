#!/usr/bin/env node
/**
 * Mechanical gate for content/blog/*.mdx. Checks the parts of
 * specs/blog-expansion-300-brief.md that a machine can check: frontmatter
 * shape, title/description length, word count, FAQ count, internal-link
 * targets, and the banned-phrase list. It cannot judge whether a post is any
 * good — that is what reading it is for.
 *
 *   node scripts/check-blog.mjs            # every post
 *   node scripts/check-blog.mjs --new      # only files untracked by git
 *
 * Exit code 1 means at least one ERROR. Warnings never fail the run.
 */
import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

const BANNED_WORDS = [
  "delve", "tapestry", "realm", "robust", "seamless", "leverage", "leveraging",
  "utilize", "utilizing", "elevate", "unlock", "harness", "streamline",
  "game-changer", "game changer", "revolutionize", "revolutionizing",
  "cutting-edge", "state-of-the-art", "transformative", "holistic", "synergy",
  "paradigm", "testament", "pivotal", "myriad", "plethora", "embark",
  "underscore", "underscores", "showcase", "showcases", "needless to say",
  "in today's fast-paced", "at the end of the day", "in the realm of",
  "ai-powered", "it's worth noting", "worth noting that", "let's dive in",
  "let's break it down", "the bottom line is", "in conclusion",
  "final thoughts", "studies show", "research indicates",
  "industry data suggests", "when it comes to",
]

const BANNED_PATTERNS = [
  [/\bit'?s not just [^.]{2,60}[—-] it'?s\b/i, "negative parallelism (\"it's not just X — it's Y\")"],
  [/\bwhether you'?re an? [^,]{2,40}, /i, "\"Whether you're a X, ...\" opener"],
  [/^#\s/m, "H1 in body (the page renders the title already)"],
  [/^##\s*(conclusion|final thoughts|key takeaways|summary|wrapping up)\b/im, "summary heading"],
  [/\bnavigating the\b/i, "\"navigating the ...\" figurative"],
  [/\bfoster(s|ing)? (a|an|the)\b/i, "\"foster a ...\""],
  [/\bensure that\b/i, "\"ensure that\""],
]

/**
 * Valid non-blog link targets. The static list is the hand-written pages; the
 * dynamic prefixes are read out of data/*.ts so that linking to a real
 * commercial page — /solutions/pizza-restaurants, /compare/slang-ai — is not
 * reported as a dead link. The first version hard-coded three integrations and
 * nothing else, which quietly discouraged links to the pages that convert.
 */
const STATIC_PATHS = new Set([
  "/", "/pricing", "/features", "/integrations", "/solutions",
  "/compare", "/locations", "/languages", "/support", "/support/integrations",
  "/contact", "/blog", "/about", "/privacy", "/terms", "/resellers",
  "/partners", "/investors", "/request-feature",
])

function slugsFrom(file) {
  const p = path.join(process.cwd(), "data", file)
  if (!fs.existsSync(p)) return []
  return [...fs.readFileSync(p, "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1])
}
for (const [file, prefix] of [
  ["solutions.ts", "/solutions"],
  ["compare.ts", "/compare"],
  ["integrations.ts", "/integrations"],
  ["locations.ts", "/locations"],
]) {
  for (const slug of slugsFrom(file)) STATIC_PATHS.add(`${prefix}/${slug}`)
}

const TOPIC_IDS = [
  ...fs
    .readFileSync(path.join(process.cwd(), "lib", "content", "blog-sections.ts"), "utf8")
    .matchAll(/id:\s*"([a-z0-9-]+)"/g),
].map((m) => m[1])
for (const id of TOPIC_IDS) STATIC_PATHS.add(`/blog/topics/${id}`)

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) return { error: "no frontmatter block", body: raw }
  const [, fmText, body] = m
  const fm = {}
  const faqs = []
  let current = null
  for (const line of fmText.split("\n")) {
    const top = line.match(/^(\w+):\s*(.*)$/)
    if (top && top[1] !== "faqs") {
      fm[top[1]] = top[2].replace(/^"|"$/g, "")
      current = null
      continue
    }
    if (/^faqs:/.test(line)) { current = "faqs"; continue }
    if (current === "faqs") {
      const q = line.match(/^\s*-\s*question:\s*"(.*)"\s*$/)
      const a = line.match(/^\s*answer:\s*"(.*)"\s*$/)
      if (q) faqs.push({ question: q[1], answer: "" })
      else if (a && faqs.length) faqs[faqs.length - 1].answer = a[1]
    }
  }
  fm.faqs = faqs
  fm._file = file
  return { fm, body }
}

/**
 * `--new` means "posts this branch touched": untracked files PLUS files
 * changed against origin/main. The first version looked only at untracked
 * files, so the moment you committed, `--new` checked zero posts and exited 0
 * — a green check that checked nothing.
 */
function changedPosts() {
  const out = new Set()
  const run = (cmd) => {
    try {
      return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
    } catch {
      return ""
    }
  }
  for (const line of run("git ls-files --others --exclude-standard content/blog").split("\n")) {
    if (line.trim()) out.add(path.basename(line.trim()))
  }
  for (const line of run("git diff --name-only origin/main -- content/blog").split("\n")) {
    if (line.trim()) out.add(path.basename(line.trim()))
  }
  return [...out].filter((f) => f.endsWith(".mdx") && fs.existsSync(path.join(BLOG_DIR, f)))
}

const files = process.argv.includes("--new")
  ? changedPosts()
  : fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

const allSlugs = new Set(
  fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
)

/**
 * Slugs that are planned but not written yet. A link to one of these is a
 * WARN while the batch is in flight and an ERROR once every planned post has
 * landed — which is exactly what --strict turns on.
 */
const TOPICS_TSV = path.join(process.cwd(), "scripts", "blog-topics-300.tsv")
const plannedSlugs = new Set(
  fs.existsSync(TOPICS_TSV)
    ? fs.readFileSync(TOPICS_TSV, "utf8")
        .split("\n").filter(Boolean).map((l) => l.split("\t")[0])
    : []
)
const strict = process.argv.includes("--strict")

let errors = 0
let warnings = 0
const report = (level, slug, msg) => {
  if (level === "ERROR") errors++
  else warnings++
  console.log(`${level}  ${slug}: ${msg}`)
}

for (const file of files.sort()) {
  const slug = file.replace(/\.mdx$/, "")
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
  const { fm, body, error } = parseFrontmatter(raw, file)
  if (error) { report("ERROR", slug, error); continue }

  for (const key of ["title", "description", "publishedAt"]) {
    if (!fm[key]) report("ERROR", slug, `missing frontmatter: ${key}`)
  }
  if (fm.title && fm.title.length > 65)
    report("WARN", slug, `title ${fm.title.length} chars (>65)`)
  if (fm.title && fm.title.length < 25)
    report("WARN", slug, `title only ${fm.title.length} chars`)
  if (fm.description) {
    const n = fm.description.length
    if (n < 120 || n > 175) report("WARN", slug, `description ${n} chars (target 140–160)`)
  }
  if (fm.publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(fm.publishedAt))
    report("ERROR", slug, `publishedAt not YYYY-MM-DD: ${fm.publishedAt}`)
  if (fm.faqs.length < 4) report("ERROR", slug, `${fm.faqs.length} FAQs (need 4–5)`)
  if (fm.faqs.length > 6) report("WARN", slug, `${fm.faqs.length} FAQs`)
  for (const faq of fm.faqs) {
    if (!faq.answer) report("ERROR", slug, `FAQ with no answer: ${faq.question.slice(0, 40)}`)
    else {
      const words = faq.answer.split(/\s+/).length
      if (words < 30) report("WARN", slug, `FAQ answer only ${words} words`)
      if (words > 120) report("WARN", slug, `FAQ answer ${words} words`)
    }
  }

  const words = body.split(/\s+/).filter(Boolean).length
  if (words < 950) report("ERROR", slug, `body ${words} words (<950)`)
  else if (words > 1900) report("WARN", slug, `body ${words} words (>1900)`)

  // FAQ answers are included deliberately: they feed FAQPage JSON-LD and are
  // the text most likely to be quoted verbatim by an assistant, yet the first
  // version of this check looked only at the body and missed them entirely.
  const faqText = fm.faqs.map((f) => `${f.question} ${f.answer}`).join(" ")
  const haystack = `${fm.title} ${fm.description} ${body} ${faqText}`.toLowerCase()
  for (const word of BANNED_WORDS) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    // Match common inflections too: the list said "unlock" and let "unlocks"
    // through, which made it look enforced while it was not. Multi-word
    // phrases stay exact.
    const pattern = /\s/.test(word)
      ? `\\b${escaped}\\b`
      : `\\b${escaped}(?:s|es|d|ed|ing)?\\b`
    if (new RegExp(pattern, "i").test(haystack))
      report("ERROR", slug, `banned phrase: "${word}"`)
  }
  for (const [re, label] of BANNED_PATTERNS) {
    if (re.test(body)) report("ERROR", slug, `banned construction: ${label}`)
  }

  const emDashes = (body.match(/—/g) || []).length
  if (emDashes > Math.ceil(words / 300))
    report("WARN", slug, `${emDashes} em dashes in ${words} words`)

  const links = [...body.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1])
  if (links.length < 3) report("WARN", slug, `${links.length} internal links (want 3–6)`)
  for (const link of links) {
    const clean = link.split("#")[0]
    if (clean.startsWith("/blog/")) {
      const target = clean.replace("/blog/", "")
      if (!allSlugs.has(target)) {
        const planned = plannedSlugs.has(target)
        if (planned && !strict) report("WARN", slug, `link to not-yet-written post: ${clean}`)
        else report("ERROR", slug, `dead internal link: ${clean}`)
      }
      if (target === slug) report("ERROR", slug, "links to itself")
    } else if (!STATIC_PATHS.has(clean)) {
      report("ERROR", slug, `link to unknown path: ${clean}`)
    }
  }
  if (/\]\(https?:\/\//.test(body)) report("WARN", slug, "external link present — verify the source")
}

console.log(`\nchecked ${files.length} posts — ${errors} errors, ${warnings} warnings`)
process.exit(errors > 0 ? 1 : 0)
