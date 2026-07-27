import { z } from "zod"

// Runtime configuration, read once from the environment. Every value has a
// documented default so the engine runs (in a reduced mode) even with an empty
// .env — the search prong simply reports itself unavailable rather than
// crashing. Nothing here is secret; secrets are read by the Google and
// Anthropic clients from their own environment variables at the point of use.

const Env = z.object({
  AUDIT_SITE_URL: z.string().url().default("https://x1voice.com"),

  GA4_PROPERTY_ID: z.string().default(""),
  GSC_SITE_URL: z.string().default(""),
  SEARCH_WINDOW_DAYS: z.coerce.number().int().positive().default(90),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().default(""),

  ANTHROPIC_API_KEY: z.string().default(""),
  AEO_MODEL: z.string().default("claude-opus-4-8"),

  CRAWL_MAX_PAGES: z.coerce.number().int().positive().default(500),
  CRAWL_CONCURRENCY: z.coerce.number().int().positive().default(5),
  CRAWL_TIMEOUT_MS: z.coerce.number().int().positive().default(20000),
  CRAWL_USER_AGENT: z
    .string()
    .default("x1voice-audit/1.0 (+https://x1voice.com/audit)"),
})

export type AuditConfig = {
  siteUrl: string
  origin: string
  search: {
    ga4PropertyId: string
    gscSiteUrl: string
    windowDays: number
    hasCredentials: boolean
  }
  ai: {
    apiKey: string
    model: string
  }
  crawl: {
    maxPages: number
    concurrency: number
    timeoutMs: number
    userAgent: string
  }
}

export function loadConfig(overrides: Partial<Record<string, string>> = {}): AuditConfig {
  const env = Env.parse({ ...process.env, ...overrides })
  const origin = new URL(env.AUDIT_SITE_URL).origin

  return {
    siteUrl: env.AUDIT_SITE_URL.replace(/\/$/, ""),
    origin,
    search: {
      ga4PropertyId: env.GA4_PROPERTY_ID,
      gscSiteUrl: env.GSC_SITE_URL,
      windowDays: env.SEARCH_WINDOW_DAYS,
      hasCredentials: Boolean(
        env.GOOGLE_APPLICATION_CREDENTIALS &&
          (env.GA4_PROPERTY_ID || env.GSC_SITE_URL),
      ),
    },
    ai: {
      apiKey: env.ANTHROPIC_API_KEY,
      model: env.AEO_MODEL,
    },
    crawl: {
      maxPages: env.CRAWL_MAX_PAGES,
      concurrency: env.CRAWL_CONCURRENCY,
      timeoutMs: env.CRAWL_TIMEOUT_MS,
      userAgent: env.CRAWL_USER_AGENT,
    },
  }
}
