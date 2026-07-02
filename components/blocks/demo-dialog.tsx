"use client"

import * as React from "react"
import Cal from "@calcom/embed-react"
import type { VariantProps } from "class-variance-authority"

import { CAL_LINK } from "@/data/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/**
 * Real demo-booking flow — replaces the old site's dead `#book-demo` anchor
 * link. The Cal.com iframe only mounts once the dialog is actually opened.
 *
 * The trigger is styled directly (via buttonVariants) rather than wrapping a
 * separate <Button> component in `render` — nesting two Base UI
 * button-semantic components that way causes a data-slot hydration mismatch
 * and a "expected a native <button>" warning.
 */
export function DemoDialog({
  children,
  className,
  variant = "default",
  size = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant, size }), className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="h-[85vh] max-h-[720px] w-[95vw] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Book a demo</DialogTitle>
        </DialogHeader>
        {open ? (
          <Cal
            calLink={CAL_LINK}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
