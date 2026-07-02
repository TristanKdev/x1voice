import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { JsonLd } from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd } from "@/lib/seo/jsonld"

export type Crumb = { name: string; path: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-6 pt-8">
      <JsonLd data={buildBreadcrumbJsonLd(full)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {full.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRightIcon className="size-3.5" /> : null}
            {i === full.length - 1 ? (
              <span className="text-foreground">{crumb.name}</span>
            ) : (
              <Link href={crumb.path} className="hover:text-foreground">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
