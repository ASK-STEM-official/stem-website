'use client'

import useCanvasCursor from '@/hooks/use-canvasCursor'

export default function CustomCursor() {
  useCanvasCursor()

  return (
    <canvas
      id="canvas"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  )
}
