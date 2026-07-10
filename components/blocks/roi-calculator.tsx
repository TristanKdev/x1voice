"use client"

import * as React from "react"
import { TrendingUpIcon } from "lucide-react"

/**
 * "Calculate your revenue", a rough illustration of monthly revenue recovered
 * by answering the calls that go unanswered today, minus an estimated plan
 * cost (base plus per-minute overage past the included minutes). Client-side
 * math only, no backend. Everything here is an estimate, not a guarantee.
 */

// Editable assumptions (all estimates, tune freely).
const MISSED_RATE = 0.25 // ~1 in 4 unanswered at peak (industry estimate)
const RECOVERY_RATE = 0.75 // share of missed calls that turn into orders
const AVG_CALL_MIN = 3 // average call length, minutes
const INCLUDED_MIN = 750 // minutes in the base plan
const BASE_PRICE = 250 // base plan $/mo
const OVERAGE_PER_MIN = 0.15 // estimated $ per minute past included

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

export function RoiCalculator() {
  const [callsPerDay, setCallsPerDay] = React.useState(80)
  const [avgTicket, setAvgTicket] = React.useState(28)
  const [daysOpen, setDaysOpen] = React.useState(28)

  const recoveredOrders = callsPerDay * MISSED_RATE * RECOVERY_RATE * daysOpen
  const recoveredRevenue = recoveredOrders * avgTicket

  const minutesUsed = callsPerDay * daysOpen * AVG_CALL_MIN
  const overage = Math.max(0, minutesUsed - INCLUDED_MIN) * OVERAGE_PER_MIN
  const estCost = BASE_PRICE + overage
  const estNet = recoveredRevenue - estCost

  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            Calculate your revenue
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            What are your missed calls worth?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every unanswered call at peak is usually a lost order. Move the
            sliders for a rough idea of what answering them could add back.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <Slider label="Calls per day" value={callsPerDay} min={20} max={500} step={10} format={(v) => `${v}`} onChange={setCallsPerDay} />
            <Slider label="Average ticket" value={avgTicket} min={10} max={90} step={1} format={money} onChange={setAvgTicket} />
            <Slider label="Days open per month" value={daysOpen} min={20} max={31} step={1} format={(v) => `${v}`} onChange={setDaysOpen} last />
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              A rough illustration, not a guarantee of results. It assumes about
              1 in 4 calls go unanswered at peak (an industry estimate) and a
              roughly 3-minute average call. Cost includes an estimated overage
              past the plan&rsquo;s included minutes. Your real numbers depend on
              your restaurant.
            </p>
          </div>

          {/* Result */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-brand/30 bg-band p-8 text-band-foreground">
            <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-40" />
            <div className="relative">
              <div className="flex items-center gap-2 text-sm text-band-muted">
                <TrendingUpIcon className="size-4 text-brand" />
                Estimated recovered revenue
              </div>
              <div className="font-display mt-2 text-5xl font-bold tracking-tight sm:text-6xl">
                {money(recoveredRevenue)}
                <span className="text-2xl font-semibold text-band-muted">/mo</span>
              </div>

              <dl className="mt-6 space-y-2.5 border-t border-band-border pt-6 text-sm">
                <Row k="Orders recaptured" v={`${Math.round(recoveredOrders).toLocaleString()}/mo`} />
                <Row k="Estimated monthly cost" v={`${money(estCost)}/mo`} />
                <Row
                  k="Estimated net"
                  v={`${money(Math.max(0, estNet))}/mo`}
                  accent
                />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-band-muted">{k}</dt>
      <dd className={`font-display text-lg font-bold ${accent ? "text-emerald-400" : ""}`}>
        {v}
      </dd>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  last,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
  last?: boolean
}) {
  return (
    <div className={last ? "" : "mb-6"}>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="font-display text-lg font-bold text-brand">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-brand"
        aria-label={label}
      />
    </div>
  )
}
