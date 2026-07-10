"use client"

import * as React from "react"
import type { SVGProps } from "react"

import { type PosBrand } from "@/components/blocks/pos-logos"

/* ---- recreation glyphs (fallback if the real logo file is missing) --- */

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
      <path d="M6 15c0-5.5 4.5-9 10-9s10 3.5 10 9v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8Z" fill="#FF4C00" />
    </svg>
  )
}

const GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  square: SquareGlyph,
  clover: CloverGlyph,
  toast: ToastGlyph,
}

/**
 * Brand lockup: the real logo mark from /pos/<slug>.png (falls back to a
 * recreation glyph if the file is missing) + the wordmark in the brand color.
 * Drop a better official file in and it swaps in automatically.
 */
export function PosLockup({ brand }: { brand: PosBrand }) {
  const [failed, setFailed] = React.useState(false)
  const Glyph = GLYPHS[brand.slug]

  return (
    <div className="flex items-center gap-2">
      {failed ? (
        Glyph ? (
          <Glyph className="size-6 shrink-0" />
        ) : null
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/pos/${brand.slug}.png`}
          alt=""
          aria-hidden
          className="size-6 shrink-0 rounded-[5px] object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <span
        className="font-display text-lg font-bold"
        style={{ color: brand.color, letterSpacing: "-0.01em" }}
      >
        {brand.wordmark ?? brand.name}
      </span>
    </div>
  )
}
