import { LightbulbIcon, MessageSquarePlusIcon, ThumbsUpIcon } from "lucide-react"

import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { CtaSection } from "@/components/blocks/cta-section"
import { FeatureRequestForm } from "@/components/blocks/feature-request-form"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "Request a feature or integration",
  description:
    "Tell us what would make the product better for your restaurant: a missing feature, or a POS or delivery platform you need connected. We build from operator requests.",
  path: "/request-feature",
})

const STEPS = [
  {
    icon: MessageSquarePlusIcon,
    title: "Tell us the problem",
    body: "Describe what you're trying to do and where the product gets in the way. Concrete beats polished.",
  },
  {
    icon: ThumbsUpIcon,
    title: "We review every request",
    body: "The team reads each one and groups them by theme. Popular, high-impact asks move up the roadmap.",
  },
  {
    icon: LightbulbIcon,
    title: "You hear back",
    body: "If we build it, we'll let you know. Operator feedback is the single biggest driver of what ships next.",
  },
]

/**
 * Request-a-feature page. The form is PRESENTATIONAL ONLY.
 * WIRE (dev): the <form> posts nowhere, hook up an action / endpoint
 * (e.g. GHL form, /api/feature-request) and success/error states. Fields
 * are named so a handler can read them directly.
 */
export default function RequestFeaturePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Request a feature or integration", path: "/request-feature" }]} />
      <PageHeader
        eyebrow="Roadmap"
        title="Request a feature or integration"
        description="X1 Voice is built from operator feedback. Want a new capability, or don't see your POS or platform yet? Tell us, the team reads every request."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <Card key={s.title} className="p-6">
              <s.icon className="size-5 text-brand" aria-hidden />
              <h2 className="mt-3 font-medium">{s.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">
              What should we build or integrate?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The more specific, the better. A feature, or a POS/platform you
              need us to connect to, tell us the job, not just the name.
            </p>
          </div>

          <FeatureRequestForm />
        </div>
      </section>

      <CtaSection
        title="Prefer to talk it through?"
        description="Call the demo line or book time with the team and tell us what you need."
      />
    </>
  )
}
