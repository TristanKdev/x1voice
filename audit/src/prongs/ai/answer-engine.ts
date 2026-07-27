import Anthropic from "@anthropic-ai/sdk"
import type { AuditConfig } from "../../config.js"
import type { CrawlResult } from "../crawl/crawler.js"

// The generative-engine probe. It simulates what an answer engine does when a
// prospect asks about the category: it takes the site's own served content as
// the only source, poses representative buyer questions, and records whether
// that content is sufficient to produce a correct, citable answer. Where the
// content falls short, the model names the specific gap. This is the closest
// available proxy for "would an AI Overview cite this site, and would it be
// right." It runs only when an Anthropic API key is configured.

export interface AeoQueryVerdict {
  query: string
  answerable: boolean
  citationReady: boolean
  gap: string
}

export interface AnswerEngineResult {
  ran: boolean
  model: string
  coverage: number // share of queries the site content can answer, 0-1
  citationRate: number // share that are citation-ready, 0-1
  verdicts: AeoQueryVerdict[]
  error?: string
}

export async function probeAnswerEngine(
  crawl: CrawlResult,
  config: AuditConfig,
): Promise<AnswerEngineResult> {
  if (!config.ai.apiKey) {
    return {
      ran: false,
      model: config.ai.model,
      coverage: 0,
      citationRate: 0,
      verdicts: [],
      error: "ANTHROPIC_API_KEY not set; answer-engine probe skipped.",
    }
  }

  const corpus = buildCorpus(crawl)
  if (!corpus.trim()) {
    return {
      ran: false,
      model: config.ai.model,
      coverage: 0,
      citationRate: 0,
      verdicts: [],
      error: "No server-rendered content available to evaluate.",
    }
  }

  const client = new Anthropic({ apiKey: config.ai.apiKey })

  const system =
    "You evaluate whether a website's own published content is sufficient for an AI answer engine to produce a correct, attributable answer to a prospective customer's question. " +
    "You are given the site's served text as the only permitted source. For each question, decide: answerable (the text contains a direct, unambiguous answer), citationReady (the answer is stated in a self-contained, extractable passage a model would quote), and gap (the single most important missing fact or clarification, or an empty string if none). " +
    "Do not use outside knowledge. Do not speculate. Return only the requested JSON."

  const queries = deriveQueries(crawl)

  const user =
    `SITE CONTENT (the only source you may use):\n\n${corpus}\n\n` +
    `QUESTIONS:\n${queries.map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\n` +
    `Return a JSON object of the form {"verdicts":[{"query":string,"answerable":boolean,"citationReady":boolean,"gap":string}]} with one entry per question, in order.`

  try {
    const res = await client.messages.create({
      model: config.ai.model,
      max_tokens: 2000,
      system,
      messages: [{ role: "user", content: user }],
    })
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
    const parsed = extractJson(text) as { verdicts?: AeoQueryVerdict[] }
    const verdicts = (parsed.verdicts ?? []).slice(0, queries.length)

    const coverage = verdicts.length
      ? verdicts.filter((v) => v.answerable).length / verdicts.length
      : 0
    const citationRate = verdicts.length
      ? verdicts.filter((v) => v.citationReady).length / verdicts.length
      : 0

    return { ran: true, model: config.ai.model, coverage, citationRate, verdicts }
  } catch (err) {
    return {
      ran: false,
      model: config.ai.model,
      coverage: 0,
      citationRate: 0,
      verdicts: [],
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

function buildCorpus(crawl: CrawlResult): string {
  // Concatenate the served text of the highest-content pages, capped so the
  // prompt stays within a sensible size. Titles and descriptions anchor each
  // section so the model can attribute answers to a page.
  const pages = crawl.pages
    .filter((p) => p.ok && p.contentType.includes("text/html") && p.wordCount > 0)
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 8)
  return pages
    .map(
      (p) =>
        `--- ${p.finalUrl}\nTITLE: ${p.title ?? ""}\nDESCRIPTION: ${p.metaDescription ?? ""}\nH1: ${p.h1.join(" | ")}\n`,
    )
    .join("\n")
    .slice(0, 12000)
}

function deriveQueries(crawl: CrawlResult): string[] {
  // Representative buyer questions. Generic across the category so the probe is
  // reproducible; the operator can extend this list with tracked queries.
  const home = crawl.pages.find((p) => new URL(p.finalUrl).pathname === "/")
  const brand = home?.title?.split(/[—|-]/)[0]?.trim() ?? "the product"
  return [
    `What does ${brand} do?`,
    `How much does ${brand} cost?`,
    `What integrations does ${brand} support?`,
    `How long does it take to set up ${brand}?`,
    `Does ${brand} handle payments?`,
    `What makes ${brand} different from alternatives?`,
    `Is ${brand} suitable for multiple locations?`,
    `What do customers say about ${brand}?`,
  ]
}

function extractJson(text: string): unknown {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text)
  const raw = fenced ? (fenced[1] ?? "") : text
  const start = raw.indexOf("{")
  const end = raw.lastIndexOf("}")
  if (start === -1 || end === -1) return {}
  try {
    return JSON.parse(raw.slice(start, end + 1))
  } catch {
    return {}
  }
}
