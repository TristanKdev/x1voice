/**
 * Fixed disclaimer language rendered wherever a competitor price claim
 * appears. The old site's compare pages stated competitor pricing as bare
 * fact (and one page's own math didn't check out), this component makes
 * the "estimated, confirm before purchasing" framing impossible to skip.
 */
export function PricingDisclaimer({
  competitorName,
  asOf,
  sourceUrl,
}: {
  competitorName: string
  asOf: string
  sourceUrl: string
}) {
  return (
    <p className="text-xs text-muted-foreground">
      Pricing shown for {competitorName} is estimated from their publicly
      listed pricing as of {asOf}. Vendors change pricing without notice, 
      confirm current pricing directly with {competitorName} before
      purchasing.{" "}
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
      >
        Source: {competitorName} pricing page ↗
      </a>
    </p>
  )
}
