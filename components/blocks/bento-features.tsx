import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { POS_BRANDS } from "@/components/blocks/pos-logos"
import { PosLockup } from "@/components/blocks/pos-lockup"

/**
 * "What makes us different" bento. Each cell carries a small custom visual
 * (not a generic icon in a box) so the grid reads as designed, not templated.
 * Copy is the differentiation vs. the rest of the field: the whole job,
 * transparent pricing, live in a day, deep POS.
 */

function Cell({
  className,
  title,
  body,
  visual,
}: {
  className?: string
  title: string
  body: string
  visual: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_16px_50px_-20px_color-mix(in_srgb,var(--color-brand)_35%,transparent)]",
        className
      )}
    >
      <div className="mb-6 flex min-h-24 items-center">{visual}</div>
      <div>
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}

/* ---- small custom visuals ------------------------------------------- */

function WholeJobVisual() {
  const steps = ["Answers", "Takes order", "Takes payment", "Fires to POS"]
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="rounded-lg border bg-secondary/60 px-2.5 py-1 text-xs font-medium">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="text-brand/50">›</span>
          )}
        </span>
      ))}
    </div>
  )
}

function PriceVisual() {
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-display text-4xl font-bold tracking-tight">$250</span>
      <span className="text-sm text-muted-foreground">/mo · 750 min</span>
    </div>
  )
}

function SpeedVisual() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-3xl font-bold tracking-tight text-brand">
        &lt;24h
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-brand to-brand-bright" />
      </div>
    </div>
  )
}

function PosVisual() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 grayscale">
      {POS_BRANDS.slice(0, 4).map((b) => (
        <PosLockup key={b.name} brand={b} />
      ))}
    </div>
  )
}

function LangVisual() {
  return (
    <div className="flex items-center gap-2">
      {["EN", "ES", "+"].map((l) => (
        <span
          key={l}
          className="flex size-9 items-center justify-center rounded-full border bg-secondary/60 text-xs font-bold"
        >
          {l}
        </span>
      ))}
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
            body="Answering is the easy part. X1 Voice takes the full order with modifiers, collects payment, and fires a clean ticket to your POS. One agent, the entire call."
            visual={<WholeJobVisual />}
          />
          <Cell
            title="Always on, even after close"
            body="Unlimited simultaneous calls, no hold music, no voicemail. The 11pm caller gets the same answer as the noon one."
            visual={<AlwaysOnVisual />}
          />
          <Cell
            title="Priced in the open"
            body="$250/mo including 750 minutes, no setup fee, no contract. Most of the field won't quote a number without a sales call."
            visual={<PriceVisual />}
          />
          <Cell
            className="lg:col-span-2"
            title="Lands in the POS you already run"
            body="Square, Toast, Clover, and 80+ more, directly or through Deliverect. Orders arrive as normal tickets, nobody re-types anything."
            visual={<PosVisual />}
          />
          <Cell
            className="lg:col-span-2"
            title="Live in under 24 hours"
            body="Connect your POS, import your menu, set your greeting, test, go live, the same shift. White-glove setup if you'd rather we do it."
            visual={<SpeedVisual />}
          />
          <Cell
            title="Speaks your customer's language"
            body="Detects and answers in the caller's language, English, Spanish, and more, while the ticket stays in the format your kitchen reads."
            visual={<LangVisual />}
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
