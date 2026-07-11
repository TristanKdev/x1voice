import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  PhoneIcon,
  PlugIcon,
  ReceiptTextIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
  UtensilsIcon,
} from "lucide-react"

import { LiveCounter } from "@/components/blocks/live-counter"

/**
 * Product dashboard preview, mirrors the real X1 Voice operator dashboard
 * (orange brand, sidebar, KPI cards, revenue trend + order sources, live
 * orders, quick status). All values are illustrative product-UI content,
 * not claims. Presentational; a dev swaps the mock for live data.
 *
 * ACCENT is the product's own orange, kept distinct from the site's blue on
 * purpose, this is a screenshot of the app, so it shows the app's brand.
 */

const ACCENT = "#FF7A1A"

const NAV = [
  { icon: LayoutDashboardIcon, label: "Dashboard", active: true },
  { icon: UtensilsIcon, label: "Menu" },
  { icon: PhoneIcon, label: "Voice Settings" },
  { icon: ReceiptTextIcon, label: "Call Logs" },
  { icon: ShoppingCartIcon, label: "Orders" },
  { icon: ActivityIcon, label: "Activity" },
  { icon: UsersIcon, label: "Customers" },
  { icon: PlugIcon, label: "POS Integration" },
  { icon: CreditCardIcon, label: "Billing" },
  { icon: SettingsIcon, label: "Settings" },
]

type Kpi = {
  icon: typeof DollarSignIcon
  label: string
  sub: string
  tint: string
  value?: string
  live?: { base: number; prefix?: string; min: number; max: number; everyMs: number }
}

const KPIS: Kpi[] = [
  { icon: DollarSignIcon, label: "Revenue", sub: "+31% vs prev period", tint: "#12b76a", live: { base: 21450, prefix: "$", min: 12, max: 70, everyMs: 2200 } },
  { icon: ShoppingCartIcon, label: "Orders", sub: "$22.65 avg per order", tint: "#3b82f6", live: { base: 947, min: 1, max: 2, everyMs: 4200 } },
  { icon: PhoneIcon, label: "Voice AI Calls", sub: "74% conversion rate", tint: "#8b5cf6", live: { base: 1284, min: 1, max: 3, everyMs: 3000 } },
  { icon: TrendingUpIcon, label: "Conversion Rate", value: "74%", sub: "+14% ticket lift", tint: ACCENT },
]

const ORDERS = [
  { name: "Marcus Webb", amt: "$23.37" },
  { name: "Riley", amt: "$20.65" },
  { name: "Priya S.", amt: "$18.50" },
]

const SOURCES = [
  { label: "Phone", pct: 58, color: ACCENT },
  { label: "Online", pct: 27, color: "#3b82f6" },
  { label: "Walk-in", pct: 15, color: "#8b5cf6" },
]

const TREND = [22, 30, 26, 38, 34, 52, 48, 63, 58, 74, 70, 88]

