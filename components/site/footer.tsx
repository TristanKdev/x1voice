import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { BackToTop } from "@/components/site/back-to-top"
import { SITE_NAME } from "@/data/site"
import { FOOTER_COMPANY, FOOTER_PRODUCT } from "@/data/nav"
import { getAllSolutions } from "@/lib/content/solutions"
import { getAllComparePages } from "@/lib/content/compare"

/**
 * Sectioned closing footer: a final call-to-action band, generated link
 * columns (so a page can't silently drop out of the footer or sitemap), a
 * giant faint wordmark, and a bottom bar. Server component; the only client
 * bit is the back-to-top button.
 */
export function SiteFooter() {
  const solutions = getAllSolutions()
  const comparePages = getAllComparePages()

  return (
    <footer className="relative overflow-hidden border-t bg-band text-band-foreground">
      <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-14">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" aria-label={SITE_NAME}>
              <Logo />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-band-muted">
              The AI phone agent for restaurants. Answers every call, takes the
              order, sends it to your POS.
            </p>
          </div>

          <FooterColumn title="Product" links={FOOTER_PRODUCT} />
          <FooterColumn
            title="Solutions"
            links={[
              { label: "All solutions", href: "/solutions" },
              ...solutions.slice(0, 6).map((s) => ({
                label: s.restaurantType,
                href: `/solutions/${s.slug}`,
              })),
            ]}
          />
          <FooterColumn
            title="Company"
            links={FOOTER_COMPANY}
          />
        </div>

        {/* Compare row (kept for SEO, generated) */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-band-border pt-8 text-xs text-band-muted">
          <span className="font-semibold text-band-foreground/80">Compare:</span>
          <Link href="/compare" className="hover:text-band-foreground">
            All comparisons
          </Link>
          {comparePages.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="hover:text-band-foreground">
              vs {c.competitorName}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-band-muted">
            © 2026 {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-band-muted">
            <Link href="/privacy" className="hover:text-band-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-band-foreground">Terms</Link>
            <Link href="/support" className="hover:text-band-foreground">Support</Link>
            <BackToTop />
          </div>
        </div>
      </div>

      {/* Giant faint wordmark */}
      <div
        aria-hidden
        className="font-display pointer-events-none relative -mb-[0.18em] select-none text-center text-[22vw] leading-none font-black tracking-tighter text-white/[0.04]"
      >
        X1 VOICE
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
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-band-muted hover:text-band-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
