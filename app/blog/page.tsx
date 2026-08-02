import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAllBlogPosts, type BlogPost } from "@/lib/content/blog"
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

/**
 * Sections are derived from the slug, not from frontmatter, so a new post
 * files itself the moment it lands — no per-post category field to forget.
 * Rendered in this order.
 */
const SECTIONS = [
  "How it works",
  "By restaurant type",
  "Buying guides",
  "Operations",
] as const

type Section = (typeof SECTIONS)[number]

const BUYING_SIGNALS = [
  "evaluating",
  "pricing",
  "contract",
  "onboarding",
  "pilot",
]

const QUESTION_PREFIXES = ["feature-", "how-", "what-", "can-", "does-"]

function sectionForSlug(slug: string): Section {
  if (slug.startsWith("voice-ai-for-")) return "By restaurant type"
  if (slug.includes("-vs-") || BUYING_SIGNALS.some((s) => slug.includes(s)))
    return "Buying guides"
  if (QUESTION_PREFIXES.some((p) => slug.startsWith(p))) return "How it works"
  return "Operations"
}

function groupPosts(posts: BlogPost[]): { section: Section; posts: BlogPost[] }[] {
  return SECTIONS.map((section) => ({
    section,
    posts: posts.filter((p) => sectionForSlug(p.slug) === section),
  })).filter((g) => g.posts.length > 0)
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()
  const groups = groupPosts(posts)

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
          <div className="space-y-12">
            {groups.map((group) => (
              <div key={group.section}>
                <h2 className="text-xl font-medium">{group.section}</h2>
                <div className="mt-6 space-y-4">
                  {group.posts.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`}>
                      <Card className="group p-6 transition-colors hover:border-brand/40">
                        <p className="text-xs text-muted-foreground">
                          {p.publishedAt}
                        </p>
                        <h3 className="mt-1 font-medium">{p.title}</h3>
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
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
