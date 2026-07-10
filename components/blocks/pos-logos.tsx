/**
 * POS brand data (server-safe, fully serializable). All rendering — glyphs,
 * recreations, and the real-file lockup — lives in pos-lockup.tsx (client).
 *
 * REAL LOGOS: drop an official file at `public/pos/<slug>.png` and it renders
 * automatically (see pos-lockup.tsx). Until then, each card falls back to a
 * lightweight recreation. Colors are tagged per entry so they're easy to fix.
 * The build environment had no outbound network, so official files could not
 * be fetched here — drop them in and they light up.
 */

export type PosBrand = {
  name: string
  slug: string
  color: string
  /** Overrides the displayed wordmark text (defaults to name). */
  wordmark?: string
}

export const POS_BRANDS: PosBrand[] = [
  { name: "Square", slug: "square", color: "#1A1A1A" },
  { name: "Toast", slug: "toast", color: "#FF4C00", wordmark: "toast" },
  { name: "Clover", slug: "clover", color: "#4E9A51" },
  { name: "Lightspeed", slug: "lightspeed", color: "#F5333F" },
  { name: "TouchBistro", slug: "touchbistro", color: "#009CA6" },
  { name: "SpotOn", slug: "spoton", color: "#0E9F6E" },
  { name: "Revel", slug: "revel", color: "#1C6EF2" },
  { name: "Aloha", slug: "aloha", color: "#00857D" },
  { name: "Epos Now", slug: "epos-now", color: "#00B4B0", wordmark: "epos now" },
  { name: "Snackpass", slug: "snackpass", color: "#111111" },
]
