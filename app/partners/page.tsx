import Link from "next/link"
import {
  ArrowRightIcon,
  HandshakeIcon,
  PhoneCallIcon,
  PlugZapIcon,
  RepeatIcon,
  StoreIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { CtaSection } from "@/components/blocks/cta-section"
import { Card } from "@/components/ui/card"
import { CONTACT } from "@/data/site"

export const metadata = buildMetadata({
  title: "Partner with X1 Voice",
  description:
    "Why partner with X1 Voice: recurring revenue on a product restaurants keep, transparent pricing you can quote, fast white-glove onboarding, and a demo that sells itself over the phone.",
  path: "/partners",
})

const WHY = [
  {
    icon: RepeatIcon,
    title: "Recurring revenue that sticks",
    body: "X1 Voice earns its keep every shift, so restaurants keep it. That's monthly recurring revenue on a product with a real reason to stay, not a one-time sale.",
  },
  {
    icon: PhoneCallIcon,
    title: "It demos itself",
    body: "Your prospect calls the line and hears it take an order. No slide deck sells a voice agent better than 30 seconds on the phone with one.",
  },
  {
    icon: TrendingUpIcon,
    title: "Pricing you can actually quote",
    body: "Published pricing from $250/mo, every plan with the same features, differing only by minutes and overage. No 'contact sales' black box to explain away.",
  },
  {
    icon: PlugZapIcon,
    title: "Lands in the POS they already run",
    body: "Native with Square and OrderCounter, plus Clover, Toast, and 80+ more via Deliverect. Fewer 'does it work with mine?' objections to overcome.",
  },
  {
    icon: HandshakeIcon,
    title: "White-glove onboarding",
    body: "We help get each location live, often the same shift. You bring the relationship; we handle the setup so it goes smoothly.",
  },
  {
    icon: UsersIcon,
    title: "A team behind you",
    body: "Dedicated partner support, co-marketing where it fits, and a roadmap driven by operator feedback you can influence.",
  },
]

const TYPES = [
  {
    icon: StoreIcon,
    title: "Resellers & ISOs",
    body: "Sell X1 Voice into your restaurant book under partner terms with recurring revenue.",
    href: "/resellers",
    cta: "Reseller & ISO program",
  },
  {
    icon: UsersIcon,
    title: "Referral partners",
    body: "Consultants, agencies, and operators who send us restaurants and get paid for it.",
    href: "/contact",
    cta: "Become a referral partner",
  },
  {
    icon: PlugZapIcon,
    title: "POS & technology partners",
    body: "POS, delivery, and platform companies who want X1 Voice connected to their product.",
    href: "/contact",
    cta: "Talk integrations",
  },
]

export default function PartnersPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Partners", path: "/partners" }]} />
      <PageHeader
        eyebrow="Partners"
        title="Partner with X1 Voice"
        description="Put an AI phone agent restaurants actually keep in front of your book of business, on transparent pricing, with a team that handles the setup."
      />

      {/* Why partner */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Why partner with us
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <Card key={w.title} className="p-6">
              <w.icon className="size-5 text-brand" aria-hidden />
              <h3 className="mt-3 font-medium">{w.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{w.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Partner types */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Ways to partner
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TYPES.map((t) => (
              <Card key={t.title} className="flex flex-col p-6">
                <t.icon className="size-5 text-brand" aria-hidden />
                <h3 className="mt-3 font-medium">{t.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{t.body}</p>
                <Link
                  href={t.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  {t.cta}
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get started */}
      <section className="border-t">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Let&rsquo;s build something
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us about your business and how you&rsquo;d like to work together.
            We&rsquo;ll come back with terms that fit.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
            >
              Become a partner
            </Link>
            <a
              href={`mailto:${CONTACT.salesEmail}`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold transition hover:bg-muted"
            >
              {CONTACT.salesEmail}
            </a>
          </div>
        </div>
      </section>

      <CtaSection
        title="Want to see it first?"
        description="Call the demo line and hear exactly what you'd be putting in front of your restaurants."
      />
    </>
  )
}
