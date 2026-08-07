import type { MetadataRoute } from "next"

import { SITE_URL } from "@/data/site"
import { SITE_SECTIONS } from "@/lib/seo/routes"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/login", "/register"],
      },
      // Explicitly allow major AI/answer-engine crawlers — same posture the
      // audit found on the old site, carried forward deliberately for GEO.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    // The index first, then every section file explicitly. Listing the
    // sections as well as the index is redundant for Google (it follows the
    // index) but not for every crawler — several read only the top-level
    // Sitemap: lines and never expand a sitemapindex.
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      ...SITE_SECTIONS.map((s) => `${SITE_URL}/sitemaps/${s}.xml`),
    ],
  }
}
