"use client"

import { ArrowUpIcon } from "lucide-react"

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="group flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition hover:border-brand/40 hover:text-foreground"
    >
      <ArrowUpIcon className="size-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  )
}
