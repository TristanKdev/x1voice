import type { IntegrationPage } from "@/data/integrations"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
          <h2 className="text-center text-2xl font-semibold tracking-tight">
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

      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight">
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
