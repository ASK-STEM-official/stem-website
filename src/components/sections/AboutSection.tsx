'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

const stemLetters = [
  { letter: 'S', word: 'Science', jp: '科学', desc: '仮説を立て、実験し、検証する。論理的な思考の土台。' },
  { letter: 'T', word: 'Technology', jp: '技術', desc: 'プログラミングやAIなど、アイデアを実現するための道具。' },
  { letter: 'E', word: 'Engineering', jp: '工学', desc: 'ロボットやシステムを設計し、実際に動くものを作る力。' },
  { letter: 'M', word: 'Mathematics', jp: '数学', desc: 'アルゴリズムやデータ分析を支える、すべての基礎。' },
]

function StemRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end 0.7'],
  })

  return (
    <div ref={containerRef} className="mb-16 sm:mb-24">
      <FadeInUp>
        <p className="text-brand-600 dark:text-brand-400 font-mono text-xs uppercase tracking-[0.3em] mb-3">
          What is STEM?
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-10 sm:mb-14 tracking-tight">
          4つの分野を横断して学ぶ
        </h3>
      </FadeInUp>

      <div className="space-y-6 sm:space-y-8">
        {stemLetters.map((item, i) => {
          const start = i / stemLetters.length
          const end = (i + 0.8) / stemLetters.length
          return (
            <StemLetterRow
              key={item.letter}
              item={item}
              index={i}
              progress={scrollYProgress}
              rangeStart={start}
              rangeEnd={end}
            />
          )
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-gray-500 dark:text-white/50 text-xs sm:text-sm mt-8 sm:mt-10 leading-relaxed max-w-2xl"
      >
        Science, Technology, Engineering, Mathematics の頭文字。これらの分野を横断的に学び、実践することがSTEM研究部の活動の基盤になっています。
      </motion.p>
    </div>
  )
}

function StemLetterRow({
  item,
  index,
  progress,
  rangeStart,
  rangeEnd,
}: {
  item: typeof stemLetters[number]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  rangeStart: number
  rangeEnd: number
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.15, 1])
  const x = useTransform(progress, [rangeStart, rangeEnd], [40, 0])
  const scale = useTransform(progress, [rangeStart, rangeEnd], [0.92, 1])

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="flex items-center gap-4 sm:gap-8 group"
    >
      {/* Large letter */}
      <div className="shrink-0 w-16 sm:w-24 md:w-28">
        <span className="text-5xl sm:text-7xl md:text-8xl font-black font-mono text-brand-600/80 dark:text-brand-400/80 leading-none select-none">
          {item.letter}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 border-l-2 border-brand-200 dark:border-brand-800 pl-4 sm:pl-6 py-2 sm:py-3">
        <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
          <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {item.word}
          </span>
          <span className="text-xs text-gray-400 dark:text-white/40 font-mono">
            / {item.jp}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60 leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Index number */}
      <span className="hidden md:block shrink-0 text-6xl font-black text-gray-100 dark:text-white/[0.04] font-mono select-none tabular-nums">
        0{index + 1}
      </span>
    </motion.div>
  )
}

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
                <div className="text-2xl sm:text-3xl font-bold text-brand-600">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>

      {/* Interactive STEM reveal */}
      <StemRevealSection />

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
