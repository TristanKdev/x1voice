import type {
  AuditReport,
  Finding,
  Metric,
  ProngId,
  ProngResult,
  Severity,
} from "../types.js"
import { PRONG_WEIGHTS, SEVERITY_DEDUCTION } from "../scoring/weights.js"

// Renders the standardized audit report as Markdown. The structure is fixed:
// every run produces the same sections in the same order, so two reports can be
// compared line for line. The register is formal and declarative. Findings are
// stated as findings of fact, each with its supporting evidence and its
// remedy. There is no hedging language and no filler.

const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Critical",
  major: "Major",
  moderate: "Moderate",
  minor: "Minor",
  pass: "Conforming",
}

const PRONG_NUMERAL: Record<ProngId, string> = {
  search: "I",
  crawl: "II",
  ai: "III",
}

export function renderReport(report: AuditReport): string {
  const s: string[] = []
  const p = (line = "") => s.push(line)

  // -- Cover -----------------------------------------------------------------
  p("# Search, Answer, and Generative Engine Optimization Audit")
  p()
  p(`**Property under audit:** ${report.site}`)
  p(`**Date of report:** ${report.runDate}`)
  p(`**Reporting window (search performance):** ${report.window}`)
  p(`**Prepared by:** X1 Voice Audit Engine, three-prong methodology, version 1.0`)
  p(`**Classification:** Confidential. Prepared for internal use of the property owner.`)
  p()
  p("---")
  p()

  // -- I. Executive determination -------------------------------------------
  p("## I. Executive Determination")
  p()
  p(
    `On the evidence set out in this report, the property scores **${report.masterScore} out of 100**, grade **${report.masterGrade.letter}**, ${report.masterGrade.band.toLowerCase()}.`,
  )
  p()
  p("The master score is the weighted mean of the three prong scores set out below. Weights are fixed by the methodology in Section II and were applied as stated. Any prong that could not be executed is excluded from the mean and its weight redistributed across the prongs that ran; the effective weights actually applied are shown in the final column.")
  p()
  p("| Prong | Assessment | Base weight | Effective weight | Score (0-100) | Contribution |")
  p("| :-- | :-- | --: | --: | --: | --: |")
  for (const prong of report.prongs) {
    const eff = report.effectiveWeights[prong.prong]
    const score = prong.score === null ? "Not run" : String(prong.score)
    const contribution =
      prong.score === null ? "0.0" : (prong.score * eff).toFixed(1)
    p(
      `| ${PRONG_NUMERAL[prong.prong]}. ${prong.title} | ${short(prong)} | ${fmtWeight(PRONG_WEIGHTS[prong.prong])} | ${fmtWeight(eff)} | ${score} | ${contribution} |`,
    )
  }
  p(`| **Master** | **${report.masterGrade.band}** | **1.00** | **1.00** | **${report.masterScore}** | **${report.masterScore}.0** |`)
  p()
  p(overallStatement(report))
  p()
  p(consolidatedCounts(report))
  p()

  // -- II. Scope and methodology --------------------------------------------
  p("## II. Scope and Methodology")
  p()
  p("### A. Defined terms")
  p()
  p("The following terms carry the meanings assigned here throughout this report.")
  p()
  p('- **Search Performance.** The realized outcome of the property in organic search, measured from Google Search Console and Google Analytics 4: rankings, impressions, clicks, click-through rate, organic sessions, engagement, and conversions.')
  p('- **Technical Site Crawl.** The condition of the property as retrieved by an automated crawler: availability, indexation controls, on-page structure, structured data, and response characteristics.')
  p('- **Answer and Generative Engine Optimization.** The readiness of the property to be found, trusted, extracted, and attributed by AI answer engines and generative search features. Abbreviated AEO and GEO respectively and assessed together.')
  p('- **Finding.** A graded statement of fact about the property, supported by measured evidence and paired with a remedy.')
  p('- **Severity.** The class assigned to a finding, governing its point deduction and its position in the remediation schedule.')
  p()
  p("### B. Weighting model")
  p()
  p("The master score is a weighted mean of the three prong scores. The weights, and the reason each is set where it is, are as follows.")
  p()
  p(`- **Search Performance, weight ${fmtWeight(PRONG_WEIGHTS.search)}.** Rankings and the clicks and conversions they produce are the realized result the discipline exists to create. They are measured against live query data rather than inferred from markup, and they are the truest test of visibility. This prong carries the greatest weight because a property can be technically sound and still rank for nothing; only this prong detects that condition.`)
  p(`- **Technical Site Crawl, weight ${fmtWeight(PRONG_WEIGHTS.crawl)}.** Crawlability, indexation, and on-page structure are the controllable inputs that make ranking possible. They are necessary but not sufficient, and so weigh less than the outcome they enable.`)
  p(`- **Answer and Generative Engine Optimization, weight ${fmtWeight(PRONG_WEIGHTS.ai)}.** Presence in AI answers is a real and growing acquisition channel, but at present a secondary one. It is weighted to carry genuine influence over the master score without permitting a strong posture here to conceal weak search performance.`)
  p()
  p("The three weights sum to 1.00. Section II.C states how each prong converts its evidence into a 0-to-100 subscore.")
  p()
  p("### C. Scoring of each prong")
  p()
  p("**Search Performance** is scored quantitatively. Six measured components are each normalized to a 0-to-100 scale against a stated target and combined by internal weight: average ranking position (0.35), organic click-through rate (0.20), organic share of sessions (0.15), engagement rate (0.10), presence of organic conversions (0.10), and impression volume (0.10). Components without data are excluded and the remaining weights rescaled.")
  p()
  p("**Technical Site Crawl** and **Answer and Generative Engine Optimization** are scored by exception. Each begins at 100 and is reduced by the deduction fixed for every finding's severity class, floored at zero. The deduction schedule is:")
  p()
  p("| Severity | Point deduction |")
  p("| :-- | --: |")
  for (const sev of ["critical", "major", "moderate", "minor"] as Severity[]) {
    p(`| ${SEVERITY_LABEL[sev]} | ${SEVERITY_DEDUCTION[sev]} |`)
  }
  p("| Conforming | 0 |")
  p()
  p("### D. Grade bands")
  p()
  p("| Score | Grade | Condition |")
  p("| :-- | :-- | :-- |")
  p("| 90 to 100 | A | Market leading |")
  p("| 80 to 89 | B | Strong, minor remediation |")
  p("| 70 to 79 | C | Adequate, material gaps |")
  p("| 60 to 69 | D | Deficient, priority remediation |")
  p("| 0 to 59 | F | Failing, remediation required |")
  p()

  // -- III, IV, V. Prong sections -------------------------------------------
  for (const prong of report.prongs) {
    renderProng(prong, p)
  }

  // -- VI. Consolidated schedule of findings --------------------------------
  p("## VI. Consolidated Schedule of Findings")
  p()
  p("All non-conforming findings from every prong, ranked by severity and then by prong weight. This is the controlling schedule for remediation.")
  p()
  const graded = report.prongs
    .flatMap((pr) => pr.findings)
    .filter((f) => f.severity !== "pass")
    .sort(bySeverityThenWeight)
  if (graded.length === 0) {
    p("No non-conforming findings were recorded. The property conforms on every executed check.")
    p()
  } else {
    p("| No. | Severity | Prong | Finding | Remedy |")
    p("| --: | :-- | :-- | :-- | :-- |")
    graded.forEach((f, i) => {
      p(
        `| ${i + 1} | ${SEVERITY_LABEL[f.severity]} | ${PRONG_NUMERAL[f.prong]} | ${escape(f.title)} | ${escape(f.remedy)} |`,
      )
    })
    p()
  }

  // -- VII. Remediation priority --------------------------------------------
  p("## VII. Order of Remediation")
  p()
  p("Work is to proceed in the following order. Critical items are conditions that suppress indexation or ranking outright and are remedied first. Major items impose a ceiling on performance. Moderate and minor items are improvements against that ceiling.")
  p()
  for (const sev of ["critical", "major", "moderate", "minor"] as Severity[]) {
    const group = graded.filter((f) => f.severity === sev)
    if (group.length === 0) continue
    p(`### ${SEVERITY_LABEL[sev]} (${group.length})`)
    p()
    group.forEach((f) => {
      p(`- **${escape(f.title)}** Evidence: ${escape(f.evidence)} Remedy: ${escape(f.remedy)}`)
    })
    p()
  }

  // -- VIII. Limitations -----------------------------------------------------
  p("## VIII. Limitations and Reservations")
  p()
  p("This report is limited in the following respects, each stated so the reader can weigh the conclusions accordingly.")
  p()
  p("1. The search-performance prong reports only what the connected Google Search Console and Analytics properties recorded in the stated window. Data not collected by those properties, and any period outside the window, is outside the scope of this report.")
  p("2. The crawl reflects the property as served at the time of the run. It reads the initial HTML response and response headers and does not execute client-side JavaScript beyond that response; content injected only by later script execution is not counted.")
  p("3. The answer-engine probe is a controlled proxy. It measures whether the property's own served content is sufficient to answer representative questions. It does not query live third-party answer engines and does not represent any guarantee of inclusion in their results.")
  p("4. Scores are produced by a fixed instrument stated in Section II. They are comparable across runs of this methodology and are not directly comparable to scores from any other tool or scale.")
  p()

  // -- IX. Certification -----------------------------------------------------
  p("## IX. Certification")
  p()
  p("The findings in this report were generated by direct measurement of the property and the connected data sources named in each prong's provenance. Every finding is supported by the evidence recorded with it. The scoring instrument was applied uniformly and without adjustment for any individual finding.")
  p()
  p(`Issued ${report.runDate} for ${report.site}.`)
  p()

  return s.join("\n")
}

