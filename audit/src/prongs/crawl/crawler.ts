import * as cheerio from "cheerio"
import { XMLParser } from "fast-xml-parser"
import pLimit from "p-limit"
import type { AuditConfig } from "../../config.js"

// A same-origin breadth-first crawler seeded from the XML sitemap and the home
// page. It records exactly what a search crawler would see: final status after
// redirects, response headers, timing, and the parsed markup signals that
// govern indexing and ranking. It stays on the target origin, honors a page
// cap, and never follows disallowed or off-site links.

export interface CrawledPage {
  url: string
  finalUrl: string
  status: number
  redirectChain: string[]
  ok: boolean
  timeMs: number
  contentType: string
  headers: Record<string, string>
  // Parsed on-page signals. Undefined when the page was not HTML or failed.
  title?: string
  metaDescription?: string
  canonical?: string
  robotsMeta?: string
  h1: string[]
  h2Count: number
  wordCount: number
  imagesTotal: number
  imagesMissingAlt: number
  internalLinks: string[]
  externalLinks: number
  jsonLdTypes: string[]
  hreflang: string[]
  hasViewport: boolean
  ogTags: number
  error?: string
}

export interface CrawlResult {
  origin: string
  robots: {
    fetched: boolean
    status: number
    body: string
    sitemaps: string[]
    aiCrawlerRules: { agent: string; allowed: boolean }[]
  }
  sitemap: {
    fetched: boolean
    urlCount: number
    urls: string[]
  }
  pages: CrawledPage[]
  discoveredButUncrawled: number
}

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
]

export async function crawlSite(config: AuditConfig): Promise<CrawlResult> {
  const origin = config.origin
  const robots = await fetchRobots(origin, config)
  const sitemap = await fetchSitemap(origin, robots.sitemaps, config)

  const seeds = new Set<string>([config.siteUrl + "/"])
  for (const u of sitemap.urls) seeds.add(u)

  const queue: string[] = [...seeds]
  const seen = new Set<string>(queue)
  const pages: CrawledPage[] = []
  const limit = pLimit(config.crawl.concurrency)

  let index = 0
  while (index < queue.length && pages.length < config.crawl.maxPages) {
    const batch = queue
      .slice(index, index + config.crawl.concurrency)
      .filter((u) => pages.length + (index - pages.length) < config.crawl.maxPages)
    index += batch.length

    const crawled = await Promise.all(
      batch.map((url) => limit(() => fetchPage(url, config))),
    )

    for (const page of crawled) {
      pages.push(page)
      // Enqueue newly discovered same-origin links.
      for (const link of page.internalLinks) {
        const norm = normalize(link)
        if (!norm || seen.has(norm)) continue
        if (new URL(norm).origin !== origin) continue
        seen.add(norm)
        if (queue.length < config.crawl.maxPages * 3) queue.push(norm)
      }
    }
  }

  return {
    origin,
    robots,
    sitemap,
    pages,
    discoveredButUncrawled: Math.max(0, seen.size - pages.length),
  }
}

async function fetchRobots(
  origin: string,
  config: AuditConfig,
): Promise<CrawlResult["robots"]> {
  const url = `${origin}/robots.txt`
  try {
    const res = await timedFetch(url, config)
    const body = res.ok ? await res.text() : ""
    return {
      fetched: res.ok,
      status: res.status,
      body,
      sitemaps: parseSitemapDirectives(body, origin),
      aiCrawlerRules: parseAiCrawlerRules(body),
    }
  } catch {
    return { fetched: false, status: 0, body: "", sitemaps: [], aiCrawlerRules: [] }
  }
}

async function fetchSitemap(
  origin: string,
  fromRobots: string[],
  config: AuditConfig,
): Promise<CrawlResult["sitemap"]> {
  const candidates = fromRobots.length ? fromRobots : [`${origin}/sitemap.xml`]
  const urls = new Set<string>()
  let fetched = false

  const parser = new XMLParser({ ignoreAttributes: false })
  for (const sm of candidates) {
    try {
      const res = await timedFetch(sm, config)
      if (!res.ok) continue
      fetched = true
      const xml = await res.text()
      const doc = parser.parse(xml)
      // A sitemap index points at child sitemaps; a urlset lists pages.
      const childSitemaps = asArray(doc?.sitemapindex?.sitemap).map(
        (s: { loc?: string }) => s?.loc,
      )
      for (const child of childSitemaps) {
        if (!child) continue
        try {
          const cres = await timedFetch(child, config)
          if (!cres.ok) continue
          const cdoc = parser.parse(await cres.text())
          for (const entry of asArray(cdoc?.urlset?.url)) {
            if (entry?.loc) urls.add(String(entry.loc))
          }
        } catch {
          // Skip an unreachable child sitemap; the rest still count.
        }
      }
      for (const entry of asArray(doc?.urlset?.url)) {
        if (entry?.loc) urls.add(String(entry.loc))
      }
    } catch {
      // Try the next candidate.
    }
  }

  return { fetched, urlCount: urls.size, urls: [...urls] }
}

