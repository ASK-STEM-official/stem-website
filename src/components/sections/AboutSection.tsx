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
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-16 sm:mb-24">
        <FadeInUp>
          <p className="text-brand-600 dark:text-brand-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            About
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            STEM研究部とは？
          </h2>
          <p className="text-gray-600 dark:text-white/60 leading-[1.8] text-sm sm:text-base mb-6">
            STEM研究部は、愛知総合工科高等学校で活動する技術系の部活動です。プログラミングやロボット、ゲーム開発、Web制作など、さまざまな分野に分かれて活動しています。
          </p>
          <p className="text-gray-600 dark:text-white/60 leading-[1.8] text-sm sm:text-base">
            経験は一切問いません。「何かを作ってみたい」「大会に挑戦してみたい」。そんな気持ちがあれば、仲間と一緒に技術を磨きながら成長していける場所です。
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
