import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllSolutions } from "@/lib/content/solutions"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "Solutions by Restaurant Type",
  description:
    "How X1 Voice adapts to pizza, fast casual, fine dining, ghost kitchens, and every other restaurant type.",
  path: "/solutions",
})

export default function SolutionsHubPage() {
  const solutions = getAllSolutions()

  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} />
      <PageHeader
        eyebrow="Solutions"
        title="Built for how your restaurant runs"
        description="Every restaurant type has different call patterns. See what changes for yours."
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        {solutions.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Solution pages are being added, check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`}>
                <Card className="group h-full p-6 transition-colors hover:border-brand/40">
                  <h2 className="font-medium">{s.restaurantType}</h2>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {s.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand">
                    Learn more
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
