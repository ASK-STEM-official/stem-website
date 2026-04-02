'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface DotParticleCanvasProps {
  className?: string
}

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
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const w = parent.clientWidth
    const h = parent.clientHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [])

  // Listen on document so clicks pass through z-10 content
  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    // Only spawn particles if click is within canvas bounds
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom
    ) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const count = 25 + Math.random() * 15
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const speed = 2 + Math.random() * 4
      particles.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 2000 + Math.random() * 3000,
        size: 1 + Math.random() * 3,
        angle,
      })
    }

    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 1.5
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 4000 + Math.random() * 2000,
        size: 2 + Math.random() * 2,
        angle,
      })
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('mousedown', handleClick)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('mousedown', handleClick)
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current)
      timeRef.current = 0
      particles.current = []
    }
  }, [animate, resizeCanvas, handleClick])

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  )
}
