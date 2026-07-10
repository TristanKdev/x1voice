import Link from "next/link"
import { ArrowUpRightIcon, PhoneCallIcon, ShieldCheckIcon } from "lucide-react"

import { DEMO_LINE } from "@/data/site"

/**
 * "Hear it in action", the visitor calls a real X1 Voice demo line and talks
 * to the agent. Calling is the consent event. Next to it, "See it in action"
 * jumps back up to the live product reveal.
 *
 * WIRE (dev): DEMO_LINE in data/site.ts is a placeholder. The `tel:` link is
 * the only interactive element; the recording + marketing consent is disclosed
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

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <span className="inline-flex items-center rounded-full border border-band-border bg-white/5 px-3 py-1 text-xs font-semibold">
          Hear it in action
        </span>
        <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Words don&rsquo;t do it justice. Hear it yourself.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-band-muted">
          No scripted video, no sales rep. Pick up your phone, call the number
          below, and order like a real customer would. Judge the voice, the
          speed, and the accuracy on your own.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={`tel:${DEMO_LINE.tel}`}
            className="group flex items-center gap-4 rounded-2xl border border-band-border bg-white/5 px-8 py-5 backdrop-blur-sm transition hover:bg-white/10"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_8px_30px_-8px_var(--color-brand)] transition group-hover:bg-brand-bright">
              <PhoneCallIcon className="size-5" />
            </span>
            <span className="text-left">
              <span className="block text-[11px] font-semibold tracking-widest text-band-muted uppercase">
                Tap to call, always on
              </span>
              <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {DEMO_LINE.display}
              </span>
            </span>
          </a>

          <Link
            href="/#in-action"
            className="flex items-center justify-center gap-2 rounded-2xl border border-band-border bg-white/5 px-7 py-5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10"
          >
            See it in action
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mx-auto mt-8 max-w-lg rounded-xl border border-band-border bg-white/[0.03] p-4 text-sm">
          <p className="font-semibold">
            Plans start at $250/month.{" "}
            <Link href="/pricing" className="text-brand hover:underline">
              See plans
            </Link>
          </p>
          <p className="mt-1 text-xs text-band-muted">
            Running ultra-high order volume? We have special rates and programs.{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-band-foreground">
              Talk to us
            </Link>
            .
          </p>
        </div>

        <p className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2 text-xs leading-relaxed text-band-muted/80">
          <ShieldCheckIcon className="mt-0.5 size-4 shrink-0" />
          <span>
            By calling this demo line you consent to the call being recorded and
            to X1 Voice contacting you about the product. We log every number
            that calls. See our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-band-foreground">
              Privacy Policy
            </a>{" "}
            for details. Terms and conditions apply.
          </span>
        </p>
      </div>
    </section>
  )
}
