import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"

import "./globals.css"
import { ThemeProvider } from "@/components/site/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { AnalyticsEvents } from "@/components/site/analytics-events"
import { JsonLd } from "@/components/seo/json-ld"
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
        GTM container script. next/script hoists it into <head> for every
        route, which is what "as high in the head as possible" means in the
        App Router — there is no per-page <head> to paste into. The noscript
        iframe below is the first thing in <body>, per Google's snippet.
      */}
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
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
        {GTM_ID ? <AnalyticsEvents /> : null}
        {/* Only fires if NEXT_PUBLIC_GA_ID is set — normally GA4 comes through GTM. */}
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  )
}
