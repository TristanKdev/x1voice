import { SITE_URL } from "@/data/site"
import type { SiteRoute } from "@/lib/seo/routes"

/**
 * Hand-rolled XML rather than Next's `MetadataRoute.Sitemap` convention,
 * because the convention can only produce ONE urlset per route segment and
 * has no way to emit a sitemap *index*. The index is the point: it lets
 * Search Console attribute indexing coverage per section, and it keeps each
 * file small enough to fetch and diff by hand.
 */

const XML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => XML_ESCAPES[c])
}

/** Sitemap dates must be W3C datetime. Accepts "YYYY-MM-DD" or an ISO string. */
function toW3CDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toISOString().replace(/\.\d{3}Z$/, "+00:00")
}

export type UrlEntry = {
  path: string
  lastModified?: string
  changeFrequency?: SiteRoute["changeFrequency"]
  priority?: number
  /** Absolute or site-relative image URLs, emitted as image:image nodes. */
  images?: string[]
}

export function routeToUrlEntry(route: SiteRoute): UrlEntry {
  return {
    path: route.path,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }
}

function absolute(url: string): string {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`
}

export function buildUrlSet(entries: UrlEntry[]): string {
  const hasImages = entries.some((e) => e.images?.length)
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    hasImages
      ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
      : '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]

  for (const entry of entries) {
    lines.push("  <url>")
    lines.push(`    <loc>${escapeXml(absolute(entry.path))}</loc>`)
    if (entry.lastModified) {
      lines.push(`    <lastmod>${escapeXml(toW3CDate(entry.lastModified))}</lastmod>`)
    }
    if (entry.changeFrequency) {
      lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`)
    }
    if (entry.priority !== undefined) {
      lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
    }
    for (const image of entry.images ?? []) {
      lines.push("    <image:image>")
      lines.push(`      <image:loc>${escapeXml(absolute(image))}</image:loc>`)
      lines.push("    </image:image>")
    }
    lines.push("  </url>")
  }

  lines.push("</urlset>")
  return lines.join("\n") + "\n"
}

export function buildSitemapIndex(
  sitemaps: { path: string; lastModified?: string }[]
): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]
  for (const sitemap of sitemaps) {
    lines.push("  <sitemap>")
    lines.push(`    <loc>${escapeXml(absolute(sitemap.path))}</loc>`)
    if (sitemap.lastModified) {
      lines.push(
        `    <lastmod>${escapeXml(toW3CDate(sitemap.lastModified))}</lastmod>`
      )
    }
    lines.push("  </sitemap>")
  }
  lines.push("</sitemapindex>")
  return lines.join("\n") + "\n"
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
