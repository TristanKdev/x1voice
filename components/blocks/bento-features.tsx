type Feature = {
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    title: "Answers every call",
    description:
      "Ten calls at once on a Friday night is not a problem. There is no busy signal and no hold music, because there is no queue.",
  },
  {
    title: "Takes the full order",
    description:
      "Modifiers, substitutions, half-and-half toppings. It asks the follow-up questions a good order-taker would ask.",
  },
  {
    title: "Collects payment on the phone",
    description:
      "Callers can pay during the call. No staff member reads a card number out loud or writes one down.",
  },
  {
    title: "Sends orders to your POS",
    description:
      "The ticket shows up in Square, Clover, OrderCounter, or OrderOut like any other order. Nobody re-types anything.",
  },
  {
    title: "Works after close",
    description:
      "A caller at 11pm gets the same answer quality as a caller at noon. Tomorrow's pickup orders get taken tonight.",
  },
  {
    title: "Shows you the numbers",
    description:
      "Answer rate, order count, and recovered revenue in one dashboard, so you can see what the phone is actually worth.",
  },
]

export function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-medium sm:text-4xl">
          What it does all day
        </h2>
        <p className="mt-4 text-muted-foreground">
          One phone agent, wired into how your restaurant already runs.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div key={f.title} className="border-t py-6">
            <p className="font-mono text-xs text-brand">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-medium">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
