import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllBlogPosts } from "@/lib/content/blog"
import { groupPosts } from "@/lib/content/blog-sections"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "Restaurant Phone Ordering Blog",
  description:
    "450 articles for restaurant owners on AI phone answering, POS integration, call handling, compliance, and the economics of every call you miss.",
  path: "/blog",
})

const LATEST_COUNT = 6

/**
 * How many posts each section previews on the index. Rendering all 450 put a
 * 579 KB HTML document on the site's most-linked page; the topic hubs carry
 * the full list, so the index only has to show enough to orient a reader.
 */
const PREVIEW_PER_SECTION = 8

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()
  const groups = groupPosts(posts)
  const latest = posts.slice(0, LATEST_COUNT)

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <PageHeader
        eyebrow="Blog"
        title="Notes on restaurant phone ordering"
        description="Written for owners and general managers. No gated PDFs, no invented statistics."
      />

      {posts.length === 0 ? (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-center text-muted-foreground">
            Posts are being added, check back soon.
          </p>
        </section>
      ) : (
        <>
          <section className="mx-auto max-w-5xl px-6 pb-4">
            <h2 className="text-xl font-medium">Latest</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <Card className="group h-full p-6 transition-colors hover:border-brand/40">
                    <p className="text-xs text-muted-foreground">{p.publishedAt}</p>
                    <h3 className="mt-1 font-medium">{p.title}</h3>
                    <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">
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
          </section>

          {/* Jump list — with this many posts, a reader needs a way in. */}
          <nav
            aria-label="Article categories"
            className="mx-auto max-w-5xl px-6 pt-10"
          >
            <ul className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/blog/topics/${g.id}`}
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:border-brand/40"
                  >
                    {g.section}
                    <span className="text-xs text-muted-foreground">
                      {g.posts.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="mx-auto max-w-5xl px-6 py-16">
            <div className="space-y-16">
              {groups.map((group) => (
                <div key={group.id} id={group.id} className="scroll-mt-24">
                  <h2 className="text-xl font-medium">
                    <Link href={`/blog/topics/${group.id}`} className="hover:text-brand">
                      {group.section}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {group.blurb}
                  </p>
                  <ul className="mt-6 divide-y border-t">
                    {group.posts.slice(0, PREVIEW_PER_SECTION).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="group block py-4 transition-colors hover:bg-secondary/40"
                        >
                          <span className="font-medium group-hover:text-brand">
                            {p.title}
                          </span>
                          <span className="mt-1 block text-sm text-muted-foreground">
                            {p.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {group.posts.length > PREVIEW_PER_SECTION ? (
                    <Link
                      href={`/blog/topics/${group.id}`}
                      className="mt-4 inline-flex text-sm text-brand hover:underline"
                    >
                      All {group.posts.length} {group.section.toLowerCase()} articles
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}
