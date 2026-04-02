'use client'

import { type ElementType } from 'react'
import { motion } from 'framer-motion'
import { itemVariants } from '@/components/animations/StaggerContainer'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: ElementType
  title: string
  description: string
  className?: string
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:border-brand-500/30 hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <Icon className="w-10 h-10 text-brand-600 dark:text-brand-500 mb-5" strokeWidth={1.5} />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-white/60 leading-relaxed">{description}</p>
    </motion.div>
  )
}
