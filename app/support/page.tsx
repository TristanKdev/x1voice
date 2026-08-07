import Link from "next/link"
import { HelpCircleIcon, MailIcon, MessageSquareIcon, PhoneCallIcon, PlugZapIcon } from "lucide-react"

import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"
import { CONTACT, DEMO_LINE } from "@/data/site"

export const metadata = buildMetadata({
  title: "Support and Setup Help",
  description:
    "Get help with setup, menu sync, POS connections, and call routing. Email support, answers to common questions, and a live demo line you can call any time.",
  path: "/support",
})

export default function SupportPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Support", path: "/support" }]} />
      <PageHeader
        eyebrow="Support"
        title="We're here to help"
        description="Already a customer, or evaluating? Reach the team, browse the FAQ, or just call the demo line and hear it answer your question live."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <MailIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Email support</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Questions, changes, or an issue with your account.
            </p>
            <a
              href={`mailto:${CONTACT.supportEmail}`}
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              {CONTACT.supportEmail}
            </a>
          </Card>

          <Card className="p-6">
            <PhoneCallIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Hear it in action</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Have questions? Call the demo line, it can answer just about
              anything about how it works.
            </p>
            <a
              href={`tel:${DEMO_LINE.tel}`}
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              {DEMO_LINE.display}
            </a>
          </Card>

          <Card className="p-6">
            <PlugZapIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Integration setup docs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your POS, step-by-step guides, and fixes for the common
              integration issues.
            </p>
            <Link
              href="/support/integrations"
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              Read the integration docs
            </Link>
          </Card>

          <Card className="p-6">
            <HelpCircleIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">FAQ</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The common questions, answered, setup, payments, POS, and more.
            </p>
            <Link
              href="/#faq"
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              Read the FAQ
            </Link>
          </Card>

          <Card className="p-6">
            <MessageSquareIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Talk to the team</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Onboarding, a specific POS, or a multi-location rollout.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              Contact us
            </Link>
          </Card>
        </div>
      </section>
    </>
  )
}
