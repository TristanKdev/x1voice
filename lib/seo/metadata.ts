import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/data/site"

export type PageMeta = {
  title: string
  description: string
  /** Exact no-trailing-slash path, e.g. "/pricing" — must match the string used in lib/seo/routes.ts. */
  path: string
  /**
   * Render the title exactly as given, without the layout's
   * ` — X1 Voice` template. Use it wherever the title is already long and
   * self-describing (articles, topic hubs): the suffix costs 11 characters of
   * a ~60-character SERP title and Google renders the site name separately
   * anyway.
   */
  exactTitle?: boolean
  ogImage?: string
  noIndex?: boolean
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`

/**
 * The one metadata builder every route calls. `path` here and the `path`
 * used in lib/seo/routes.ts must be the same literal string — that's what
 * makes the canonical tag provably match the sitemap entry and the actually
 * served (redirect-resolved) URL, fixing the old site's circular
 * canonical/redirect loop.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
  exactTitle,
}: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? DEFAULT_OG_IMAGE

  return {
    title: exactTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
