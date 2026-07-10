"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, PhoneIcon } from "lucide-react"

/**
 * Landing hero, full-bleed muted video background with a readable scrim.
 * One of the site's intentional DARK bands (see HANDOFF.md). The headline
 * has a color wave sweeping through it (.text-wave).
 *
 * Presentational only. Video at /media/hero.mp4 (poster /media/hero-poster.jpg).
 * Reduced-motion visitors see the poster, no playback, static headline.
 */
export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      v.removeAttribute("autoplay")
      v.pause()
    } else {
      v.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-band text-band-foreground">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      <div aria-hidden className="video-scrim absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="tech-grid-dark absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_75%)]"
      />

      <div className="mx-auto flex min-h-[clamp(560px,88svh,940px)] max-w-6xl flex-col items-start justify-center px-6 py-28 sm:py-32">
        <h1 className="font-display max-w-3xl text-balance text-[clamp(2.6rem,6.2vw,5.2rem)] leading-[1.02] font-semibold tracking-tight">
          <span className="text-wave">Every call answered, every order captured.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-band-muted">
          X1 Voice is the AI phone agent for restaurants. It picks up, takes the
          full order, collects the payment, and drops a clean ticket into your
          POS. It works the dinner rush, it works after close, it works every
          time the line is slammed.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#see-it"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-8px_var(--color-brand)] transition hover:bg-brand-bright"
          >
            <PhoneIcon className="size-4" />
            Hear it answer a call
          </a>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-band-border bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
          >
            See plans
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <p className="mt-8 text-xs text-band-muted/80">
          No contracts. Self-serve. Live in minutes.
        </p>
      </div>
    </section>
  )
}
