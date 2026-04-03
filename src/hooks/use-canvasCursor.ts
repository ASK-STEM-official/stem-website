// Canvas cursor effect - flowing lines that trail the mouse (hero section only)
// Adapted from ui-layouts/cursify (MIT)

import { useEffect } from 'react'

class Oscillator {
  phase: number
  offset: number
  frequency: number
  amplitude: number

  constructor(e: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}) {
    this.phase = e.phase || 0
    this.offset = e.offset || 0
    this.frequency = e.frequency || 0.001
    this.amplitude = e.amplitude || 1
  }

  update() {
    this.phase += this.frequency
    return this.offset + Math.sin(this.phase) * this.amplitude
  }
}

class Node {
  x = 0
  y = 0
  vx = 0
  vy = 0
}

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
}

const pos = { x: 0, y: 0 }

class Line {
  spring: number
  friction: number
  nodes: Node[]

  constructor(config: { spring: number }) {
    this.spring = config.spring + 0.1 * Math.random() - 0.02
    this.friction = CONFIG.friction + 0.01 * Math.random() - 0.002
    this.nodes = []
    for (let i = 0; i < CONFIG.size; i++) {
      const node = new Node()
      node.x = pos.x
      node.y = pos.y
      this.nodes.push(node)
    }
  }

  update() {
    let spring = this.spring
    const head = this.nodes[0]
    head.vx += (pos.x - head.x) * spring
    head.vy += (pos.y - head.y) * spring

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      if (i > 0) {
        const prev = this.nodes[i - 1]
        node.vx += (prev.x - node.x) * spring
        node.vy += (prev.y - node.y) * spring
        node.vx += prev.vx * CONFIG.dampening
        node.vy += prev.vy * CONFIG.dampening
      }
      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= CONFIG.tension
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x
    let y = this.nodes[0].y
    ctx.beginPath()
    ctx.moveTo(x, y)

    let a = 1
    const o = this.nodes.length - 2
    for (; a < o; a++) {
      const curr = this.nodes[a]
      const next = this.nodes[a + 1]
      x = 0.5 * (curr.x + next.x)
      y = 0.5 * (curr.y + next.y)
      ctx.quadraticCurveTo(curr.x, curr.y, x, y)
    }

    const curr = this.nodes[a]
    const next = this.nodes[a + 1]
    ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y)
    ctx.stroke()
    ctx.closePath()
  }
}

export default function useCanvasCursor(canvasId: string) {
  useEffect(() => {
    // Skip on touch-only devices (no mouse pointer)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true
    let lines: Line[] = []
    let initialized = false

    const hueOsc = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 30,
      frequency: 0.002,
      offset: 250,
    })

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      canvas!.width = parent.clientWidth
      canvas!.height = parent.clientHeight
    }

    function initLines() {
      lines = []
      for (let i = 0; i < CONFIG.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / CONFIG.trails) * 0.025 }))
      }
    }

    function render() {
      if (!running) return
      const isDark = document.documentElement.classList.contains('dark')
      ctx!.globalCompositeOperation = 'source-over'
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.globalCompositeOperation = isDark ? 'lighter' : 'source-over'
      ctx!.strokeStyle = isDark
        ? `hsla(${Math.round(hueOsc.update())},50%,50%,0.25)`
        : `hsla(${Math.round(hueOsc.update())},60%,45%,0.35)`
      ctx!.lineWidth = 1

      for (const line of lines) {
        line.update()
        line.draw(ctx!)
      }

      window.requestAnimationFrame(render)
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      pos.x = e.clientX - rect.left
      pos.y = e.clientY - rect.top

      if (!initialized) {
        initialized = true
        initLines()
        render()
      }
    }

    resize()
    pos.x = canvas!.clientWidth / 2
    pos.y = canvas!.clientHeight / 2

    // Listen on document but only track when mouse is within canvas bounds
    function onDocMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        onMove(e)
      }
    }

    document.addEventListener('mousemove', onDocMove)
    window.addEventListener('resize', resize)

    return () => {
      running = false
      document.removeEventListener('mousemove', onDocMove)
      window.removeEventListener('resize', resize)
    }
  }, [canvasId])
}
