import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllIntegrations } from "@/lib/content/integrations"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "Integrations",
  description: "POS and platform integrations X1 Voice syncs orders to.",
  path: "/integrations",
})

export default function IntegrationsHubPage() {
  const integrations = getAllIntegrations()

  return (
    <>
      <Breadcrumbs items={[{ name: "Integrations", path: "/integrations" }]} />
      <PageHeader
        eyebrow="Integrations"
        title="Syncs straight into your existing POS"
        description="No re-keying, no missed tickets, orders land where your team already works."
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        {integrations.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Integration pages are being added, check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((i) => (
              <Link key={i.slug} href={`/integrations/${i.slug}`}>
                <Card className="group h-full p-6 transition-colors hover:border-brand/40">
                  <h2 className="font-medium">{i.partnerName}</h2>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {i.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand">
                    Learn more
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
