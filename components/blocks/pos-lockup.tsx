"use client"

import * as React from "react"
import type { SVGProps } from "react"

import { type PosBrand } from "@/components/blocks/pos-logos"

/* ---- true glyphs (only where the glyph IS the mark) ---------------- */

type GlyphProps = SVGProps<SVGSVGElement>

function SquareGlyph(p: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <rect x="3" y="3" width="26" height="26" rx="6.5" fill="#000" />
      <rect x="10.5" y="10.5" width="11" height="11" rx="2.5" fill="#fff" />
    </svg>
  )
}
function CloverGlyph(p: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <g fill="#4E9A51">
        <circle cx="16" cy="10" r="6" />
        <circle cx="22" cy="16" r="6" />
        <circle cx="16" cy="22" r="6" />
        <circle cx="10" cy="16" r="6" />
      </g>
    </svg>
  )
}
function ToastGlyph(p: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <path
        d="M6 15c0-5.5 4.5-9 10-9s10 3.5 10 9v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8Z"
        fill="#FF4C00"
      />
    </svg>
  )
}

const GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  square: SquareGlyph,
  clover: CloverGlyph,
  toast: ToastGlyph,
}

function Recreation({ brand }: { brand: PosBrand }) {
  const Glyph = GLYPHS[brand.slug]
  return (
    <div className="flex items-center gap-2">
      {Glyph ? <Glyph className="size-6 shrink-0" /> : null}
      <span
        className="font-display text-lg font-bold"
        style={{ color: brand.color, letterSpacing: "-0.01em" }}
      >
        {brand.wordmark ?? brand.name}
      </span>
    </div>
  )
}

/**
 * Renders the official logo file at /pos/<slug>.png if it loads, else the
 * recreation. Adding a real file "just works" with no code change.
 */
export function PosLockup({ brand }: { brand: PosBrand }) {
  const [failed, setFailed] = React.useState(false)
  if (failed) return <Recreation brand={brand} />
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/pos/${brand.slug}.png`}
      alt={`${brand.name} logo`}
      className="h-7 w-auto max-w-[70%] object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
