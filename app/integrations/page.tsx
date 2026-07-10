import Link from "next/link"
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import { getAllIntegrations } from "@/lib/content/integrations"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"
import {
  POS_SYSTEMS,
  POS_TOTAL,
  POS_VIA,
  posUrl,
} from "@/data/pos-systems"

export const metadata = buildMetadata({
  title: "POS Integrations",
  description: `X1 Voice sends phone orders into ${POS_TOTAL}+ POS systems, including Square, Toast, Clover, Lightspeed, and more, directly or via ${POS_VIA}.`,
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

      {/* Full, linked directory of every supported POS (SEO / entity map) */}
      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Every POS system X1 Voice works with
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            X1 Voice sends phone orders into {POS_TOTAL} point-of-sale systems,
            directly or through our {POS_VIA} connection. If your POS is listed
            below, orders land as normal tickets, no re-keying. Vendor names
            link to their official sites.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
            {POS_SYSTEMS.map((pos) => {
              const url = posUrl(pos.name)
              if (pos.slug) {
                return (
                  <li key={pos.name}>
                    <Link
                      href={`/integrations/${pos.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-foreground hover:text-brand"
                    >
                      {pos.name}
                    </Link>
                  </li>
                )
              }
              return (
                <li key={pos.name}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener"
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand"
                    >
                      {pos.name}
                      <ExternalLinkIcon className="size-3 opacity-0 transition-opacity group-hover:opacity-60" />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{pos.name}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
