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

const nextConfig: NextConfig = {
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
