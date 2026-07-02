import {
  PhoneCallIcon,
  UtensilsCrossedIcon,
  CreditCardIcon,
  PlugIcon,
  MoonStarIcon,
  BarChart3Icon,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: PhoneCallIcon,
    title: "Answers every call",
    description:
      "Ten calls at once on a Friday night is not a problem. There is no busy signal and no hold music, because there is no queue.",
  },
  {
    icon: UtensilsCrossedIcon,
    title: "Takes the full order",
    description:
      "Modifiers, substitutions, half-and-half toppings. It asks the follow-up questions a good order-taker would ask.",
  },
  {
    icon: CreditCardIcon,
    title: "Collects payment on the phone",
    description:
      "Callers can pay during the call. No staff member reads a card number out loud or writes one down.",
  },
  {
    icon: PlugIcon,
    title: "Sends orders to your POS",
    description:
      "The ticket shows up in Square, Clover, OrderCounter, or OrderOut like any other order. Nobody re-types anything.",
  },
  {
    icon: MoonStarIcon,
    title: "Works after close",
    description:
      "A caller at 11pm gets the same answer quality as a caller at noon. Tomorrow's pickup orders get taken tonight.",
  },
  {
    icon: BarChart3Icon,
    title: "Shows you the numbers",
    description:
      "Answer rate, order count, and recovered revenue in one dashboard, so you can see what the phone is actually worth.",
  },
]

export function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          What it does all day
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          One phone agent, wired into how your restaurant already runs.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title}>
            <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10">
              <f.icon className="size-4.5 text-brand" />
            </span>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
