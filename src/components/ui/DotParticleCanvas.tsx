'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface DotParticleCanvasProps {
  className?: string
}

const EDGE_MARGIN = 120 // px – don't spawn particles near hero / footer edges

export default function DotParticleCanvas({ className }: DotParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const particles = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
      angle: number
    }>
  >([])
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'
  const pColor = isDark ? '165, 180, 252' : '99, 102, 241'

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const wrapper = canvas.parentElement
    if (!wrapper) return
    const container = wrapper.parentElement ?? wrapper
    const dpr = window.devicePixelRatio || 1
    const w = container.clientWidth
    const h = container.scrollHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [])

  const spawnParticles = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    if (
      clientX < rect.left || clientX > rect.right ||
      clientY < rect.top || clientY > rect.bottom
    ) return

    const x = clientX - rect.left
    const y = clientY - rect.top
    const canvasH = canvas.clientHeight

    // Don't spawn near the top (hero boundary) or bottom (footer boundary)
    if (y < EDGE_MARGIN || y > canvasH - EDGE_MARGIN) return

    const count = 20 + Math.random() * 12
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const speed = 1.5 + Math.random() * 3
      particles.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 2000 + Math.random() * 3000,
        size: 1 + Math.random() * 2.5,
        angle,
      })
    }

    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.4 + Math.random() * 1.2
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 3000 + Math.random() * 2000,
        size: 1.5 + Math.random() * 2,
        angle,
      })
    }
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    spawnParticles(e.clientX, e.clientY)
  }, [spawnParticles])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) spawnParticles(touch.clientX, touch.clientY)
  }, [spawnParticles])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Skip expensive work when there are no particles
    if (particles.current.length === 0) {
      requestIdRef.current = requestAnimationFrame(animate)
      return
    }

    timeRef.current += 0.006
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    ctx.clearRect(0, 0, w, h)

    particles.current = particles.current.filter((p) => {
      p.life += 16
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.02
      p.vx *= 0.995
      p.vy *= 0.995
      p.x += Math.sin(timeRef.current + p.angle) * 0.3
      p.y += Math.cos(timeRef.current + p.angle * 0.7) * 0.2

      const progress = p.life / p.maxLife
      const alpha = Math.max(0, (1 - progress) * 0.8)
      const size = p.size * (1 - progress * 0.3)

      if (alpha > 0) {
        ctx.fillStyle = `rgba(${pColor}, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, 2 * Math.PI)
        ctx.fill()
      }

      return p.life < p.maxLife && p.x > -50 && p.x < w + 50 && p.y > -50 && p.y < h + 50
    })

    requestIdRef.current = requestAnimationFrame(animate)
  }, [pColor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Skip on touch/mobile devices — the full-page canvas is too expensive
    if (window.matchMedia('(pointer: coarse)').matches) return

    const wrapper = canvas.parentElement
    const container = wrapper?.parentElement ?? wrapper

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })

    let ro: ResizeObserver | null = null
    if (container) {
      ro = new ResizeObserver(() => resizeCanvas())
      ro.observe(container)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('touchstart', handleTouchStart)
      ro?.disconnect()
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current)
      timeRef.current = 0
      particles.current = []
    }
  }, [animate, resizeCanvas, handleMouseDown, handleTouchStart])

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  )
}
