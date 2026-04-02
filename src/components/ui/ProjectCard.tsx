'use client'

import { motion } from 'framer-motion'
import { itemVariants } from '@/components/animations/StaggerContainer'
import type { Project } from '@/types'
import Image from 'next/image'


interface ProjectCardProps {
  project: Project
}


export default function ProjectCard({ project }: ProjectCardProps) {
  const gradient = project.gradient ?? 'from-brand-500 to-brand-600'
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-pointer"
    >
      <div className={`h-44 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden`}>
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <span className="relative z-10 text-4xl font-black text-white/30 select-none tracking-tighter">
            {project.title.replace('班', '')}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-brand-900 mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-50 text-brand-600 text-xs font-medium px-2.5 py-1 rounded-full mr-1.5 mb-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
