import type { Finding, Metric, ProngResult } from "../../types.js"
import { scoreFromFindings } from "../../scoring/weights.js"
import type { AeoProbe } from "./probes.js"
import type { AnswerEngineResult } from "./answer-engine.js"

// Grade the answer- and generative-engine readiness prong. Like the crawl
// prong, it grades by exception against a 100-point base. The defect classes
// are the things that keep an answer engine from finding, trusting, extracting,
// and attributing the site's facts: crawler access, machine-readable content
// declarations, extractable structured data, server-rendered depth, and, when
// the model probe runs, demonstrated answer coverage.

const THIN_SERVER_WORDS = 250

export function analyzeAi(probe: AeoProbe, engine: AnswerEngineResult): ProngResult {
  const findings: Finding[] = []

  // -- Crawler access --------------------------------------------------------
  if (probe.blockedCrawlers.length) {
    findings.push(f("ai.access.blocked", "major",
      "Primary answer-engine crawlers are disallowed.",
      `robots.txt blocks: ${probe.blockedCrawlers.join(", ")}.`,
      "If presence in AI answers is a goal, permit these agents. Blocking them removes the site from their training and retrieval corpora."))
  } else {
    findings.push(pass("ai.access.ok", "Answer-engine crawlers are permitted.",
      `Permitted: ${probe.aiCrawlers.filter((r) => r.allowed).map((r) => r.agent).join(", ") || "none named"}.`))
  }

  // -- llms.txt --------------------------------------------------------------
  if (!probe.llmsTxt.present) {
    findings.push(f("ai.llmstxt.missing", "moderate",
      "The site publishes no llms.txt.",
      `GET /llms.txt returned status ${probe.llmsTxt.status}.`,
      "Publish an llms.txt that indexes the pages and facts you want answer engines to use. It is the emerging convention for machine-readable site guidance."))
  } else {
    findings.push(pass("ai.llmstxt.ok", "The site publishes an llms.txt.",
      `/llms.txt is served and lists ${probe.llmsTxt.pageCount} page(s).`))
  }

  // -- Structured data for extraction and attribution -----------------------
  if (!probe.schema.hasFaq) {
    findings.push(f("ai.schema.faq", "moderate",
      "No FAQPage structured data is present.",
      "No FAQPage type found in any crawled page's JSON-LD.",
      "Mark up the question-and-answer content with FAQPage schema. It is the format answer engines most readily extract and attribute."))
  }
  if (!probe.schema.hasOrganization) {
    findings.push(f("ai.schema.org", "moderate",
      "No Organization structured data is present.",
      "No Organization type found in any crawled page's JSON-LD.",
      "Emit an Organization node with name, logo, and sameAs so answer engines can resolve the brand as a distinct entity."))
  }
  const strongSchema =
    probe.schema.hasOrganization && probe.schema.hasWebSite && probe.schema.hasFaq
  if (strongSchema) {
    findings.push(pass("ai.schema.ok", "Core entity and answer schema are present.",
      `Types observed: ${probe.schema.types.join(", ")}.`))
  }

  // -- Server-rendered depth -------------------------------------------------
  if (probe.medianServerWords < THIN_SERVER_WORDS) {
    findings.push(f("ai.render.thin", "major",
      "Server-rendered content is thin.",
      `Median server-rendered word count is ${probe.medianServerWords}, below the ${THIN_SERVER_WORDS}-word floor. Answer engines that do not execute JavaScript see only this.`,
      "Ensure substantive copy is present in the initial HTML response, not injected by client-side scripts."))
  } else {
    findings.push(pass("ai.render.ok", "Substantive content is present in server-rendered HTML.",
      `Median server-rendered word count is ${probe.medianServerWords}.`))
  }

  // -- Demonstrated answer coverage (model probe) ---------------------------
  if (engine.ran) {
    if (engine.coverage < 0.6) {
      findings.push(f("ai.coverage.low", "major",
        "The site's own content cannot answer common buyer questions.",
        `An answer engine could answer ${pct(engine.coverage)} of representative questions from site content alone.`,
        "Author direct, self-contained answers to the unanswered questions on the relevant pages.",
        engine.verdicts.filter((v) => !v.answerable).map((v) => v.query)))
    }
    if (engine.citationRate < 0.5) {
      findings.push(f("ai.citation.low", "moderate",
        "Answers are present but not in citation-ready form.",
        `Only ${pct(engine.citationRate)} of answerable questions are stated in a self-contained, extractable passage.`,
        "Restructure key answers into concise, standalone passages an engine can quote without stitching sentences together.",
        engine.verdicts.filter((v) => v.answerable && !v.citationReady).map((v) => v.query)))
    }
    const gaps = engine.verdicts.map((v) => v.gap).filter((g) => g && g.trim())
    if (gaps.length) {
      findings.push(f("ai.gaps.named", "minor",
        "The model identified specific missing facts.",
        `${gaps.length} content gap(s) named across the probe set.`,
        "Close the named gaps on the relevant pages.",
        gaps.slice(0, 15)))
    }
  }

  const score = scoreFromFindings(findings)

  const metrics: Metric[] = [
    {
      label: "Answer-engine crawlers permitted",
      value: `${probe.aiCrawlers.filter((r) => r.allowed).length}/${probe.aiCrawlers.length}`,
    },
    { label: "llms.txt published", value: probe.llmsTxt.present ? "Yes" : "No" },
    { label: "FAQPage schema", value: probe.schema.hasFaq ? "Present" : "Absent" },
    { label: "Organization schema", value: probe.schema.hasOrganization ? "Present" : "Absent" },
    { label: "Median server-rendered words", value: probe.medianServerWords },
  ]
  if (engine.ran) {
    metrics.push({ label: "Answer coverage (probe)", value: pct(engine.coverage), benchmark: "≥ 60%" })
    metrics.push({ label: "Citation-ready rate (probe)", value: pct(engine.citationRate), benchmark: "≥ 50%" })
  }

  const provenance: string[] = [
    "Access and schema signals derived from robots.txt and served JSON-LD. llms.txt fetched directly.",
    engine.ran
      ? `Answer-engine probe executed with model ${engine.model} over ${engine.verdicts.length} representative questions, using served site content as the sole source.`
      : `Answer-engine probe not run: ${engine.error ?? "no API key"}. Readiness graded on access, schema, and render signals only.`,
  ]

  return {
    prong: "ai",
    title: "Answer & Generative Engine Optimization",
    available: true,
    score,
    summary: summarize(score, probe, engine),
    metrics,
    findings,
    provenance,
  }
}

function summarize(score: number, probe: AeoProbe, engine: AnswerEngineResult): string {
  const base =
    score >= 90
      ? "The site is well positioned for answer and generative engines."
      : score >= 70
        ? "The site is moderately positioned for answer and generative engines, with defined gaps."
        : "The site is poorly positioned for answer and generative engines and will rarely be cited in their answers."
  const access = probe.blockedCrawlers.length
    ? `It blocks ${probe.blockedCrawlers.join(", ")}.`
    : "It permits the primary answer-engine crawlers."
  const cov = engine.ran
    ? ` Against a representative question set, its own content answered ${pct(engine.coverage)} and was citation-ready on ${pct(engine.citationRate)}.`
    : ""
  return `${base} ${access}${cov}`
}

function f(
  id: string,
  severity: Finding["severity"],
  title: string,
  evidence: string,
  remedy: string,
  affected?: string[],
): Finding {
  return { id, prong: "ai", severity, title, evidence, remedy, affected }
}
function pass(id: string, title: string, evidence: string): Finding {
  return { id, prong: "ai", severity: "pass", title, evidence, remedy: "" }
}
function pct(n: number): string {
  return `${Math.round(n * 100)}%`
}
