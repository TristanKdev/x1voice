import type {
  Organization,
  WebSite,
  BreadcrumbList,
  FAQPage,
  CollectionPage,
  Article,
  Service,
  WithContext,
} from "schema-dts"
import { ORG, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site"

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
    alternateName: ORG.alternateName,
    // What the company does, in one sentence a model can quote when asked
    // "what is X1 Voice". Without it the entity is a name with a logo.
    description: SITE_DESCRIPTION,
    url: ORG.url,
    logo: ORG.logo,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: ORG.contactPoint.telephone,
      email: ORG.contactPoint.email,
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
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
  /** Section label from the blog index grouping, e.g. "Compliance & legal". */
  section?: string
  /** Body word count. Assistants use it as a proxy for depth; it costs nothing to state. */
  wordCount?: number
  image?: string
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${article.path}#article`,
    headline: article.headline,
    description: article.description,
    url: `${SITE_URL}${article.path}`,
    mainEntityOfPage: `${SITE_URL}${article.path}`,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(article.section ? { articleSection: article.section } : {}),
    ...(article.wordCount ? { wordCount: article.wordCount } : {}),
    image: article.image ?? `${SITE_URL}/opengraph-image`,
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

/**
 * Topic hub pages. The ItemList is what lets a crawler (and an assistant)
 * see the cluster as a set rather than as one page with many links.
 */
export function buildCollectionPageJsonLd(page: {
  name: string
  description: string
  path: string
  items: { name: string; path: string }[]
}): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${page.path}#collection`,
    name: page.name,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: page.items.length,
      itemListElement: page.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: `${SITE_URL}${item.path}`,
      })),
    },
  }
}
