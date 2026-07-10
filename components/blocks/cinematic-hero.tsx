"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { HeroCtas, PhoneMockup } from "@/components/blocks/hero-phone"

/**
 * Cinematic homepage hero, static-first.
 *
 * The server (and every no-JS, mobile, touch, or reduced-motion visitor)
 * gets a complete two-column hero — headline, copy, CTAs, phone mockup —
 * with no pinning and no scroll hijack. Desktop fine-pointer visitors who
 * tolerate motion are upgraded to the GSAP scroll experience after
 * hydration; the stage (and gsap itself) is dynamically imported so nobody
 * else downloads it.
 *
 * The mode is locked once chosen: live-swapping while ScrollTrigger holds
 * a pin-spacer around the section corrupts the DOM (React removeChild
 * crash on resize). The upgrade also only happens at the top of the page —
 * swapping in a ~4500px pinned section after scroll restoration would
 * teleport a reader who reloaded mid-page.
 */

/**
 * StaticHero (defined below) doubles as the loading fallback so the
 * above-fold region never renders blank while the stage chunk resolves.
 */
const CinematicStage = dynamic(
  () => import("@/components/blocks/cinematic-stage"),
  { ssr: false, loading: () => <StaticHero /> }
)

/** Server-rendered hero. Complete on its own; also the crawler/no-JS view. */
function StaticHero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div aria-hidden className="bg-grid-theme absolute inset-0 z-0 opacity-60" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Phone agent for restaurants
          </p>
          <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Every call answered,{" "}
            <span className="text-silver-matte">every order captured.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            X1 Voice picks up, takes the order, and puts it straight into your
            POS. It covers the dinner rush, the 11pm caller, and the Monday
            you&rsquo;re short-staffed.
          </p>
          <HeroCtas className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center" />
          <p className="mt-10 text-sm text-muted-foreground">
            No setup fees&ensp;·&ensp;No contract&ensp;·&ensp;Works with your POS
          </p>
        </div>

        <div className="premium-depth-card relative mx-auto flex w-full max-w-md items-center justify-center overflow-hidden rounded-[32px] px-6 py-10">
          <div className="scale-[0.82] sm:scale-90">
            <PhoneMockup animated={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CinematicHero() {
  const [cinematic, setCinematic] = React.useState(false)

  React.useEffect(() => {
    const eligible = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches
    if (!eligible || window.scrollY >= 4) return

    // Preload the stage chunk and only swap once it's resident, so a cold
    // visit never flashes a blank hero during the chunk round-trip.
    let cancelled = false
    import("@/components/blocks/cinematic-stage").then(() => {
      if (!cancelled && window.scrollY < 4) setCinematic(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return cinematic ? <CinematicStage /> : <StaticHero />
}
