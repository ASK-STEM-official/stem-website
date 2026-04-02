'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" background="subtle">
      <FadeInUp>
        <div className="mb-20">
          <p className="text-brand-600 dark:text-brand-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            Teams
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-[1.2] tracking-tight">
            6つの専門班が、
            <br />
            それぞれの頂点を目指す。
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-base max-w-xl leading-relaxed">
            各班が専門分野に特化し、全国大会出場・受賞を本気で狙う。
          </p>
        </div>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}
