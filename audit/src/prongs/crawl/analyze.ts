import type { Finding, Metric, ProngResult } from "../../types.js"
import { scoreFromFindings } from "../../scoring/weights.js"
import type { CrawledPage, CrawlResult } from "./crawler.js"

// Reduce a crawl to a graded prong result. The crawl prong grades by
// exception: it begins at 100 and deducts for each defect class found, per the
// severity table in scoring/weights.ts. Thresholds below follow published
// search-engine guidance (title and description display limits, single-H1
// convention, thin-content and mobile-viewport requirements). Every finding
// carries the measured count that produced it.

const TITLE_MIN = 15
const TITLE_MAX = 60
const DESC_MIN = 50
const DESC_MAX = 160
const THIN_CONTENT_WORDS = 200

export function analyzeCrawl(result: CrawlResult): ProngResult {
  const findings: Finding[] = []
  const html = result.pages.filter((p) =>
    p.contentType.includes("text/html"),
  )
  const indexable = html.filter((p) => p.ok && !isNoindex(p))

  // -- Site-level infrastructure ---------------------------------------------
  if (!result.origin.startsWith("https://")) {
    findings.push(mk("crawl.https.missing", "critical",
      "Site is not served over HTTPS.",
      `Origin ${result.origin} does not use TLS.`,
      "Serve all pages over HTTPS and redirect HTTP to HTTPS with a 301."))
  }

  if (!result.robots.fetched) {
    findings.push(mk("crawl.robots.missing", "major",
      "robots.txt is absent or unreachable.",
      `GET ${result.origin}/robots.txt returned status ${result.robots.status}.`,
      "Publish a robots.txt that declares the sitemap and crawl rules."))
  } else if (result.robots.sitemaps.length === 0) {
    findings.push(mk("crawl.robots.nositemap", "minor",
      "robots.txt does not declare a sitemap.",
      "No Sitemap: directive found in robots.txt.",
      "Add a Sitemap: directive pointing at the XML sitemap."))
  } else {
    findings.push(pass("crawl.robots.ok", "robots.txt present and declares a sitemap.",
      `Sitemap directives: ${result.robots.sitemaps.join(", ")}.`))
  }

  if (!result.sitemap.fetched || result.sitemap.urlCount === 0) {
    findings.push(mk("crawl.sitemap.missing", "major",
      "XML sitemap is absent or empty.",
      `Sitemap fetched: ${result.sitemap.fetched}; URL count: ${result.sitemap.urlCount}.`,
      "Publish a complete XML sitemap of all indexable URLs."))
  } else {
    findings.push(pass("crawl.sitemap.ok", "XML sitemap present and populated.",
      `${result.sitemap.urlCount} URLs listed in the sitemap.`))
  }

  // -- Availability ----------------------------------------------------------
  const broken = html.filter((p) => p.status >= 400 || p.status === 0)
  const server5xx = broken.filter((p) => p.status >= 500)
  if (server5xx.length) {
    findings.push(mk("crawl.status.5xx", "critical",
      "Pages return server errors.",
      `${server5xx.length} URL(s) returned 5xx.`,
      "Resolve the server errors; 5xx pages are dropped from the index.",
      server5xx.map((p) => p.url).slice(0, 25)))
  }
  const notFound = broken.filter((p) => p.status >= 400 && p.status < 500)
  if (notFound.length) {
    findings.push(mk("crawl.status.4xx", "major",
      "Crawled URLs return client errors.",
      `${notFound.length} URL(s) returned 4xx.`,
      "Restore, redirect, or remove the broken URLs and purge them from the sitemap.",
      notFound.map((p) => p.url).slice(0, 25)))
  }

  const redirected = html.filter(
    (p) => p.redirectChain.length > 0 && p.status < 400,
  )
  if (redirected.length) {
    findings.push(mk("crawl.redirects", "minor",
      "Sitemap or internal URLs resolve through redirects.",
      `${redirected.length} URL(s) did not resolve at their first address.`,
      "Point sitemap entries and internal links at the final destination URL.",
      redirected.map((p) => `${p.url} -> ${p.finalUrl}`).slice(0, 25)))
  }

  // -- Titles ----------------------------------------------------------------
  const noTitle = indexable.filter((p) => !p.title)
  if (noTitle.length) {
    findings.push(mk("crawl.title.missing", "major",
      "Indexable pages have no title tag.",
      `${noTitle.length} of ${indexable.length} indexable pages lack a <title>.`,
      "Author a unique, descriptive title for every indexable page.",
      noTitle.map((p) => p.finalUrl).slice(0, 25)))
  }
  const dupTitles = duplicates(indexable.map((p) => p.title).filter(Boolean) as string[])
  if (dupTitles.length) {
    findings.push(mk("crawl.title.duplicate", "moderate",
      "Multiple pages share the same title tag.",
      `${dupTitles.length} title string(s) are used on more than one page.`,
      "Make every title unique to the page's primary query.",
      dupTitles.slice(0, 15)))
  }
  const oddLenTitle = indexable.filter(
    (p) => p.title && (p.title.length < TITLE_MIN || p.title.length > TITLE_MAX),
  )
  if (oddLenTitle.length) {
    findings.push(mk("crawl.title.length", "minor",
      "Title lengths fall outside the display range.",
      `${oddLenTitle.length} title(s) are shorter than ${TITLE_MIN} or longer than ${TITLE_MAX} characters.`,
      `Keep titles between ${TITLE_MIN} and ${TITLE_MAX} characters to avoid truncation.`,
      oddLenTitle.map((p) => p.finalUrl).slice(0, 25)))
  }

  // -- Meta descriptions -----------------------------------------------------
  const noDesc = indexable.filter((p) => !p.metaDescription)
  if (noDesc.length) {
    findings.push(mk("crawl.desc.missing", "moderate",
      "Indexable pages have no meta description.",
      `${noDesc.length} of ${indexable.length} indexable pages lack a meta description.`,
      "Write a distinct meta description for every indexable page.",
      noDesc.map((p) => p.finalUrl).slice(0, 25)))
  }
  const oddLenDesc = indexable.filter(
    (p) =>
      p.metaDescription &&
      (p.metaDescription.length < DESC_MIN || p.metaDescription.length > DESC_MAX),
  )
  if (oddLenDesc.length) {
    findings.push(mk("crawl.desc.length", "minor",
      "Meta description lengths fall outside the display range.",
      `${oddLenDesc.length} description(s) are shorter than ${DESC_MIN} or longer than ${DESC_MAX} characters.`,
      `Keep descriptions between ${DESC_MIN} and ${DESC_MAX} characters.`,
      oddLenDesc.map((p) => p.finalUrl).slice(0, 25)))
  }

  // -- Canonicals ------------------------------------------------------------
  const noCanonical = indexable.filter((p) => !p.canonical)
  if (noCanonical.length) {
    findings.push(mk("crawl.canonical.missing", "moderate",
      "Indexable pages have no canonical tag.",
      `${noCanonical.length} of ${indexable.length} indexable pages lack rel=canonical.`,
      "Emit a self-referencing canonical on every indexable page.",
      noCanonical.map((p) => p.finalUrl).slice(0, 25)))
  }

  // -- Headings --------------------------------------------------------------
  const noH1 = indexable.filter((p) => p.h1.length === 0)
  if (noH1.length) {
    findings.push(mk("crawl.h1.missing", "moderate",
      "Indexable pages have no H1.",
      `${noH1.length} of ${indexable.length} indexable pages have no <h1>.`,
      "Provide exactly one H1 stating the page's subject.",
      noH1.map((p) => p.finalUrl).slice(0, 25)))
  }
  const multiH1 = indexable.filter((p) => p.h1.length > 1)
  if (multiH1.length) {
    findings.push(mk("crawl.h1.multiple", "minor",
      "Pages carry more than one H1.",
      `${multiH1.length} page(s) have multiple <h1> elements.`,
      "Reduce to a single H1 and demote the rest to H2 or lower.",
      multiH1.map((p) => p.finalUrl).slice(0, 25)))
  }

  // -- Content depth ---------------------------------------------------------
  const thin = indexable.filter((p) => p.wordCount > 0 && p.wordCount < THIN_CONTENT_WORDS)
  if (thin.length) {
    findings.push(mk("crawl.content.thin", "moderate",
      "Indexable pages carry thin content.",
      `${thin.length} page(s) contain fewer than ${THIN_CONTENT_WORDS} words.`,
      "Expand thin pages or consolidate them to reduce low-value indexation.",
      thin.map((p) => `${p.finalUrl} (${p.wordCount}w)`).slice(0, 25)))
  }

  // -- Accessibility signals that affect ranking -----------------------------
  const totalImgs = html.reduce((s, p) => s + p.imagesTotal, 0)
  const missingAlt = html.reduce((s, p) => s + p.imagesMissingAlt, 0)
  if (missingAlt > 0) {
    const pct = totalImgs ? Math.round((missingAlt / totalImgs) * 100) : 0
    findings.push(mk("crawl.img.alt", pct > 25 ? "moderate" : "minor",
      "Images are missing alt text.",
      `${missingAlt} of ${totalImgs} images (${pct}%) have no alt attribute.`,
      "Add descriptive alt text to content images for accessibility and image search."))
  }
  const noViewport = indexable.filter((p) => !p.hasViewport)
  if (noViewport.length) {
    findings.push(mk("crawl.viewport.missing", "major",
      "Pages lack a mobile viewport declaration.",
      `${noViewport.length} indexable page(s) have no meta viewport.`,
      "Add a responsive viewport meta tag; mobile usability is a ranking factor.",
      noViewport.map((p) => p.finalUrl).slice(0, 25)))
  }

  // -- Structured data (credit, not deduction) -------------------------------
  const withSchema = html.filter((p) => p.jsonLdTypes.length > 0)
  const invalidSchema = html.filter((p) => p.jsonLdTypes.includes("INVALID_JSON_LD"))
  if (invalidSchema.length) {
    findings.push(mk("crawl.schema.invalid", "moderate",
      "Structured data is present but does not parse.",
      `${invalidSchema.length} page(s) carry malformed JSON-LD.`,
      "Fix the JSON-LD syntax; malformed blocks are ignored by search engines.",
      invalidSchema.map((p) => p.finalUrl).slice(0, 25)))
  }
  if (withSchema.length) {
    const types = [...new Set(html.flatMap((p) => p.jsonLdTypes))]
      .filter((t) => t !== "INVALID_JSON_LD")
      .sort()
    findings.push(pass("crawl.schema.ok", "Structured data is present across the site.",
      `${withSchema.length} of ${html.length} pages carry JSON-LD. Types observed: ${types.join(", ") || "none"}.`))
  }

  const score = scoreFromFindings(findings)

  const metrics: Metric[] = [
    { label: "URLs crawled", value: result.pages.length },
    { label: "Indexable HTML pages", value: indexable.length },
    { label: "Sitemap URLs", value: result.sitemap.urlCount },
    { label: "Broken URLs (4xx/5xx)", value: broken.length, benchmark: 0 },
    { label: "Pages via redirect", value: redirected.length, benchmark: 0 },
    { label: "Missing titles", value: noTitle.length, benchmark: 0 },
    { label: "Duplicate titles", value: dupTitles.length, benchmark: 0 },
    { label: "Missing meta descriptions", value: noDesc.length, benchmark: 0 },
    { label: "Missing canonicals", value: noCanonical.length, benchmark: 0 },
    { label: "Pages with structured data", value: `${withSchema.length}/${html.length}` },
    { label: "Median response time (ms)", value: median(html.map((p) => p.timeMs)) },
  ]

  return {
    prong: "crawl",
    title: "Technical Site Crawl",
    available: result.pages.length > 0,
    score: result.pages.length > 0 ? score : null,
    summary: summarize(score, findings),
    metrics,
    findings,
    provenance: [
      `Crawl seeded from the XML sitemap and home page of ${result.origin}.`,
      `${result.pages.length} URL(s) fetched; ${result.discoveredButUncrawled} additional URL(s) discovered but not crawled within the page cap.`,
      "Signals read directly from served markup and response headers. No rendering of client-side JavaScript beyond the initial HTML response.",
    ],
  }
}

