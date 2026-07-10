"use client"

import * as React from "react"
import { motion } from "motion/react"

import { REVIEWS, type Review } from "@/data/site"

/**
 * Full-width wall of auto-scrolling reviews. Three columns at different
 * speeds and directions, each a seamless infinite loop. Initials avatars,
 * no fabricated photos. Reduced-motion visitors get a static grid.
 *
 * Content note: only the verified reviews are real; the rest are illustrative
 * samples (see data/site.ts REVIEWS) and must be replaced before launch.
 */

function Card({ r }: { r: Review }) {
  return (
    <figure className="w-full rounded-2xl border bg-card p-6 shadow-sm">
      <blockquote className="leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
          {r.initials.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-sm font-medium">{r.role}</span>
      </figcaption>
    </figure>
  )
}

function Column({
  items,
  duration,
  direction,
}: {
  items: Review[]
  duration: number
  direction: "up" | "down"
}) {
  const y = direction === "down" ? ["-50%", "0%"] : ["0%", "-50%"]
  return (
    <div className="[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex flex-col gap-5"
        animate={{ y }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {[...items, ...items].map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </motion.div>
    </div>
  )
}

export function TestimonialsColumns() {
  const reduced = React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )

  const cols = [
    REVIEWS.filter((_, i) => i % 3 === 0),
    REVIEWS.filter((_, i) => i % 3 === 1),
    REVIEWS.filter((_, i) => i % 3 === 2),
  ]

  return (
    <section className="border-t bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
          Operators love it
        </span>
        <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Even the skeptics came around
        </h2>
        <p className="mt-3 text-muted-foreground">
          What operators say once the phone stops being their problem.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6">
        {reduced ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.slice(0, 9).map((r) => (
              <Card key={r.quote} r={r} />
            ))}
          </div>
        ) : (
          <div className="grid h-[34rem] grid-cols-1 items-start gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            <Column items={cols[0]} duration={40} direction="up" />
            <Column items={cols[1]} duration={30} direction="down" />
            <div className="hidden lg:block">
              <Column items={cols[2]} duration={48} direction="up" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
