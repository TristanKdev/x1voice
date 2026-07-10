"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Wraps a section so it rises and fades in as you scroll to it (once).
 * Gives the page scroll-driven movement between sections without the
 * fragility of a pinned scrub. Reduced-motion visitors get no transform.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
