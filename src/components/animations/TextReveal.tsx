'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.04,
}: TextRevealProps) {
  const chars = text.split('')

  return (
    <span className={`inline ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="overflow-hidden inline-block" style={{ verticalAlign: 'bottom' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.55,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
