export type NavLink = {
  label: string
  href: string
}

/**
 * Single source of truth for the primary header nav. The old site's nav
 * pointed at in-page anchors (#features, #pricing) instead of real routes —
 * every entry here is a real, crawlable page.
 */
export const MAIN_NAV: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
]

export const FOOTER_COMPANY: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]

export const FOOTER_PRODUCT: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "Locations we serve", href: "/locations" },
]
