import type { SolutionPage } from "@/data/solutions"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonld"
import { Card } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

/**
 * One template renders all 11 solution pages — differentiation comes from
 * the required painPoints/features/faqs fields in each SolutionPage entry,
 * not from hand-written per-page markup.
 */
export function SolutionPageTemplate({ solution }: { solution: SolutionPage }) {
  return (
    <>
      <JsonLd
        data={[
          buildFaqJsonLd(solution.faqs),
          buildServiceJsonLd({
            name: `X1 Voice for ${solution.restaurantType}`,
            description: solution.metaDescription,
            path: `/solutions/${solution.slug}`,
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Solutions", path: "/solutions" },
          { name: solution.restaurantType, path: `/solutions/${solution.slug}` },
        ]}
      />
      <PageHeader
        eyebrow={solution.restaurantType}
        title={solution.heroHeadline}
        description={solution.heroSubhead}
      />

      {solution.statHighlight ? (
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="font-display text-4xl font-medium text-brand">
              {solution.statHighlight.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {solution.statHighlight.label}
            </p>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-medium sm:text-3xl">
          Where {solution.restaurantType.toLowerCase()} calls go wrong today
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {solution.painPoints.map((p) => (
            <Card key={p.title} className="p-6">
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {p.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">
            What changes with X1 Voice
          </h2>
          <ul className="mt-8 space-y-4">
            {solution.features.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="font-medium">{f.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h2 className="font-display text-3xl font-medium">
            Questions from {solution.restaurantType.toLowerCase()} operators
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={solution.faqs} />
          </div>
        </div>
      </section>

      <CtaSection
        title={`See X1 Voice answer calls for ${solution.restaurantType.toLowerCase()}.`}
      />
    </>
  )
}
