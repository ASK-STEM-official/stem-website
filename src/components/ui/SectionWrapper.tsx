'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'gray'
}

export default function SectionWrapper({
  children,
  className,
  id,
  background = 'white',
}: SectionWrapperProps) {
  const bgClasses = {
    white: 'bg-surface-white',
    gray: 'bg-surface-gray',
  }

  return (
    <section id={id} className={cn(bgClasses[background], className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container mx-auto px-6 py-20 max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  )
}
