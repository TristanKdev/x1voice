import Link from "next/link"
import { PhoneCallIcon } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { BackToTop } from "@/components/site/back-to-top"
import { SITE_NAME, DEMO_LINE } from "@/data/site"
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

      {/* Closing CTA */}
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-14">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-band-border pb-14 md:flex-row md:items-end">
          <div>
            <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Ready to stop missing calls?
            </h2>
            <p className="mt-3 max-w-md text-band-muted">
              Call the demo line and hear it yourself, or book time with the team.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${DEMO_LINE.tel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
            >
              <PhoneCallIcon className="size-4" />
              Call the demo line
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-band-border bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
            >
              Book a demo
            </Link>
          </div>
        </div>

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
