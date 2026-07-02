import Link from "next/link"
import { MenuIcon, PhoneIcon } from "lucide-react"

import { SITE_NAME } from "@/data/site"
import { MAIN_NAV } from "@/data/nav"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/site/mode-toggle"
import { DemoDialog } from "@/components/blocks/demo-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-brand-foreground">
            <PhoneIcon className="size-4" />
          </span>
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {MAIN_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/login">Log in</Link>}
          />
          <DemoDialog className="hidden sm:inline-flex">
            Book a demo
          </DemoDialog>

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
                <Link
                  href="/login"
                  className="rounded-md px-2 py-2.5 text-sm hover:bg-muted"
                >
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
