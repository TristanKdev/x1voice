import { getAllSolutions } from "@/lib/content/solutions"
import { PAGES_REVIEWED_AT } from "@/data/site"
import { SOLUTIONS_REVIEWED_AT } from "@/data/solutions"
import { INTEGRATIONS_REVIEWED_AT } from "@/data/integrations"
import { getAllComparePages } from "@/lib/content/compare"
import { getAllIntegrations } from "@/lib/content/integrations"
import { getAllLocations } from "@/lib/content/locations"
import { getAllBlogPosts } from "@/lib/content/blog"
import { ALL_SECTIONS, postsInSection } from "@/lib/content/blog-sections"

/**
 * Sitemap sections. Each one is served as its own XML file under
 * /sitemaps/<section>.xml and listed in the /sitemap.xml index, which is what
 * lets Search Console report indexing coverage per content type instead of
 * one undifferentiated blob.
 */
export const SITE_SECTIONS = [
  "pages",
  "blog",
  "solutions",
  "compare",
  "integrations",
  "locations",
] as const

export type SiteSection = (typeof SITE_SECTIONS)[number]

export type SiteRoute = {
  path: string
  section: SiteSection
  title: string
  description: string
  index: boolean
  lastModified?: string
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"
  priority?: number
}

const STATIC_ROUTES: SiteRoute[] = [
  {
    path: "/",
    title: "X1 Voice — AI Phone Agent for Restaurants",
    description:
      "Answers every call, takes every order, syncs to your POS.",
    index: true,
    section: "pages",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/pricing",
    title: "Pricing",
    description: "X1 Voice pricing tiers.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/features",
    title: "Features",
    description: "What X1 Voice does.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/about",
    title: "About",
    description: "About X1 Voice.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/contact",
    title: "Contact",
    description: "Get in touch with X1 Voice.",
    index: true,
    section: "pages",
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    path: "/solutions",
    title: "Solutions by Restaurant Type",
    description: "X1 Voice for every kind of restaurant.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/compare",
    title: "Compare X1 Voice",
    description: "How X1 Voice compares to alternatives.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/integrations",
    title: "Integrations",
    description: "POS and platform integrations.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/locations",
    title: "Locations We Serve",
    description: "Restaurants using X1 Voice across the US.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/blog",
    title: "Blog",
    description: "Articles on AI phone ordering for restaurants.",
    index: true,
    section: "pages",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "X1 Voice privacy policy.",
    index: true,
    section: "pages",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "X1 Voice terms of service.",
    index: true,
    section: "pages",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/languages",
    title: "Languages",
    description: "Languages X1 Voice answers restaurant calls in.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/support",
    title: "Support",
    description: "Get help with X1 Voice.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: "/support/integrations",
    title: "Integration setup & support docs",
    description: "How X1 Voice connects to your POS, setup, and troubleshooting.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/resellers",
    title: "Resellers, ISOs & Partners",
    description: "Sell X1 Voice to your restaurants.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/partners",
    title: "Partner with X1 Voice",
    description: "Why partner with X1 Voice, and the ways to work together.",
    index: true,
    section: "pages",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/investors",
    title: "Investors",
    description: "Private equity and venture capital inquiries for X1 Voice.",
    index: true,
    section: "pages",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/request-feature",
    title: "Request a Feature",
    description: "Tell the X1 Voice team what to build next.",
    index: true,
    section: "pages",
    changeFrequency: "yearly",
    priority: 0.3,
  },
]

/**
 * The single place every route is enumerated. app/sitemap.ts and
 * app/llms.txt/route.ts both read from this — and every dynamic
 * `[slug]/page.tsx` sets `dynamicParams = false` with `generateStaticParams`
 * pulling from the same content getters used below — so the sitemap and the
 * actually-servable route set are provably the same set.
 */

export function getAllRoutes(): SiteRoute[] {
  const solutionRoutes: SiteRoute[] = getAllSolutions().map((s) => ({
    path: `/solutions/${s.slug}`,
    title: `X1 Voice for ${s.restaurantType}`,
    description: s.metaDescription,
    index: true,
    section: "solutions",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: SOLUTIONS_REVIEWED_AT,
  }))

  const compareRoutes: SiteRoute[] = getAllComparePages().map((c) => ({
    path: `/compare/${c.slug}`,
    title: `X1 Voice vs ${c.competitorName}`,
    description: c.metaDescription,
    index: true,
    section: "compare",
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: c.lastReviewedAt,
  }))

  const integrationRoutes: SiteRoute[] = getAllIntegrations().map((i) => ({
    path: `/integrations/${i.slug}`,
    title: `${i.partnerName} Integration`,
    description: i.metaDescription,
    index: true,
    section: "integrations",
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: INTEGRATIONS_REVIEWED_AT,
  }))

  const locationRoutes: SiteRoute[] = getAllLocations().map((l) => ({
    path: `/locations/${l.slug}`,
    title: `X1 Voice in ${l.city}, ${l.stateAbbr}`,
    description: l.metaDescription,
    index: true,
    section: "locations",
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: l.updatedAt,
  }))

  const posts = getAllBlogPosts()

  // Topic hubs live in the blog sitemap next to the posts they collect, so a
  // crawler sees the cluster and its index in one file.
  const topicRoutes: SiteRoute[] = ALL_SECTIONS.filter(
    (s) => postsInSection(posts, s.id).length > 0
  ).map((s) => ({
    path: `/blog/topics/${s.id}`,
    title: s.section,
    description: s.blurb,
    index: true,
    section: "blog",
    changeFrequency: "weekly",
    priority: 0.6,
    lastModified: postsInSection(posts, s.id)[0]?.updatedAt ??
      postsInSection(posts, s.id)[0]?.publishedAt,
  }))

  const blogRoutes: SiteRoute[] = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: p.title,
    description: p.description,
    index: true,
    section: "blog",
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: p.updatedAt ?? p.publishedAt,
  }))

  const staticRoutes: SiteRoute[] = STATIC_ROUTES.map((r) => ({
    ...r,
    lastModified: r.lastModified ?? PAGES_REVIEWED_AT,
  }))

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...compareRoutes,
    ...integrationRoutes,
    ...locationRoutes,
    ...topicRoutes,
    ...blogRoutes,
  ]
}

/** Every indexable route in one sitemap section, in stable order. */
export function getRoutesBySection(section: SiteSection): SiteRoute[] {
  return getAllRoutes().filter((r) => r.index && r.section === section)
}

/**
 * The most recent lastmod inside a section — this is the `<lastmod>` the
 * sitemap index reports for that section's file.
 */
export function sectionLastModified(section: SiteSection): string | undefined {
  // Compare on the date part only: entries mix "YYYY-MM-DD" with full ISO
  // datetimes, and a lexicographic sort over both is not a date comparison.
  const dates = getRoutesBySection(section)
    .map((r) => r.lastModified)
    .filter((d): d is string => Boolean(d))
    .sort((a, b) => (a.slice(0, 10) < b.slice(0, 10) ? -1 : 1))
  return dates.at(-1)
}
