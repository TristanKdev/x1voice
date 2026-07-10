"use client"

import * as React from "react"
import { motion } from "motion/react"

import { TESTIMONIALS, type Testimonial } from "@/data/site"

/**
 * Vertical auto-scrolling testimonial columns spanning the full width. Uses
 * the real, anonymized customer reviews from data/site.ts (initials avatars,
 * no fabricated photos). Reduced-motion visitors get a static grid.
 */

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="w-full rounded-2xl border bg-card p-6 shadow-sm">
      <blockquote className="leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
          {t.initials}
        </span>
        <span className="text-sm font-medium">{t.roleLabel}</span>
      </figcaption>
    </figure>
  )
}

function Column({ items, duration }: { items: Testimonial[]; duration: number }) {
  return (
    <div className="[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex flex-col gap-5"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <Card key={i} t={t} />
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

  const verified = TESTIMONIALS.filter((t) => t.verified)
  const cols = [
    verified.filter((_, i) => i % 3 === 0),
    verified.filter((_, i) => i % 3 === 1),
    verified.filter((_, i) => i % 3 === 2),
  ]

  return (
    <section className="border-t bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
          Operators love it
        </span>
        <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          The phone stopped being a problem
        </h2>
        <p className="mt-3 text-muted-foreground">
          Real customer feedback, lightly edited for spelling and clarity.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6">
        {reduced ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verified.map((t) => (
              <Card key={t.quote} t={t} />
            ))}
          </div>
        ) : (
          <div className="grid h-[32rem] grid-cols-1 items-start gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            <Column items={cols[0]} duration={28} />
            <Column items={cols[1]} duration={34} />
            <div className="hidden lg:block">
              <Column items={cols[2]} duration={30} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
