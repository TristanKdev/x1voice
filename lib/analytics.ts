"use client"

import { SITE_EVENTS, type SiteEvent } from "@/lib/analytics-events-list"

export type { SiteEvent }

type EventParams = Record<string, string | number | boolean | undefined>

/**
 * Push a named event to the GTM dataLayer from a React component. Link and
 * button clicks are handled by the delegated tracker in the document head
 * (lib/analytics-inline.ts); this is for events that carry state the DOM does
 * not, such as a form submission that succeeded.
 *
 * Safe before GTM loads: the queue is created if it does not exist yet.
 */
export function track(event: SiteEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return
  if (!SITE_EVENTS.includes(event)) return

  const payload: Record<string, unknown> = { event }
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value
  }

  const w = window as Window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push(payload)
}
