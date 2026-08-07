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

const STATIC_PATHS = new Set([
  "/", "/pricing", "/features", "/integrations", "/integrations/square",
  "/integrations/clover", "/integrations/ordercounter", "/solutions",
  "/compare", "/locations", "/languages", "/support", "/support/integrations",
  "/contact", "/blog", "/about", "/privacy", "/terms", "/resellers",
  "/partners", "/investors", "/request-feature",
])

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

const files = process.argv.includes("--new")
  ? execSync("git ls-files --others --exclude-standard content/blog", { encoding: "utf8" })
      .split("\n").filter(Boolean).map((p) => path.basename(p))
  : fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

const allSlugs = new Set(
  fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
)

/**
 * Slugs that are planned but not written yet. A link to one of these is a
 * WARN while the batch is in flight and an ERROR once every planned post has
 * landed — which is exactly what --strict turns on.
 */
const plannedSlugs = new Set(
  fs.existsSync("scripts/blog-topics-300.tsv")
    ? fs.readFileSync("scripts/blog-topics-300.tsv", "utf8")
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

  const haystack = `${fm.title} ${fm.description} ${body}`.toLowerCase()
  for (const word of BANNED_WORDS) {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
    if (re.test(haystack)) report("ERROR", slug, `banned phrase: "${word}"`)
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
