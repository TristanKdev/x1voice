import {
  ArrowRightIcon,
  BarChart3Icon,
  CreditCardIcon,
  PhoneCallIcon,
  ReceiptTextIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { SourcedStat } from "@/components/blocks/sourced-stat"
import { POS_TOTAL } from "@/data/pos-systems"

/**
 * Bento feature grid. Copy carries over from the previous flat feature
 * list; the stat cell renders through <SourcedStat> so the sitewide
 * missed-calls claim keeps its single source of truth.
 */

function RingArt() {
  return (
    <div className="relative mx-auto flex aspect-square size-28 items-center justify-center rounded-full border before:absolute before:-inset-3 before:rounded-full before:border before:border-border/60 after:absolute after:-inset-6 after:rounded-full after:border after:border-border/30 dark:border-white/10">
      <PhoneCallIcon className="size-7 text-brand" strokeWidth={1.5} />
      <span className="absolute top-1 right-1 flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
      </span>
    </div>
  )
}

function OrderChipsArt() {
  return (
    <div className="mx-auto flex w-full max-w-[15rem] flex-col gap-2">
      {[
        { text: "Large, half pep half mushroom", side: "left" },
        { text: "Extra ranch on the side", side: "right" },
        { text: "Make one of them gluten-free", side: "left" },
      ].map((chip) => (
        <span
          key={chip.text}
          className={
            chip.side === "left"
              ? "w-fit rounded-xl rounded-bl-sm border bg-muted px-3 py-1.5 text-xs"
              : "ml-auto w-fit rounded-xl rounded-br-sm bg-primary/10 px-3 py-1.5 text-xs text-primary"
          }
        >
          {chip.text}
        </span>
      ))}
    </div>
  )
}

function PosFlowArt() {
  return (
    <div className="mx-auto flex items-center justify-center gap-3">
      <div className="flex size-12 items-center justify-center rounded-xl border bg-muted/50">
        <PhoneCallIcon className="size-5 text-brand" strokeWidth={1.5} />
      </div>
      <div className="flex items-center gap-1">
        <span className="block size-1 rounded-full bg-brand/30" />
        <span className="block size-1 rounded-full bg-brand/50" />
        <span className="block size-1 rounded-full bg-brand/70" />
        <ArrowRightIcon className="size-4 text-brand" />
      </div>
      <div className="flex size-12 items-center justify-center rounded-xl border bg-muted/50">
        <ReceiptTextIcon className="size-5 text-foreground/70" strokeWidth={1.5} />
      </div>
    </div>
  )
}

function PaymentArt() {
  return (
    <div className="mx-auto w-full max-w-[15rem] space-y-2.5">
      <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand/10">
          <CreditCardIcon className="size-4 text-brand" strokeWidth={1.5} />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-24 rounded-full bg-foreground/15" />
          <div className="h-1.5 w-14 rounded-full bg-foreground/8" />
        </div>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Paid
        </span>
      </div>
      <p className="text-center text-[10px] tracking-wide text-muted-foreground/70 uppercase">
        Collected during the call
      </p>
    </div>
  )
}

function ChartArt() {
  return (
    <svg viewBox="0 0 240 80" aria-hidden className="mx-auto w-full max-w-[15rem]">
      <defs>
        <linearGradient id="bento-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 64 C24 60 36 52 56 54 C76 56 84 40 104 42 C124 44 136 28 156 30 C176 32 188 18 208 16 C220 15 232 12 240 10 L240 80 L0 80 Z"
        fill="url(#bento-chart-fill)"
      />
      <path
        d="M0 64 C24 60 36 52 56 54 C76 56 84 40 104 42 C124 44 136 28 156 30 C176 32 188 18 208 16 C220 15 232 12 240 10"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="240" cy="10" r="3.5" fill="var(--color-brand)" />
    </svg>
  )
}

function NumbersArt() {
  const bars = [34, 52, 40, 64, 50, 74, 68]
  return (
    <div className="mx-auto flex h-24 w-full max-w-[13rem] items-end justify-center gap-2.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className={
            i === bars.length - 1
              ? "w-4 rounded-t-md bg-brand"
              : "w-4 rounded-t-md bg-foreground/12"
          }
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

const CELLS = [
  {
    title: "Answers every call, even after close",
    description:
      "Ten calls at once on a Friday night is not a problem — no busy signal, no hold music. And a caller at 11pm gets the same answer quality as a caller at noon.",
    art: <RingArt />,
  },
  {
    title: "Takes the full order",
    description:
      "Modifiers, substitutions, half-and-half toppings. It asks the follow-up questions a good order-taker would ask.",
    art: <OrderChipsArt />,
  },
  {
    title: "Sends orders to your POS",
    description: `The ticket shows up in Square, Clover, or any of the ${POS_TOTAL} POS systems we connect to, like any other order. Nobody re-types anything.`,
    art: <PosFlowArt />,
  },
  {
    title: "Collects payment on the phone",
    description:
      "Callers can pay during the call. No staff member reads a card number out loud or writes one down.",
    art: <PaymentArt />,
  },
]

export function BentoFeatures() {
  return (
    <section className="bg-muted/20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            What it does all day
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One phone agent, wired into how your restaurant already runs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {/* Sourced stat anchors the grid */}
          <Card className="relative flex overflow-hidden sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="relative m-auto flex flex-col justify-center p-6">
              <svg
                aria-hidden
                viewBox="0 0 254 104"
                fill="none"
                className="pointer-events-none absolute top-4 left-1/2 h-20 w-48 -translate-x-1/2 text-muted-foreground/15"
              >
                <path
                  d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                  fill="currentColor"
                />
              </svg>
              <SourcedStat className="relative z-10 pt-10 text-center" />
            </div>
          </Card>

          {CELLS.map((cell) => (
            <Card
              key={cell.title}
              className="relative overflow-hidden p-6 sm:col-span-1 lg:col-span-2"
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="flex min-h-28 w-full items-center">{cell.art}</div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{cell.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {cell.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <Card className="relative overflow-hidden p-6 sm:col-span-2 lg:col-span-6">
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="mb-4 flex size-11 items-center justify-center rounded-full border">
                  <BarChart3Icon className="size-5 text-brand" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold">Shows you the numbers</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Answer rate, order count, and recovered revenue in one
                  dashboard, so you can see what the phone is actually worth.
                </p>
              </div>
              <div className="space-y-4">
                <NumbersArt />
                <ChartArt />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
