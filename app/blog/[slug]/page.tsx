import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content/blog"
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

      {post.faqs?.length ? (
        <section className="border-t">
          <div className="mx-auto max-w-2xl px-6 py-20">
            <h2 className="text-center text-3xl font-display font-medium">
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
