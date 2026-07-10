import Link from "next/link"
import { ArrowRightIcon, HandshakeIcon, RepeatIcon, ZapIcon } from "lucide-react"

/**
 * Resellers / ISO / agency partner section. Static, presentational.
 */

const POINTS = [
  {
    icon: RepeatIcon,
    title: "Recurring revenue",
    body: "Every location you bring on pays monthly. You keep earning while X1 Voice does the work.",
  },
  {
    icon: ZapIcon,
    title: "Fast to stand up",
    body: "Live in minutes per location. No integrator, no long build. Demo it on a phone call in the room.",
  },
  {
    icon: HandshakeIcon,
    title: "Sells itself",
    body: "Restaurants already feel the missed-call problem. Call the demo line in front of them and let it close.",
  },
]

export function Resellers() {
  return (
    <section className="relative overflow-hidden border-t bg-band text-band-foreground">
      <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-band-border bg-white/5 px-3 py-1 text-xs font-semibold">
              Resellers, ISOs and agencies
            </span>
            <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Sell X1 Voice to your restaurants
            </h2>
            <p className="mt-4 max-w-lg text-band-muted">
              If you already sell to restaurants, POS, payments, delivery,
              marketing, this drops into your book. Partner terms, white-glove
              onboarding, and a product that demos itself over the phone.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
              >
                Become a partner
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-band-border bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
              >
                See what it looks like to sell
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {POINTS.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-2xl border border-band-border bg-white/[0.03] p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <p.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-band-muted">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
