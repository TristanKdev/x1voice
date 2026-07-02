import { MISSED_CALLS_STAT } from "@/data/site"

/**
 * Renders the sitewide missed-calls stat from a single source. The old site
 * stated this claim three different ways across different pages — every
 * usage here reads from data/site.ts, so it structurally cannot drift again.
 */
export function SourcedStat({
  stat = MISSED_CALLS_STAT,
  className,
}: {
  stat?: typeof MISSED_CALLS_STAT
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
        <span className="text-gradient-brand">{stat.value}</span>{" "}
        <span className="text-foreground">{stat.label}</span>
      </p>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {stat.detail}
      </p>
      <p className="mt-3 text-xs text-muted-foreground/70">
        Source: {stat.source.label}
        {stat.source.url ? (
          <>
            {" — "}
            <a
              href={stat.source.url}
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              view source
            </a>
          </>
        ) : null}
        {" · as of "}
        {stat.source.asOf}
      </p>
    </div>
  )
}
