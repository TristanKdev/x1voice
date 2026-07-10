import Link from "next/link"
import { LifeBuoyIcon, PlugZapIcon } from "lucide-react"

import type { IntegrationPage } from "@/data/integrations"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/** Common integration issues + the fix, shown on every integration page. */
const TROUBLESHOOTING: { problem: string; fix: string }[] = [
  {
    problem: "The menu didn't pull in, or prices look wrong",
    fix: "Re-sync from the X1 Voice dashboard and confirm the correct POS location/account is connected. The menu always comes from your POS, so fix it there and re-sync.",
  },
  {
    problem: "An 86'd item is still being offered on calls",
    fix: "Mark it unavailable in your POS. Availability changes carry over within a few minutes; no need to edit anything in X1 Voice.",
  },
  {
    problem: "An order didn't reach the POS",
    fix: "Check the connection status in the dashboard and run a test call. If it still doesn't land, contact support with the caller's number and the call time so we can trace it.",
  },
  {
    problem: "A phone payment isn't showing in POS reporting",
    fix: "Card payments taken on the call reconcile under your normal tender types, allow a few minutes for them to appear next to your other sales.",
  },
]

export function IntegrationPageTemplate({
  integration,
}: {
  integration: IntegrationPage
}) {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(integration.faqs)} />
      <Breadcrumbs
        items={[
          { name: "Integrations", path: "/integrations" },
          {
            name: integration.partnerName,
            path: `/integrations/${integration.slug}`,
          },
        ]}
      />
      <PageHeader
        eyebrow="Integration"
        title={integration.heroHeadline}
        description={integration.summary}
      />

      <div className="mx-auto -mt-6 max-w-4xl px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
          <PlugZapIcon className="size-3.5" />
          {integration.connection === "native"
            ? `Native integration with ${integration.partnerName}`
            : `Connects to ${integration.partnerName} through Deliverect`}
        </span>
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {integration.capabilities.map((c) => (
            <Card key={c.title} className="p-6">
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {c.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="text-center text-2xl font-display font-semibold">
            Setup
          </h2>
          <ol className="mt-8 space-y-4">
            {integration.setupSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-0.5 shrink-0">
                  {i + 1}
                </Badge>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Troubleshooting &amp; support
            </h2>
            <p className="mt-3 text-muted-foreground">
              The quick fixes for the issues that come up most with the{" "}
              {integration.partnerName} connection.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TROUBLESHOOTING.map((t) => (
              <Card key={t.problem} className="p-6">
                <h3 className="text-sm font-semibold">{t.problem}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.fix}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/support/integrations"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
            >
              <LifeBuoyIcon className="size-4" />
              All integration setup docs
            </Link>
            <Link
              href="/support"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold transition hover:bg-muted"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h2 className="text-center text-3xl font-display font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={integration.faqs} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
