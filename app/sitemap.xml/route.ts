import { SITE_SECTIONS, sectionLastModified } from "@/lib/seo/routes"
import { buildSitemapIndex, xmlResponse } from "@/lib/seo/sitemap-xml"

export const dynamic = "force-static"

/**
 * /sitemap.xml is the INDEX, not a urlset. The per-section files it points at
 * live under /sitemaps/<section>.xml. Both sides read SITE_SECTIONS, so a new
 * section can't be listed here without also being servable.
 */
export function GET() {
  return xmlResponse(
    buildSitemapIndex(
      SITE_SECTIONS.map((section) => ({
        path: `/sitemaps/${section}.xml`,
        lastModified: sectionLastModified(section),
      }))
    )
  )
}
