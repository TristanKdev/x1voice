// Shared vocabulary for the whole engine. Every prong produces the same shape:
// a numeric subscore on a 0-100 scale, a set of measured signals, and a set of
// findings. The scoring engine and the report renderer consume only these
// types, so a prong can change how it collects data without touching either.

/**
 * Severity classes, ordered. Each maps to a fixed point deduction inside a
 * prong's scoring, defined in scoring/weights.ts. The classes are deliberately
 * few so that two auditors grading the same site land on the same score.
 */
export type Severity = "critical" | "major" | "moderate" | "minor" | "pass"

export const SEVERITY_ORDER: Severity[] = [
  "critical",
  "major",
  "moderate",
  "minor",
  "pass",
]

/** The three prongs. Ordered by scoring weight, heaviest first. */
export type ProngId = "search" | "crawl" | "ai"

/**
 * A single graded observation. `evidence` is the literal measured fact that
 * supports the grade; `remedy` is the corrective action. Both are required so
 * that no finding in the report is unsupported and none is left without a
 * disposition.
 */
export interface Finding {
  /** Stable identifier, e.g. "crawl.title.missing". Used for cross-referencing. */
  id: string
  prong: ProngId
  severity: Severity
  /** One-line statement of the condition, written as a finding of fact. */
  title: string
  /** The measured basis for the finding. Numbers, URLs, counts, strings. */
  evidence: string
  /** The corrective instruction. Empty only for `pass` findings. */
  remedy: string
  /** Optional: specific URLs or keys the finding applies to. */
  affected?: string[]
}

/** A named metric surfaced in the report's data tables. */
export interface Metric {
  label: string
  value: string | number
  /** Optional target or benchmark the value is measured against. */
  benchmark?: string | number
  /** Optional short note on interpretation. */
  note?: string
}

/**
 * The output of one prong. `available` is false when the prong could not be
 * run (for example, no Search Console credentials were supplied). An
 * unavailable prong is scored as `null` and excluded from the weighted master
 * score, with its weight redistributed across the prongs that did run. The
 * report states plainly which prongs were and were not executed.
 */
export interface ProngResult {
  prong: ProngId
  title: string
  available: boolean
  /** 0-100. Null when the prong did not run. */
  score: number | null
  /** Human-readable one-paragraph disposition of the prong. */
  summary: string
  metrics: Metric[]
  findings: Finding[]
  /** Free-form notes on data provenance, sample size, and limitations. */
  provenance: string[]
}

/** A letter grade band derived from a 0-100 score. */
export interface Grade {
  letter: string
  band: string
}

/** The fully reduced result of an audit run. */
export interface AuditReport {
  site: string
  /** ISO date the run was executed. */
  runDate: string
  /** Reporting window used by the search prong, stated for the record. */
  window: string
  masterScore: number
  masterGrade: Grade
  /** Effective weights after redistribution for any unavailable prong. */
  effectiveWeights: Record<ProngId, number>
  prongs: ProngResult[]
}
