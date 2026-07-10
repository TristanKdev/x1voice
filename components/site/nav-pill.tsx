"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"

import { MAIN_NAV } from "@/data/nav"

/**
 * Centered desktop nav as a pill with a highlight that slides to whichever
 * item you hover. Theme-aware (brand tint, not a hard black border).
 */
export function NavPill() {
  const [ind, setInd] = React.useState({ left: 0, width: 0, opacity: 0 })

  return (
    <ul
      onMouseLeave={() => setInd((p) => ({ ...p, opacity: 0 }))}
      className="relative hidden items-center rounded-full border bg-card/60 p-1 shadow-sm backdrop-blur md:flex"
    >
      {MAIN_NAV.map((link) => (
        <li
          key={link.href}
          onMouseEnter={(e) => {
            const t = e.currentTarget
            setInd({ left: t.offsetLeft, width: t.offsetWidth, opacity: 1 })
          }}
          className="relative z-10"
        >
          <Link
            href={link.href}
            className="block rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        </li>
      ))}
      <motion.li
        aria-hidden
        animate={ind}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="absolute inset-y-1 z-0 rounded-full bg-brand/10"
      />
    </ul>
  )
}
