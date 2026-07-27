import type { Finding, Metric, ProngResult } from "../../types.js"
import { clamp } from "../../scoring/weights.js"
import type { Ga4Summary } from "./ga4.js"
import type { GscSummary } from "./gsc.js"

// Grade the search-performance prong. Unlike the crawl and AI prongs, this one
// grades quantitatively: it converts measured outcomes into a composite
// subscore rather than deducting for defects. The composite and its internal
// weights are documented in docs/METHODOLOGY.md. In short, realized rankings
// and click-through carry the most weight because they are the outcome the
// entire discipline exists to produce.
//
// Internal weighting of the search subscore:
//   Average ranking position ....... 0.35
//   Organic click-through rate ..... 0.20
//   Organic share of sessions ...... 0.15
//   Engagement rate ................ 0.10
//   Organic conversions present .... 0.10
//   Visibility (impressions) ....... 0.10
//
// Calibration targets are set for a business-services marketing site. They are
// stated with each component so the grade is reproducible and contestable.

const SUB_WEIGHTS = {
  position: 0.35,
  ctr: 0.2,
  share: 0.15,
  engagement: 0.1,
  conversions: 0.1,
  visibility: 0.1,
}

export function analyzeSearch(gsc: GscSummary, ga4: Ga4Summary): ProngResult {
  const available = gsc.available || ga4.available
  const findings: Finding[] = []
  const metrics: Metric[] = []
  const provenance: string[] = []

  if (!available) {
    return {
      prong: "search",
      title: "Search Performance",
      available: false,
      score: null,
      summary:
        "The search-performance prong did not run. Neither Search Console nor Analytics credentials were supplied, so no query, ranking, or session data was retrieved. This prong is excluded from the master score and its weight is redistributed to the prongs that ran.",
      metrics: [],
      findings: [],
      provenance: [
        gsc.error ? `Search Console: ${gsc.error}` : "Search Console: not run.",
        ga4.error ? `Analytics: ${ga4.error}` : "Analytics: not run.",
      ],
    }
  }

  // -- Component scores ------------------------------------------------------
  const components: Record<keyof typeof SUB_WEIGHTS, number> = {
    position: 0,
    ctr: 0,
    share: 0,
    engagement: 0,
    conversions: 0,
    visibility: 0,
  }

  // Rankings. Position 1 scores 100; each position below 1 removes 5 points;
  // position 21 and worse scores 0. Graded only when GSC ran.
  if (gsc.available) {
    const pos = gsc.totals.position || 21
    components.position = clamp(100 - (pos - 1) * 5, 0, 100)
    metrics.push({
      label: "Average ranking position",
      value: round1(pos),
      benchmark: "≤ 10 (first page)",
    })
    if (pos > 20) {
      findings.push(f("search.position.deep", "critical",
        "Average ranking position is beyond the second page.",
        `Weighted average position is ${round1(pos)} across ${gsc.totals.impressions.toLocaleString()} impressions.`,
        "Prioritize on-page relevance and internal linking for the striking-distance queries listed below; second-page rankings capture almost no clicks."))
    } else if (pos > 10) {
      findings.push(f("search.position.page2", "major",
        "Average ranking position sits on the second page.",
        `Weighted average position is ${round1(pos)}.`,
        "Move striking-distance queries onto the first page through content depth and links; the click curve is steep between positions 11 and 8."))
    }

    // Click-through rate. 5% and above scores 100, scaled linearly to 0 at 0%.
    const ctr = gsc.totals.ctr
    components.ctr = clamp((ctr / 0.05) * 100, 0, 100)
    metrics.push({
      label: "Organic click-through rate",
      value: pct(ctr),
      benchmark: "≥ 5%",
    })
    if (ctr < 0.02 && gsc.totals.impressions > 500) {
      findings.push(f("search.ctr.low", "major",
        "Organic click-through rate is below expectation for the ranking positions held.",
        `Site-wide organic CTR is ${pct(ctr)} against ${gsc.totals.impressions.toLocaleString()} impressions.`,
        "Rewrite title tags and meta descriptions on the highest-impression pages to earn the click the ranking already qualifies for."))
    }

    // Visibility. Impressions volume, scored on a log curve; 50k+ scores 100.
    const imp = gsc.totals.impressions
    components.visibility = clamp((Math.log10(imp + 1) / Math.log10(50000)) * 100, 0, 100)
    metrics.push({ label: "Total impressions", value: imp.toLocaleString() })
    metrics.push({ label: "Total clicks", value: gsc.totals.clicks.toLocaleString() })

    if (gsc.strikingDistance.length) {
      findings.push(f("search.opportunity.striking", "moderate",
        "Queries are ranking in striking distance of the first page.",
        `${gsc.strikingDistance.length} quer(ies) rank between positions 5 and 20 with meaningful impressions.`,
        "These are the fastest available gains. Strengthen the ranking page for each and add internal links from related content.",
        gsc.strikingDistance.slice(0, 15).map((r) => `${r.key} (pos ${round1(r.position)}, ${r.impressions} impr)`)))
    }

    provenance.push(
      `Search Console: ${gsc.windowDays}-day window, ${gsc.topQueries.length} queries and ${gsc.topPages.length} pages retrieved, dataState=final.`,
    )
  } else {
    // GSC absent: neutralize its components so the composite is not penalized
    // for missing data. Re-weight onto the GA4 components below.
    provenance.push(`Search Console: ${gsc.error ?? "not run"}. Ranking and query metrics unavailable; subscore reflects Analytics signals only.`)
  }

  // Analytics signals.
  if (ga4.available) {
    components.share = clamp((ga4.organicShare / 0.4) * 100, 0, 100)
    components.engagement = clamp((ga4.engagementRate / 0.6) * 100, 0, 100)
    components.conversions = ga4.organicConversions > 0 ? 100 : 0

    metrics.push({ label: "Organic sessions", value: ga4.organicSessions.toLocaleString() })
    metrics.push({
      label: "Organic share of sessions",
      value: pct(ga4.organicShare),
      benchmark: "≥ 40%",
    })
    metrics.push({
      label: "Engagement rate",
      value: pct(ga4.engagementRate),
      benchmark: "≥ 60%",
    })
    metrics.push({ label: "Organic conversions", value: ga4.organicConversions.toLocaleString() })

    if (ga4.organicShare < 0.2 && ga4.totalSessions > 100) {
      findings.push(f("search.channel.thin", "major",
        "Organic search contributes a small share of total traffic.",
        `Organic search is ${pct(ga4.organicShare)} of ${ga4.totalSessions.toLocaleString()} sessions.`,
        "The site depends on other channels. Treat organic as an underbuilt asset and invest in the content and ranking gaps this audit identifies."))
    }
    if (ga4.organicConversions === 0 && ga4.organicSessions > 50) {
      findings.push(f("search.convert.none", "major",
        "Organic sessions are not converting.",
        `${ga4.organicSessions.toLocaleString()} organic sessions produced zero recorded conversions.`,
        "Confirm conversion events are configured, then audit the organic landing pages for intent match and call-to-action clarity."))
    }
    provenance.push(`Analytics: ${ga4.windowDays}-day window, channel and landing-page breakdown retrieved.`)
  } else {
    provenance.push(`Analytics: ${ga4.error ?? "not run"}. Session, engagement, and conversion metrics unavailable.`)
  }

  // -- Compose the subscore over the components that have data ---------------
  const active = (Object.keys(SUB_WEIGHTS) as (keyof typeof SUB_WEIGHTS)[]).filter(
    (k) => (gsc.available && ["position", "ctr", "visibility"].includes(k)) ||
      (ga4.available && ["share", "engagement", "conversions"].includes(k)),
  )
  const activeWeight = active.reduce((s, k) => s + SUB_WEIGHTS[k], 0)
  const score = activeWeight
    ? Math.round(active.reduce((s, k) => s + components[k] * (SUB_WEIGHTS[k] / activeWeight), 0))
    : null

  return {
    prong: "search",
    title: "Search Performance",
    available: true,
    score,
    summary: summarize(score, gsc, ga4),
    metrics,
    findings,
    provenance,
  }
}

function summarize(score: number | null, gsc: GscSummary, ga4: Ga4Summary): string {
  if (score === null) return "Insufficient data to grade search performance."
  const parts: string[] = []
  if (gsc.available) {
    parts.push(
      `The property averages position ${round1(gsc.totals.position)} across ${gsc.totals.impressions.toLocaleString()} impressions, converting to ${gsc.totals.clicks.toLocaleString()} organic clicks at a ${pct(gsc.totals.ctr)} click-through rate.`,
    )
  }
  if (ga4.available) {
    parts.push(
      `Organic search accounts for ${pct(ga4.organicShare)} of measured sessions and ${ga4.organicConversions.toLocaleString()} conversions in the window.`,
    )
  }
  const verdict =
    score >= 80
      ? "Realized search performance is strong."
      : score >= 60
        ? "Realized search performance is moderate, with defined room to grow."
        : "Realized search performance is weak and is the primary constraint on the master score."
  return `${verdict} ${parts.join(" ")}`
}

function f(
  id: string,
  severity: Finding["severity"],
  title: string,
  evidence: string,
  remedy: string,
  affected?: string[],
): Finding {
  return { id, prong: "search", severity, title, evidence, remedy, affected }
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}
function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`
}
