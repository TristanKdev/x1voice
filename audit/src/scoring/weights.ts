import type { Finding, Grade, ProngId, Severity } from "../types.js"

// -----------------------------------------------------------------------------
// The weighting model.
//
// The master score is a weighted mean of three prong subscores. The weights
// are fixed here, in one place, so that every run is graded on the same
// instrument. The rationale for each weight is stated in docs/METHODOLOGY.md
// and is summarized in the report itself. The short form:
//
//   Search performance (0.50). Rankings, impressions, clicks, and conversions
//   are the realized outcome of search visibility. They are measured against
//   live query data, not inferred from page markup, so they carry the most
//   weight. A site can be technically immaculate and rank for nothing; this
//   prong is what detects that.
//
//   Technical crawl (0.30). Crawlability, indexability, and on-page structure
//   are the controllable inputs that make ranking possible. They are necessary
//   but not sufficient, which is why they weigh less than the outcome they
//   enable.
//
//   Answer and generative engine readiness (0.20). Presence in AI Overviews
//   and answer engines is a growing but still secondary channel. It is
//   weighted to matter without allowing a strong AEO posture to mask weak
//   search performance.
//
// The three weights sum to 1.00. If a prong cannot run, its weight is
// redistributed proportionally across the prongs that did, so the master score
// always reflects one hundred percent of the evidence actually collected.
// -----------------------------------------------------------------------------

export const PRONG_WEIGHTS: Record<ProngId, number> = {
  search: 0.5,
  crawl: 0.3,
  ai: 0.2,
}

/**
 * Point deductions per finding, applied against a 100-point base inside the
 * prongs that grade by exception (crawl and ai). One finding of a given class
 * removes this many points; deductions accumulate and the subscore floors at
 * zero. The search prong does not use this table; it grades quantitatively
 * from measured performance, see prongs/search/analyze.ts.
 */
export const SEVERITY_DEDUCTION: Record<Severity, number> = {
  critical: 25,
  major: 12,
  moderate: 6,
  minor: 2,
  pass: 0,
}

/**
 * Reduce a base of 100 by the accumulated severity deductions of a finding
 * set. Used by prongs that grade by exception.
 */
export function scoreFromFindings(findings: Finding[]): number {
  const deduction = findings.reduce(
    (sum, f) => sum + SEVERITY_DEDUCTION[f.severity],
    0,
  )
  return clamp(100 - deduction, 0, 100)
}

/**
 * Grade bands. Chosen so that a passing grade requires competence on every
 * prong, not an average that hides one failing area. The bands are stated in
 * the report legend.
 */
export function gradeFor(score: number): Grade {
  if (score >= 90) return { letter: "A", band: "Market leading" }
  if (score >= 80) return { letter: "B", band: "Strong, minor remediation" }
  if (score >= 70) return { letter: "C", band: "Adequate, material gaps" }
  if (score >= 60) return { letter: "D", band: "Deficient, priority remediation" }
  return { letter: "F", band: "Failing, remediation required" }
}

export function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}
