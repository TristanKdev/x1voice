import type { LocationPage } from "@/data/locations"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonld"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function SourceNote({
  source,
}: {
  source: { label: string; url?: string; asOf: string }
}) {
  return (
    <p className="mt-1 text-xs text-muted-foreground">
      Source: {source.url ? (
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {source.label}
        </a>
      ) : (
        source.label
      )}{" "}
      · as of {source.asOf}
    </p>
  )
}

export function LocationPageTemplate({ location }: { location: LocationPage }) {
  return (
    <>
      <JsonLd
        data={[
          buildFaqJsonLd(location.localFaqs),
          buildServiceJsonLd({
            name: `X1 Voice in ${location.city}, ${location.stateAbbr}`,
            description: location.metaDescription,
            path: `/locations/${location.slug}`,
            areaServed: `${location.city}, ${location.stateAbbr}`,
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Locations", path: "/locations" },
          {
            name: `${location.city}, ${location.stateAbbr}`,
            path: `/locations/${location.slug}`,
          },
        ]}
      />
      <PageHeader
        eyebrow={location.metroArea ?? `${location.city}, ${location.stateAbbr}`}
        title={`X1 Voice for restaurants in ${location.city}`}
        description={`Serving ${location.serviceAreaNeighborhoods.join(", ")} and the wider ${location.city} area.`}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Population</p>
            <p className="mt-1 text-2xl font-semibold">
              {location.population.toLocaleString()}
            </p>
            <SourceNote source={location.populationSource} />
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Restaurants</p>
            <p className="mt-1 text-2xl font-semibold">
              {location.restaurantCount.value.toLocaleString()}
            </p>
            <SourceNote source={location.restaurantCount.source} />
          </Card>
        </div>

        <Card className="mt-4 p-6">
          <p className="text-sm font-medium">Peak call times</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {location.peakCallTimes.description}
          </p>
          {location.peakCallTimes.source ? (
            <SourceNote source={location.peakCallTimes.source} />
          ) : null}
        </Card>

        <Card className="mt-4 p-6">
          <p className="text-sm font-medium">Local labor market</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {location.laborMarketNote}
          </p>
          <SourceNote source={location.laborMarketSource} />
        </Card>

        <div className="mt-4 flex flex-wrap gap-2">
          {location.serviceAreaNeighborhoods.map((n) => (
            <Badge key={n} variant="secondary">
              {n}
            </Badge>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Data on this page updated as of {location.updatedAt}.
        </p>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h2 className="text-center text-3xl font-display font-semibold">
            Questions from {location.city} restaurant operators
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={location.localFaqs} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
