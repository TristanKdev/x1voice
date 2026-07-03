import { cn } from "@/lib/utils"

/**
 * Custom voice-waveform mark + wordmark. Hand-drawn SVG, not an icon-library
 * glyph in a colored box.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 24"
      fill="none"
      aria-hidden
      className={cn("h-5 w-auto", className)}
    >
      <rect x="0" y="9" width="3.5" height="6" rx="1.75" fill="currentColor" />
      <rect
        x="6"
        y="4.5"
        width="3.5"
        height="15"
        rx="1.75"
        fill="currentColor"
      />
      <rect x="12" y="0" width="3.5" height="24" rx="1.75" fill="currentColor" />
      <rect
        x="18"
        y="6"
        width="3.5"
        height="12"
        rx="1.75"
        fill="currentColor"
      />
      <rect
        x="24"
        y="9.75"
        width="3.5"
        height="4.5"
        rx="1.75"
        fill="currentColor"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="text-brand" />
      <span className="font-display text-[17px] font-bold leading-none">
        x1voice
      </span>
    </span>
  )
}
