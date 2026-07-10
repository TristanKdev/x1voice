import Link from "next/link"
import { ArrowRightIcon, PlugZapIcon, WorkflowIcon } from "lucide-react"

import { buildMetadata } from "@/lib/seo/metadata"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { Card } from "@/components/ui/card"
import { getAllIntegrations } from "@/lib/content/integrations"
import { POS_VIA_DELIVERECT_COUNT } from "@/data/pos-systems"

export const metadata = buildMetadata({
  title: "Integration setup & support docs",
  description:
    "How X1 Voice connects to your POS: native integrations, the Deliverect connection, step-by-step setup, and troubleshooting for the issues that come up most.",
  path: "/support/integrations",
})

const SETUP_STEPS = [
  "Connect your POS from the X1 Voice dashboard (or hand it to onboarding for white-glove setup).",
  "Confirm your menu, modifiers, and pricing pulled in correctly, everything comes from your POS.",
  "Set your hours, 86'd items, and any phone-only rules (delivery minimums, pickup times).",
  "Run a test call, including a deliberately awkward order, and confirm the ticket lands right.",
  "Go live. New phone orders start flowing into your POS on their own.",
]

const DOCS_FAQS = [
  {
    question: "How does X1 Voice connect to my POS?",
    answer:
      `Two ways. Square and OrderCounter connect natively, directly to your account. Every other system, including Clover, Toast, Lightspeed, TouchBistro, SpotOn and ${POS_VIA_DELIVERECT_COUNT}+ more, connects through our Deliverect connection. Either way the order lands in your POS as a normal ticket and nobody re-types anything.`,
  },
  {
    question: "The menu didn't pull in, or prices look wrong. What do I do?",
    answer:
      "Re-sync from the X1 Voice dashboard and confirm the correct POS location and account are connected. The menu always comes from your POS, so make the fix there and re-sync, you never maintain the menu twice.",
  },
  {
    question: "An 86'd item is still being offered on calls.",
    answer:
      "Mark it unavailable in your POS. Availability changes carry over within a few minutes and the AI stops offering it, there's nothing to change inside X1 Voice.",
  },
  {
    question: "An order didn't reach the POS.",
    answer:
      "Check the connection status in the dashboard and run a test call. If it still doesn't land, contact support with the caller's number and the call time and we'll trace it. For Deliverect-connected systems, confirm the Deliverect link is still active and reconnect it if needed.",
  },
  {
    question: "A phone payment isn't showing in my POS reporting.",
    answer:
      "Card payments taken on the call reconcile under your normal tender types. Allow a few minutes for them to appear alongside your other sales.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most single-location restaurants are live the same shift, connect, import the menu, test, go live. Our team can handle the whole thing for you if you'd rather.",
  },
]

export default function IntegrationDocsPage() {
  const integrations = getAllIntegrations()

  return (
    <>
      <JsonLd data={buildFaqJsonLd(DOCS_FAQS)} />
      <Breadcrumbs
        items={[
          { name: "Support", path: "/support" },
          { name: "Integration docs", path: "/support/integrations" },
        ]}
      />
      <PageHeader
        eyebrow="Integration docs"
        title="Integration setup & support"
        description="Everything you need to connect X1 Voice to your POS and keep phone orders flowing, how the connection works, step-by-step setup, and fixes for the issues that come up most."
      />

      {/* How it connects */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Two ways X1 Voice connects
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <PlugZapIcon className="size-5 text-brand" aria-hidden />
            <h3 className="mt-3 font-medium">Native integrations</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Square</span> and{" "}
              <span className="font-medium text-foreground">OrderCounter</span>{" "}
              connect directly to your account. X1 Voice reads the live menu and
              drops finished orders straight back in.
            </p>
          </Card>
          <Card className="p-6">
            <WorkflowIcon className="size-5 text-brand" aria-hidden />
            <h3 className="mt-3 font-medium">Through Deliverect</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Clover, Toast, Lightspeed, TouchBistro, SpotOn and{" "}
              {POS_VIA_DELIVERECT_COUNT}+ more connect through our Deliverect
              connection, orders still arrive as normal tickets.
            </p>
          </Card>
        </div>
      </section>

      {/* Per-integration guides */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Setup guides by POS
          </h2>
          <p className="mt-3 text-muted-foreground">
            Step-by-step docs for the systems with a dedicated guide. Running
            something else?{" "}
            <Link href="/integrations" className="font-semibold text-brand hover:underline">
              See every supported POS
            </Link>
            .
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {integrations.map((i) => (
              <Link
                key={i.slug}
                href={`/integrations/${i.slug}`}
                className="group flex items-center justify-between rounded-xl border bg-card p-5 transition hover:border-brand/40"
              >
                <span className="font-medium">{i.partnerName}</span>
                <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* General setup */}
      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
            Get live in five steps
          </h2>
          <ol className="mt-8 space-y-4">
            {SETUP_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
            Troubleshooting
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Still stuck after this?{" "}
            <Link href="/support" className="font-semibold text-brand hover:underline">
              Contact support
            </Link>{" "}
            with your call time and we&rsquo;ll trace it.
          </p>
          <div className="mt-10">
            <FaqAccordion faqs={DOCS_FAQS} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
