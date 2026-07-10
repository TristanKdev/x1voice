import { PhoneCallIcon, ShieldCheckIcon } from "lucide-react"

import { DEMO_LINE } from "@/data/site"

/**
 * "Hear it in action" — the visitor calls a real X1 Voice demo line and
 * talks to the agent themselves. Calling is the consent event.
 *
 * WIRE (dev): DEMO_LINE in data/site.ts is a placeholder. Point it at the
 * live demo number. The `tel:` link is the only interactive element; the
 * "record every number that calls / use for marketing" consent is disclosed
 * below and takes effect when the visitor places the call. No JS here.
 */
export function DemoCall() {
  return (
    <section
      id="see-it"
      className="relative scroll-mt-20 overflow-hidden bg-band text-band-foreground"
    >
      <div aria-hidden className="tech-grid-dark absolute inset-0 opacity-50" />
      <div aria-hidden className="tech-glow absolute top-1/2 left-1/2 -z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <span className="inline-flex items-center rounded-full border border-band-border bg-white/5 px-3 py-1 text-xs font-semibold">
          Hear it in action
        </span>
        <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Call the demo line. Talk to it yourself.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-band-muted">
          No scripted video, no sales rep. Pick up your phone, call the number
          below, and order like a real customer would. Judge the voice, the
          speed, and the accuracy on your own.
        </p>

        <a
          href={`tel:${DEMO_LINE.tel}`}
          className="group mt-10 inline-flex items-center gap-4 rounded-2xl border border-band-border bg-white/5 px-8 py-5 backdrop-blur-sm transition hover:bg-white/10"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_8px_30px_-8px_var(--color-brand)] transition group-hover:bg-brand-bright">
            <PhoneCallIcon className="size-5" />
          </span>
          <span className="text-left">
            <span className="block text-[11px] font-semibold tracking-widest text-band-muted uppercase">
              Tap to call · always on
            </span>
            <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {DEMO_LINE.display}
            </span>
          </span>
        </a>

        <p className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2 text-xs leading-relaxed text-band-muted/80">
          <ShieldCheckIcon className="mt-0.5 size-4 shrink-0" />
          <span>
            By calling this demo line you consent to the call being recorded and
            to X1 Voice contacting you about the product. We log every number
            that calls. See our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-band-foreground">
              Privacy Policy
            </a>{" "}
            for details.
          </span>
        </p>
      </div>
    </section>
  )
}
