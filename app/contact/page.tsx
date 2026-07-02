import { PhoneIcon, MailIcon, HeadsetIcon } from "lucide-react"

import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { ContactForm } from "@/components/blocks/contact-form"
import { DemoDialog } from "@/components/blocks/demo-dialog"
import { CtaSection } from "@/components/blocks/cta-section"
import { Card } from "@/components/ui/card"
import { CONTACT } from "@/data/site"

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach the X1 Voice team by phone or email, or send a message directly. Sales and support contacts and live demo booking, all on one page.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about pricing, a specific POS, or your rollout timeline? Reach us directly, or send a message below."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-6">
            <PhoneIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Call sales</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Talk through pricing and setup for your restaurant.
            </p>
            <a
              href={`tel:${CONTACT.phone}`}
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              {CONTACT.phone}
            </a>
          </Card>
          <Card className="p-6">
            <MailIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Email sales</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New to X1 Voice, or evaluating for multiple locations.
            </p>
            <a
              href={`mailto:${CONTACT.salesEmail}`}
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              {CONTACT.salesEmail}
            </a>
          </Card>
          <Card className="p-6">
            <HeadsetIcon className="size-5 text-brand" aria-hidden />
            <h2 className="mt-3 font-medium">Email support</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Already a customer with a question or an issue.
            </p>
            <a
              href={`mailto:${CONTACT.supportEmail}`}
              className="mt-4 inline-block text-sm text-brand underline underline-offset-2"
            >
              {CONTACT.supportEmail}
            </a>
          </Card>
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-display font-medium">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We read every message and typically reply within one business
              day.
            </p>
          </div>
          <div className="mt-8">
            <ContactForm />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Prefer to see it live instead of filling out a form?
            </p>
            <DemoDialog variant="outline" size="default" className="gap-2">
              Book a 15-minute demo
            </DemoDialog>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to stop missing calls?"
        description="Book a live demo and we'll call your own restaurant number so you can hear it work."
      />
    </>
  )
}
