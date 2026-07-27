#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { Command } from "commander"
import { loadConfig } from "./config.js"
import { crawlSite } from "./prongs/crawl/crawler.js"
import { analyzeCrawl } from "./prongs/crawl/analyze.js"
import { pullGa4 } from "./prongs/search/ga4.js"
import { pullGsc } from "./prongs/search/gsc.js"
import { analyzeSearch } from "./prongs/search/analyze.js"
import { runAeoProbes } from "./prongs/ai/probes.js"
import { probeAnswerEngine } from "./prongs/ai/answer-engine.js"
import { analyzeAi } from "./prongs/ai/analyze.js"
import { reduceToReport } from "./scoring/score.js"
import { renderReport } from "./report/render.js"
import type { ProngResult } from "./types.js"

// Orchestrator. Runs the requested prongs, reduces their results to a single
// weighted report, and writes the standardized Markdown. Prongs are
// independent except that the AI prong reuses the crawler's fetched pages, so
// the crawl runs whenever the AI prong is requested.

const program = new Command()
program
  .name("x1-audit")
  .description("Three-prong SEO, AEO, and GEO audit engine.")
  .option("--only <prong>", "run a single prong: search | crawl | ai")
  .option("--out <path>", "output path for the report", "out/audit-report.md")
  .option("--site <url>", "override AUDIT_SITE_URL")
  .parse()

const opts = program.opts<{ only?: string; out: string; site?: string }>()

async function main(): Promise<void> {
  const config = loadConfig(opts.site ? { AUDIT_SITE_URL: opts.site } : {})
  const only = opts.only as "search" | "crawl" | "ai" | undefined
  const runDate = new Date().toISOString().slice(0, 10)

  log(`Auditing ${config.siteUrl}`)
  const prongs: ProngResult[] = []

  // -- Prong I: search -------------------------------------------------------
  if (!only || only === "search") {
    log("Prong I: pulling Search Console and Analytics")
    const [gsc, ga4] = await Promise.all([pullGsc(config), pullGa4(config)])
    prongs.push(analyzeSearch(gsc, ga4))
  }

  // -- Prong II: crawl (also required by the AI prong) -----------------------
  let crawl = null
  if (!only || only === "crawl" || only === "ai") {
    log("Prong II: crawling site")
    crawl = await crawlSite(config)
    log(`  fetched ${crawl.pages.length} page(s)`)
    if (!only || only === "crawl") {
      prongs.push(analyzeCrawl(crawl))
    }
  }

  // -- Prong III: AEO / GEO --------------------------------------------------
  if ((!only || only === "ai") && crawl) {
    log("Prong III: probing answer- and generative-engine readiness")
    const probe = await runAeoProbes(crawl, config)
    const engine = await probeAnswerEngine(crawl, config)
    prongs.push(analyzeAi(probe, engine))
  }

  // Preserve canonical prong order regardless of run order.
  const order = { search: 0, crawl: 1, ai: 2 } as const
  prongs.sort((a, b) => order[a.prong] - order[b.prong])

  const report = reduceToReport({
    site: config.siteUrl,
    runDate,
    window: `${config.search.windowDays} days`,
    prongs,
  })

  const markdown = renderReport(report)
  const outPath = resolve(process.cwd(), opts.out)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, markdown, "utf8")

  log("")
  log(`Master score: ${report.masterScore}/100 (grade ${report.masterGrade.letter}, ${report.masterGrade.band})`)
  for (const p of report.prongs) {
    log(`  ${p.title}: ${p.score === null ? "not run" : `${p.score}/100`}`)
  }
  log(`Report written to ${outPath}`)
}

function log(msg: string): void {
  process.stderr.write(msg + "\n")
}

main().catch((err) => {
  process.stderr.write(`Audit failed: ${err instanceof Error ? err.stack : String(err)}\n`)
  process.exit(1)
})
