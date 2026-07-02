import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { CONTACT, SITE_NAME } from "@/data/site"

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your data.`,
  path: "/privacy",
})

const UPDATED = "2026-01-01"

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <PageHeader
        eyebrow={`Last updated ${UPDATED}`}
        title="Privacy Policy"
      />
      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-2xl px-6 py-16">
        <p>
          This policy describes how {SITE_NAME} (&ldquo;we,&rdquo;
          &ldquo;us&rdquo;) collects, uses, and protects information when a
          restaurant (&ldquo;you,&rdquo; &ldquo;customer&rdquo;) uses our AI
          phone-agent service, and when a caller places an order through it.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account and billing information</strong> you provide when
            you sign up: restaurant name, contact name, email, phone, and
            billing details processed by our payment provider.
          </li>
          <li>
            <strong>Call audio, transcripts, and order data</strong> generated
            when {SITE_NAME} answers a call on your behalf, including what a
            caller ordered and any payment details collected to complete that
            order.
          </li>
          <li>
            <strong>POS and menu data</strong> synced from your connected
            point-of-sale system (see /integrations) so orders are priced and
            routed correctly.
          </li>
          <li>
            <strong>Usage and analytics data</strong> from this website (see
            the Cookies section below).
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To answer calls, take orders, and route them to your POS.</li>
          <li>To process phone-order payments through our payment processor.</li>
          <li>To provide the call-volume and revenue reporting shown in your dashboard.</li>
          <li>To improve accuracy of order-taking for your specific menu.</li>
          <li>To respond to support requests.</li>
        </ul>

        <h2>What we don&rsquo;t do</h2>
        <ul>
          <li>We don&rsquo;t sell call recordings, transcripts, or caller information to third parties.</li>
          <li>We don&rsquo;t use your customers&rsquo; order data to advertise to them on other platforms.</li>
        </ul>

        <h2>Cookies and analytics</h2>
        <p>
          This site uses Google Analytics to understand aggregate traffic
          patterns. You can opt out using your browser&rsquo;s cookie
          settings or a browser extension.
        </p>

        <h2>Data retention</h2>
        <p>
          Call recordings and transcripts are retained for as long as your
          account is active plus a reasonable period for support and dispute
          resolution, after which they are deleted or anonymized.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you or your customers are located, you may have
          rights to access, correct, or delete personal data. Contact{" "}
          <a href={`mailto:${CONTACT.supportEmail}`}>{CONTACT.supportEmail}</a>{" "}
          to make a request.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy: {" "}
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
