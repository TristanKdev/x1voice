import { notFound } from "next/navigation"

import { getAllLocations, getLocationBySlug } from "@/lib/content/locations"
import { buildMetadata } from "@/lib/seo/metadata"
import { LocationPageTemplate } from "@/components/templates/location-page-template"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllLocations().map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return {}
  return buildMetadata({
    title: `X1 Voice in ${location.city}, ${location.stateAbbr}`,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  })
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) notFound()
  return <LocationPageTemplate location={location} />
}