function renderProng(prong: ProngResult, p: (line?: string) => void): void {
  const numeral = PRONG_NUMERAL[prong.prong]
  p(`## ${sectionNumber(prong.prong)}. Prong ${numeral}: ${prong.title}`)
  p()
  if (!prong.available || prong.score === null) {
    p(`**Score: not run.** ${prong.summary}`)
    p()
    if (prong.provenance.length) {
      p("**Provenance.**")
      prong.provenance.forEach((line) => p(`- ${line}`))
      p()
    }
    return
  }
  p(`**Prong score: ${prong.score} out of 100.**`)
  p()
  p(prong.summary)
  p()

  if (prong.metrics.length) {
    p("### Measured data")
    p()
    p("| Metric | Value | Benchmark |")
    p("| :-- | --: | :-- |")
    for (const m of prong.metrics) {
      p(`| ${m.label} | ${fmtMetric(m)} | ${m.benchmark ?? ""} |`)
    }
    p()
  }

  const graded = prong.findings
    .filter((f) => f.severity !== "pass")
    .sort(bySeverityThenWeight)
  const conforming = prong.findings.filter((f) => f.severity === "pass")

  p("### Schedule of findings")
  p()
  if (graded.length === 0) {
    p("No non-conforming findings were recorded for this prong.")
    p()
  } else {
    graded.forEach((f, i) => {
      p(`**${numeral}.${i + 1} ${escape(f.title)}**`)
      p()
      p(`- Severity: ${SEVERITY_LABEL[f.severity]}`)
      p(`- Evidence: ${escape(f.evidence)}`)
      p(`- Remedy: ${escape(f.remedy)}`)
      if (f.affected && f.affected.length) {
        p(`- Instances (up to first ${f.affected.length}):`)
        f.affected.forEach((a) => p(`  - ${escape(a)}`))
      }
      p()
    })
  }

  if (conforming.length) {
    p("### Conforming items")
    p()
    conforming.forEach((f) => p(`- ${escape(f.title)} ${escape(f.evidence)}`))
    p()
  }

  if (prong.provenance.length) {
    p("### Provenance")
    p()
    prong.provenance.forEach((line) => p(`- ${line}`))
    p()
  }
}