function AreaChart() {
  const w = 520
  const h = 140
  const max = Math.max(...TREND)
  const pts = TREND.map((v, i) => [
    (i / (TREND.length - 1)) * w,
    h - (v / max) * (h - 16) - 8,
  ])
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12b76a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#12b76a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#dash-area)" />
      <path d={line} fill="none" stroke="#12b76a" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function Donut() {
  // simple conic donut from SOURCES
  const stops: string[] = []
  let acc = 0
  for (const s of SOURCES) {
    stops.push(`${s.color} ${acc}% ${acc + s.pct}%`)
    acc += s.pct
  }
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative size-24 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops.join(",")})` }}
      >
        <div className="absolute inset-[10px] grid place-items-center rounded-full bg-band-2">
          <span className="text-xs font-semibold">947</span>
        </div>
      </div>
      <ul className="space-y-1.5 text-xs">
        {SOURCES.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: s.color }} />
            <span className="text-band-muted">{s.label}</span>
            <span className="ml-auto font-semibold">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProductDashboard() {
  return (
    <section className="border-t bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            The dashboard
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            See what the phone is actually worth
          </h2>
          <p className="mt-3 text-muted-foreground">
            Revenue, orders, calls, conversion, and order sources in one view, 
            with live orders and menu, POS, and phone status at a glance.
          </p>
        </div>

        <div className="mt-14">
          <ProductDashboardFrame />
        </div>
      </div>
    </section>
  )
}

/** The dashboard frame on its own, reused by the scroll reveal. */
export function ProductDashboardFrame() {
  return (
    <div className="overflow-hidden rounded-2xl border border-band-border bg-band text-band-foreground shadow-2xl shadow-band/40">
      <div className="flex">
        {/* Sidebar (kept at every size; the frame is scaled to fit as a whole) */}
        <aside className="block w-52 shrink-0 border-r border-band-border p-4">
          <div className="flex items-center gap-2 px-1 pb-4">
            <span
              className="flex size-7 items-center justify-center rounded-lg"
              style={{ background: `color-mix(in srgb, ${ACCENT} 18%, transparent)` }}
            >
              <PhoneIcon className="size-3.5" style={{ color: ACCENT }} />
            </span>
            <span className="font-display text-sm font-bold">X1 Voice</span>
          </div>
          <nav className="space-y-0.5">
            {NAV.map((n) => (
              <div
                key={n.label}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs"
                style={
                  n.active
                    ? { background: `color-mix(in srgb, ${ACCENT} 15%, transparent)`, color: ACCENT, fontWeight: 600 }
                    : { color: "var(--band-muted)" }
                }
              >
                <n.icon className="size-3.5" />
                {n.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold">Welcome back, Tony&rsquo;s</h3>
              <p className="text-xs" style={{ color: ACCENT }}>
                Voice AI overview
              </p>
            </div>
            <div className="flex rounded-full border border-band-border bg-white/5 p-0.5 text-xs">
              <span className="rounded-full px-3 py-1 text-band-muted">Today</span>
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold">This Week</span>
              <span className="rounded-full px-3 py-1 text-band-muted">This Month</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mt-5 grid grid-cols-4 gap-3">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-xl border border-band-border bg-band-2 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-band-muted">{k.label}</span>
                  <span
                    className="flex size-6 items-center justify-center rounded-md"
                    style={{ background: `color-mix(in srgb, ${k.tint} 22%, transparent)` }}
                  >
                    <k.icon className="size-3.5" style={{ color: k.tint }} />
                  </span>
                </div>
                <p className="font-display mt-1.5 text-xl font-bold tracking-tight">
                  {k.live ? (
                    <LiveCounter
                      base={k.live.base}
                      prefix={k.live.prefix}
                      min={k.live.min}
                      max={k.live.max}
                      everyMs={k.live.everyMs}
                    />
                  ) : (
                    k.value
                  )}
                </p>
                <p className="mt-0.5 text-[11px] text-band-muted">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Trend + order sources */}
          <div className="mt-3 grid gap-3 grid-cols-[1.6fr_1fr]">
            <div className="rounded-xl border border-band-border bg-band-2 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">Revenue trend</p>
                <div className="flex items-center gap-3 text-[11px] text-band-muted">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400" /> Revenue
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-blue-400" /> Orders
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <AreaChart />
              </div>
            </div>

            <div className="rounded-xl border border-band-border bg-band-2 p-4">
              <p className="text-xs font-semibold">Order sources</p>
              <div className="mt-4">
                <Donut />
              </div>
            </div>
          </div>

          {/* Active orders + quick status */}
          <div className="mt-3 grid gap-3 grid-cols-[1fr_1fr]">
            <div className="rounded-xl border border-band-border bg-band-2 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">Active orders</p>
                <span className="flex items-center gap-1.5 text-[11px] text-band-muted">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live
                </span>
              </div>
              <p className="font-display mt-1 text-3xl font-bold tracking-tight">
                <LiveCounter base={249} min={1} max={4} everyMs={1900} fluctuate clampLow={242} clampHigh={310} />
              </p>
              <div className="mt-3 space-y-1.5">
                {ORDERS.map((o) => (
                  <div
                    key={o.name}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs"
                  >
                    <span>{o.name}</span>
                    <span className="font-semibold">{o.amt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-band-border bg-band-2 p-4">
              <p className="text-xs font-semibold">Quick status</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { k: "Menu items", v: "128" },
                  { k: "POS connection", v: "Connected", ok: true },
                  { k: "Phone number", v: "Active", ok: true },
                  { k: "Avg call", v: "48s" },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="text-[11px] text-band-muted">{s.k}</p>
                    <p className={`mt-0.5 text-sm font-semibold ${s.ok ? "text-emerald-400" : ""}`}>
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
