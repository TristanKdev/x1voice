import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  PRICING_TIERS,
  SHARED_FEATURES,
  minutesLabel,
  overageLabel,
} from "@/data/pricing"

/**
 * Homepage "Plans" section (light theme). Every number comes from
 * data/pricing.ts, no hardcoded prices. Starter is the anchor at
 * $250/mo including 750 minutes; Enterprise routes to contact.
 */

export function PlansSection() {
  return (
    <section id="plans" className="scroll-mt-20 border-t py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            Plans
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Every plan, every feature. Pick your minutes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            No contracts. Self-serve. Every plan has the exact same feature set,
            the only thing that changes is the minutes included and the
            per-minute rate after you use them.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {PRICING_TIERS.filter((t) =>
            ["Starter", "Professional", "Enterprise"].includes(t.name)
          ).map((tier) => {
            const highlighted = tier.name === "Starter"
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card p-7",
                  highlighted
                    ? "border-brand ring-1 ring-brand shadow-[0_20px_60px_-24px_color-mix(in_srgb,var(--color-brand)_60%,transparent)]"
                    : "border-border"
                )}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-brand-foreground">
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>

                <div className="mt-3 flex items-baseline gap-1">
                  {tier.monthlyPrice === "custom" ? (
                    <span className="font-display text-4xl font-bold tracking-tight">
                      Let&rsquo;s talk
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-4xl font-bold tracking-tight tabular-nums">
                        ${tier.monthlyPrice}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </>
                  )}
                </div>

                <p className="mt-2 text-sm font-medium text-brand">
                  {minutesLabel(tier)}
                  {tier.overagePerMin !== "custom" && (
                    <span className="text-muted-foreground"> · {overageLabel(tier)}</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

                <Link
                  href={tier.monthlyPrice === "custom" ? "/contact" : tier.ctaHref}
                  className={cn(
                    "mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition",
                    highlighted
                      ? "bg-brand text-brand-foreground hover:bg-brand-bright"
                      : "border border-border bg-secondary/60 hover:bg-secondary"
                  )}
                >
                  {tier.monthlyPrice === "custom" ? "Contact us" : tier.ctaLabel}
                </Link>

                <p className="mt-6 border-t pt-5 text-xs font-semibold tracking-wide text-foreground uppercase">
                  Everything included
                </p>
                <ul className="mt-3 space-y-2.5">
                  {SHARED_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Same features on every plan. Usage past your included minutes is billed
          at your plan&rsquo;s per-minute rate, nothing else. No setup fee, cancel
          anytime. Ultra-high volume?{" "}
          <Link href="/pricing" className="font-semibold text-brand hover:underline">
            See all plans and minute options
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
