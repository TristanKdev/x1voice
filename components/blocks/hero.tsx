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
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-brand">
            AI phone agent for restaurants
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-medium sm:text-6xl">
            Your phone is ringing. Nobody can get to it.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            X1 Voice picks up, takes the order, and puts it straight into your
            POS. It covers the dinner rush, the 11pm caller, and the Monday
            you&rsquo;re short-staffed.
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <DemoDialog size="lg" className="px-6">
              Book a demo
            </DemoDialog>
            <Button
              variant="ghost"
              size="lg"
              className="px-4"
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
          className="rounded-lg border bg-card shadow-sm"
        >
          <figcaption className="flex items-center gap-2 border-b px-4 py-3 text-sm">
            <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
              <PhoneIcon className="size-3" />
            </span>
            <span className="font-medium">Incoming call</span>
            <span className="ml-auto text-xs text-muted-foreground">
              Fri 6:42 PM
            </span>
          </figcaption>
          <div className="space-y-3 px-4 py-5">
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
                      ? "max-w-[80%] rounded-lg bg-secondary px-3 py-2 text-sm"
                      : "max-w-[80%] rounded-lg border px-3 py-2 text-sm"
                  }
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
            <CheckIcon className="size-3.5 text-brand" />
            Order sent to POS
          </div>
        </figure>
      </div>
    </section>
  )
}
