import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type BlogFrontmatter = {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  /** ISO date this post's factual claims/stats were last checked against source. */
  faqs?: { question: string; answer: string }[]
}

export type BlogPost = BlogFrontmatter & {
  slug: string
  content: string
}

let cache: BlogPost[] | null = null

export function getAllBlogPosts(): BlogPost[] {
  if (cache) return cache
  if (!fs.existsSync(BLOG_DIR)) {
    cache = []
    return cache
  }
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
  cache = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
      const { data, content } = matter(raw)
      return { ...(data as BlogFrontmatter), slug, content }
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  return cache
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug)
}
