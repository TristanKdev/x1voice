import Link from "next/link"
import { ArrowRightIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoDialog } from "@/components/blocks/demo-dialog"
import { SITE_TAGLINE } from "@/data/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_60%,transparent_100%)]" />
      <div
        aria-hidden
        className="glow-orb pointer-events-none absolute left-1/2 top-[-10rem] size-[36rem] -translate-x-1/2"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <Badge
          variant="secondary"
          className="mb-6 gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          Answering calls for restaurants right now
        </Badge>

        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Never miss another order.{" "}
          <span className="text-gradient-brand">{SITE_TAGLINE}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          X1 Voice answers your phone 24/7, takes the order, handles the
          question, and syncs straight to your POS — so no call, and no
          order, ever gets missed again.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <DemoDialog size="lg" className="gap-2 px-6">
            Book a demo
            <ArrowRightIcon className="size-4" />
          </DemoDialog>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-6"
            nativeButton={false}
            render={
              <Link href="/pricing">
                <PhoneIcon className="size-4" />
                See pricing
              </Link>
            }
          />
        </div>
      </div>
    </section>
  )
}
