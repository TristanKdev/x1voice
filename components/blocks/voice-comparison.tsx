import Link from "next/link"
import { CheckIcon, MinusIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  COMPARE_INTRO,
  MATRIX_DIMENSIONS,
  VOICE_VENDORS,
  type Cell,
} from "@/data/voice-ai-competitors"

/**
 * Comparison matrix: X1 Voice vs. the main restaurant voice-AI vendors.
 * `limit` renders a condensed set for the homepage; the full page passes
 * everything. The table scrolls horizontally on small screens.
 */

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes")
    return <CheckIcon className="mx-auto size-4 text-brand" aria-label="Yes" />
  if (value === "no")
    return <XIcon className="mx-auto size-4 text-muted-foreground/40" aria-label="No" />
  if (value === "partial")
    return <MinusIcon className="mx-auto size-4 text-amber-500" aria-label="Partial" />
  if (value === "deep")
    return <span className="text-xs font-semibold text-brand">Deep</span>
  if (value === "basic")
    return <span className="text-xs text-muted-foreground">Basic</span>
  if (value === "none")
    return <span className="text-xs text-muted-foreground/40">None</span>
  return <span className="text-xs">{value}</span>
}

export function VoiceComparison({
  limit,
  heading = true,
}: {
  limit?: number
  heading?: boolean
}) {
  const vendors = limit ? VOICE_VENDORS.slice(0, limit) : VOICE_VENDORS

  return (
    <section className="border-t py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {heading && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              How X1 Voice compares
            </h2>
            <p className="mt-3 text-muted-foreground">{COMPARE_INTRO}</p>
          </div>
        )}

        <div className="mt-12 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="p-4 text-left font-semibold">Vendor</th>
                {MATRIX_DIMENSIONS.map((d) => (
                  <th key={d.key} className="p-4 text-center font-medium text-muted-foreground">
                    {d.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr
                  key={v.name}
                  className={cn(
                    "border-b last:border-0",
                    v.isUs && "bg-brand/5"
                  )}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-semibold",
                          v.isUs && "text-brand"
                        )}
                      >
                        {v.name}
                      </span>
                      {v.isUs && (
                        <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-brand-foreground">
                          You
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{v.category}</p>
                  </td>
                  {MATRIX_DIMENSIONS.map((d) => (
                    <td key={d.key} className="p-4 text-center">
                      <CellIcon value={v.cells[d.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {limit && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/compare" className="font-semibold text-brand hover:underline">
              See the full comparison and pricing notes
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
