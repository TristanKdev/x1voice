import { google } from "googleapis"
import type { AuditConfig } from "../../config.js"

// Google Analytics 4 pull. Authenticates with the service account named in
// GOOGLE_APPLICATION_CREDENTIALS and reads the organic-search slice of traffic
// for the reporting window. GA4 measures what happened after a visitor
// arrived: sessions, engagement, and conversions. It does not report query
// rankings; that is Search Console's role (see gsc.ts). The two are read
// together and reconciled in analyze.ts.

export interface Ga4Summary {
  available: boolean
  windowDays: number
  organicSessions: number
  totalSessions: number
  organicShare: number
  engagementRate: number
  organicConversions: number
  topLandingPages: { page: string; sessions: number; conversions: number }[]
  error?: string
}

const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"

export async function pullGa4(config: AuditConfig): Promise<Ga4Summary> {
  const empty: Ga4Summary = {
    available: false,
    windowDays: config.search.windowDays,
    organicSessions: 0,
    totalSessions: 0,
    organicShare: 0,
    engagementRate: 0,
    organicConversions: 0,
    topLandingPages: [],
  }

  if (!config.search.ga4PropertyId) {
    return { ...empty, error: "GA4_PROPERTY_ID not set." }
  }

  try {
    const auth = new google.auth.GoogleAuth({ scopes: [GA4_SCOPE] })
    const client = google.analyticsdata({ version: "v1beta", auth })
    const property = `properties/${config.search.ga4PropertyId}`
    const dateRanges = [
      { startDate: `${config.search.windowDays}daysAgo`, endDate: "today" },
    ]

    // Channel breakdown: sessions and conversions by default channel group.
    const channel = await client.properties.runReport({
      property,
      requestBody: {
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [
          { name: "sessions" },
          { name: "engagementRate" },
          { name: "conversions" },
        ],
      },
    })

    let totalSessions = 0
    let organicSessions = 0
    let organicConversions = 0
    let weightedEngagement = 0
    for (const row of channel.data.rows ?? []) {
      const group = row.dimensionValues?.[0]?.value ?? ""
      const sessions = num(row.metricValues?.[0]?.value)
      const engagement = num(row.metricValues?.[1]?.value)
      const conversions = num(row.metricValues?.[2]?.value)
      totalSessions += sessions
      weightedEngagement += engagement * sessions
      if (/organic search/i.test(group)) {
        organicSessions += sessions
        organicConversions += conversions
      }
    }

    // Top organic landing pages.
    const landing = await client.properties.runReport({
      property,
      requestBody: {
        dateRanges,
        dimensions: [{ name: "landingPagePlusQueryString" }],
        metrics: [{ name: "sessions" }, { name: "conversions" }],
        dimensionFilter: {
          filter: {
            fieldName: "sessionDefaultChannelGroup",
            stringFilter: { value: "Organic Search", matchType: "EXACT" },
          },
        },
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: "25",
      },
    })

    const topLandingPages = (landing.data.rows ?? []).map((row) => ({
      page: row.dimensionValues?.[0]?.value ?? "",
      sessions: num(row.metricValues?.[0]?.value),
      conversions: num(row.metricValues?.[1]?.value),
    }))

    return {
      available: true,
      windowDays: config.search.windowDays,
      organicSessions,
      totalSessions,
      organicShare: totalSessions ? organicSessions / totalSessions : 0,
      engagementRate: totalSessions ? weightedEngagement / totalSessions : 0,
      organicConversions,
      topLandingPages,
    }
  } catch (err) {
    return { ...empty, error: err instanceof Error ? err.message : String(err) }
  }
}

function num(v: string | null | undefined): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}
