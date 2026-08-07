import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content/blog"
import { relatedPosts, sectionForSlug } from "@/lib/content/blog-sections"
import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildFaqJsonLd } from "@/lib/seo/jsonld"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const rule = sectionForSlug(post.slug)
  const wordCount = post.content.split(/\s+/).filter(Boolean).length

  // Related posts rotate through the section rather than always pointing at
  // the newest few, so every post in a 450-post blog gets inbound links from
  // its siblings instead of the link equity pooling on four pages.
  const related = relatedPosts(getAllBlogPosts(), post.slug, 4)

  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            section: rule.section,
            wordCount,
          }),
          ...(post.faqs?.length ? [buildFaqJsonLd(post.faqs)] : []),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <PageHeader
        eyebrow={post.publishedAt}
        title={post.title}
        description={post.description}
      />

      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-2xl px-6 py-16">
        <MDXRemote source={post.content} />
      </article>

      {related.length ? (
        <section className="mx-auto max-w-2xl px-6 pb-4">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
            More on{" "}
            <Link href={`/blog/topics/${rule.id}`} className="hover:text-brand">
              {rule.section.toLowerCase()}
            </Link>
          </h2>
          <ul className="mt-4 divide-y border-t">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block py-3 text-sm hover:text-brand"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/blog/topics/${rule.id}`}
            className="mt-4 inline-flex text-sm text-brand hover:underline"
          >
            All {rule.section.toLowerCase()} articles
          </Link>
        </section>
      ) : null}

      {post.faqs?.length ? (
        <section className="border-t">
          <div className="mx-auto max-w-2xl px-6 py-20">
            <h2 className="text-center text-3xl font-display font-semibold">
              Frequently asked questions
            </h2>
            <div className="mt-10">
              <FaqAccordion faqs={post.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection />
    </>
  )
}
