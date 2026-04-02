'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    },
    [cursorX, cursorY, visible]
  )

  useEffect(() => {
    // Only show on pointer devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    // Track hover on interactive elements
    const updateHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      )
      setHovered(!!isInteractive)
    }
    window.addEventListener('mouseover', updateHover)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', updateHover)
    }
  }, [onMouseMove])

  if (!visible) return null

  return (
    <>
      {/* Outer ring - trails with spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 48 : clicked ? 16 : 32,
            height: hovered ? 48 : clicked ? 16 : 32,
            opacity: hovered ? 0.6 : 0.4,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-full border border-white"
        />
      </motion.div>

      {/* Inner dot - follows instantly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 6 : 4,
            height: hovered ? 6 : 4,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white"
        />
      </motion.div>
    </>
  )
}
