import type { MetadataRoute } from "next"

import { getAllRoutes } from "@/lib/seo/routes"
import { SITE_URL } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes()
    .filter((r) => r.index)
    .map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: r.lastModified ?? new Date(),
      changeFrequency: r.changeFrequency ?? "monthly",
      priority: r.priority ?? 0.5,
    }))
}
