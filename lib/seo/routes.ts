import { getAllSolutions } from "@/lib/content/solutions"
import { getAllComparePages } from "@/lib/content/compare"
import { getAllIntegrations } from "@/lib/content/integrations"
import { getAllLocations } from "@/lib/content/locations"
import { getAllBlogPosts } from "@/lib/content/blog"

export type SiteRoute = {
  path: string
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
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/pricing",
    title: "Pricing",
    description: "X1 Voice pricing tiers.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/features",
    title: "Features",
    description: "What X1 Voice does.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/about",
    title: "About",
    description: "About X1 Voice.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/contact",
    title: "Contact",
    description: "Get in touch with X1 Voice.",
    index: true,
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    path: "/solutions",
    title: "Solutions by Restaurant Type",
    description: "X1 Voice for every kind of restaurant.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/compare",
    title: "Compare X1 Voice",
    description: "How X1 Voice compares to alternatives.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/integrations",
    title: "Integrations",
    description: "POS and platform integrations.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/locations",
    title: "Locations We Serve",
    description: "Restaurants using X1 Voice across the US.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/blog",
    title: "Blog",
    description: "Articles on AI phone ordering for restaurants.",
    index: true,
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "X1 Voice privacy policy.",
    index: true,
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "X1 Voice terms of service.",
    index: true,
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/languages",
    title: "Languages",
    description: "Languages X1 Voice answers restaurant calls in.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/support",
    title: "Support",
    description: "Get help with X1 Voice.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: "/support/integrations",
    title: "Integration setup & support docs",
    description: "How X1 Voice connects to your POS, setup, and troubleshooting.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/resellers",
    title: "Resellers, ISOs & Partners",
    description: "Sell X1 Voice to your restaurants.",
    index: true,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/request-feature",
    title: "Request a Feature",
    description: "Tell the X1 Voice team what to build next.",
    index: true,
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
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const compareRoutes: SiteRoute[] = getAllComparePages().map((c) => ({
    path: `/compare/${c.slug}`,
    title: `X1 Voice vs ${c.competitorName}`,
    description: c.metaDescription,
    index: true,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: c.lastReviewedAt,
  }))

  const integrationRoutes: SiteRoute[] = getAllIntegrations().map((i) => ({
    path: `/integrations/${i.slug}`,
    title: `${i.partnerName} Integration`,
    description: i.metaDescription,
    index: true,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const locationRoutes: SiteRoute[] = getAllLocations().map((l) => ({
    path: `/locations/${l.slug}`,
    title: `X1 Voice in ${l.city}, ${l.stateAbbr}`,
    description: l.metaDescription,
    index: true,
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: l.updatedAt,
  }))

  const blogRoutes: SiteRoute[] = getAllBlogPosts().map((p) => ({
    path: `/blog/${p.slug}`,
    title: p.title,
    description: p.description,
    index: true,
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: p.updatedAt ?? p.publishedAt,
  }))

  return [
    ...STATIC_ROUTES,
    ...solutionRoutes,
    ...compareRoutes,
    ...integrationRoutes,
    ...locationRoutes,
    ...blogRoutes,
  ]
}
