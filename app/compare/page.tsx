import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllComparePages } from "@/lib/content/compare"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"
import { VoiceComparison } from "@/components/blocks/voice-comparison"

export const metadata = buildMetadata({
  title: "Compare X1 Voice",
  description:
    "Sourced, feature-by-feature comparisons between X1 Voice and other ways to handle restaurant phone calls.",
  path: "/compare",
})

export default function CompareHubPage() {
  const comparePages = getAllComparePages()

  return (
    <>
      <Breadcrumbs items={[{ name: "Compare", path: "/compare" }]} />
      <PageHeader
        eyebrow="Compare"
        title="How X1 Voice compares"
        description="Sourced pricing and feature comparisons — not marketing fluff."
      />

      {/* Full vendor matrix */}
      <VoiceComparison heading={false} />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display mb-6 text-center text-2xl font-semibold">
          Head-to-head breakdowns
        </h2>
        {comparePages.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Comparison pages are being added — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparePages.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`}>
                <Card className="group h-full p-6 transition-colors hover:border-brand/40">
                  <h2 className="font-medium">vs {c.competitorName}</h2>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {c.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand">
                    Compare
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
