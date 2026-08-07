import { getAllRoutes } from "@/lib/seo/routes"
import { getAllBlogPosts } from "@/lib/content/blog"
import { ALL_SECTIONS, postsInSection } from "@/lib/content/blog-sections"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, CONTACT, DEMO_LINE } from "@/data/site"

export const dynamic = "force-static"

/**
 * Built from the same getAllRoutes() that feeds the sitemaps, so this file can
 * never list a page that doesn't exist or omit one that does.
 *
 * Structured rather than flat: a model reading 500 undifferentiated links
 * learns the site has many pages and little else. Leading with what the
 * product does, what it costs, and what it connects to — in plain sentences a
 * model can quote — is the part that actually shows up in an answer. The link
 * list is grouped by topic underneath so a crawler can follow one cluster
 * instead of the whole corpus.
 */
export async function GET() {
  const routes = getAllRoutes().filter((r) => r.index)
  const posts = getAllBlogPosts()

  const byPrefix = (prefix: string) =>
    routes.filter((r) => r.path.startsWith(prefix) && r.path !== prefix)

  const marketing = routes.filter(
    (r) =>
      !r.path.startsWith("/blog") &&
      !r.path.startsWith("/solutions/") &&
      !r.path.startsWith("/compare/") &&
      !r.path.startsWith("/integrations/") &&
      !r.path.startsWith("/locations/")
  )

  const link = (title: string, path: string, description: string) =>
    `- [${title}](${SITE_URL}${path}): ${description}`

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## What it is",
    "",
    `${SITE_NAME} is an AI phone agent for restaurants. It answers the restaurant's`,
    "phone, takes pickup and delivery orders including modifiers and substitutions,",
    "takes card payments over the phone, answers questions about hours, allergens and",
    "order status, and transfers the caller to a person when the situation calls for",
    "one. Completed orders are written into the restaurant's point-of-sale system as",
    "tickets, not as messages for staff to re-key.",
    "",
    "## Key facts",
    "",
    "- Plans start at $250/month. Every plan has the same features; the included",
    "  minutes and the per-minute overage rate are what differ. No setup fee, no",
    "  long-term contract.",
    "- Direct POS integrations: Square, Clover, OrderCounter. Toast, Lightspeed,",
    "  TouchBistro, SpotOn, Aloha, Revel, PAR Brink, Micros Simphony and others are",
    "  reached through Deliverect.",
    "- Typical setup is under 24 hours: connect the POS, import the menu, set the",
    "  greeting, set hours and rules, then test.",
    "- Multi-language: the agent answers callers in their language while the kitchen",
    "  ticket stays in the format the staff reads.",
    "- Multi-location and franchise groups are supported, with shared menus, per-store",
    "  overrides, local numbers and roll-up reporting.",
    `- Anyone can hear it: call the public demo line at ${DEMO_LINE.display} and order`,
    "  like a customer. Calls to that line are recorded.",
    `- Contact: ${CONTACT.salesEmail} (sales), ${CONTACT.supportEmail} (support).`,
    "",
    "## Main pages",
    "",
    ...marketing.map((r) => link(r.title, r.path, r.description)),
    "",
    "## By restaurant type",
    "",
    ...byPrefix("/solutions/").map((r) => link(r.title, r.path, r.description)),
    "",
    "## Comparisons",
    "",
    ...byPrefix("/compare/").map((r) => link(r.title, r.path, r.description)),
    "",
    "## POS and platform integrations",
    "",
    ...byPrefix("/integrations/").map((r) => link(r.title, r.path, r.description)),
    "",
    "## Locations",
    "",
    ...byPrefix("/locations/").map((r) => link(r.title, r.path, r.description)),
    "",
    `## Articles (${posts.length}), by topic`,
    "",
  ]

  for (const section of ALL_SECTIONS) {
    const sectionPosts = postsInSection(posts, section.id)
    if (sectionPosts.length === 0) continue
    lines.push(
      `### ${section.section} (${sectionPosts.length})`,
      "",
      `${section.blurb} Index: ${SITE_URL}/blog/topics/${section.id}`,
      "",
      ...sectionPosts.map((p) => link(p.title, `/blog/${p.slug}`, p.description)),
      ""
    )
  }

  return new Response(lines.join("\n").replace(/\n{3,}/g, "\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
