"use client"

import * as React from "react"
import { CheckIcon, MicIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/lib/use-media-query"
import { DemoDialog } from "@/components/blocks/demo-dialog"

/**
 * "Hear it in action" — a self-running, clearly-labeled SIMULATED call.
 * The transcript is the same fictional example the old hero used; no real
 * recording is implied. Reduced-motion users get the full transcript
 * rendered statically. Bar heights come from a deterministic sine curve,
 * never Math.random(), so server and client markup always match.
 */

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

const BARS = 44
const LINE_MS = 2200
const RESTART_MS = 4000

const barHeight = (i: number) => 20 + 70 * Math.abs(Math.sin(i * 1.7 + 0.6))

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function VoiceDemo() {
  const [step, setStep] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  // Server default `true` renders the full transcript statically — the
  // right experience for crawlers, no-JS, and reduced-motion visitors.
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", true)

  const done = step >= TRANSCRIPT.length
  const playing = !reduced && !done

  React.useEffect(() => {
    if (reduced) return
    if (done) {
      const t = setTimeout(() => {
        setStep(0)
        setSeconds(0)
      }, RESTART_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), LINE_MS)
    return () => clearTimeout(t)
  }, [reduced, step, done])

  React.useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [playing])

  const visibleLines = reduced ? TRANSCRIPT : TRANSCRIPT.slice(0, step)

  return (
    <section className="border-t bg-muted/20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Hear it in action
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
            It sounds like your best host, not a robot menu.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            No &ldquo;press 1 for pickup.&rdquo; Callers just talk, it just
            answers — modifiers, half-and-half toppings, follow-up questions
            and all.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border bg-card py-8 shadow-sm">
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-xl transition-colors",
                playing ? "bg-brand/10" : "bg-muted"
              )}
            >
              <MicIcon
                className={cn(
                  "size-6",
                  playing ? "text-brand" : "text-muted-foreground"
                )}
              />
            </div>

            <span
              className={cn(
                "font-mono text-sm transition-opacity duration-300",
                playing ? "text-foreground/70" : "text-muted-foreground/50"
              )}
            >
              {formatTime(seconds)}
            </span>

            <div aria-hidden className="flex h-8 w-64 items-center justify-center gap-0.5">
              {Array.from({ length: BARS }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-0.5 rounded-full transition-all duration-300",
                    playing ? "voice-bar bg-brand/60" : "h-1 bg-foreground/10"
                  )}
                  style={
                    playing
                      ? {
                          height: `${barHeight(i)}%`,
                          animationDelay: `${i * 0.06}s`,
                        }
                      : undefined
                  }
                />
              ))}
            </div>

            <p className="h-4 text-xs text-muted-foreground">
              {playing ? "Answering…" : "Simulated call"}
            </p>
          </div>

          <p className="mt-4 text-xs text-muted-foreground/80">
            Simulated call for illustration — book a demo and we&rsquo;ll call
            your own number live.
          </p>

          <DemoDialog className="mt-6 rounded-full px-6" size="lg">
            Hear it on your own phone
          </DemoDialog>
        </div>

        <figure
          aria-label="Example transcript of X1 Voice taking a phone order"
          className="rounded-2xl border bg-card shadow-[0_24px_60px_-12px_rgb(10_37_64/0.18),0_8px_24px_-8px_rgb(10_37_64/0.12)]"
        >
          <figcaption className="flex items-center gap-2.5 border-b px-5 py-3.5 text-sm">
            <span className="relative flex size-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75",
                  playing && "animate-ping"
                )}
              />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold">Simulated call</span>
            <span className="ml-auto text-xs text-muted-foreground">Fri 6:42 PM</span>
          </figcaption>

          <div className="min-h-[290px] space-y-3 px-5 py-6">
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "flex animate-in duration-500 fade-in slide-in-from-bottom-2",
                  line.speaker === "caller" ? "justify-end" : "justify-start"
                )}
              >
                <p
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    line.speaker === "caller"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted"
                  )}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "flex items-center gap-2 border-t px-5 py-3.5 text-xs font-medium text-muted-foreground transition-opacity duration-500",
              playing && "opacity-30"
            )}
          >
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
