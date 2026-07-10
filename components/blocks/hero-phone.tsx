"use client"

import Link from "next/link"
import { CheckIcon, PhoneIncomingIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DemoDialog } from "@/components/blocks/demo-dialog"

/**
 * Shared between the static hero (server-rendered fallback) and the
 * dynamically-loaded cinematic stage, so both show the identical phone
 * and identical CTAs.
 *
 * The numbers on the screen (ticket price, order count) are illustrative
 * product-UI mockup content — same convention as the fictional call
 * transcript elsewhere — not marketing claims.
 */

export const ORDERS_METRIC = 247

export function PhoneMockup({ animated }: { animated: boolean }) {
  return (
    <div
      aria-label="Illustration of X1 Voice answering a restaurant phone call"
      role="img"
      className="iphone-bezel relative flex h-[560px] w-[272px] flex-col rounded-[3rem] will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Hardware buttons */}
      <div aria-hidden className="hardware-btn absolute top-[116px] -left-[3px] z-0 h-[24px] w-[3px] rounded-l-md" />
      <div aria-hidden className="hardware-btn absolute top-[156px] -left-[3px] z-0 h-[44px] w-[3px] rounded-l-md" />
      <div aria-hidden className="hardware-btn absolute top-[214px] -left-[3px] z-0 h-[44px] w-[3px] rounded-l-md" />
      <div aria-hidden className="hardware-btn absolute top-[166px] -right-[3px] z-0 h-[68px] w-[3px] scale-x-[-1] rounded-r-md" />

      {/* Screen */}
      <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
        <div aria-hidden className="screen-glare pointer-events-none absolute inset-0 z-40" />

        {/* Dynamic island */}
        <div className="absolute top-[6px] left-1/2 z-50 flex h-[27px] w-[96px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
          <div className="size-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        </div>

        <div className="relative flex h-full w-full flex-col px-5 pt-12 pb-8">
          {/* Live call header */}
          <div className="phone-widget mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Live call
              </span>
              <span className="text-lg font-bold tracking-tight text-white drop-shadow-md">
                (415) ···-··84
              </span>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 shadow-lg shadow-black/50">
              <PhoneIncomingIcon className="size-4 text-emerald-400" />
            </div>
          </div>

          {/* Orders-captured ring */}
          <div className="phone-widget relative mx-auto mb-6 flex size-40 items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
            <svg aria-hidden className="absolute inset-0 h-full w-full">
              <circle cx="80" cy="80" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="11" />
              <circle
                className="progress-ring"
                cx="80"
                cy="80"
                r="58"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="11"
                style={animated ? undefined : { strokeDashoffset: 60 }}
              />
            </svg>
            <div className="z-10 flex flex-col items-center text-center">
              <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">
                {animated ? 0 : ORDERS_METRIC}
              </span>
              <span className="mt-0.5 text-[8px] font-bold tracking-[0.1em] text-indigo-200/60 uppercase">
                Orders captured
              </span>
            </div>
          </div>

          {/* Ticket widgets */}
          <div className="space-y-2.5">
            <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
              <div className="mr-3 flex size-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 shadow-inner">
                <CheckIcon className="size-4 text-indigo-300 drop-shadow-md" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-neutral-200">
                  1× Large pizza, half pep
                </p>
                <p className="text-[10px] text-neutral-500">$18.50 · pickup, 25 min</p>
              </div>
            </div>
            <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
              <div className="mr-3 flex size-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 shadow-inner">
                <CheckIcon className="size-4 text-emerald-400 drop-shadow-md" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-neutral-200">
                  Ticket sent to POS
                </p>
                <p className="text-[10px] text-neutral-500">No re-typing, no hold music</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 h-[4px] w-[116px] -translate-x-1/2 rounded-full bg-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </div>
  )
}

export function HeroCtas({ className }: { className?: string }) {
  return (
    <div className={className}>
      <DemoDialog size="lg" className="rounded-full px-7">
        Book a demo
      </DemoDialog>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full bg-background px-7"
        nativeButton={false}
        render={<Link href="/pricing">See pricing</Link>}
      />
    </div>
  )
}
