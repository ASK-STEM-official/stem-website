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
        <div className="mb-16">
          <p className="text-brand-600 dark:text-brand-500 font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            班・活動
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            6つの専門班が、
            <br />
            それぞれの頂点を目指す。
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-xl">
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
