'use client'

import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export default function useNavScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > threshold)
  })

  return scrolled
}
