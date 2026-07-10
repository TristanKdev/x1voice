"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { CheckIcon, PhoneIncomingIcon } from "lucide-react"

import { ProductDashboardFrame } from "@/components/blocks/product-dashboard"

/**
 * The product, shown immediately below the hero. The dashboard is visible the
 * moment you reach the section; as it enters view the phone and POS ticket
 * rise in around it (once, quick). No scroll scrubbing, so nothing is ever
 * blank on arrival. Reduced-motion visitors get the static assembled state.
 */

function PhoneCard() {
  return (
    <div className="w-[190px] rounded-[2rem] border-4 border-band/80 bg-band p-1.5 shadow-2xl">
      <div className="rounded-[1.6rem] bg-band-2 p-3 text-band-foreground">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Live call · 0:42
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-bold">(415) ···-··84</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/15">
            <PhoneIncomingIcon className="size-3 text-emerald-400" />
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {["Large pizza, half pep", "Add ranch", "Gluten-free"].map((l) => (
            <div key={l} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px]">
              {l}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-band-border px-2.5 py-1.5">
          <span className="text-[10px] text-band-muted">Total</span>
          <span className="text-xs font-bold">$18.50</span>
        </div>
      </div>
    </div>
  )
}

function PosCard() {
  return (
    <div className="w-[210px] rounded-xl border bg-card p-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          POS · New order
        </p>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          NEW
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {["1× Large pizza", "½ pepperoni ½ mushroom", "Ranch, side"].map((l, i) => (
          <div key={l} className="flex items-center gap-2 text-xs">
            <CheckIcon className="size-3.5 text-emerald-500" />
            <span className={i === 0 ? "font-medium" : "text-muted-foreground"}>{l}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 border-t pt-3 text-[10px] font-semibold text-emerald-600">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Sent to kitchen · pickup 25 min
      </div>
    </div>
  )
}

export function DeviceReveal() {
  const reduced = useReducedMotion()

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section
      id="in-action"
      className="relative scroll-mt-16 overflow-hidden bg-background pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* soft blurred seam: dark hero fading into white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-band via-band/45 to-transparent blur-[2px]"
      />
      {/* soft blurred seam: white fading back into the dark section below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-band via-band/40 to-transparent blur-[2px]"
      />
      <div aria-hidden className="tech-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(100%_60%_at_50%_40%,black,transparent)]" />
      <div aria-hidden className="tech-glow absolute top-1/3 left-1/2 h-72 w-[36rem] max-w-none -translate-x-1/2" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            Live order
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Watch it work
          </h2>
          <p className="mt-3 text-muted-foreground">
            One order, from the ring to the kitchen.
          </p>
        </div>

        <div className="relative mt-14 flex items-end justify-center">
          {/* Phone, front left */}
          <motion.div {...rise(0.12)} className="relative z-20 -mr-8 hidden translate-y-6 sm:block">
            <PhoneCard />
          </motion.div>

          {/* Dashboard, center, visible immediately */}
          <motion.div {...rise(0)} className="relative z-10 w-full max-w-3xl">
            <ProductDashboardFrame />
          </motion.div>

          {/* POS new order, front right */}
          <motion.div {...rise(0.24)} className="relative z-20 -ml-8 hidden translate-y-2 lg:block">
            <PosCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
