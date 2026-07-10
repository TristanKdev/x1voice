import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllBlogPosts } from "@/lib/content/blog"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical, sourced articles on AI phone ordering, POS integration, and restaurant call handling.",
  path: "/blog",
})

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <PageHeader eyebrow="Blog" title="Notes on restaurant phone ordering" />
      <section className="mx-auto max-w-3xl px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Posts are being added, check back soon.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <Card className="group p-6 transition-colors hover:border-brand/40">
                  <p className="text-xs text-muted-foreground">
                    {p.publishedAt}
                  </p>
                  <h2 className="mt-1 font-medium">{p.title}</h2>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand">
                    Read
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
