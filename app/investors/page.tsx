import {
  BuildingIcon,
  LineChartIcon,
  MailIcon,
  PhoneCallIcon,
  Building2Icon,
} from "lucide-react"

import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"
import { CONTACT } from "@/data/site"

export const metadata = buildMetadata({
  title: "Investor Relations",
  description:
    "Investor relations for X1 Voice, the AI phone agent for restaurants. Private equity and venture capital inquiries go to investors@x1voice.com.",
  path: "/investors",
})

const POINTS = [
  {
    icon: PhoneCallIcon,
    title: "The category",
    body: "Restaurants still run a huge share of their business over the phone, and a large share of those calls go unanswered at peak. X1 Voice is an AI phone agent purpose-built to answer them and turn them into orders.",
  },
  {
    icon: LineChartIcon,
    title: "The model",
    body: "Recurring monthly subscriptions with per-minute usage above included minutes. Published, self-serve pricing from $250/mo, the same feature set on every plan.",
  },
  {
    icon: BuildingIcon,
    title: "Distribution",
    body: "Direct and through resellers, ISOs, and POS/technology partners, with native and Deliverect-based POS coverage across 80+ systems.",
  },
]

export default function InvestorsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Investors", path: "/investors" }]} />
      <PageHeader
        eyebrow="Investors"
        title="Investor relations"
        description="X1 Voice is building the AI phone agent for restaurants. We speak with private equity and venture capital investors who focus on vertical AI and restaurant technology."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {POINTS.map((p) => (
            <Card key={p.title} className="p-6">
              <p.icon className="size-5 text-brand" aria-hidden />
              <h2 className="mt-3 font-medium">{p.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-2xl border bg-card p-8 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Building2Icon className="size-6" strokeWidth={1.75} />
            </div>
            <h2 className="font-display mt-5 text-2xl font-semibold">
              Private equity & venture capital
            </h2>
            <p className="mt-3 text-muted-foreground">
              For investment inquiries, diligence requests, or an introduction,
              reach the team directly. We&rsquo;ll respond with the appropriate
              materials under NDA.
            </p>
            <a
              href={`mailto:${CONTACT.investorsEmail}`}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
            >
              <MailIcon className="size-4" />
              {CONTACT.investorsEmail}
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Please use this address for investor matters only. Sales and support
              are handled separately.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
