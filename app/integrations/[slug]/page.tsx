import { notFound } from "next/navigation"

import { getAllIntegrations, getIntegrationBySlug } from "@/lib/content/integrations"
import { buildMetadata } from "@/lib/seo/metadata"
import { IntegrationPageTemplate } from "@/components/templates/integration-page-template"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllIntegrations().map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const integration = getIntegrationBySlug(slug)
  if (!integration) return {}
  return buildMetadata({
    title: `${integration.partnerName} Integration`,
    description: integration.metaDescription,
    path: `/integrations/${integration.slug}`,
  })
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const integration = getIntegrationBySlug(slug)
  if (!integration) notFound()
  return <IntegrationPageTemplate integration={integration} />
}
