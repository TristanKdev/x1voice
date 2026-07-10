"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, PhoneIcon } from "lucide-react"

/**
 * Landing hero — full-bleed muted video background with a readable scrim.
 * This is one of the site's intentional DARK bands (see HANDOFF.md), so it
 * uses band tokens for text.
 *
 * Presentational only. The video file lives at /media/hero.mp4 (poster
 * /media/hero-poster.jpg) — swap those to rebrand. Reduced-motion visitors
 * see the poster frame, no playback.
 *
 * WIRE: the two CTAs are anchor links (#see-it, /pricing). No logic here.
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
      v.play().catch(() => {
        /* autoplay can be blocked; poster remains, which is fine */
      })
    }
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-band text-band-foreground">
      {/* Video background */}
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

      {/* Scrim + tech grid so text stays legible over any frame */}
      <div aria-hidden className="video-scrim absolute inset-0 -z-10" />
      <div aria-hidden className="tech-grid-dark absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_75%)]" />

      <div className="mx-auto flex min-h-[clamp(560px,88svh,940px)] max-w-6xl flex-col items-start justify-center px-6 py-28 sm:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-band-border bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Answering calls right now
        </span>

        <h1 className="font-display mt-6 max-w-3xl text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-semibold tracking-tight">
          Every call answered,{" "}
          <span className="bg-gradient-to-r from-[var(--tech-cyan)] via-white to-[var(--tech-blue)] bg-clip-text text-transparent">
            every order captured.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-band-muted">
          X1 Voice is the AI phone agent for restaurants. It picks up, takes the
          full order, collects payment, and drops the ticket straight into your
          POS — through the dinner rush, after close, and every time the line is
          slammed.
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
          No setup fees · No contract · Live in about a day
        </p>
      </div>
    </section>
  )
}
