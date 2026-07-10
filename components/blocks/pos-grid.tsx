import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { POS_BRANDS, type PosBrand } from "@/components/blocks/pos-logos"
import { PosLockup } from "@/components/blocks/pos-lockup"
import {
  POS_COUNT_LABEL,
  POS_SYSTEMS,
  POS_VIA,
} from "@/data/pos-systems"

/**
 * Highlighted POS integrations, shown as real brand lockups. Framing is
 * always "works with", these are integration partners, not customers.
 * Grayscale at rest, brand color on hover. Cards for a POS that has a
 * dedicated /integrations/[slug] page link to it.
 */

function slugFor(name: string): string | undefined {
  return POS_SYSTEMS.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  )?.slug
}

function BrandCard({ brand }: { brand: PosBrand }) {
  const slug = slugFor(brand.name)
  const className = cn(
    "group flex items-center justify-center rounded-xl border bg-card p-5 transition-all duration-200",
    "grayscale hover:grayscale-0 hover:-translate-y-0.5 hover:border-brand/40",
    "hover:shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--color-brand)_35%,transparent)]"
  )
  return slug ? (
    <Link
      href={`/integrations/${slug}`}
      aria-label={`X1 Voice + ${brand.name} integration`}
      className={className}
    >
      <PosLockup brand={brand} />
    </Link>
  ) : (
    <div className={className}>
      <PosLockup brand={brand} />
    </div>
  )
}

export function PosGrid() {
  return (
    <section className="border-t bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            {POS_COUNT_LABEL}
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Works with the POS you already run
          </h2>
          <p className="mt-3 text-muted-foreground">
            Orders land in your register as normal tickets, directly, or
            through our {POS_VIA} connection. No new hardware, no double entry.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {POS_BRANDS.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/integrations"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            See every integration and how it connects
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
