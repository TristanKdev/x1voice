import { MISSED_CALLS_STAT } from "@/data/site"

/**
 * The sitewide missed-calls stat, rendered inside an animated "molten"
 * gradient ring (see .molten-ring in globals.css). Still sourced through
 * MISSED_CALLS_STAT so the number never drifts. Dark band so the ring glows.
 */
export function StatMolten({ stat = MISSED_CALLS_STAT }: { stat?: typeof MISSED_CALLS_STAT }) {
  return (
    <section className="relative overflow-hidden bg-band text-band-foreground">
      <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <div
            className="molten-ring grid size-56 place-items-center sm:size-64"
            style={{ ["--ring-w" as string]: "12px" }}
          >
            <div className="grid size-[calc(100%-28px)] place-items-center rounded-full bg-band-2 text-center">
              <div>
                <div className="font-display text-6xl font-bold tracking-tight sm:text-7xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-semibold tracking-widest text-band-muted uppercase">
                  calls missed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-band-muted">{stat.value} restaurant phone calls</span>{" "}
            {stat.label.replace(/^restaurant phone calls\s*/i, "")}
          </h2>
          <p className="mt-4 text-band-muted">{stat.detail}</p>
          <p className="mt-6 border-t border-band-border pt-4 text-xs text-band-muted/70">
            Source: {stat.source.label}, as of {stat.source.asOf}
          </p>
        </div>
      </div>
    </section>
  )
}
