'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import CountUp from '@/components/animations/CountUp'
import FeatureCard from '@/components/ui/FeatureCard'
import { features } from '@/data/features'

const stats = [
  { end: 30, suffix: '名+', label: '部員数' },
  { end: 6, suffix: '班', label: '専門チーム' },
  { end: 4, suffix: '冠+', label: '全国大会受賞' },
  { end: 5, suffix: '年', label: '技能五輪連続出場' },
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
        <FadeInUp>
          <p className="text-brand-600 dark:text-brand-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            STEM研究部とは？
          </h2>
          <p className="text-gray-600 dark:text-white/60 leading-[1.8] text-base">
            愛知総合工科高等学校のSTEM研究部は、最先端の技術と創造力で全国トップを目指す技術系部活です。プログラミング未経験者も大歓迎で、AIを活用した開発からロボット競技まで幅広い活動を行っています。
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-brand-600">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-sm text-gray-500 dark:text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}
