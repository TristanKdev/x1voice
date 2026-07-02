import { MISSED_CALLS_STAT } from "@/data/site"

/**
 * Renders the sitewide missed-calls stat from a single source. The old site
 * stated this claim three different ways across different pages. Every
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
      <p className="font-display text-4xl font-medium sm:text-5xl">
        <span className="text-brand">{stat.value}</span>{" "}
        <span>{stat.label}</span>
      </p>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
        {stat.detail}
      </p>
      <p className="mt-3 border-t pt-3 text-xs text-muted-foreground/80">
        Source: {stat.source.label}
        {stat.source.url ? (
          <>
            {" ("}
            <a
              href={stat.source.url}
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              view source
            </a>
            {")"}
          </>
        ) : null}
        , as of {stat.source.asOf}
      </p>
    </div>
  )
}
