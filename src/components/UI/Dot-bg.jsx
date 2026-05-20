"use client"
import React, { useEffect, useRef } from 'react'

function DotBg({ children, className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const dotsRef = useRef([])
  const animRef = useRef(null)

  const SPACING = 40
  const DOT_R = 2
  const FLEE_RADIUS = 200
  const FLEE_DIST = 25

  function getDotColor() {
    // Reads --color-muted from the current theme at runtime
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-muted')
      .trim()
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '')
    const bigint = parseInt(h, 16)
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    }
  }

  function init(canvas) {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    dotsRef.current = []
    const cols = Math.ceil(canvas.width / SPACING) + 1
    const rows = Math.ceil(canvas.height / SPACING) + 1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dotsRef.current.push({
          ox: c * SPACING,
          oy: r * SPACING,
          x: c * SPACING,
          y: r * SPACING,
        })
      }
    }
  }

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const FLEE2 = FLEE_RADIUS * FLEE_RADIUS

    init(canvas)

    function animate() {
      animRef.current = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      // Re-read color each frame so theme transitions are smooth
      const hex = getDotColor()
      const { r, g, b } = hexToRgb(hex)

      for (const d of dotsRef.current) {
        const dox = d.ox - mouse.x
        const doy = d.oy - mouse.y
        const dist2 = dox * dox + doy * doy
        let tx = d.ox
        let ty = d.oy

        if (dist2 < FLEE2) {
          const dist = Math.sqrt(dist2)
          const force = 1 - dist / FLEE_RADIUS
          tx = d.ox + (dox / dist) * force * FLEE_DIST
          ty = d.oy + (doy / dist) * force * FLEE_DIST
        }

        d.x = lerp(d.x, tx, 0.12)
        d.y = lerp(d.y, ty, 0.12)

        // Opacity based on actual current position
        const adx = d.x - mouse.x
        const ady = d.y - mouse.y
        const actualDist = Math.sqrt(adx * adx + ady * ady)
        const proximity = Math.max(0, 1 - actualDist / FLEE_RADIUS)
        // Resting: 0.35 — active: 1.0
        const opacity = 0.35 + proximity * 0.65

        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity.toFixed(2)})`
        ctx.fill()
      }
    }

    animate()

    const handleResize = () => init(canvas)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function handleMouseLeave() {
    mouseRef.current = { x: -999, y: -999 }
  }

  return (
    <div
      className={`relative w-full h-full bg-background overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

export default DotBg