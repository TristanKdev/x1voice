import type { NextConfig } from "next"

// A nonce-based script-src (no 'unsafe-inline') would be stricter, but per
// Next's own CSP guide it requires ALL pages to render dynamically — nonces
// are applied per-request via Proxy, so static generation/ISR is disabled
// site-wide. That's a bad trade for a marketing site that's mostly static,
// programmatic-SEO pages meant to be CDN-cached, and it isn't handling
// sensitive data. So this follows Next's documented "Without Nonces"
// pattern: 'unsafe-inline' plus an explicit domain allowlist for the two
// third-party scripts we actually load (GA4, Cal.com embed). The old site's
// actual bug — script-src only allowing 'self' while still injecting a
// googletagmanager.com script — is what's fixed here, via the allowlist.
// React uses eval() in development only (reconstructing server error stacks
// in the browser) — never in production. Without this, dev mode itself trips
// the CSP.
const isDev = process.env.NODE_ENV === "development"

const CSP = [
  "default-src 'self'",
  // googletagmanager.com serves both gtm.js and, for tags configured in the
  // container, gtag.js. googleadservices/doubleclick are here because a Google
  // Ads conversion tag added in the GTM UI loads from them — without the entry
  // the tag is CSP-blocked at runtime with no build-time signal, which reads to
  // whoever configured it as "the tag just doesn't fire".
  //
  // ANY OTHER VENDOR TAG (Meta, LinkedIn, TikTok, Hotjar...) added in GTM needs
  // its origin added here first. That is the deliberate trade for not running
  // an open script-src.
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://*.doubleclick.net https://app.cal.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  // Both the bare host and the wildcard: a CSP host wildcard matches
  // subdomains only, so `*.analytics.google.com` never covers
  // `analytics.google.com` itself. stats.g.doubleclick.net is GA4 with Google
  // Signals enabled.
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://app.cal.com",
  // 'self' is listed explicitly: frame-src is declared, so it does not inherit
  // default-src, and a future same-origin iframe would otherwise break.
  // googletagmanager.com is the GTM <noscript> iframe; tagassistant is GTM
  // Preview mode's debug pane.
  "frame-src 'self' https://app.cal.com https://www.googletagmanager.com https://tagassistant.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ")

const PRODUCTION_HOST = "x1voice.com"

const nextConfig: NextConfig = {
  /**
   * One URL per page, no trailing-slash twin. This is Next's default; it is
   * stated explicitly because changing it later silently doubles every URL on
   * the site and invalidates every canonical tag at once.
   */
  trailingSlash: false,

  /**
   * Canonical-form redirects. The <link rel="canonical"> tag is a hint; a 301
   * is an instruction. Without these, www.x1voice.com/pricing and
   * x1voice.com/pricing are two crawlable URLs serving identical content, and
   * link equity splits between them.
   */
  async redirects() {
    return [
      // www → apex, preserving the path. Everything else on the site — the
      // canonical tags, the sitemap, the JSON-LD @ids — is written with the
      // apex host, so www must not be independently crawlable.
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${PRODUCTION_HOST}` }],
        destination: `https://${PRODUCTION_HOST}/:path*`,
        permanent: true,
      },
      // Directory-index and homepage aliases people and old links still use.
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      // Blog path variants. The posts live at /blog/<slug>; these are the
      // shapes other CMSes use, and the ones inbound links tend to be written
      // against.
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/posts/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/posts", destination: "/blog", permanent: true },
      { source: "/article/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/articles/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/news/:slug", destination: "/blog/:slug", permanent: true },
      // Section aliases.
      { source: "/integrations/pos", destination: "/integrations", permanent: true },
      { source: "/pos", destination: "/integrations", permanent: true },
      { source: "/pos-integrations", destination: "/integrations", permanent: true },
      { source: "/plans", destination: "/pricing", permanent: true },
      { source: "/price", destination: "/pricing", permanent: true },
      { source: "/demo", destination: "/#see-it", permanent: true },
      { source: "/book-a-demo", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/help", destination: "/support", permanent: true },
      { source: "/faq", destination: "/support", permanent: true },
      { source: "/partner", destination: "/partners", permanent: true },
      { source: "/reseller", destination: "/resellers", permanent: true },
      { source: "/careers", destination: "/about", permanent: true },
      // Feed aliases — readers guess these.
      { source: "/rss", destination: "/feed.xml", permanent: true },
      { source: "/rss.xml", destination: "/feed.xml", permanent: true },
      { source: "/feed", destination: "/feed.xml", permanent: true },
      // Sitemap aliases, including the shape Next used to serve.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemaps.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap/:section.xml", destination: "/sitemaps/:section.xml", permanent: true },
    ]
  },
  // Silences Turbopack's workspace-root inference — an unrelated
  // package-lock.json in the user's home directory (outside this project)
  // would otherwise be misdetected as the workspace root.
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

export default nextConfig
