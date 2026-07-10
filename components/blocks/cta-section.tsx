import Link from "next/link"
import { PhoneCallIcon } from "lucide-react"

import { DEMO_LINE } from "@/data/site"

/**
 * Sitewide closing CTA (dark band). Presentational, primary dials the demo
 * line directly, secondary routes to the contact page.
 */
export function CtaSection({
  title = "Hear it answer a real call.",
  description = "Call the demo line and order like a customer would, or book time and we'll walk your team through it.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="relative overflow-hidden border-t bg-band text-band-foreground">
      <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-band-muted">{description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${DEMO_LINE.tel}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
          >
            <PhoneCallIcon className="size-4" />
            Call the demo line
          </a>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-band-border bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  )
}
