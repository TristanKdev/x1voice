import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { SITE_NAME } from "@/data/site"
import { MAIN_NAV } from "@/data/nav"
import { getAllSolutions } from "@/lib/content/solutions"
import { getAllComparePages } from "@/lib/content/compare"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { MegaNav } from "@/components/site/mega-nav"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const solutions = getAllSolutions()
    .slice(0, 6)
    .map((s) => ({ label: s.restaurantType, href: `/solutions/${s.slug}` }))
  const compares = getAllComparePages().map((c) => ({
    label: `vs ${c.competitorName}`,
    href: `/compare/${c.slug}`,
  }))

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        {/* Left: logo */}
        <div className="flex justify-start">
          <Link href="/" aria-label={SITE_NAME}>
            <Logo />
          </Link>
        </div>

        {/* Center: hover mega-menu nav */}
        <div className="flex justify-center">
          <MegaNav solutions={solutions} compares={compares} />
        </div>

        {/* Right: account actions only */}
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/login">Log in</Link>}
          />
          <Button
            className="hidden rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand-bright sm:inline-flex"
            nativeButton={false}
            render={<Link href="/contact">Sign up</Link>}
          />

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex size-8 items-center justify-center rounded-lg md:hidden"
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{SITE_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {MAIN_NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-2 py-2.5 text-sm hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/#see-it" className="rounded-md px-2 py-2.5 text-sm hover:bg-muted">
                  Hear a demo
                </Link>
                <Link href="/support" className="rounded-md px-2 py-2.5 text-sm hover:bg-muted">
                  Support
                </Link>
                <Link href="/login" className="rounded-md px-2 py-2.5 text-sm hover:bg-muted">
                  Log in
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
