"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { CheckIcon, PhoneIncomingIcon } from "lucide-react"

import { ProductDashboardFrame } from "@/components/blocks/product-dashboard"

/**
 * Scroll-scrubbed reveal that carries the dark video hero into a light
 * section: as you scroll, the tablet/dashboard, a phone, and a POS ticket
 * rise and assemble, showing the product in action. A sticky stage inside a
 * tall section, no pinning hacks, so it can't corrupt layout. Reduced-motion
 * visitors get the assembled state, static.
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
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        POS · New ticket
      </p>
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
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Staggered rise, front-loaded so the cluster assembles early and then
  // holds. Hooks must run unconditionally; we ignore them when reduced.
  const headingY = useTransform(scrollYProgress, [0, 0.08], ["20px", "0px"])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const tabletY = useTransform(scrollYProgress, [0.03, 0.26], ["34%", "0%"])
  const tabletOpacity = useTransform(scrollYProgress, [0.03, 0.16], [0, 1])
  const tabletScale = useTransform(scrollYProgress, [0.03, 0.26], [0.94, 1])
  const phoneY = useTransform(scrollYProgress, [0.1, 0.32], ["60%", "0%"])
  const phoneOpacity = useTransform(scrollYProgress, [0.1, 0.24], [0, 1])
  const posY = useTransform(scrollYProgress, [0.16, 0.38], ["60%", "0%"])
  const posOpacity = useTransform(scrollYProgress, [0.16, 0.3], [0, 1])

  const s = (
    y: import("motion/react").MotionValue<string>,
    o: import("motion/react").MotionValue<number>,
    scale?: import("motion/react").MotionValue<number>
  ) => (reduced ? {} : { y, opacity: o, ...(scale ? { scale } : {}) })

  return (
    <section id="in-action" ref={ref} className="relative h-[135vh] scroll-mt-16 bg-background">
      {/* seam from the dark hero into white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-band to-transparent"
      />
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div aria-hidden className="tech-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(100%_70%_at_50%_40%,black,transparent)]" />
        <div aria-hidden className="tech-glow absolute top-1/3 left-1/2 h-72 w-[36rem] max-w-none -translate-x-1/2" />

        <motion.div
          style={reduced ? {} : { y: headingY, opacity: headingOpacity }}
          className="relative z-10 mb-8 max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            One call. It answers, takes it, and shows you everything.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Scroll to watch a live order move from the phone, into the POS, onto
            your dashboard.
          </p>
        </motion.div>

        <div className="relative z-10 flex w-full max-w-5xl items-end justify-center">
          {/* Phone, front left */}
          <motion.div
            style={s(phoneY, phoneOpacity)}
            className="relative z-20 -mr-8 hidden translate-y-6 sm:block"
          >
            <PhoneCard />
          </motion.div>

          {/* Tablet / dashboard, center */}
          <motion.div
            style={s(tabletY, tabletOpacity, tabletScale)}
            className="relative z-10 w-full max-w-3xl"
          >
            <div className="scale-[0.92] sm:scale-100">
              <ProductDashboardFrame />
            </div>
          </motion.div>

          {/* POS ticket, front right */}
          <motion.div
            style={s(posY, posOpacity)}
            className="relative z-20 -ml-8 hidden translate-y-2 lg:block"
          >
            <PosCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
