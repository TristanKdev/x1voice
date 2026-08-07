import Link from "next/link"
import { notFound } from "next/navigation"

import { getAllBlogPosts } from "@/lib/content/blog"
import { ALL_SECTIONS, postsInSection, sectionById } from "@/lib/content/blog-sections"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { buildCollectionPageJsonLd } from "@/lib/seo/jsonld"
import { CtaSection } from "@/components/blocks/cta-section"

export const dynamicParams = false

/**
 * Section blurbs run 30–66 characters, so a fixed description template lands
 * anywhere between 109 and 178. These tails are tried longest-first and the
 * first one that fits inside 160 wins, which puts every hub in the 140–160
 * band without hand-writing eleven descriptions that would then drift.
 */
const TOPIC_DESC_TAILS = [
  " Written for restaurant owners and GMs, with no invented statistics.",
  " Written for owners and GMs, not for search engines.",
  " Practical, operator-first, no fluff.",
  " For owners and GMs.",
]

function buildTopicDescription(
  count: number,
  section: string,
  blurb: string
): string {
  const head = `${count} articles on ${section.toLowerCase()} for restaurant operators. ${blurb}`
  for (const tail of TOPIC_DESC_TAILS) {
    if (head.length + tail.length <= 160) return head + tail
  }
  return head
}

/**
 * One indexable page per blog section. Before these existed the sections were
 * anchors on /blog, which meant a topic cluster had no URL of its own to rank
 * or to be cited by an assistant, and every post in a 450-post blog was two
 * clicks from anything related to it.
 */
export function generateStaticParams() {
  const posts = getAllBlogPosts()
  return ALL_SECTIONS.filter((s) => postsInSection(posts, s.id).length > 0).map(
    (s) => ({ topic: s.id })
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>
}) {
  const { topic } = await params
  const section = sectionById(topic)
  if (!section) return {}
  const count = postsInSection(getAllBlogPosts(), topic).length
  return buildMetadata({
    title: `${section.section} — restaurant phone ordering`,
    // Composed rather than concatenated blindly: section blurbs run 30–66
    // characters, so a fixed template lands anywhere from 102 to 178. This
    // builds the sentence and then only adds the tail if there is room, which
    // keeps every hub inside the 140–160 band.
    description: buildTopicDescription(count, section.section, section.blurb),
    path: `/blog/topics/${topic}`,
    exactTitle: true,
  })
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>
}) {
  const { topic } = await params
  const section = sectionById(topic)
  if (!section) notFound()

  const posts = postsInSection(getAllBlogPosts(), topic)
  if (posts.length === 0) notFound()

  const siblings = ALL_SECTIONS.filter(
    (s) => s.id !== topic && postsInSection(getAllBlogPosts(), s.id).length > 0
  )

  return (
    <>
      <JsonLd
        data={buildCollectionPageJsonLd({
          name: section.section,
          description: section.blurb,
          path: `/blog/topics/${topic}`,
          items: posts.map((p) => ({
            name: p.title,
            path: `/blog/${p.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: section.section, path: `/blog/topics/${topic}` },
        ]}
      />
      <PageHeader
        eyebrow={`${posts.length} articles`}
        title={section.section}
        description={section.blurb}
      />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <ul className="divide-y border-t">
          {posts.map((p) => (
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
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          Other topics
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {siblings.map((s) => (
            <li key={s.id}>
              <Link
                href={`/blog/topics/${s.id}`}
                className="inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:border-brand/40"
              >
                {s.section}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection />
    </>
  )
}
