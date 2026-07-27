import type { AuditConfig } from "../../config.js"
import type { CrawlResult } from "../crawl/crawler.js"

// Answer-engine and generative-engine readiness probes that require no model.
// These read the site's posture toward AI crawlers, its machine-readable
// content declarations, and the structured data that answer engines use to
// extract and attribute facts. They reuse the crawl output where possible and
// fetch the one file the crawler does not: /llms.txt.

export interface AeoProbe {
  aiCrawlers: { agent: string; allowed: boolean }[]
  blockedCrawlers: string[]
  llmsTxt: { present: boolean; status: number; pageCount: number }
  schema: {
    hasOrganization: boolean
    hasWebSite: boolean
    hasFaq: boolean
    hasArticle: boolean
    hasBreadcrumb: boolean
    hasService: boolean
    types: string[]
  }
  // Server-rendered content depth on the primary pages. Answer engines that do
  // not execute JavaScript see only this. Low values here mean the site is
  // effectively invisible to them regardless of on-page quality.
  serverRenderedWords: { url: string; words: number }[]
  medianServerWords: number
}

const PRIMARY_AI_AGENTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]

export async function runAeoProbes(
  crawl: CrawlResult,
  config: AuditConfig,
): Promise<AeoProbe> {
  const types = new Set<string>()
  for (const p of crawl.pages) for (const t of p.jsonLdTypes) types.add(t)

  const llmsTxt = await fetchLlmsTxt(config)

  const serverRenderedWords = crawl.pages
    .filter((p) => p.ok && p.contentType.includes("text/html"))
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 10)
    .map((p) => ({ url: p.finalUrl, words: p.wordCount }))

  const blockedCrawlers = crawl.robots.aiCrawlerRules
    .filter((r) => PRIMARY_AI_AGENTS.includes(r.agent) && !r.allowed)
    .map((r) => r.agent)

  return {
    aiCrawlers: crawl.robots.aiCrawlerRules,
    blockedCrawlers,
    llmsTxt,
    schema: {
      hasOrganization: types.has("Organization"),
      hasWebSite: types.has("WebSite"),
      hasFaq: types.has("FAQPage"),
      hasArticle: types.has("Article"),
      hasBreadcrumb: types.has("BreadcrumbList"),
      hasService: types.has("Service"),
      types: [...types].sort(),
    },
    serverRenderedWords,
    medianServerWords: median(
      crawl.pages
        .filter((p) => p.ok && p.contentType.includes("text/html"))
        .map((p) => p.wordCount),
    ),
  }
}

async function fetchLlmsTxt(
  config: AuditConfig,
): Promise<AeoProbe["llmsTxt"]> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), config.crawl.timeoutMs)
    const res = await fetch(`${config.origin}/llms.txt`, {
      signal: controller.signal,
      headers: { "user-agent": config.crawl.userAgent },
    }).finally(() => clearTimeout(timer))
    if (!res.ok) return { present: false, status: res.status, pageCount: 0 }
    const body = await res.text()
    const pageCount = body.split(/\r?\n/).filter((l) => /^\s*-\s*\[/.test(l)).length
    return { present: true, status: res.status, pageCount }
  } catch {
    return { present: false, status: 0, pageCount: 0 }
  }
}

function median(nums: number[]): number {
  if (nums.length === 0) return 0
  const s = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? (s[mid] ?? 0) : Math.round(((s[mid - 1] ?? 0) + (s[mid] ?? 0)) / 2)
}