function isNoindex(p: CrawledPage): boolean {
  return /noindex/i.test(p.robotsMeta ?? "")
}

function duplicates(values: string[]): string[] {
  const counts = new Map<string, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts.entries()].filter(([, n]) => n > 1).map(([v]) => v)
}

function median(nums: number[]): number {
  if (nums.length === 0) return 0
  const s = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? (s[mid] ?? 0) : Math.round(((s[mid - 1] ?? 0) + (s[mid] ?? 0)) / 2)
}

function summarize(score: number, findings: Finding[]): string {
  const crit = findings.filter((f) => f.severity === "critical").length
  const major = findings.filter((f) => f.severity === "major").length
  if (score >= 90) {
    return "The site's technical foundation is sound. Crawlability, indexation controls, and on-page structure meet current search-engine requirements, with only minor items outstanding."
  }
  if (crit > 0) {
    return `The crawl identified ${crit} critical and ${major} major defect(s) that impair indexation or ranking. These are the controlling constraints and are addressed first in the remediation schedule.`
  }
  return `The technical foundation is largely intact but carries ${major} major item(s) that place a ceiling on organic performance until resolved.`
}

function mk(
  id: string,
  severity: Finding["severity"],
  title: string,
  evidence: string,
  remedy: string,
  affected?: string[],
): Finding {
  return { id, prong: "crawl", severity, title, evidence, remedy, affected }
}

function pass(id: string, title: string, evidence: string): Finding {
  return { id, prong: "crawl", severity: "pass", title, evidence, remedy: "" }
}
