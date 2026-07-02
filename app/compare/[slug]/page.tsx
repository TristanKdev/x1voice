import { notFound } from "next/navigation"

import { getAllComparePages, getComparePageBySlug } from "@/lib/content/compare"
import { buildMetadata } from "@/lib/seo/metadata"
import { ComparePageTemplate } from "@/components/templates/compare-page-template"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllComparePages().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const compare = getComparePageBySlug(slug)
  if (!compare) return {}
  return buildMetadata({
    title: `X1 Voice vs ${compare.competitorName}`,
    description: compare.metaDescription,
    path: `/compare/${compare.slug}`,
  })
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const compare = getComparePageBySlug(slug)
  if (!compare) notFound()
  return <ComparePageTemplate compare={compare} />
}
