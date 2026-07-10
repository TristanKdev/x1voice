import { PhoneIncomingIcon, UtensilsCrossedIcon } from "lucide-react"

import { POS_VIA, POS_VIA_DELIVERECT_COUNT } from "@/data/pos-systems"

/**
 * "How it connects", the data flow from a phone call, through X1 Voice and
 * Deliverect, into the POS and back-of-house. Shows what actually runs on
 * the rails. Presentational.
 */

const CHANNELS = [
  "POS ticket",
  "Kitchen display",
  "Online ordering",
  "Delivery apps",
  "Reporting",
]

function Node({
  title,
  sub,
  children,
  accent,
}: {
  title: string
  sub: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border p-6 text-center ${
        accent
          ? "border-brand/30 bg-brand/5"
          : "border-border bg-card"
      }`}
    >
      <div
        className={`flex size-14 items-center justify-center rounded-2xl ${
          accent ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground"
        }`}
      >
        {children}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

function Rail() {
  return (
    <div aria-hidden className="flex items-center justify-center py-2 lg:py-0">
      <div className="relative h-8 w-px bg-gradient-to-b from-brand/50 to-brand/10 lg:h-px lg:w-full lg:bg-gradient-to-r">
        <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </div>
    </div>
  )
}

export function DeliverectFlow() {
  return (
    <section className="border-t py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            One clean pipe, from the ring to the kitchen
          </h2>
          <p className="mt-3 text-muted-foreground">
            Square and OrderCounter connect natively. For everything else, X1
            Voice hands the order to {POS_VIA}, which fans it out to your POS and
            channels, {POS_VIA_DELIVERECT_COUNT}+ systems supported. No re-keying,
            no order sitting on a sticky note.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1.4fr]">
          <Node title="The caller" sub="Pickup, delivery, questions" accent>
            <PhoneIncomingIcon className="size-6" />
          </Node>
          <Rail />
          <Node title="X1 Voice + Deliverect" sub="Takes & normalizes the order">
            <span className="font-display text-lg font-black">X1</span>
          </Node>
          <Rail />
          <div className="rounded-2xl border bg-card p-6">
            <p className="flex items-center gap-2 font-semibold">
              <UtensilsCrossedIcon className="size-5 text-brand" strokeWidth={1.75} />
              Lands everywhere it needs to
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CHANNELS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border bg-secondary/60 px-3 py-1 text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
