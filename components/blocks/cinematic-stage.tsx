"use client"

import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckIcon, CreditCardIcon } from "lucide-react"

import { LogoMark } from "@/components/site/logo"
import {
  HeroCtas,
  ORDERS_METRIC,
  PhoneMockup,
} from "@/components/blocks/hero-phone"

gsap.registerPlugin(ScrollTrigger)

/**
 * The pinned GSAP scroll experience. Only ever loaded (via next/dynamic in
 * cinematic-hero.tsx) on motion-tolerant fine-pointer desktops, so gsap
 * never ships to mobile or reduced-motion visitors.
 *
 * Screen readers: `.gsap-reveal` (visibility: hidden) removes staged
 * elements from the accessibility tree until their scroll moment, so an
 * sr-only content block below carries the full hero message and working
 * links regardless of scroll position.
 */
export default function CinematicStage() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mainCardRef = React.useRef<HTMLDivElement>(null)
  const mockupRef = React.useRef<HTMLDivElement>(null)
  const rafRef = React.useRef(0)

  // Mouse-follow sheen on the card + subtle 3D tilt on the phone.
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const card = mainCardRef.current
        const mockup = mockupRef.current
        if (!card || !mockup) return
        const rect = card.getBoundingClientRect()
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        gsap.to(mockup, {
          rotationY: x * 10,
          rotationX: -y * 10,
          ease: "power3.out",
          duration: 1.2,
        })
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Pinned scroll timeline.
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      })
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" })
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 })
      gsap.set(
        [".card-left-text", ".card-right-text", ".mockup-wrapper", ".floating-badge", ".phone-widget"],
        { autoAlpha: 0 }
      )
      gsap.set(".cta-stage", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" })

      const intro = gsap.timeline({ delay: 0.3 })
      intro
        .to(".text-track", {
          duration: 1.6,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-days",
          { duration: 1.2, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" },
          "-=0.9"
        )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.to(
        [".hero-text-wrapper", ".bg-grid-theme"],
        { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 },
        0
      )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        .fromTo(
          ".mockup-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )
        .fromTo(
          ".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 },
          "-=1.5"
        )
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(
          ".counter-val",
          { innerHTML: ORDERS_METRIC, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" },
          "-=2.0"
        )
        .fromTo(
          ".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=2.0"
        )
        .fromTo(
          ".card-left-text",
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 },
          "-=1.5"
        )
        .fromTo(
          ".card-right-text",
          { x: 50, autoAlpha: 0, scale: 0.8 },
          { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 },
          "<"
        )
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-stage", { autoAlpha: 1 })
        .to({}, { duration: 1 })
        .to([".mockup-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9,
          y: -40,
          z: -200,
          autoAlpha: 0,
          ease: "power3.in",
          duration: 1.2,
          stagger: 0.05,
        })
        .to(
          ".main-card",
          { width: "85vw", height: "85vh", borderRadius: "40px", ease: "expo.inOut", duration: 1.8 },
          "pullback"
        )
        .to(".cta-stage", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden border-b bg-background text-foreground"
      style={{ perspective: "1500px" }}
    >
      {/* Always-available content for assistive tech: the staged layers
          below are visibility-hidden until their scroll moment. */}
      <div className="sr-only">
        <h1>
          Every call answered, every order captured — X1 Voice, the phone
          agent for restaurants.
        </h1>
        <p>
          X1 Voice answers your restaurant&rsquo;s phone, takes the order, and
          sends it to your POS. It picks up around the clock, including when
          the line is slammed.
        </p>
      </div>
      <a
        href="/contact"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Book a demo
      </a>
      <a
        href="/pricing"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-44 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        See pricing
      </a>

      <div aria-hidden className="film-grain" />
      <div aria-hidden className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-50" />

      {/* Layer 1: opening taglines (decorative duplicates of the sr-only h1) */}
      <div
        aria-hidden
        className="hero-text-wrapper absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform"
      >
        <p className="text-track gsap-reveal font-display text-3d-matte text-6xl font-bold tracking-tight lg:text-[5.5rem]">
          Every call answered,
        </p>
        <p className="text-days gsap-reveal font-display text-silver-matte text-6xl font-extrabold tracking-tighter lg:text-[5.5rem]">
          every order captured.
        </p>
      </div>

      {/* Layer 2: final CTA stage */}
      <div className="cta-stage gsap-reveal pointer-events-auto absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform">
        <h2 className="font-display text-silver-matte mb-6 text-5xl font-bold tracking-tight lg:text-6xl">
          Stop losing the phone.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed font-light text-muted-foreground">
          Book a 15-minute demo. We&rsquo;ll call your own number live so you
          can judge it yourself.
        </p>
        <HeroCtas className="flex flex-col items-center gap-4 sm:flex-row" />
      </div>

      {/* Layer 3: the deep-blue physical card */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[85vh] w-[85vw] items-center justify-center overflow-hidden rounded-[40px]"
        >
          <div aria-hidden className="card-sheen" />

          <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-3 items-center gap-8 px-12">
            {/* Left: card copy */}
            <div className="card-left-text gsap-reveal z-20 flex flex-col justify-center text-left">
              <h3 className="font-display mb-5 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                Your phone, answered.
              </h3>
              <p className="text-base leading-relaxed text-indigo-100/70 lg:text-lg">
                <span className="font-semibold text-white">X1 Voice</span>{" "}
                answers your restaurant&rsquo;s phone, takes the order, and
                sends it to your POS. It picks up around the clock, including
                when the line is slammed.
              </p>
            </div>

            {/* Center: phone + badges */}
            <div
              className="mockup-wrapper relative z-10 flex h-[600px] w-full items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <div ref={mockupRef} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                  <PhoneMockup animated />
                </div>

                <div className="floating-badge floating-ui-badge absolute top-32 left-[-70px] z-30 flex items-center gap-4 rounded-2xl p-4">
                  <div className="flex size-10 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 shadow-inner">
                    <CheckIcon className="size-5 text-indigo-300 drop-shadow-lg" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold tracking-tight text-white">Order sent to POS</p>
                    <p className="text-xs font-medium text-indigo-200/50">Nobody re-types it</p>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute right-[-70px] bottom-12 z-30 flex items-center gap-4 rounded-2xl p-4">
                  <div className="flex size-10 items-center justify-center rounded-full border border-emerald-400/30 bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 shadow-inner">
                    <CreditCardIcon className="size-5 text-emerald-300 drop-shadow-lg" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold tracking-tight text-white">Payment collected</p>
                    <p className="text-xs font-medium text-indigo-200/50">On the call</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: decorative brand lockup (not a document heading) */}
            <div aria-hidden className="card-right-text gsap-reveal z-20 flex flex-col items-end justify-center">
              <LogoMark className="h-14 text-white/90" />
              <p className="text-card-silver-matte font-display mt-4 text-[6rem] leading-none font-black tracking-tighter uppercase">
                X1
              </p>
              <p className="mt-1 text-sm font-semibold tracking-[0.3em] text-indigo-200/50 uppercase">
                Voice
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
