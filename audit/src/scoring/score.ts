import type { AuditReport, ProngId, ProngResult } from "../types.js"
import { PRONG_WEIGHTS, clamp, gradeFor } from "./weights.js"

// Combine the three prong subscores into the master score. This is the only
// place weighting and redistribution happen. Two rules govern it:
//
//   1. A prong that did not run (score === null) is excluded and its weight is
//      redistributed across the prongs that did, in proportion to their base
//      weights. The report prints the effective weights actually used.
//   2. If no prong ran, the master score is zero and the report says so; a
//      missing audit is not a passing audit.

export interface ScoreInput {
  site: string
  runDate: string
  window: string
  prongs: ProngResult[]
}

export function reduceToReport(input: ScoreInput): AuditReport {
  const ran = input.prongs.filter((p) => p.available && p.score !== null)
  const baseWeightSum = ran.reduce((s, p) => s + PRONG_WEIGHTS[p.prong], 0)

  const effectiveWeights: Record<ProngId, number> = {
    search: 0,
    crawl: 0,
    ai: 0,
  }

  let master = 0
  if (baseWeightSum > 0) {
    for (const p of ran) {
      const w = PRONG_WEIGHTS[p.prong] / baseWeightSum
      effectiveWeights[p.prong] = round2(w)
      master += (p.score as number) * w
    }
  }

  const masterScore = Math.round(clamp(master, 0, 100))

  return {
    site: input.site,
    runDate: input.runDate,
    window: input.window,
    masterScore,
    masterGrade: gradeFor(masterScore),
    effectiveWeights,
    prongs: input.prongs,
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
