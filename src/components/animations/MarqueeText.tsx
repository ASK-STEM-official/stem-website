'use client'

import { motion } from 'framer-motion'

interface MarqueeTextProps {
  items: string[]
  speed?: number
  className?: string
  itemClassName?: string
  separator?: string
}

export default function MarqueeText({
  items,
  speed = 30,
  className,
  itemClassName,
  separator = '✦',
}: MarqueeTextProps) {
  const repeated = [...items, ...items, ...items]
  const duration = items.length * (100 / speed)

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-8 ${itemClassName}`}>
            <span>{item}</span>
            <span className="opacity-40">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
