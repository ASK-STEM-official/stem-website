'use client'

import { useState, useEffect } from 'react'

const CODE_BLOCKS = [
  `const stem = {
  science: true,
  technology: true,
  engineering: true,
  mathematics: true
};`,
  `while (curious) {
  learn();
  build();
  compete();
}`,
  `function future() {
  const team = [];
  team.push("code");
  team.push("create");
  return team.join();
}`,
]

const GLITCH = '01アイウエオカキクケコ{}[]<>=;:.!@#$%&*サシスセソ'

function rchar() {
  return GLITCH[Math.floor(Math.random() * GLITCH.length)]
}

export default function GlitchCode({ className }: { className?: string }) {
  const [text, setText] = useState(CODE_BLOCKS[0])

  useEffect(() => {
    // Skip animation on touch devices for performance
    if (window.matchMedia('(pointer: coarse)').matches) return

    let current = CODE_BLOCKS[0]
    let blockIdx = 0
    let phase: 'idle' | 'dissolve' | 'resolve' = 'idle'
    let ticks = 0

    const interval = setInterval(() => {
      ticks++

      if (phase === 'idle') {
        const orig = CODE_BLOCKS[blockIdx]
        current = orig
          .split('')
          .map((c, i) => {
            if (c === '\n' || c === ' ') return c
            const cur = i < current.length ? current[i] : c
            if (Math.random() < 0.03) return rchar()
            if (cur !== c && Math.random() < 0.3) return c
            return cur
          })
          .join('')

        if (ticks >= 50) {
          phase = 'dissolve'
          ticks = 0
        }
      } else if (phase === 'dissolve') {
        current = current
          .split('')
          .map((c) => {
            if (c === '\n') return '\n'
            if (Math.random() < 0.2) return rchar()
            return c
          })
          .join('')

        if (ticks > 12) {
          blockIdx = (blockIdx + 1) % CODE_BLOCKS.length
          phase = 'resolve'
          ticks = 0
        }
      } else {
        const target = CODE_BLOCKS[blockIdx]
        while (current.length < target.length) current += rchar()
        if (current.length > target.length) current = current.slice(0, target.length)

        current = current
          .split('')
          .map((c, i) => {
            if (i >= target.length) return ''
            if (target[i] === '\n' || target[i] === ' ') return target[i]
            if (Math.random() < 0.15) return target[i]
            return c
          })
          .join('')

        let matches = 0
        for (let i = 0; i < target.length; i++) {
          if (i < current.length && current[i] === target[i]) matches++
        }
        if (matches / target.length > 0.92) {
          current = target
          phase = 'idle'
          ticks = 0
        }
      }

      setText(current)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return <pre className={className}>{text}</pre>
}
