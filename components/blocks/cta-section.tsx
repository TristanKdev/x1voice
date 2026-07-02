import { DemoDialog } from "@/components/blocks/demo-dialog"

export function CtaSection({
  title = "Hear it answer a real call.",
  description = "Book a 15-minute demo. We'll call your own number live so you can judge it yourself.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="border-t bg-navy text-navy-foreground dark:bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-navy-foreground/70">
            {description}
          </p>
        </div>
        <DemoDialog size="lg" className="shrink-0 rounded-full px-7">
          Book a demo
        </DemoDialog>
      </div>
    </section>
  )
}
