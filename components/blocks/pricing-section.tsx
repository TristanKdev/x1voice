"use client"

import * as React from "react"
import Link from "next/link"
import NumberFlow from "@number-flow/react"
import { motion } from "motion/react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  annualMonthlyPrice,
  MAX_ANNUAL_DISCOUNT_PCT,
  PRICING_TIERS,
} from "@/data/pricing"

/**
 * Homepage pricing. Every displayed number derives from data/pricing.ts —
 * no prices or discount percentages are hardcoded here.
 */

function PeriodSwitch({
  yearly,
  onChange,
}: {
  yearly: boolean
  onChange: (yearly: boolean) => void
}) {
  return (
    <div className="relative z-10 mx-auto flex w-fit rounded-full border border-white/15 bg-white/5 p-1">
      {[
        { label: "Monthly", value: false },
        { label: `Yearly · save ${MAX_ANNUAL_DISCOUNT_PCT}%`, value: true },
      ].map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={yearly === opt.value}
          className={cn(
            "relative h-10 rounded-full px-5 text-sm font-medium transition-colors",
            yearly === opt.value ? "text-white" : "text-white/60 hover:text-white/80"
          )}
        >
          {yearly === opt.value && (
            <motion.span
              layoutId="pricing-period-pill"
              className="absolute inset-0 rounded-full border border-brand/60 bg-gradient-to-t from-primary to-brand shadow-sm shadow-brand/60"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}

export function PricingSection() {
  const [yearly, setYearly] = React.useState(false)

  return (
    <section className="relative overflow-hidden border-t bg-[#070b16] py-24 text-white">
      {/* Backdrop: grid + blue glow (CSS only, no canvas) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-96 w-[52rem] max-w-none -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
          <h2 className="font-display text-silver-matte-dark text-3xl font-semibold sm:text-4xl">
            Priced per location. It pays for itself.
          </h2>
          <p className="text-white/60">
            No setup fees, no contract. Every plan answers calls 24/7 and
            sends orders to your POS.
          </p>
          <PeriodSwitch yearly={yearly} onChange={setYearly} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                tier.highlighted
                  ? "z-20 border-brand/40 bg-gradient-to-b from-white/10 to-white/[0.03] shadow-[0px_-13px_120px_-20px_var(--color-brand)]"
                  : "border-white/10 bg-white/[0.04]"
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-brand/60 bg-gradient-to-t from-primary to-brand px-3 py-0.5 text-xs font-semibold whitespace-nowrap">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>

              <div className="mt-3 flex items-baseline gap-1">
                {tier.monthlyPrice === "custom" ? (
                  <span className="font-display text-4xl font-semibold">Custom</span>
                ) : (
                  <>
                    <span className="font-display text-4xl font-semibold tabular-nums">
                      $
                      <NumberFlow
                        value={
                          yearly
                            ? annualMonthlyPrice(
                                tier.monthlyPrice,
                                tier.annualDiscountPct
                              )
                            : tier.monthlyPrice
                        }
                      />
                    </span>
                    <span className="text-sm text-white/50">/mo</span>
                  </>
                )}
              </div>
              <p className="mt-1 h-4 text-xs text-white/40">
                {tier.monthlyPrice !== "custom" && yearly
                  ? `billed annually (${tier.annualDiscountPct}% off)`
                  : " "}
              </p>

              <p className="mt-3 text-sm text-white/60">{tier.description}</p>
              <p className="mt-2 text-xs font-medium text-white/80">
                {tier.minutesIncluded}
              </p>

              <Link
                href={tier.ctaHref}
                className={cn(
                  "mt-6 block rounded-xl border py-3 text-center text-sm font-semibold transition-all",
                  tier.highlighted
                    ? "border-brand/60 bg-gradient-to-t from-primary to-brand shadow-lg shadow-brand/40 hover:brightness-110"
                    : "border-white/15 bg-white/5 hover:bg-white/10"
                )}
              >
                {tier.ctaLabel}
              </Link>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          Full plan comparison, minute overage rates, and the fine print live
          on the{" "}
          <Link href="/pricing" className="text-white/80 underline underline-offset-4 hover:text-white">
            pricing page
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
