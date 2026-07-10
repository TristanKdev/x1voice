"use client"

import { useCallback, useEffect, useRef } from "react"

/**
 * Animated grid of pixels that ripples in from the center when the parent
 * card is hovered and fades out on leave. Hover is tracked on the parent
 * element so the canvas never intercepts pointer events. Renders nothing
 * until mount, so there is no SSR/hydration surface at all.
 */

type Pixel = {
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean
}

function stepPixel(
  p: Pixel,
  ctx: CanvasRenderingContext2D,
  mode: "appear" | "disappear"
) {
  if (mode === "appear") {
    p.isIdle = false
    if (p.counter <= p.delay) {
      p.counter += p.counterStep
      return
    }
    if (p.size >= p.maxSize) p.isShimmer = true
    if (p.isShimmer) {
      if (p.size >= p.maxSize) p.isReverse = true
      else if (p.size <= p.minSize) p.isReverse = false
      p.size += p.isReverse ? -p.speed : p.speed
    } else {
      p.size += p.sizeStep
    }
  } else {
    p.isShimmer = false
    p.counter = 0
    if (p.size <= 0) {
      p.isIdle = true
      return
    }
    p.size -= 0.1
  }
  const offset = 1 - p.size * 0.5
  ctx.fillStyle = p.color
  ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size)
}

export function PixelCanvas({
  colors,
  gap = 6,
  speed = 30,
}: {
  colors: string[]
  gap?: number
  speed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const rafRef = useRef(0)
  const reducedRef = useRef(false)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !wrap || !ctx) return

    const { width, height } = wrap.getBoundingClientRect()
    const w = Math.floor(width)
    const h = Math.floor(height)
    canvas.width = w
    canvas.height = h
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const base = reducedRef.current ? 0 : Math.min(speed, 100) * 0.001
    const pixels: Pixel[] = []
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const dx = x - w / 2
        const dy = y - h / 2
        pixels.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: (Math.random() * 0.8 + 0.1) * base,
          size: 0,
          sizeStep: Math.random() * 0.4,
          minSize: 0.5,
          maxSize: Math.random() * 1.5 + 0.5,
          delay: reducedRef.current ? 0 : Math.sqrt(dx * dx + dy * dy),
          counter: 0,
          counterStep: Math.random() * 4 + (w + h) * 0.01,
          isIdle: false,
          isReverse: false,
          isShimmer: false,
        })
      }
    }
    pixelsRef.current = pixels
  }, [colors, gap, speed])

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(rafRef.current)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Reduced motion: one static paint (or clear), no animation loop.
    if (reducedRef.current) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (mode === "appear") {
        for (const p of pixelsRef.current) {
          ctx.fillStyle = p.color
          ctx.fillRect(p.x, p.y, p.maxSize, p.maxSize)
        }
      }
      return
    }

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const pixels = pixelsRef.current
      for (const p of pixels) stepPixel(p, ctx, mode)
      // The appear-mode shimmer runs while hovered by design; disappear
      // idles every pixel and stops the loop.
      if (pixels.every((p) => p.isIdle)) cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    init()

    const observer = new ResizeObserver(() => init())
    if (wrapRef.current) observer.observe(wrapRef.current)

    const card = wrapRef.current?.parentElement
    const enter = () => animate("appear")
    const leave = () => animate("disappear")
    card?.addEventListener("mouseenter", enter)
    card?.addEventListener("mouseleave", leave)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      card?.removeEventListener("mouseenter", enter)
      card?.removeEventListener("mouseleave", leave)
    }
  }, [init, animate])

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}
