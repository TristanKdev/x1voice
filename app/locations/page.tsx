import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllLocations, getAllServedCities } from "@/lib/content/locations"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = buildMetadata({
  title: "Cities and Regions We Serve",
  description:
    "Restaurants running X1 Voice across US cities and metros, what local setup involves, and how multi-location and franchise rollouts are handled store by store.",
  path: "/locations",
})

export default function LocationsHubPage() {
  const locations = getAllLocations()
  const allCities = getAllServedCities()
  const dedicatedSlugs = new Set(locations.map((l) => l.slug))

  return (
    <>
      <Breadcrumbs items={[{ name: "Locations", path: "/locations" }]} />
      <PageHeader
        eyebrow="Locations"
        title="Where X1 Voice is answering calls"
        description="A dedicated page exists for markets with real local data behind it, every other served city is listed below."
      />

      <section className="mx-auto max-w-4xl px-6 py-12">
        <Card className="p-6">
          <h2 className="font-medium">Multi-location and franchise groups</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Running more than one location? X1 Voice centralizes reporting
            across every site under one dashboard, with per-location menu and
            routing configuration. See the{" "}
            <Link href="/solutions/multi-location" className="underline underline-offset-2">
              multi-location solution page
            </Link>{" "}
            or the{" "}
            <Link href="/pricing" className="underline underline-offset-2">
              Professional and Enterprise plans
            </Link>
            .
          </p>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        {locations.length > 0 ? (
          <>
            <h2 className="text-xl font-medium">Featured markets</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((l) => (
                <Link key={l.slug} href={`/locations/${l.slug}`}>
                  <Card className="group h-full p-6 transition-colors hover:border-brand/40">
                    <h3 className="font-medium">
                      {l.city}, {l.stateAbbr}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {l.metaDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand">
                      View market
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            Featured market pages are being added, check back soon.
          </p>
        )}
      </section>

      {allCities.length > 0 ? (
        <section className="border-t bg-muted/20">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <h2 className="text-xl font-medium">All served cities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {allCities
                .filter((c) => !dedicatedSlugs.has(c.city.toLowerCase()))
                .map((c) => (
                  <Badge key={`${c.city}-${c.stateAbbr}`} variant="secondary">
                    {c.city}, {c.stateAbbr}
                  </Badge>
                ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
