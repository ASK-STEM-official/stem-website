// Canvas cursor effect - flowing lines that trail the mouse
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

interface LineConfig {
  spring: number
}

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
}

class Line {
  spring: number
  friction: number
  nodes: Node[]

  constructor(config: LineConfig) {
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

const pos = { x: 0, y: 0 }
let lines: Line[] = []

export default function useCanvasCursor() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true

    // Hue oscillator - range ~220-280 (indigo/blue/purple)
    const hueOsc = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 30,
      frequency: 0.002,
      offset: 250,
    })

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function initLines() {
      lines = []
      for (let i = 0; i < CONFIG.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / CONFIG.trails) * 0.025 }))
      }
    }

    function render() {
      if (!running) return
      ctx!.globalCompositeOperation = 'source-over'
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.globalCompositeOperation = 'lighter'
      ctx!.strokeStyle = `hsla(${Math.round(hueOsc.update())},50%,50%,0.25)`
      ctx!.lineWidth = 1

      for (const line of lines) {
        line.update()
        line.draw(ctx!)
      }

      window.requestAnimationFrame(render)
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length) {
        pos.x = e.touches[0].pageX
        pos.y = e.touches[0].pageY
      } else if ('clientX' in e) {
        pos.x = e.clientX
        pos.y = e.clientY
      }
    }

    function onFirstMove(e: MouseEvent | TouchEvent) {
      document.removeEventListener('mousemove', onFirstMove)
      document.removeEventListener('touchstart', onFirstMove)
      document.addEventListener('mousemove', onMove)
      document.addEventListener('touchmove', onMove)
      document.addEventListener('touchstart', (ev) => {
        if (ev.touches.length === 1) {
          pos.x = ev.touches[0].pageX
          pos.y = ev.touches[0].pageY
        }
      })
      onMove(e)
      initLines()
      render()
    }

    resize()
    pos.x = window.innerWidth / 2
    pos.y = window.innerHeight / 2

    document.addEventListener('mousemove', onFirstMove)
    document.addEventListener('touchstart', onFirstMove)
    window.addEventListener('resize', resize)

    return () => {
      running = false
      document.removeEventListener('mousemove', onFirstMove)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchstart', onFirstMove)
      window.removeEventListener('resize', resize)
    }
  }, [])
}
