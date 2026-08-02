import { getAllBlogPosts } from "@/lib/content/blog"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site"

export const dynamic = "force-static"

const FEED_URL = `${SITE_URL}/feed.xml`
const BLOG_URL = `${SITE_URL}/blog`

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/** RSS 2.0 requires RFC 822 dates; frontmatter dates are plain YYYY-MM-DD. */
function toRfc822(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`)
  return Number.isNaN(parsed.getTime())
    ? new Date(0).toUTCString()
    : parsed.toUTCString()
}

/**
 * Reads the same getAllBlogPosts() as the blog index and the sitemap, so the
 * feed can never drift from the set of posts that actually exist.
 */
export async function GET() {
  const posts = getAllBlogPosts()

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`
      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(p.description)}</description>`,
        `      <pubDate>${toRfc822(p.publishedAt)}</pubDate>`,
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const lastBuildDate = posts.length
    ? toRfc822(posts[0].publishedAt)
    : new Date(0).toUTCString()

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>`,
    `    <link>${escapeXml(BLOG_URL)}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ]
    .filter((line) => line !== "")
    .join("\n")

  return new Response(xml + "\n", {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
