"use client"

import * as React from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { PRICING_TIERS } from "@/data/pricing"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PricingTable() {
  const [annual, setAnnual] = React.useState(false)

  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-3">
        <span
          className={`text-sm ${!annual ? "font-medium text-foreground" : "text-muted-foreground"}`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual((v) => !v)}
          className="relative h-6 w-11 shrink-0 rounded-full bg-muted transition-colors data-[on=true]:bg-brand"
          data-on={annual}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-background shadow transition-transform ${annual ? "translate-x-5.5 left-0.5" : "left-0.5"}`}
          />
        </button>
        <span
          className={`text-sm ${annual ? "font-medium text-foreground" : "text-muted-foreground"}`}
        >
          Annual{" "}
          <Badge variant="secondary" className="ml-1">
            Save 15%
          </Badge>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING_TIERS.map((tier) => {
          const price =
            tier.monthlyPrice === "custom"
              ? null
              : annual
                ? Math.round(
                    tier.monthlyPrice * (1 - tier.annualDiscountPct / 100)
                  )
                : tier.monthlyPrice

          return (
            <Card
              key={tier.name}
              className={`relative flex flex-col p-6 ${tier.highlighted ? "border-brand ring-1 ring-brand" : ""}`}
            >
              {tier.highlighted ? (
                <Badge className="absolute -top-3 left-6 bg-brand text-brand-foreground">
                  Most popular
                </Badge>
              ) : null}
              <h3 className="font-medium">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                {price === null ? (
                  <span className="text-3xl font-semibold">Custom</span>
                ) : (
                  <>
                    <span className="text-3xl font-semibold">${price}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {tier.minutesIncluded}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-6"
                variant={tier.highlighted ? "default" : "outline"}
                nativeButton={false}
                render={<Link href={tier.ctaHref}>{tier.ctaLabel}</Link>}
              />
            </Card>
          )
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        No setup fees. No long-term contract. Cancel anytime.
      </p>
    </div>
  )
}
