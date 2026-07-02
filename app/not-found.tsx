import Link from "next/link"
import { ArrowRightIcon, SearchXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
  path: "/404",
  noIndex: true,
})

/**
 * A real 404 — Next.js returns true HTTP 404 for non-streamed responses
 * here. The old site's SPA fallback served the homepage at 200 for any bad
 * URL; this replaces that structurally, not just cosmetically.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
      <SearchXIcon className="size-10 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-display font-medium">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button
        className="mt-8 gap-2"
        nativeButton={false}
        render={
          <Link href="/">
            Back to home
            <ArrowRightIcon className="size-4" />
          </Link>
        }
      />
    </div>
  )
}
