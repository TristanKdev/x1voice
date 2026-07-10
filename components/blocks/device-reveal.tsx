"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { CheckIcon, PhoneIncomingIcon } from "lucide-react"

import { ProductDashboardFrame } from "@/components/blocks/product-dashboard"

/**
 * The product below the hero. A "container scroll" reveal: the dashboard card
 * sits tilted back and rotates flat + settles as you scroll it toward the
 * middle of the screen. It's visible the whole time (just tilted), so nothing
 * is ever blank. The phone and POS ticket float over it. Reduced-motion
 * visitors get the flat, static state.
 */

const TRANSCRIPT: { who: "agent" | "caller"; t: string }[] = [
  { who: "agent", t: "Tony's Pizzeria, what can I get you?" },
  { who: "caller", t: "Large pie, half pepperoni half mushroom." },
  { who: "agent", t: "Large, half pep half mushroom. Anything to drink?" },
  { who: "caller", t: "A two-liter Coke." },
  { who: "agent", t: "Got it, that's $18.50. Pickup or delivery?" },
  { who: "caller", t: "Pickup, under Maria." },
  { who: "agent", t: "Thanks Maria, about 25 minutes. Texting your confirmation now." },
]

/** A live-feeling call transcript that types itself out and loops. */
function CallTranscript() {
  const reduced = useReducedMotion()
  const [n, setN] = React.useState(reduced ? TRANSCRIPT.length : 1)

  React.useEffect(() => {
    if (reduced) return
    let timer: ReturnType<typeof setTimeout>
    const step = () => {
      setN((v) => {
        if (v >= TRANSCRIPT.length) {
          timer = setTimeout(() => setN(1), 2800)
          return v
        }
        timer = setTimeout(step, 1300)
        return v + 1
      })
    }
    timer = setTimeout(step, 1300)
    return () => clearTimeout(timer)
  }, [reduced])

  const shown = reduced ? TRANSCRIPT : TRANSCRIPT.slice(0, n)

  return (
    <div className="w-[264px] rounded-2xl border border-band-border bg-band p-4 text-band-foreground shadow-2xl">
      <div className="flex items-center justify-between border-b border-band-border pb-3">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Live call · 0:42
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/15">
          <PhoneIncomingIcon className="size-3 text-emerald-400" />
        </span>
      </div>
      <div className="mt-3 flex min-h-[220px] flex-col gap-2">
        {shown.map((line, i) => (
          <div
            key={i}
            className={`flex ${line.who === "caller" ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-[11px] leading-snug ${
                line.who === "caller"
                  ? "rounded-br-sm bg-brand text-brand-foreground"
                  : "rounded-bl-sm bg-white/8 text-band-foreground"
              }`}
            >
              {line.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PosCard() {
  return (
    <div className="w-[200px] rounded-xl border bg-card p-4 shadow-2xl">
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
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const set = () => setIsMobile(mq.matches)
    set()
    mq.addEventListener("change", set)
    return () => mq.removeEventListener("change", set)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [17, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.9, 1] : [1.06, 1])
  const headerY = useTransform(scrollYProgress, [0, 1], [40, 0])

  const cardStyle = reduced ? {} : { rotateX: rotate, scale }
  const headerStyle = reduced ? {} : { y: headerY }

  return (
    <section
      ref={ref}
      id="in-action"
      className="relative scroll-mt-16 overflow-hidden border-b bg-background pt-24 pb-16 sm:pt-28"
    >
      {/* soft blurred seam from the dark hero into white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-band via-band/45 to-transparent blur-[2px]"
      />
      <div aria-hidden className="tech-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(100%_55%_at_50%_45%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6" style={{ perspective: "1200px" }}>
        <motion.div style={headerStyle} className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            Welcome to the future
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Watch it work
          </h2>
          <p className="mt-3 text-muted-foreground">
            One order, from the ring to the kitchen.
          </p>
        </motion.div>

        <motion.div
          style={cardStyle}
          className="relative mx-auto mt-12 max-w-4xl rounded-[26px] border-4 border-band/60 bg-band p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] sm:p-3"
        >
          <div className="overflow-hidden rounded-2xl">
            <ProductDashboardFrame />
          </div>

          {/* floating live transcript + POS ticket over the card */}
          <div className="pointer-events-none absolute top-1/2 -left-10 hidden -translate-y-1/2 lg:block">
            <CallTranscript />
          </div>
          <div className="pointer-events-none absolute -right-6 -bottom-6 hidden lg:block">
            <PosCard />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
