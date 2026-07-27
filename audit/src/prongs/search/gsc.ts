import { google } from "googleapis"
import type { AuditConfig } from "../../config.js"

// Google Search Console pull. This is the authoritative source for rankings and
// query data: the exact terms the site was shown for, its average position,
// impressions, clicks, and click-through rate. GA4 cannot supply these. The
// service account must be added as a user on the Search Console property.

export interface GscRow {
  key: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface GscSummary {
  available: boolean
  windowDays: number
  totals: { clicks: number; impressions: number; ctr: number; position: number }
  topQueries: GscRow[]
  topPages: GscRow[]
  strikingDistance: GscRow[] // queries ranking 5-20: the fastest gains
  error?: string
}

const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"

export async function pullGsc(config: AuditConfig): Promise<GscSummary> {
  const empty: GscSummary = {
    available: false,
    windowDays: config.search.windowDays,
    totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    topQueries: [],
    topPages: [],
    strikingDistance: [],
  }

  if (!config.search.gscSiteUrl) {
    return { ...empty, error: "GSC_SITE_URL not set." }
  }

  try {
    const auth = new google.auth.GoogleAuth({ scopes: [GSC_SCOPE] })
    const search = google.searchconsole({ version: "v1", auth })
    const siteUrl = config.search.gscSiteUrl
    const { startDate, endDate } = window(config.search.windowDays)

    const query = async (dimension: "query" | "page"): Promise<GscRow[]> => {
      const res = await search.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: [dimension],
          rowLimit: 100,
          dataState: "final",
        },
      })
      return (res.data.rows ?? []).map((r) => ({
        key: r.keys?.[0] ?? "",
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      }))
    }

    const [queries, pages] = await Promise.all([query("query"), query("page")])

    const totals = queries.reduce(
      (acc, r) => {
        acc.clicks += r.clicks
        acc.impressions += r.impressions
        acc.posWeight += r.position * r.impressions
        return acc
      },
      { clicks: 0, impressions: 0, posWeight: 0 },
    )

    const strikingDistance = queries
      .filter((r) => r.position > 4 && r.position <= 20 && r.impressions >= 10)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25)

    return {
      available: true,
      windowDays: config.search.windowDays,
      totals: {
        clicks: totals.clicks,
        impressions: totals.impressions,
        ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
        position: totals.impressions ? totals.posWeight / totals.impressions : 0,
      },
      topQueries: queries.sort((a, b) => b.clicks - a.clicks).slice(0, 25),
      topPages: pages.sort((a, b) => b.clicks - a.clicks).slice(0, 25),
      strikingDistance,
    }
  } catch (err) {
    return { ...empty, error: err instanceof Error ? err.message : String(err) }
  }
}

function window(days: number): { startDate: string; endDate: string } {
  // Search Console data lags roughly three days; end the window there so the
  // trailing days are not counted as zero-traffic.
  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - days)
  return { startDate: iso(start), endDate: iso(end) }
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10)
}
