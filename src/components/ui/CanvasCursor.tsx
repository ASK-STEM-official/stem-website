'use client'

import useCanvasCursor from '@/hooks/use-canvasCursor'

interface CanvasCursorProps {
  className?: string
}

export default function CanvasCursor({ className }: CanvasCursorProps) {
  useCanvasCursor('hero-canvas-cursor')

  return (
    <canvas
      id="hero-canvas-cursor"
      className={className}
    />
  )
}
