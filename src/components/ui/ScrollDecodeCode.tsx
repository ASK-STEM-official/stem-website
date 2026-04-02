'use client'

import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'

// Code that gradually reveals as you scroll
const CODE = `// ┌─────────────────────────────────┐
// │  STEM Research Club — init      │
// └─────────────────────────────────┘

import { curiosity, passion } from '@student'
import type { Team, Result } from '@stem/types'

const config = {
  name: "STEM研究部",
  since: 2017,
  mission: "innovate & create",
  stack: {
    lang: ["C#", "Python", "TS", "C"],
    tools: ["Unity", "React", "Arduino"],
    infra: ["GitHub", "Linux", "Docker"],
  },
}

interface Season {
  year: number
  teams: Team[]
  results: Result[]
}

class Club {
  #teams = new Map<string, Team>()
  #history: Season[] = []

  register(id: string, team: Team) {
    this.#teams.set(id, team)
    console.log(\`[+] \${id} initialized\`)
  }

  async compete(year: number) {
    const all = [...this.#teams.values()]
    const results = await Promise.all(
      all.map(t =>
        t.prepare().then(() => t.compete(year))
      )
    )
    this.#history.push({
      year, teams: all,
      results: results.filter(r => r.placed),
    })
    return this.#history.at(-1)!
  }
}

// bootstrap
const stem = new Club()
stem.register("robot", Robot.init())
stem.register("web", Web.init())
stem.register("unity", Game.init())
stem.register("it", IT.init())
stem.register("et", ET.init())

// never stop building
for (let y = 2017; ; y++) {
  await stem.compete(y)
}`

function rbit() {
  return Math.random() < 0.5 ? '0' : '1'
}

// Fisher-Yates shuffle
function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

interface Props {
  scrollProgress: MotionValue<number>
  className?: string
}

export default function ScrollDecodeCode({ scrollProgress, className = '' }: Props) {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const el = preRef.current
    if (!el) return

    // ALL chars except newlines get a decode threshold (including spaces)
    // This makes the initial state a dense block of 0s and 1s
    const charIndices: number[] = []
    for (let i = 0; i < CODE.length; i++) {
      if (CODE[i] !== '\n') charIndices.push(i)
    }
    shuffle(charIndices)

    const resolveAt = new Float32Array(CODE.length).fill(-1) // -1 = newline
    charIndices.forEach((ci, order) => {
      resolveAt[ci] = order / charIndices.length
    })

    let progress = 0
    let visible = false

    const render = () => {
      const chars: string[] = new Array(CODE.length)
      for (let i = 0; i < CODE.length; i++) {
        if (CODE[i] === '\n') {
          chars[i] = '\n'
        } else if (progress >= resolveAt[i]) {
          chars[i] = CODE[i] // decoded (space or code char)
        } else {
          chars[i] = rbit() // 0 or 1
        }
      }
      el.textContent = chars.join('')
    }

    // Initial render (all binary)
    render()

    // Scroll-driven decode
    const unsub = scrollProgress.on('change', (p) => {
      progress = Math.max(0, Math.min(1, p))
      render()
    })

    // Read initial value
    progress = Math.max(0, Math.min(1, scrollProgress.get()))
    render()

    // Shimmer: re-randomize undecoded chars periodically
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(el)

    const shimmer = setInterval(() => {
      if (visible) render()
    }, 120)

    return () => {
      unsub()
      clearInterval(shimmer)
      observer.disconnect()
    }
  }, [scrollProgress])

  return (
    <pre
      ref={preRef}
      className={`font-mono whitespace-pre select-none pointer-events-none ${className}`}
    />
  )
}
