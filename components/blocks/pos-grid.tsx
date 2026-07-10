"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { HIGHLIGHTED_POS, POS_COUNT_LABEL, type PosSystem } from "@/data/pos-systems"

/**
 * Highlight grid for the most recognizable POS integrations. Wordmarks are
 * rendered as styled text on purpose — no fabricated logo assets — and the
 * framing is always "works with", never "trusted by" or "customers".
 * Cards with a dedicated /integrations page link to it.
 */

const PIXEL_COLORS = ["#635BFF", "#8B85FF", "#BDB9FF"]

/* lg-only placements around a center text block spanning cols 2-4, rows 2-3. */
const LG_POSITIONS = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-5 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-5 lg:row-start-2",
  "lg:col-start-5 lg:row-start-3",
  "lg:col-start-1 lg:row-start-4",
  "lg:col-start-2 lg:row-start-4",
  "lg:col-start-3 lg:row-start-4",
  "lg:col-start-4 lg:row-start-4",
  "lg:col-start-5 lg:row-start-4",
]

function PosCard({ pos, lgPosition }: { pos: PosSystem; lgPosition?: string }) {
  const inner = (
    <>
      <PixelCanvas colors={PIXEL_COLORS} gap={6} speed={30} />
      <span className="font-display relative z-10 px-3 text-center text-sm font-bold tracking-tight text-muted-foreground/70 transition-colors duration-300 group-hover:text-brand sm:text-base">
        {pos.name}
      </span>
    </>
  )

  const className = cn(
    "group relative isolate grid h-20 place-items-center overflow-hidden bg-card transition-shadow duration-300 select-none lg:h-full",
    "hover:z-[2] hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-brand)_25%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-brand)_40%,transparent)]",
    lgPosition
  )

  return pos.slug ? (
    <Link
      href={`/integrations/${pos.slug}`}
      aria-label={`X1 Voice + ${pos.name} integration details`}
      className={className}
    >
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export function PosGrid() {
  return (
    <section className="border-t py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-px border bg-border lg:grid-cols-5 lg:grid-rows-[repeat(4,6rem)]">
          {/* Center block: first in DOM (mobile top), centered on lg. */}
          <div className="col-span-2 flex flex-col items-center justify-center gap-4 bg-card px-6 py-10 lg:col-start-2 lg:col-span-3 lg:row-start-2 lg:row-span-2">
            <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              {POS_COUNT_LABEL}
            </span>
            <h2 className="font-display max-w-md text-center text-2xl leading-tight font-semibold tracking-tight md:text-3xl">
              Works with the POS you already run
            </h2>
            <Link
              href="/integrations"
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              See integration details
              <ArrowRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>

          {HIGHLIGHTED_POS.map((pos, i) => (
            <PosCard key={pos.name} pos={pos} lgPosition={LG_POSITIONS[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
