/**
 * The complete set of events this site pushes to the dataLayer, in one plain
 * array so both the typed helper (lib/analytics.ts) and the inline click
 * tracker (lib/analytics-inline.ts) validate against the same list. GTM
 * triggers are built against these exact strings.
 *
 * Every name here must actually be emitted somewhere. An event declared and
 * never fired is a GTM trigger someone configures, marks as a conversion, and
 * then waits forever on.
 */
export const SITE_EVENTS = [
  "demo_call_click",
  "contact_form_submit",
  "feature_request_submit",
  "pricing_plan_click",
  "outbound_click",
] as const

export type SiteEvent = (typeof SITE_EVENTS)[number]
