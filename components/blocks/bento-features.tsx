import {
  PhoneCallIcon,
  UtensilsCrossedIcon,
  CreditCardIcon,
  PlugIcon,
  MoonStarIcon,
  BarChart3Icon,
  type LucideIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

const FEATURES: Feature[] = [
  {
    icon: PhoneCallIcon,
    title: "Answers every call",
    description:
      "Unlimited simultaneous calls, 24/7 — no more busy signals during your Friday-night rush.",
    className: "sm:col-span-2",
  },
  {
    icon: UtensilsCrossedIcon,
    title: "Takes the full order",
    description:
      "Handles modifiers, substitutions, and upsells the way your best order-taker would.",
  },
  {
    icon: CreditCardIcon,
    title: "Collects payment securely",
    description:
      "Phone-order payment collection without a human ever handling a card number.",
  },
  {
    icon: PlugIcon,
    title: "Syncs to your POS",
    description:
      "Orders land directly in your existing POS — no re-keying, no missed tickets.",
  },
  {
    icon: MoonStarIcon,
    title: "Covers after-hours",
    description:
      "Late-night and early-morning calls get answered exactly like peak hours.",
  },
  {
    icon: BarChart3Icon,
    title: "Reports on every call",
    description:
      "See answer rate, order volume, and recovered revenue in one dashboard.",
    className: "sm:col-span-2",
  },
]

export function BentoFeatures() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything a great phone shift does. Every shift.
        </h2>
        <p className="mt-4 text-muted-foreground">
          One AI phone agent, wired straight into how your restaurant already
          runs.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <Card
            key={f.title}
            className={`group relative overflow-hidden p-6 transition-colors hover:border-brand/40 ${f.className ?? ""}`}
          >
            <f.icon className="size-5 text-brand" />
            <h3 className="mt-4 font-medium">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {f.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
