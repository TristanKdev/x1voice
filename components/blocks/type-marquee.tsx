import Link from "next/link"

import { Marquee } from "@/components/ui/marquee"
import { getAllSolutions } from "@/lib/content/solutions"

/**
 * Scrolling strip of restaurant types, each a real link into its solution
 * page. Content comes from data/solutions.ts, so a new solution page shows
 * up here automatically.
 */
export function TypeMarquee() {
  const solutions = getAllSolutions()

  return (
    <div className="border-b bg-muted/30">
      <Marquee pauseOnHover className="py-3 [--duration:50s]">
        {solutions.map((s) => (
          <Link
            key={s.slug}
            href={`/solutions/${s.slug}`}
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden className="text-brand">
              ·
            </span>
            {s.restaurantType}
          </Link>
        ))}
      </Marquee>
    </div>
  )
}