function sectionNumber(prong: ProngId): string {
  return prong === "search" ? "III" : prong === "crawl" ? "IV" : "V"
}

function bySeverityThenWeight(a: Finding, b: Finding): number {
  const order: Severity[] = ["critical", "major", "moderate", "minor", "pass"]
  const d = order.indexOf(a.severity) - order.indexOf(b.severity)
  if (d !== 0) return d
  return PRONG_WEIGHTS[b.prong] - PRONG_WEIGHTS[a.prong]
}

function short(prong: ProngResult): string {
  if (prong.score === null) return "Not executed"
  if (prong.score >= 90) return "Conforming"
  if (prong.score >= 70) return "Material gaps"
  if (prong.score >= 60) return "Deficient"
  return "Failing"
}

function overallStatement(report: AuditReport): string {
  const ran = report.prongs.filter((p) => p.score !== null)
  const weakest = [...ran].sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0]
  if (!weakest) {
    return "No prong was executed. The master score reflects the absence of evidence and must not be read as a passing result."
  }
  return `The controlling constraint on the master score is Prong ${PRONG_NUMERAL[weakest.prong]}, ${weakest.title}, at ${weakest.score} out of 100. Remediation should be sequenced against the consolidated schedule in Section VI, beginning with the critical findings.`
}

function consolidatedCounts(report: AuditReport): string {
  const all = report.prongs.flatMap((p) => p.findings).filter((f) => f.severity !== "pass")
  const c = (sev: Severity) => all.filter((f) => f.severity === sev).length
  return `The property carries ${c("critical")} critical, ${c("major")} major, ${c("moderate")} moderate, and ${c("minor")} minor findings across the three prongs, itemized in Section VI.`
}

function fmtWeight(w: number): string {
  return w.toFixed(2)
}
function fmtMetric(m: Metric): string {
  return typeof m.value === "number" ? m.value.toLocaleString() : m.value
}
function escape(text: string): string {
  return text.replace(/\|/g, "\\|")
}
