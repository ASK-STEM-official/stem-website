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
        'bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <Icon className="w-10 h-10 text-brand-500 mb-5" strokeWidth={1.5} />
      <h3 className="text-xl font-bold text-brand-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}
