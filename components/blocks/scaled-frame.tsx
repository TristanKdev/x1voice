"use client"

import * as React from "react"

/**
 * Renders its children at a fixed design width and scales the whole block down
 * to fit the available width. Lets a desktop-shaped UI (like the product
 * dashboard) shrink as ONE piece on small screens instead of reflowing into a
 * tall vertical stack. The wrapper height tracks the scaled content so there's
 * no leftover whitespace.
 */
export function ScaledFrame({
  designWidth = 880,
  className,
  children,
}: {
  designWidth?: number
  className?: string
  children: React.ReactNode
}) {
  const outerRef = React.useRef<HTMLDivElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)
  const [height, setHeight] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const measure = () => {
      const s = Math.min(1, outer.clientWidth / designWidth)
      setScale(s)
      setHeight(inner.offsetHeight * s)
    }

    const raf = requestAnimationFrame(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(outer)
    ro.observe(inner)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [designWidth])

  return (
    <div ref={outerRef} className={className} style={{ height }}>
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  )
}
