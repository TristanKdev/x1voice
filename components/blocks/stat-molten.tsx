import { MISSED_CALLS_STAT } from "@/data/site"

/**
 * The sitewide missed-calls stat, ringed by a hand-drawn "marker circle"
 * stroked with the molten gradient. Still sourced through MISSED_CALLS_STAT
 * so the number can't drift. Dark band so the gradient glows.
 */
export function StatMolten({ stat = MISSED_CALLS_STAT }: { stat?: typeof MISSED_CALLS_STAT }) {
  return (
    <section className="relative overflow-hidden bg-band text-band-foreground">
      <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <div className="relative grid size-64 place-items-center sm:size-72">
            {/* Hand-drawn molten ring */}
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient id="molten" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--tech-cyan)" />
                  <stop offset="30%" stopColor="var(--tech-blue)" />
                  <stop offset="60%" stopColor="var(--tech-violet)" />
                  <stop offset="100%" stopColor="var(--tech-ember)" />
                </linearGradient>
              </defs>
              {/* soft outer glow (same path, blurred) */}
              <path
                d="M167 44 C214 66 220 150 168 188 C112 228 44 200 34 138 C26 84 92 34 150 42 C171 45 183 52 190 62"
                fill="none"
                stroke="url(#molten)"
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.35"
                style={{ filter: "blur(14px)" }}
              />
              {/* main sketched stroke */}
              <path
                className="drawn-ring-path"
                pathLength={1}
                d="M167 44 C214 66 220 150 168 188 C112 228 44 200 34 138 C26 84 92 34 150 42 C171 45 183 52 190 62"
                fill="none"
                stroke="url(#molten)"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 text-center">
              <div className="font-display text-6xl font-bold tracking-tight sm:text-7xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] font-semibold tracking-widest text-band-muted uppercase">
                calls missed
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
