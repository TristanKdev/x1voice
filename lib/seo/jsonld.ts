import type {
  Organization,
  WebSite,
  BreadcrumbList,
  FAQPage,
  Article,
  Service,
  WithContext,
} from "schema-dts"
import { ORG, SITE_NAME, SITE_URL } from "@/data/site"

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Emitted exactly once, in app/layout.tsx, and nowhere else. Every other
 * builder below references ORG_ID rather than re-declaring an Organization
 * node — this is the fix for the old site's duplicate-@id JSON-LD bug.
 */
export function buildOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: ORG.url,
    logo: ORG.logo,
    ...(ORG.sameAs.length ? { sameAs: ORG.sameAs } : {}),
  }
}

export function buildWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
  }
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function buildFaqJsonLd(
  faqs: { question: string; answer: string }[]
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  }
}

export function buildArticleJsonLd(article: {
  headline: string
  description: string
  path: string
  publishedAt: string
  updatedAt?: string
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    url: `${SITE_URL}${article.path}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  }
}

export function buildServiceJsonLd(service: {
  name: string
  description: string
  path: string
  areaServed?: string
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.path}`,
    provider: { "@id": ORG_ID },
    ...(service.areaServed ? { areaServed: service.areaServed } : {}),
  }
}
