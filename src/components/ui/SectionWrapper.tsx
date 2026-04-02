'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'subtle'
}

export default function SectionWrapper({
  children,
  className,
  id,
  background = 'default',
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn('relative', className)}>
      {/* Dot-grid pattern on all SectionWrapper sections */}
      <div className="absolute inset-0 bg-dot-pattern" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
      {background === 'subtle' && (
        <div className="absolute inset-0 bg-gray-50/50 dark:bg-white/[0.02]" />
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative container mx-auto px-5 sm:px-6 py-16 sm:py-24 md:py-32 max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  )
}
