import { PhoneCallIcon, PlugZapIcon, TrendingUpIcon } from "lucide-react"

/**
 * "How it works", three steps, anchored on the speed-to-live promise.
 * Paired with a POS + tablet device visual so the operator sees the
 * hardware they already own. Presentational; copy lives inline.
 */

const STEPS = [
  {
    n: "01",
    icon: PlugZapIcon,
    title: "Set up in minutes",
    body: "Connect your POS, import your menu, set your hours and greeting. Prefer it done for you? Our team handles white-glove setup. You go live in minutes, not weeks.",
  },
  {
    n: "02",
    icon: PhoneCallIcon,
    title: "AI answers every call",
    body: "X1 Voice picks up instantly, no hold time, no voicemail. It takes orders, answers questions, and routes edge cases cleanly to your team.",
  },
  {
    n: "03",
    icon: TrendingUpIcon,
    title: "Watch revenue grow",
    body: "See live calls, transcripts, and revenue impact in your dashboard. Track missed-call recovery, average ticket lift, and peak call times to staff smarter.",
  },
]

function DeviceVisual() {
  return (
    <div className="relative">
      <div aria-hidden className="tech-glow absolute inset-6 -z-10" />

      {/* Tablet showing a live call + order building */}
      <div className="relative rounded-[1.5rem] border border-border bg-band p-2 shadow-2xl shadow-band/30">
        <div className="rounded-[1.1rem] bg-band-2 p-4 text-band-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Live call · 0:42
            </div>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-band-muted">
              (415) ···-··84
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {[
              "1× Large pizza, half pepperoni",
              "Add ranch on the side",
              "Make it gluten-free",
            ].map((line, i) => (
              <div
                key={line}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: i === 0 ? "var(--tech-cyan)" : "var(--tech-blue)" }}
                />
                {line}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-band-border bg-white/5 px-3 py-2">
            <span className="text-xs text-band-muted">Total</span>
            <span className="text-sm font-semibold">$18.50</span>
          </div>
        </div>
      </div>

      {/* POS terminal peeking behind, showing the fired ticket */}
      <div className="absolute -right-4 -bottom-8 hidden w-44 rotate-3 rounded-xl border border-border bg-card p-3 shadow-xl sm:block">
        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          POS · New ticket
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-1.5 w-3/4 rounded-full bg-muted" />
          <div className="h-1.5 w-1/2 rounded-full bg-brand/40" />
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Sent to kitchen
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            Live in minutes
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            From sign-up to answering calls in minutes
          </h2>
          <p className="mt-3 text-muted-foreground">
            No integrator, no six-week rollout. Connect the tools you already
            run and X1 Voice starts working the same shift.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <ol className="space-y-8">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/5 text-brand">
                    <s.icon className="size-5" strokeWidth={1.75} />
                  </div>
                  {s.n !== "03" && (
                    <span className="mt-2 w-px flex-1 bg-gradient-to-b from-brand/30 to-transparent" />
                  )}
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-brand">Step {s.n}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <DeviceVisual />
        </div>
      </div>
    </section>
  )
}
