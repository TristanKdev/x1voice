"use client"

import * as React from "react"

import { track } from "@/lib/analytics"

/**
 * One delegated click listener for the conversions that live on plain links,
 * so the CTA components stay server components. Anything that needs a payload
 * the DOM doesn't carry (form submissions) calls `track()` directly instead.
 *
 * Captured here:
 *   - `tel:` links            → demo_call_click   (the primary conversion)
 *   - `mailto:` links         → outbound_click
 *   - off-site links          → outbound_click
 *   - `data-track="<event>"`  → that event, with any `data-track-*` as params
 */
export function AnalyticsEvents() {
  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const el = target?.closest<HTMLElement>("a, button")
      if (!el) return

      const explicit = el.dataset.track
      if (explicit) {
        const params: Record<string, string> = {}
        for (const [key, value] of Object.entries(el.dataset)) {
          if (key === "track" || value === undefined) continue
          if (!key.startsWith("track")) continue
          const name = key.slice(5)
          params[name.charAt(0).toLowerCase() + name.slice(1)] = value
        }
        track(explicit as Parameters<typeof track>[0], params)
        return
      }

      const href = el.getAttribute("href")
      if (!href) return

      const placement =
        el.closest("[data-section]")?.getAttribute("data-section") ??
        el.closest("section")?.id ??
        (el.closest("header") ? "header" : el.closest("footer") ? "footer" : "body")

      if (href.startsWith("tel:")) {
        track("demo_call_click", {
          phone_number: href.replace("tel:", ""),
          placement,
          page_path: window.location.pathname,
        })
        return
      }

      if (href.startsWith("mailto:")) {
        track("outbound_click", {
          link_url: href,
          placement,
          page_path: window.location.pathname,
        })
        return
      }

      if (/^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) {
        track("outbound_click", {
          link_url: href,
          link_domain: new URL(href).hostname,
          placement,
          page_path: window.location.pathname,
        })
      }
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
