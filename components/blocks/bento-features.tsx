import Link from "next/link"
import { ArrowRightIcon, ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { POS_BRANDS } from "@/components/blocks/pos-logos"
import { PosLockup } from "@/components/blocks/pos-lockup"
import { EXAMPLE_LANGUAGES } from "@/data/languages"

/**
 * "What makes us different" bento. Each cell carries a small custom visual
 * (not a generic icon in a box) so the grid reads as designed, not templated.
 */

function Cell({
  className,
  title,
  body,
  visual,
  link,
  cta,
  highlight,
}: {
  className?: string
  title: string
  body: string
  visual: React.ReactNode
  link?: { label: string; href: string }
  cta?: { label: string; href: string }
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5",
        highlight
          ? "border-brand/50 bg-gradient-to-br from-brand/10 to-brand/[0.02] hover:border-brand"
          : "bg-card hover:border-brand/30 hover:shadow-[0_16px_50px_-20px_color-mix(in_srgb,var(--color-brand)_35%,transparent)]",
        className
      )}
    >
      <div className="mb-6 flex min-h-24 items-center">{visual}</div>
      <div>
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
        {link && (
          <Link
            href={link.href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            {link.label}
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  )
}

/* ---- small custom visuals ------------------------------------------- */

function WholeJobVisual() {
  const steps = ["Answers", "Takes order", "Takes payment", "Fires to POS", "Texts updates"]
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="rounded-lg border bg-secondary/60 px-2.5 py-1 text-xs font-medium">
            {s}
          </span>
          {i < steps.length - 1 && <span className="text-brand/50">›</span>}
        </span>
      ))}
    </div>
  )
}

function PriceVisual() {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold tracking-tight">$250</span>
        <span className="text-sm text-muted-foreground">/mo · 750 min</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        then $0.35/min · every feature included
      </p>
    </div>
  )
}

function SpeedVisual() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/5 text-brand">
        <ClockIcon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="font-display text-3xl font-bold tracking-tight text-brand">
        Minutes
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-brand to-brand-bright" />
      </div>
    </div>
  )
}

function PosVisual() {
  // 7 real logos + a "& more" tile, laid out 4 on top, 3 + "& more" on the row below.
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {POS_BRANDS.slice(0, 7).map((b) => (
        <span
          key={b.name}
          className="flex items-center justify-center rounded-xl border bg-secondary/40 px-2 py-3"
        >
          <PosLockup brand={b} />
        </span>
      ))}
      <span className="flex items-center justify-center rounded-xl border border-dashed bg-secondary/20 px-2 py-3 text-xs font-semibold text-muted-foreground">
        &amp; more
      </span>
    </div>
  )
}

function LangVisual() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {EXAMPLE_LANGUAGES.map((l) => (
        <span
          key={l.name}
          className="rounded-full border bg-secondary/60 px-2.5 py-1 text-xs font-medium"
        >
          {l.native}
        </span>
      ))}
      <span className="rounded-full border border-dashed bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
        &amp; more
      </span>
    </div>
  )
}

function AlwaysOnVisual() {
  return (
    <div className="relative flex size-20 items-center justify-center">
      <span className="absolute inline-flex size-16 animate-ping rounded-full bg-emerald-400/20" />
      <span className="absolute size-16 rounded-full border border-emerald-400/30" />
      <span className="absolute size-11 rounded-full border border-emerald-400/50" />
      <span className="relative flex size-2.5 rounded-full bg-emerald-500" />
    </div>
  )
}

export function BentoFeatures() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            What makes us different
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Most voice tools do one thing. This does the whole job.
          </h2>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Cell
            className="lg:col-span-2"
            title="It doesn't just answer, it finishes the order"
            body="X1 Voice takes the full order with modifiers, collects payment, fires a clean ticket to your POS, and texts the customer as the status changes, confirmed, in the kitchen, ready. One agent, the whole call."
            visual={<WholeJobVisual />}
          />
          <Cell
            title="Always on, even after close"
            body="Unlimited simultaneous calls, no hold music, no voicemail. The 11pm caller gets the same answer as the noon one."
            visual={<AlwaysOnVisual />}
          />
          <Cell
            highlight
            title="Priced in the open"
            body="$250/mo with 750 minutes, no setup fee, no contract. Every plan has the same features, only the minutes and per-minute overage change. Most of the field won't quote a number without a sales call."
            visual={<PriceVisual />}
            cta={{ label: "Sign up", href: "/contact" }}
          />
          <Cell
            className="lg:col-span-2"
            title="Lands in the POS you already run"
            body="Native with Square and OrderCounter; Toast, Clover, Lightspeed and 80+ more connect through Deliverect. Orders arrive as normal tickets, nobody re-types anything."
            visual={<PosVisual />}
          />
          <Cell
            className="lg:col-span-2"
            title="Live in minutes"
            body="Connect your POS, import your menu, set your greeting, test, go live, the same shift. White-glove setup if you'd rather we do it."
            visual={<SpeedVisual />}
          />
          <Cell
            title="Speaks your customer's language"
            body="Detects and answers in the caller's language while the ticket stays in the format your kitchen reads."
            visual={<LangVisual />}
            link={{ label: "See full language list", href: "/languages" }}
          />
        </div>

        <div className="mt-10">
          <Link
            href="/compare"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            See how it stacks up against the rest of the field
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
