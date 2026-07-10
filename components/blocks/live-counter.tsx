"use client"

import * as React from "react"

/**
 * A number that ticks in real time to make the dashboard feel live. Renders
 * `base` on the server and first client paint (so no hydration mismatch),
 * then drifts on an interval. Up-only counters climb; `fluctuate` ones wander
 * within [clampLow, clampHigh] so they "change" without running away.
 */
export function LiveCounter({
  base,
  prefix = "",
  suffix = "",
  min,
  max,
  everyMs = 2500,
  fluctuate = false,
  clampLow,
  clampHigh,
}: {
  base: number
  prefix?: string
  suffix?: string
  min: number
  max: number
  everyMs?: number
  fluctuate?: boolean
  clampLow?: number
  clampHigh?: number
}) {
  const [n, setN] = React.useState(base)

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      setN((v) => {
        const delta = Math.floor(Math.random() * (max - min + 1)) + min
        if (fluctuate) {
          let next = v + (Math.random() < 0.45 ? -delta : delta)
          if (clampLow != null) next = Math.max(clampLow, next)
          if (clampHigh != null) next = Math.min(clampHigh, next)
          return next
        }
        return v + delta
      })
      timer = setTimeout(tick, everyMs * (0.65 + Math.random() * 0.7))
    }
    timer = setTimeout(tick, everyMs)
    return () => clearTimeout(timer)
  }, [max, min, everyMs, fluctuate, clampLow, clampHigh])

  return (
    <span className="tabular-nums">
      {prefix}
      {Math.round(n).toLocaleString()}
      {suffix}
    </span>
  )
}
