import Link from "next/link"

import { buildMetadata } from "@/lib/seo/metadata"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { BentoFeatures } from "@/components/blocks/bento-features"
import { SourcedStat } from "@/components/blocks/sourced-stat"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "Features",
  description:
    "What X1 Voice actually does: 24/7 call answering, order-taking with modifiers and substitutions, phone payment collection, POS sync, after-hours coverage, and reporting.",
  path: "/features",
})

const FEATURE_DETAILS = [
  {
    title: "Modifiers and substitutions, handled correctly",
    body: "Callers order the way they talk — 'half cheese half pepperoni,' 'no onions,' 'swap the fries for a side salad.' X1 Voice parses those requests against your actual menu structure, confirms anything ambiguous back to the caller before it's finalized, and reads the full order back at the end so nothing gets submitted wrong.",
  },
  {
    title: "What 'syncs to your POS' means concretely",
    body: "There's no manual re-entry step. Once a call ends, the order appears in your POS — Square, Clover, OrderCounter, or OrderOut — within seconds, itemized the same way a ticket entered by staff would be. Your kitchen sees it exactly where it expects to.",
  },
  {
    title: "Payment collection without a human touching a card",
    body: "On plans that include it, X1 Voice can collect payment on phone orders directly during the call, so a card number never passes through a staff member or gets written on a sticky note by the register.",
  },
  {
    title: "After-hours is treated like peak hours",
    body: "Calls that come in after close, before open, or during a rush that would otherwise hit voicemail get the same order-taking flow as a call at 7pm on a Friday — governed by the hours and routing rules you set, not by whether anyone's near the phone.",
  },
]

const FEATURES_FAQS = [
  {
    question: "Which POS systems does it work with?",
    answer:
      "Square and Clover today, with OrderCounter and OrderOut integrations also available. See /integrations for the full list and setup details.",
  },
  {
    question: "Can it handle complicated orders with substitutions?",
    answer:
      "Yes — modifiers, substitutions, and combo/upsell prompts are handled against your actual menu structure, with anything ambiguous confirmed back to the caller before the order is finalized.",
  },
  {
    question: "Does it collect payment over the phone?",
    answer:
      "Phone-order payment collection is available starting on the Professional plan and included on Business and Enterprise. See /pricing for the full feature breakdown by plan.",
  },
  {
    question: "What happens if the AI can't complete a call?",
    answer:
      "Calls it can't confidently resolve — a complex complaint, a request outside the menu — get transferred to your staff or routed to voicemail with a transcript, based on rules you set.",
  },
]

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Features", path: "/features" }]} />
      <PageHeader
        eyebrow="Features"
        title="What X1 Voice does, in detail"
        description="Every capability below is live in the product today — not a roadmap item."
      />

      <BentoFeatures />

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A closer look at how it actually works
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURE_DETAILS.map((f) => (
              <Card key={f.title} className="p-6">
                <h3 className="font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <SourcedStat className="mx-auto flex flex-col items-center" />
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <JsonLd data={buildFaqJsonLd(FEATURES_FAQS)} />
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            Feature questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={FEATURES_FAQS} />
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            See how this changes by restaurant type on{" "}
            <Link href="/solutions" className="text-brand underline underline-offset-2">
              Solutions
            </Link>
            , or compare plans on{" "}
            <Link href="/pricing" className="text-brand underline underline-offset-2">
              Pricing
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
