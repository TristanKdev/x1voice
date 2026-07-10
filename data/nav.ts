export type NavLink = {
  label: string
  href: string
}

/**
 * Single source of truth for the primary header nav. Blog is intentionally
 * NOT here — it stays a crawlable backlink from the footer only (FOOTER_COMPANY).
 * "Plans" points at /pricing (route kept for stable links; label updated).
 */
export const MAIN_NAV: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Compare", href: "/compare" },
  { label: "Plans", href: "/pricing" },
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
  { label: "Plans", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "Request a feature", href: "/request-feature" },
  { label: "Locations we serve", href: "/locations" },
]
