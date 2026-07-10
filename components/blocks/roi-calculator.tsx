"use client"

import * as React from "react"
import { TrendingUpIcon } from "lucide-react"

import { MISSED_CALLS_STAT } from "@/data/site"

/**
 * "Calculate your revenue", a quick estimate of monthly revenue recovered by
 * answering the calls that go unanswered today. Client-side math only, no
 * backend. Assumptions are shown and the output is labeled an estimate.
 *
 * The 1-in-4 missed-at-peak figure comes from MISSED_CALLS_STAT (sourced).
 */

const MISSED_RATE = 0.25 // ~1 in 4 at peak (industry estimate)
const CAPTURE_RATE = 0.8 // share of missed calls X1 Voice turns into orders

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

export function RoiCalculator() {
  const [callsPerDay, setCallsPerDay] = React.useState(80)
  const [avgTicket, setAvgTicket] = React.useState(28)
  const [daysOpen, setDaysOpen] = React.useState(28)

  const missedPerDay = callsPerDay * MISSED_RATE
  const recoveredOrdersMonth = missedPerDay * CAPTURE_RATE * daysOpen
  const recoveredRevenue = recoveredOrdersMonth * avgTicket
  const netAfterPlan = recoveredRevenue - 250

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
            sliders to see what answering them could add back each month.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <Slider
              label="Calls per day"
              value={callsPerDay}
              min={20}
              max={500}
              step={10}
              format={(v) => `${v}`}
              onChange={setCallsPerDay}
            />
            <Slider
              label="Average ticket"
              value={avgTicket}
              min={10}
              max={90}
              step={1}
              format={(v) => money(v)}
              onChange={setAvgTicket}
            />
            <Slider
              label="Days open per month"
              value={daysOpen}
              min={20}
              max={31}
              step={1}
              format={(v) => `${v}`}
              onChange={setDaysOpen}
              last
            />
            <p className="mt-6 text-xs text-muted-foreground">
              Assumes about 1 in 4 calls goes unanswered at peak (
              {MISSED_CALLS_STAT.source.label}) and that X1 Voice captures most
              of them. Your real number is your own. This is an estimate.
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
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-band-border pt-6 text-sm">
                <div>
                  <div className="text-band-muted">Orders recaptured</div>
                  <div className="font-display mt-0.5 text-xl font-bold">
                    {Math.round(recoveredOrdersMonth).toLocaleString()}/mo
                  </div>
                </div>
                <div>
                  <div className="text-band-muted">Net of the $250 plan</div>
                  <div className="font-display mt-0.5 text-xl font-bold text-emerald-400">
                    {money(Math.max(0, netAfterPlan))}/mo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