async function fetchPage(url: string, config: AuditConfig): Promise<CrawledPage> {
  const started = Date.now()
  const base: CrawledPage = {
    url,
    finalUrl: url,
    status: 0,
    redirectChain: [],
    ok: false,
    timeMs: 0,
    contentType: "",
    headers: {},
    h1: [],
    h2Count: 0,
    wordCount: 0,
    imagesTotal: 0,
    imagesMissingAlt: 0,
    internalLinks: [],
    externalLinks: 0,
    jsonLdTypes: [],
    hreflang: [],
    hasViewport: false,
    ogTags: 0,
  }

  try {
    const res = await timedFetch(url, config)
    base.status = res.status
    base.finalUrl = res.url
    base.ok = res.ok
    base.timeMs = Date.now() - started
    base.contentType = res.headers.get("content-type") ?? ""
    res.headers.forEach((v, k) => (base.headers[k.toLowerCase()] = v))
    if (base.finalUrl !== url) base.redirectChain = [url, base.finalUrl]

    if (!base.contentType.includes("text/html")) return base

    const html = await res.text()
    parseHtml(html, base, config.origin)
    return base
  } catch (err) {
    base.error = err instanceof Error ? err.message : String(err)
    base.timeMs = Date.now() - started
    return base
  }
}

function parseHtml(html: string, page: CrawledPage, origin: string): void {
  const $ = cheerio.load(html)

  page.title = $("head > title").first().text().trim() || undefined
  page.metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || undefined
  page.canonical = $('link[rel="canonical"]').attr("href")?.trim() || undefined
  page.robotsMeta = $('meta[name="robots"]').attr("content")?.trim() || undefined
  page.hasViewport = $('meta[name="viewport"]').length > 0
  page.ogTags = $('meta[property^="og:"]').length

  page.h1 = $("h1")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
  page.h2Count = $("h2").length

  const bodyText = $("body").text().replace(/\s+/g, " ").trim()
  page.wordCount = bodyText ? bodyText.split(" ").length : 0

  const imgs = $("img")
  page.imagesTotal = imgs.length
  page.imagesMissingAlt = imgs.filter((_, el) => {
    const alt = $(el).attr("alt")
    return alt === undefined || alt.trim() === ""
  }).length

  const internal = new Set<string>()
  let external = 0
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")
    if (!href) return
    const abs = resolve(href, page.finalUrl)
    if (!abs) return
    try {
      if (new URL(abs).origin === origin) internal.add(abs)
      else external += 1
    } catch {
      // Ignore unparseable hrefs (mailto:, tel:, javascript:).
    }
  })
  page.internalLinks = [...internal]
  page.externalLinks = external

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).contents().text())
      collectJsonLdTypes(json, page.jsonLdTypes)
    } catch {
      page.jsonLdTypes.push("INVALID_JSON_LD")
    }
  })

  page.hreflang = $('link[rel="alternate"][hreflang]')
    .map((_, el) => $(el).attr("hreflang") ?? "")
    .get()
    .filter(Boolean)
}

function collectJsonLdTypes(node: unknown, out: string[]): void {
  if (Array.isArray(node)) {
    for (const n of node) collectJsonLdTypes(n, out)
    return
  }
  if (node && typeof node === "object") {
    const t = (node as Record<string, unknown>)["@type"]
    if (typeof t === "string") out.push(t)
    else if (Array.isArray(t)) for (const x of t) if (typeof x === "string") out.push(x)
    const graph = (node as Record<string, unknown>)["@graph"]
    if (graph) collectJsonLdTypes(graph, out)
  }
}

async function timedFetch(url: string, config: AuditConfig): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), config.crawl.timeoutMs)
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": config.crawl.userAgent },
    })
  } finally {
    clearTimeout(timer)
  }
}

function parseSitemapDirectives(body: string, origin: string): string[] {
  return body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^sitemap:/i.test(l))
    .map((l) => l.replace(/^sitemap:\s*/i, "").trim())
    .map((u) => (u.startsWith("http") ? u : `${origin}${u.startsWith("/") ? "" : "/"}${u}`))
}

function parseAiCrawlerRules(body: string): { agent: string; allowed: boolean }[] {
  // Minimal robots parser scoped to the AI/answer-engine user agents. For each
  // named agent, determine whether the site permits it to crawl the root path.
  const lines = body.split(/\r?\n/).map((l) => l.replace(/#.*$/, "").trim())
  const results: { agent: string; allowed: boolean }[] = []

  for (const agent of AI_CRAWLERS) {
    let inBlock = false
    let allowed = true // default posture when no rule targets the agent
    let sawRule = false
    for (const line of lines) {
      const ua = /^user-agent:\s*(.+)$/i.exec(line)
      if (ua) {
        const name = (ua[1] ?? "").trim()
        inBlock = name.toLowerCase() === agent.toLowerCase()
        continue
      }
      if (!inBlock) continue
      const dis = /^disallow:\s*(.*)$/i.exec(line)
      const alw = /^allow:\s*(.*)$/i.exec(line)
      if (dis) {
        sawRule = true
        if ((dis[1] ?? "").trim() === "/") allowed = false
      }
      if (alw) {
        sawRule = true
        if ((alw[1] ?? "").trim() === "/") allowed = true
      }
    }
    results.push({ agent, allowed: sawRule ? allowed : true })
  }
  return results
}

function normalize(url: string): string | null {
  try {
    const u = new URL(url)
    u.hash = ""
    return u.toString()
  } catch {
    return null
  }
}

function resolve(href: string, base: string): string | null {
  if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return null
  try {
    const u = new URL(href, base)
    u.hash = ""
    return u.toString()
  } catch {
    return null
  }
}

function asArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined || v === null) return []
  return Array.isArray(v) ? v : [v]
}
