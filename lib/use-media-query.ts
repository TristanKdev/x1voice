"use client"

import * as React from "react"

/**
 * SSR-safe media-query hook. The server (and first hydration pass) sees
 * `serverDefault`; the client value takes over immediately after hydration
 * and stays subscribed to changes. Avoids the setState-in-effect "mounted"
 * pattern entirely.
 */
export function useMediaQuery(query: string, serverDefault = false): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    [query]
  )

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverDefault
  )
}
