import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { CONTACT, SITE_NAME } from "@/data/site"

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How X1 Voice collects, uses, stores, and protects data from restaurant phone calls, including call recordings, transcripts, caller details, and payment information.",
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
          This site loads Google Tag Manager, which in turn loads Google
          Analytics 4. We use it to understand aggregate traffic patterns:
          which pages are read, which links are clicked, and whether a visit
          ended in a contact form submission or a tap on our demo number.
        </p>
        <p>
          What that involves: analytics cookies set by Google, your IP address
          (truncated by Google before storage), your approximate location, the
          pages you view on this site, and the referring site or search that
          brought you here. We do not send names, email addresses, or phone
          numbers you type into our forms to any analytics tool.
        </p>
        <p>
          Because tags are managed through a container, the exact set can
          change over time; advertising tags, if we add any, would be listed
          here before they run. You can opt out with your browser&rsquo;s
          cookie settings, a tracking-blocker extension, or Google&rsquo;s own
          opt-out add-on. Blocking analytics does not affect any part of this
          site&rsquo;s functionality.
        </p>
        <p>
          This section describes the marketing website only. Data from calls
          your restaurant&rsquo;s customers place to an X1 Voice number is
          governed by the sections above and is never sent to an analytics or
          advertising vendor.
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
