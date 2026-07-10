import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { SITE_NAME, SITE_DESCRIPTION } from "@/data/site"
import { FOOTER_COMPANY, FOOTER_PRODUCT } from "@/data/nav"
import { getAllSolutions } from "@/lib/content/solutions"
import { getAllComparePages } from "@/lib/content/compare"

/**
 * Every column here is generated from live content data (data/nav.ts or the
 * content getters), the old site's footer hand-listed only 6 of 11
 * solutions and 5 of 7 compare pages. A page can't silently drop out of the
 * footer here without also dropping out of the sitemap.
 */
export function SiteFooter() {
  const solutions = getAllSolutions()
  const comparePages = getAllComparePages()

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" aria-label={SITE_NAME}>
              <Logo />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <FooterColumn title="Product" links={FOOTER_PRODUCT} />

          <FooterColumn
            title="Solutions"
            links={[
              { label: "All solutions", href: "/solutions" },
              ...solutions.map((s) => ({
                label: s.restaurantType,
                href: `/solutions/${s.slug}`,
              })),
            ]}
          />

          <FooterColumn
            title="Compare"
            links={[
              { label: "All comparisons", href: "/compare" },
              ...comparePages.map((c) => ({
                label: `vs ${c.competitorName}`,
                href: `/compare/${c.slug}`,
              })),
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {FOOTER_COMPANY.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
