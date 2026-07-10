import type { SVGProps } from "react"

/**
 * POS brand lockups for the integrations grid.
 *
 * These are lightweight, recognizable SVG recreations (iconic mark in the
 * brand's primary color + wordmark), not the vendors' official raster logo
 * files — standard practice for an integration directory and keeps the
 * bundle asset-free. If Legal/Brand later supplies official SVGs, drop them
 * in `public/pos/<slug>.svg` and swap the `mark` render here; the grid does
 * not change. Brand colors are tagged per entry so they're easy to correct.
 */

type LogoProps = SVGProps<SVGSVGElement>

const wordmarkClass = "font-display font-bold tracking-tight"

/* ---- iconic marks (brand color baked in) ---------------------------- */

function SquareMark(p: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <rect x="3" y="3" width="26" height="26" rx="6" fill="#000" />
      <rect x="11" y="11" width="10" height="10" rx="2.5" fill="#fff" />
    </svg>
  )
}

function ToastMark(p: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <path
        d="M16 3c7.2 0 13 4.6 13 11.5S23.2 26 16 26 3 21.4 3 14.5 8.8 3 16 3Z"
        fill="#FF4C00"
      />
      <circle cx="11.5" cy="15" r="1.7" fill="#fff" />
      <circle cx="20.5" cy="15" r="1.7" fill="#fff" />
    </svg>
  )
}

function CloverMark(p: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <g fill="#5AAB61">
        <circle cx="16" cy="9" r="6" />
        <circle cx="23" cy="16" r="6" />
        <circle cx="16" cy="23" r="6" />
        <circle cx="9" cy="16" r="6" />
      </g>
      <circle cx="16" cy="16" r="3.4" fill="#fff" />
    </svg>
  )
}

function DotMark({ color, ...p }: LogoProps & { color: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <rect x="3" y="3" width="26" height="26" rx="8" fill={color} />
      <circle cx="16" cy="16" r="6.5" fill="#fff" />
    </svg>
  )
}

function ChevronMark({ color, ...p }: LogoProps & { color: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
      <rect x="3" y="3" width="26" height="26" rx="8" fill={color} />
      <path
        d="M12 10l7 6-7 6"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export type PosBrand = {
  name: string
  color: string
  Mark: (p: LogoProps) => React.ReactElement
}

/** Highlighted POS brands, in grid order. */
export const POS_BRANDS: PosBrand[] = [
  { name: "Square", color: "#000000", Mark: SquareMark },
  { name: "Toast", color: "#FF4C00", Mark: ToastMark },
  { name: "Clover", color: "#5AAB61", Mark: CloverMark },
  { name: "Lightspeed", color: "#F5333F", Mark: (p) => <ChevronMark color="#F5333F" {...p} /> },
  { name: "TouchBistro", color: "#0B5FB0", Mark: (p) => <DotMark color="#0B5FB0" {...p} /> },
  { name: "SpotOn", color: "#12B76A", Mark: (p) => <DotMark color="#12B76A" {...p} /> },
  { name: "Revel", color: "#1C6EF2", Mark: (p) => <ChevronMark color="#1C6EF2" {...p} /> },
  { name: "Aloha", color: "#00857D", Mark: (p) => <DotMark color="#00857D" {...p} /> },
  { name: "Epos Now", color: "#0AB5B0", Mark: (p) => <DotMark color="#0AB5B0" {...p} /> },
  { name: "Snackpass", color: "#FFCC00", Mark: (p) => <DotMark color="#111111" {...p} /> },
]

/** A single brand lockup: mark + wordmark, brand-colored, grayscale at rest. */
export function PosLockup({ brand }: { brand: PosBrand }) {
  const { name, color, Mark } = brand
  return (
    <div className="flex items-center gap-2.5">
      <Mark className="size-7 shrink-0" />
      <span className={wordmarkClass} style={{ color }}>
        {name}
      </span>
    </div>
  )
}
