import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { CtaSection } from "@/components/blocks/cta-section"
import { LANGUAGES } from "@/data/languages"

export const metadata = buildMetadata({
  title: "Languages the Phone Agent Answers In",
  description:
    "X1 Voice answers restaurant calls in the caller's language, English, Spanish, and many more, while the ticket stays in the format your kitchen reads.",
  path: "/languages",
})

export default function LanguagesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Languages", path: "/languages" }]} />
      <PageHeader
        eyebrow="Languages"
        title="Answer callers in their language"
        description="X1 Voice detects the caller's language and responds in it, while the order still fires into your POS in the format your kitchen reads. Here are the languages we commonly support. Need one that isn't listed? Ask us."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {LANGUAGES.map((l) => (
            <div
              key={l.name}
              className="rounded-xl border bg-card p-4 transition hover:border-brand/30"
            >
              <div className="font-display text-lg font-semibold">{l.native}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{l.name}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Coverage grows over time and varies by plan. This list is a
          representative sample, not an exhaustive or guaranteed set. Tell us the
          languages your callers use and we&rsquo;ll confirm what we support for
          your restaurant.
        </p>
      </section>

      <CtaSection
        title="Hear it answer in your callers' language"
        description="Call the demo line, or book time and we'll walk your team through it."
      />
    </>
  )
}
