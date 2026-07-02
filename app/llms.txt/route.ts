import { getAllRoutes } from "@/lib/seo/routes"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site"

export const dynamic = "force-static"

/**
 * Built from the exact same getAllRoutes() that feeds app/sitemap.ts, so
 * this file can never list a page that doesn't exist or omit one that does.
 */
export async function GET() {
  const routes = getAllRoutes().filter((r) => r.index)

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Pages",
    "",
    ...routes.map((r) => `- [${r.title}](${SITE_URL}${r.path}): ${r.description}`),
  ]

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
