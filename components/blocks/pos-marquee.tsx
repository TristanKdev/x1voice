import { Marquee } from "@/components/ui/marquee"
import { DELIVERECT_POS, POS_VIA } from "@/data/pos-systems"

/**
 * The long tail of POS systems reachable via Deliverect, as a two-row
 * marquee of text wordmarks. Draws from DELIVERECT_POS specifically so
 * direct integrations (OrderCounter, OrderOut) are never credited to
 * Deliverect by the caption below. Integration partners, never
 * "customers" — the surrounding copy must keep works-with framing.
 */
export function PosMarquee() {
  const half = Math.ceil(DELIVERECT_POS.length / 2)
  const rows = [DELIVERECT_POS.slice(0, half), DELIVERECT_POS.slice(half)]

  return (
    <div className="relative mt-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      {rows.map((row, i) => (
        <Marquee
          key={i}
          reverse={i === 1}
          pauseOnHover
          repeat={3}
          className="p-0 py-2 [--duration:80s] [--gap:2.5rem]"
        >
          {row.map((pos) => (
            <span
              key={pos.name}
              className="font-display text-sm font-semibold tracking-tight whitespace-nowrap text-muted-foreground/60"
            >
              {pos.name}
            </span>
          ))}
        </Marquee>
      ))}

      <p className="mt-6 text-center text-xs text-muted-foreground/70">
        …and more, connected through our {POS_VIA} integration.
      </p>
    </div>
  )
}
