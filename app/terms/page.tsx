import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { CONTACT, SITE_NAME } from "@/data/site"

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms that govern use of ${SITE_NAME}.`,
  path: "/terms",
})

const UPDATED = "2026-01-01"

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms of Service", path: "/terms" }]} />
      <PageHeader eyebrow={`Last updated ${UPDATED}`} title="Terms of Service" />
      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-2xl px-6 py-16">
        <p>
          These terms govern your use of {SITE_NAME}&rsquo;s AI phone-agent
          service (the &ldquo;Service&rdquo;). By signing up, you agree to
          them.
        </p>

        <h2>The Service</h2>
        <p>
          {SITE_NAME} answers phone calls to a number you route to us, takes
          orders, may collect payment on your behalf, and syncs completed
          orders to your connected POS. Plan tiers, included minutes, and
          pricing are described on our{" "}
          <a href="/pricing">pricing page</a>, which is part of these terms.
        </p>

        <h2>Your responsibilities</h2>
        <ul>
          <li>Keep your menu, pricing, and hours accurate and up to date in your account.</li>
          <li>Have the authority to route your business phone line to the Service.</li>
          <li>Comply with applicable law for any orders and payments processed through the Service.</li>
        </ul>

        <h2>Billing</h2>
        <p>
          Plans bill monthly or annually as selected at signup. There are no
          setup fees and no long-term contract on the Starter or Professional
          tiers; you can cancel at any time effective at the end
          of your current billing period. Usage beyond your plan&rsquo;s
          included minutes is billed as described on the pricing page.
        </p>

        <h2>Payment processing</h2>
        <p>
          Phone-order payments are processed by a third-party payment
          processor. {SITE_NAME} does not store full card numbers.
        </p>

        <h2>Service availability</h2>
        <p>
          We work to keep the Service available 24/7 but don&rsquo;t
          guarantee uninterrupted availability. We&rsquo;ll notify you of
          planned maintenance where practical.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE_NAME} is not liable
          for indirect, incidental, or consequential damages arising from use
          of the Service, including missed or misrouted orders, beyond fees
          paid for the affected billing period.
        </p>

        <h2>Termination</h2>
        <p>
          Either party may terminate for convenience at the end of a billing
          period, or immediately for material breach.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms from time to time; material changes will
          be communicated to active accounts.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${CONTACT.supportEmail}`}>{CONTACT.supportEmail}</a>.
        </p>

        <p className="text-sm text-muted-foreground">
          This page is a standard-form template and has not been reviewed by
          an attorney. Have counsel review it before this site handles real
          customer data or payments in production.
        </p>
      </article>
    </>
  )
}
