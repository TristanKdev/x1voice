import { notFound } from "next/navigation"

import { getAllSolutions, getSolutionBySlug } from "@/lib/content/solutions"
import { buildMetadata } from "@/lib/seo/metadata"
import { SolutionPageTemplate } from "@/components/templates/solution-page-template"

// A slug outside generateStaticParams() cannot render, real 404, not the
// old site's SPA fallback.
export const dynamicParams = false

export function generateStaticParams() {
  return getAllSolutions().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  if (!solution) return {}
  return buildMetadata({
    title: `X1 Voice for ${solution.restaurantType}`,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  })
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  if (!solution) notFound()
  return <SolutionPageTemplate solution={solution} />
}
