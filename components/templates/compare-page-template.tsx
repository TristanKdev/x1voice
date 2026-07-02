import type { ComparePage } from "@/data/compare"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { PricingDisclaimer } from "@/components/blocks/pricing-disclaimer"
import { ComparisonTable } from "@/components/blocks/comparison-table"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { Card } from "@/components/ui/card"

/**
 * One template for all consolidated compare pages. Every pricing claim
 * about the competitor renders through <PricingDisclaimer> — this is what
 * makes "state pricing as bare fact" and the old vs-hiring-staff math error
 * structurally impossible here.
 */
export function ComparePageTemplate({ compare }: { compare: ComparePage }) {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(compare.faqs)} />
      <Breadcrumbs
        items={[
          { name: "Compare", path: "/compare" },
          {
            name: `vs ${compare.competitorName}`,
            path: `/compare/${compare.slug}`,
          },
        ]}
      />
      <PageHeader
        eyebrow={`X1 Voice vs ${compare.competitorName}`}
        title={`How X1 Voice compares to ${compare.competitorName}`}
        description={compare.summary}
      />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">X1 Voice</p>
            <p className="mt-1 text-2xl font-semibold">
              {compare.pricingComparison.x1voice.priceLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              {compare.pricingComparison.x1voice.planName}
            </p>
            {compare.pricingComparison.x1voice.billingNote ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {compare.pricingComparison.x1voice.billingNote}
              </p>
            ) : null}
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">
              {compare.competitorName}
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {compare.pricingComparison.competitor.priceLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              {compare.pricingComparison.competitor.planName}
            </p>
            {compare.pricingComparison.competitor.billingNote ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {compare.pricingComparison.competitor.billingNote}
              </p>
            ) : null}
          </Card>
        </div>
        <div className="mt-4">
          <PricingDisclaimer
            competitorName={compare.competitorName}
            asOf={compare.pricingComparison.asOf}
            sourceUrl={compare.pricingComparison.sourceUrl}
          />
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-center text-2xl font-display font-medium sm:text-3xl">
            Feature by feature
          </h2>
          <div className="mt-8">
            <ComparisonTable
              columns={[
                { key: "x1voice", label: "X1 Voice", highlighted: true },
                { key: "competitor", label: compare.competitorName },
              ]}
              rows={compare.featureMatrix.map((row) => ({
                feature: row.feature,
                note: row.note,
                values: { x1voice: row.x1voice, competitor: row.competitor },
              }))}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Last reviewed {compare.lastReviewedAt}. Competitor capabilities
            based on their publicly available documentation as of that date —
            confirm current features directly with {compare.competitorName}.
          </p>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h2 className="text-center text-3xl font-display font-medium">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={compare.faqs} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
