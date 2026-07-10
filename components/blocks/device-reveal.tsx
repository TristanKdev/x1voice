"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { CheckIcon } from "lucide-react"

import { ProductDashboardFrame } from "@/components/blocks/product-dashboard"

/**
 * The product below the hero. A "container scroll" reveal: the dashboard card
 * sits tilted back and rotates flat + settles as you scroll it toward the
 * middle of the screen. A phone on the left plays a loop of four different
 * live calls, and a POS "new order" ticket floats on the right. Reduced-motion
 * visitors get the flat, static state.
 */

type Turn = { who: "agent" | "caller"; t: string }
type Call = { number: string; turns: Turn[] }

const CALLS: Call[] = [
  {
    number: "(415) ···-··84",
    turns: [
      { who: "agent", t: "Tony's Pizzeria, what can I get you?" },
      { who: "caller", t: "Large pie, half pepperoni half mushroom." },
      { who: "agent", t: "Anything to drink?" },
      { who: "caller", t: "A two-liter Coke." },
      { who: "agent", t: "That's $18.50. Pickup or delivery?" },
      { who: "caller", t: "Pickup, under Maria." },
      { who: "agent", t: "Thanks Maria, 25 minutes. Texting your confirmation." },
    ],
  },
  {
    number: "(628) ···-··19",
    turns: [
      { who: "agent", t: "Bao House, how can I help?" },
      { who: "caller", t: "Do you deliver to 5th and Main?" },
      { who: "agent", t: "We do. What can I start for you?" },
      { who: "caller", t: "Two pork bao, one veggie, a Thai tea." },
      { who: "agent", t: "$24.80. I can take the card by phone." },
      { who: "caller", t: "Go ahead." },
      { who: "agent", t: "Paid. About 40 minutes to 5th and Main." },
    ],
  },
  {
    number: "(917) ···-··53",
    turns: [
      { who: "agent", t: "Green Fork, front desk." },
      { who: "caller", t: "Are you open till 10 tonight?" },
      { who: "agent", t: "We are, kitchen closes at 9:45." },
      { who: "caller", t: "Is the pesto pasta nut-free?" },
      { who: "agent", t: "The pesto has pine nuts. Want a nut-free swap?" },
      { who: "caller", t: "Yeah, do the marinara." },
      { who: "agent", t: "Done. See you soon." },
    ],
  },
  {
    number: "(310) ···-··77",
    turns: [
      { who: "agent", t: "Taquería Sol, ¿qué le sirvo?" },
      { who: "caller", t: "Tres tacos al pastor y una horchata." },
      { who: "agent", t: "¿Para llevar?" },
      { who: "caller", t: "Sí, para llevar." },
      { who: "agent", t: "Son $12.50, quince minutos." },
      { who: "caller", t: "Perfecto, gracias." },
      { who: "agent", t: "Le mando la confirmación por texto." },
    ],
  },
]

function mmss(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

/** A phone playing a loop of four different live calls that type out. */
function PhoneTranscript() {
  const reduced = useReducedMotion()
  const [ci, setCi] = React.useState(0)
  const [li, setLi] = React.useState(reduced ? 99 : 1)
  const [sec, setSec] = React.useState(0)

  const call = CALLS[ci]

  // typing + call cycling
  React.useEffect(() => {
    if (reduced) return
    let t: ReturnType<typeof setTimeout>
    if (li < call.turns.length) {
      t = setTimeout(() => setLi((v) => v + 1), 1150)
    } else {
      t = setTimeout(() => {
        setCi((c) => (c + 1) % CALLS.length)
        setLi(1)
        setSec(0)
      }, 2600)
    }
    return () => clearTimeout(t)
  }, [ci, li, call.turns.length, reduced])

  // running call timer
  React.useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setSec((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [reduced])

  const shown = reduced ? call.turns : call.turns.slice(0, li)

  return (
    <div className="w-[220px] rounded-[2.4rem] border-[6px] border-band/90 bg-band p-1 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]">
      <div className="relative overflow-hidden rounded-[2rem] bg-band-2 text-band-foreground">
        {/* dynamic island */}
        <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

        <div className="px-3.5 pt-9 pb-4">
          <div className="flex items-center justify-between border-b border-band-border pb-2.5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Live call · {reduced ? "0:42" : mmss(sec)}
            </span>
            <span className="text-[10px] text-band-muted">{call.number}</span>
          </div>

          {/* transcript, newest at the bottom like a real call screen */}
          <div className="mt-3 flex h-[292px] flex-col justify-end gap-1.5 overflow-hidden">
            {shown.map((line, i) => (
              <div
                key={`${ci}-${i}`}
                className={`flex ${line.who === "caller" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[86%] rounded-2xl px-3 py-1.5 text-[11px] leading-snug ${
                    line.who === "caller"
                      ? "rounded-br-sm bg-brand text-brand-foreground"
                      : "rounded-bl-sm bg-white/8"
                  }`}
                >
                  {line.t}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-center">
            <span className="h-1 w-16 rounded-full bg-white/25" />
          </div>
        </div>
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

  // Bigger, more pronounced reveal.
  const rotate = useTransform(scrollYProgress, [0, 1], [28, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.82, 1] : [1.14, 1])
  const headerY = useTransform(scrollYProgress, [0, 1], [64, 0])

  const cardStyle = reduced ? {} : { rotateX: rotate, scale }
  const headerStyle = reduced ? {} : { y: headerY }

  return (
    <section
      ref={ref}
      id="in-action"
      className="relative scroll-mt-16 overflow-hidden bg-background pt-24 pb-24 sm:pt-28 sm:pb-32"
    >
      {/* soft blurred seam from the dark hero into white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-band via-band/45 to-transparent blur-[2px]"
      />
      <div aria-hidden className="tech-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(100%_55%_at_50%_45%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6" style={{ perspective: "1400px" }}>
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
          className="relative mx-auto mt-14 max-w-4xl rounded-[26px] border-4 border-band/60 bg-band p-2 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.65)] sm:p-3"
        >
          <div className="overflow-hidden rounded-2xl">
            <ProductDashboardFrame />
          </div>

          {/* phone playing looping calls, on the left */}
          <div className="pointer-events-none absolute top-1/2 -left-12 hidden -translate-y-1/2 lg:block">
            <PhoneTranscript />
          </div>
          {/* POS new order, on the right */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 hidden lg:block">
            <PosCard />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
