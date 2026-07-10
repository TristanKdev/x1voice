import { GaugeIcon, HeadphonesIcon, TrendingUpIcon } from "lucide-react"

/**
 * Three operator benefits. Presentational; copy inline.
 */

const BENEFITS = [
  {
    icon: HeadphonesIcon,
    title: "Never put another customer on hold",
    body: "Handles unlimited simultaneous calls, quotes wait times, sends directions, and routes edge cases. Stay responsive through lunch and dinner rush so every caller becomes a customer.",
  },
  {
    icon: TrendingUpIcon,
    title: "More phone revenue, less labor cost",
    body: "Offload routine calls and order-taking so you staff leaner. Smart prompts nudge add-ons and popular combos that lift average ticket without extra training.",
  },
  {
    icon: GaugeIcon,
    title: "Supercharge front-of-house efficiency",
    body: "No phone interruptions at the host stand or counter. Fewer errors, faster turns, and clean tickets synced to your systems keep service smooth.",
  },
]

export function Benefits() {
  return (
    <section className="border-t bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border bg-card p-7 transition hover:border-brand/30 hover:shadow-[0_12px_40px_-16px_color-mix(in_srgb,var(--color-brand)_30%,transparent)]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/5 text-brand">
                <b.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
