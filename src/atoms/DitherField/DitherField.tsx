import { useEffect, useRef } from 'react'

export interface DitherFieldProps {
  /**
   * Accent color as a bare `r,g,b` triple (no `rgb()` wrapper) used for the
   * cursor-proximity tint. Defaults to monochrome white.
   */
  accent?: string
  /** Optional className for the canvas element. */
  className?: string
}

/**
 * DitherField — signature wireframe hero visual, cursor-reactive.
 *
 * Animated halftone/ASCII field sampling a breathing implicit surface to
 * glyph density. The pointer adds a travelling ripple + local brightening,
 * so the field "leans" toward the cursor. Pure 2D canvas, no deps.
 *
 * Client-only (uses canvas + window). Portable across Next and Vite — keep
 * it inside a client boundary in RSC apps. Honors prefers-reduced-motion by
 * rendering a single static frame.
 */
export function DitherField({ accent = '255,255,255', className }: DitherFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cv: HTMLCanvasElement = canvas
    const c2d: CanvasRenderingContext2D = ctx

    const STEP = 9
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0

    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0, tActive: 0 }

    function resize() {
      const rect = cv.getBoundingClientRect()
      w = rect.width
      h = rect.height
      cv.width = Math.floor(w * dpr)
      cv.height = Math.floor(h * dpr)
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / STEP)
      rows = Math.ceil(h / STEP)
    }

    function onMove(e: PointerEvent) {
      const rect = cv.getBoundingClientRect()
      ptr.tx = (e.clientX - rect.left) / rect.width
      ptr.ty = (e.clientY - rect.top) / rect.height
      ptr.tActive = 1
    }
    function onLeave() {
      ptr.tActive = 0
    }

    function field(nx: number, ny: number, t: number) {
      const cx = 0.5 + Math.sin(t * 0.18) * 0.06
      const cy = 0.5 + Math.cos(t * 0.13) * 0.05
      const dx = nx - cx
      const dy = ny - cy
      const r = Math.sqrt(dx * dx + dy * dy)
      const sphere = 1 - Math.min(1, r / (0.42 + Math.sin(t * 0.5) * 0.03))
      const wave =
        Math.sin(r * 26 - t * 1.4) * 0.5 +
        Math.sin(nx * 14 + t * 0.6) * 0.25 +
        Math.sin(ny * 18 - t * 0.5) * 0.25
      let v = sphere * 0.85 + wave * sphere * 0.5

      if (ptr.active > 0.001) {
        const pdx = nx - ptr.x
        const pdy = ny - ptr.y
        const pr = Math.sqrt(pdx * pdx + pdy * pdy)
        const ring = Math.sin(pr * 30 - t * 4.2) * Math.exp(-pr * 5.5)
        const glow = Math.exp(-pr * 4.0) * 0.5
        v += (ring * 0.5 + glow) * ptr.active
      }
      return v
    }

    const glyphs = [".", ":", "+", "*", "#"]

    function frame(time: number) {
      const t = reduce ? 6 : time * 0.001
      ptr.x += (ptr.tx - ptr.x) * 0.12
      ptr.y += (ptr.ty - ptr.y) * 0.12
      ptr.active += (ptr.tActive - ptr.active) * 0.06

      c2d.clearRect(0, 0, w, h)
      // Literal font stack — canvas ctx.font cannot resolve CSS vars.
      c2d.font = STEP + "px ui-monospace, \"SF Mono\", Menlo, Monaco, monospace"
      c2d.textBaseline = "top"

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const nx = gx / cols
          const ny = gy / rows
          let v = field(nx, ny, t)
          v = Math.max(0, Math.min(1, v))
          if (v < 0.08) continue
          const gi = Math.min(glyphs.length - 1, Math.floor(v * glyphs.length))

          let tint = 0
          if (ptr.active > 0.001) {
            const pdx = nx - ptr.x
            const pdy = ny - ptr.y
            const pr = Math.sqrt(pdx * pdx + pdy * pdy)
            tint = Math.exp(-pr * 6) * ptr.active
          }
          const alpha = 0.1 + v * 0.8
          if (tint > 0.04) {
            c2d.fillStyle = "rgba(" + accent + "," + (alpha * (0.6 + tint)).toFixed(3) + ")"
          } else {
            // monochrome base: faint white wireframe glyphs
            c2d.fillStyle = "rgba(255,255,255," + (alpha * 0.8).toFixed(3) + ")"
          }
          c2d.fillText(glyphs[gi], gx * STEP, gy * STEP)
        }
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }

    resize()
    if (reduce) frame(0)
    else raf = requestAnimationFrame(frame)

    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    cv.addEventListener("pointermove", onMove)
    cv.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      cv.removeEventListener("pointermove", onMove)
      cv.removeEventListener("pointerleave", onLeave)
    }
  }, [accent])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
