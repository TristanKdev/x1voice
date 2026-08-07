import { notFound } from "next/navigation"

import {
  SITE_SECTIONS,
  getRoutesBySection,
  type SiteSection,
} from "@/lib/seo/routes"
import { buildUrlSet, routeToUrlEntry, xmlResponse } from "@/lib/seo/sitemap-xml"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return SITE_SECTIONS.map((section) => ({ section: `${section}.xml` }))
}

/**
 * One urlset per content type: /sitemaps/blog.xml, /sitemaps/locations.xml,
 * and so on. `dynamicParams = false` plus the generateStaticParams list above
 * means an unknown section 404s rather than serving an empty sitemap, which
 * would otherwise read to a crawler as "these URLs were removed".
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  const name = section.replace(/\.xml$/, "") as SiteSection
  if (!SITE_SECTIONS.includes(name)) notFound()

  return xmlResponse(buildUrlSet(getRoutesBySection(name).map(routeToUrlEntry)))
}
