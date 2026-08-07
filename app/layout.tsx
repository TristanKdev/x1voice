import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"

import "./globals.css"
import { ThemeProvider } from "@/components/site/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { CLICK_TRACKER, gtmBootstrap } from "@/lib/analytics-inline"
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/jsonld"
import { buildMetadata } from "@/lib/seo/metadata"
import { GA_ID, GTM_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${SITE_NAME} — AI Phone Agent for Restaurants`,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  title: {
    default: `${SITE_NAME} — AI Phone Agent for Restaurants`,
    template: `%s — ${SITE_NAME}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*
        GTM, as early as the App Router actually allows.

        Verified in the build output: with `beforeInteractive` the snippet is
        inlined in the prerendered HTML and executed by Next's early bootstrap
        queue, before hydration. It is NOT literally inside <head> — Next 16
        emits beforeInteractive scripts through `self.__next_s` near the top of
        <body>, and the App Router gives no supported way to inject a raw
        inline <script> into <head>. What Google's snippet needs is to run
        before the page becomes interactive, and this does.

        The previous version used @next/third-parties' GoogleTagManager, which
        is `afterInteractive`: the prerendered HTML carried only a preload hint
        and no dataLayer existed until hydration finished. The click tracker
        ships the same way, so a tap on the header's demo number counts even if
        it lands before React hydrates.
      */}
      {GTM_ID ? (
        <>
          <Script
            id="gtm-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: gtmBootstrap(GTM_ID) }}
          />
          <Script
            id="analytics-click-tracker"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: CLICK_TRACKER }}
          />
        </>
      ) : null}
      <body className="flex min-h-full flex-col">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {/*
          Hoisted into <head> by React. Not routed through buildMetadata's
          `alternates` because every page overrides that key with its own
          canonical, which would drop the feed link everywhere but home.
        */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} Blog`}
          href={`${SITE_URL}/feed.xml`}
        />
        {/* Organization + WebSite JSON-LD emitted exactly once, here, nowhere else. */}
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
        {/* Only fires if NEXT_PUBLIC_GA_ID is set — normally GA4 comes through GTM. */}
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  )
}
