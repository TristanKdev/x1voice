import { QuoteIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { TESTIMONIALS } from "@/data/site"

/**
 * Real customer feedback only, TESTIMONIALS in data/site.ts carries a
 * `verified` flag and quotes are anonymized (names withheld on purpose).
 * This component must never render invented quotes or attributions.
 */
export function TestimonialMarquee() {
  const quotes = TESTIMONIALS.filter((t) => t.verified)

  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            What operators say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real customer feedback, lightly edited for spelling and clarity.
            Names withheld, we&rsquo;d rather anonymize than invent.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((t) => (
            <Card key={t.quote} className="flex flex-col justify-between p-6 text-left">
              <div>
                <QuoteIcon className="size-5 text-brand/40" fill="currentColor" strokeWidth={0} />
                <p className="mt-3 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t pt-4">
                <Avatar>
                  <AvatarFallback className="text-xs">{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{t.roleLabel}</p>
                  <p className="text-xs text-muted-foreground">{t.segment}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
