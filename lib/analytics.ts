"use client"

import { sendGTMEvent } from "@next/third-parties/google"

/**
 * The complete set of events the site pushes to the dataLayer. Adding a
 * string here is the only way to add an event — GTM triggers are built
 * against these exact names, so a typo in a component would otherwise be a
 * silently dead conversion.
 *
 * In GTM: create a Custom Event trigger per name, then a GA4 Event tag
 * pointing at the GA4 configuration tag. `demo_call_click`, `demo_booking_open`
 * and `contact_form_submit` are the three worth marking as conversions.
 */
export type SiteEvent =
  | "demo_call_click"
  | "demo_booking_open"
  | "contact_form_submit"
  | "feature_request_submit"
  | "pricing_plan_click"
  | "cta_click"
  | "outbound_click"

type EventParams = Record<string, string | number | boolean | undefined>

/**
 * Push a named event to the GTM dataLayer. No-ops safely when the container
 * hasn't loaded (ad blocker, GTM_ID unset) because sendGTMEvent creates the
 * queue first.
 */
export function track(event: SiteEvent, params: EventParams = {}): void {
  const payload: Record<string, unknown> = { event }
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value
  }
  sendGTMEvent(payload)
}
