import { ArrowRightIcon } from "lucide-react"

import { DemoDialog } from "@/components/blocks/demo-dialog"

export function CtaSection({
  title = "See it answer a call in real time.",
  description = "Book a 15-minute demo — we'll call your own number live so you can hear it work.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="border-t">
      <div className="relative mx-auto max-w-4xl overflow-hidden px-6 py-20 text-center">
        <div
          aria-hidden
          className="glow-orb pointer-events-none absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {description}
          </p>
          <DemoDialog size="lg" className="mt-8 gap-2 px-6">
            Book a demo
            <ArrowRightIcon className="size-4" />
          </DemoDialog>
        </div>
      </div>
    </section>
  )
}
