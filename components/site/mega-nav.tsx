"use client"

import Link from "next/link"
import { PhoneCallIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { DEMO_LINE } from "@/data/site"

type NavItem = { label: string; href: string; desc?: string }

const FEATURE_LINKS: NavItem[] = [
  { label: "What it does", href: "/features", desc: "Answers, takes the order, takes payment, fires to POS." },
  { label: "Payment on the call", href: "/features", desc: "Secure card payments over the phone." },
  { label: "Languages", href: "/languages", desc: "English, Spanish, Russian, and more." },
  { label: "The dashboard", href: "/#in-action", desc: "Calls, orders, and revenue, live." },
]

const PLAN_LINKS: NavItem[] = [
  { label: "Starter, $250/mo", href: "/pricing", desc: "750 minutes included. No contract." },
  { label: "All plans", href: "/pricing", desc: "Compare every tier and minute option." },
  { label: "Enterprise", href: "/contact", desc: "Custom volume, rollouts, and rates." },
]

function CompareChip({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-medium transition hover:border-brand/40 hover:text-brand"
    >
      {label}
    </Link>
  )
}

/** Small "have questions / hear it / compare" block inside every dropdown. */
function DemoRail() {
  return (
    <div className="mt-1 rounded-lg border border-brand/30 bg-brand/5 p-3">
      <p className="flex items-center gap-1.5 text-sm font-semibold">
        <PhoneCallIcon className="size-4 text-brand" />
        Have questions? Call us!
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        It answers a real call live — {DEMO_LINE.display}
      </p>
      <div className="mt-2.5 flex gap-2">
        <a
          href={`tel:${DEMO_LINE.tel}`}
          className="inline-flex h-8 flex-1 items-center justify-center rounded-full bg-brand px-3 text-xs font-semibold text-brand-foreground hover:bg-brand-bright"
        >
          Hear a demo
        </a>
        <Link
          href="/contact"
          className="inline-flex h-8 flex-1 items-center justify-center rounded-full border border-border bg-card px-3 text-xs font-semibold hover:bg-muted"
        >
          Book a demo
        </Link>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-brand/15 pt-2.5">
        <span className="text-[11px] text-muted-foreground">See how it compares:</span>
        <CompareChip href="/compare" label="vs other voice AI" />
        <CompareChip href="/compare/hiring-staff" label="vs hiring" />
        <CompareChip href="/compare/answering-service" label="vs an answering service" />
      </div>
    </div>
  )
}

function LinkRow({ item }: { item: NavItem }) {
  return (
    <NavigationMenuLink render={<Link href={item.href} />} className="flex-col items-start gap-0.5">
      <span className="text-sm font-medium">{item.label}</span>
      {item.desc && <span className="text-xs text-muted-foreground">{item.desc}</span>}
    </NavigationMenuLink>
  )
}

function Panel({ items }: { items: NavItem[] }) {
  return (
    <div className="w-[420px] p-2">
      <ul className="grid grid-cols-2 gap-1">
        {items.map((it) => (
          <li key={it.label + it.href}>
            <LinkRow item={it} />
          </li>
        ))}
      </ul>
      <DemoRail />
    </div>
  )
}

export function MegaNav({
  solutions,
  compares,
}: {
  solutions: NavItem[]
  compares: NavItem[]
}) {
  return (
    <NavigationMenu align="center" className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Panel items={FEATURE_LINKS} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Panel items={[{ label: "All solutions", href: "/solutions" }, ...solutions]} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Compare</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Panel items={[{ label: "All comparisons", href: "/compare" }, ...compares]} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Plans</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Panel items={PLAN_LINKS} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
