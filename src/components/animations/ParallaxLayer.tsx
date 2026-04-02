'use client'

import { useScroll, useTransform, motion } from 'framer-motion'

interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, speed * 200])

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
