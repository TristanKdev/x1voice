import Link from "next/link"
import { CheckIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DemoDialog } from "@/components/blocks/demo-dialog"

const TRANSCRIPT: { speaker: "agent" | "caller"; text: string }[] = [
  { speaker: "agent", text: "Tony's Pizzeria, what can I get you?" },
  { speaker: "caller", text: "Large pie, half pepperoni half mushroom." },
  {
    speaker: "agent",
    text: "Large, half pepperoni, half mushroom. That's $18.50. Pickup or delivery?",
  },
  { speaker: "caller", text: "Pickup. Under Maria." },
  { speaker: "agent", text: "Got it, Maria. About 25 minutes." },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Stripe-style soft aurora wash on white: light, cool, low saturation. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[linear-gradient(115deg,oklch(0.97_0.02_240)_0%,oklch(0.96_0.03_277)_35%,oklch(0.98_0.012_200)_65%,transparent_100%)] opacity-70 dark:opacity-15"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold text-brand">
            AI phone agent for restaurants
          </p>
          <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.05] sm:text-7xl">
            Your phone is ringing. Nobody can get to it.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            X1 Voice picks up, takes the order, and puts it straight into your
            POS. It covers the dinner rush, the 11pm caller, and the Monday
            you&rsquo;re short-staffed.
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <DemoDialog size="lg" className="rounded-full px-7">
              Book a demo
            </DemoDialog>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full bg-background px-7"
              nativeButton={false}
              render={<Link href="/pricing">See pricing</Link>}
            />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No setup fees", "No contract", "Works with your POS"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckIcon className="size-3.5 text-brand" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <figure
          aria-label="Example of X1 Voice taking a phone order"
          className="rounded-2xl border bg-card shadow-[0_24px_60px_-12px_rgb(10_37_64/0.18),0_8px_24px_-8px_rgb(10_37_64/0.12)]"
        >
          <figcaption className="flex items-center gap-2.5 border-b px-5 py-3.5 text-sm">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand text-brand-foreground">
              <PhoneIcon className="size-3.5" />
            </span>
            <span className="font-semibold">Incoming call</span>
            <span className="ml-auto text-xs text-muted-foreground">
              Fri 6:42 PM
            </span>
          </figcaption>
          <div className="space-y-3 px-5 py-6">
            {TRANSCRIPT.map((line, i) => (
              <div
                key={i}
                className={
                  line.speaker === "caller"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <p
                  className={
                    line.speaker === "caller"
                      ? "max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm"
                  }
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t px-5 py-3.5 text-xs font-medium text-muted-foreground">
            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
            </span>
            Order sent to POS
          </div>
        </figure>
      </div>
    </section>
  )
}
