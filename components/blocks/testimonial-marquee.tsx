import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { PLACEHOLDER_TESTIMONIALS } from "@/data/site"

/**
 * Explicit, labeled placeholders — never fabricated customer names or
 * quotes. Swap PLACEHOLDER_TESTIMONIALS in data/site.ts for real
 * testimonials as they come in; this component doesn't need to change.
 */
export function TestimonialMarquee() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-display font-semibold sm:text-4xl">
          Customer stories
        </h2>
        <p className="mt-4 text-muted-foreground">
          We&apos;re a young product. Real customer stories will land here as
          they come in, and we&apos;d rather show you an honest empty slot
          than an invented quote.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PLACEHOLDER_TESTIMONIALS.map((t) => (
          <Card
            key={t.initials}
            className="border-dashed p-6 text-left"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{t.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{t.roleLabel}</p>
                <p className="text-xs text-muted-foreground">{t.segment}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">
              &ldquo;{t.quote}&rdquo;
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
