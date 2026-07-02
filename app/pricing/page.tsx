import { buildMetadata } from "@/lib/seo/metadata"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { PricingTable } from "@/components/blocks/pricing-table"
import { ComparisonTable } from "@/components/blocks/comparison-table"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { PRICING_TIERS, PRICING_COMPARISON_ROWS } from "@/data/pricing"

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Pricing that scales with your call volume, with no setup fees or long-term contract. See the full feature-by-feature breakdown of every plan.",
  path: "/pricing",
})

const PRICING_FAQS = [
  {
    question: "Is there a setup fee?",
    answer:
      "No. None of our plans, Starter through Enterprise, carry a setup fee. You pay the listed monthly (or discounted annual) price and nothing else to get started.",
  },
  {
    question: "Do you require a contract?",
    answer:
      "No long-term contract on Starter, Professional, or Business, and you can cancel anytime. Enterprise plans are custom, so contract terms there are negotiable based on your rollout.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can move between Starter, Professional, and Business as your call volume changes. Multi-location groups that outgrow Business can move to a custom Enterprise plan whenever it makes sense.",
  },
  {
    question: "What happens if I go over my included minutes?",
    answer:
      "Each plan includes a set number of minutes per month, from 500 on Starter up to 6,000 on Business. If you're consistently running over, we'll reach out to help you move to a plan sized for your actual call volume rather than billing surprise overage fees.",
  },
  {
    question: "Do you offer a discount for paying annually?",
    answer:
      "Yes. Starter, Professional, and Business all save 15% when billed annually instead of monthly. Toggle the pricing table above to compare.",
  },
]

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />
      <PageHeader
        eyebrow="Pricing"
        title="Pricing that scales with your call volume"
        description="Pick the plan that matches how many calls you take. You won't pay a setup fee or sign a long-term contract, and every feature is listed below instead of buried in a sales call."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <PricingTable />
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-display font-medium sm:text-3xl">
              Compare plans feature by feature
            </h2>
            <p className="mt-3 text-muted-foreground">
              Plan bullets only tell you so much. Here&rsquo;s the full
              side-by-side, so you can see exactly what changes as you move
              up.
            </p>
          </div>
          <div className="mt-10">
            <ComparisonTable
              columns={PRICING_TIERS.map((tier) => ({
                key: tier.name.toLowerCase(),
                label: tier.name,
                highlighted: tier.highlighted,
              }))}
              rows={PRICING_COMPARISON_ROWS.map((row) => ({
                feature: row.feature,
                values: {
                  starter: row.starter,
                  professional: row.professional,
                  business: row.business,
                  enterprise: row.enterprise,
                },
              }))}
            />
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <JsonLd data={buildFaqJsonLd(PRICING_FAQS)} />
          <h2 className="text-center text-3xl font-display font-medium">
            Pricing questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={PRICING_FAQS} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
