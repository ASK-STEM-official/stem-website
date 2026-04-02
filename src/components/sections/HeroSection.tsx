'use client'

import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import MarqueeText from '@/components/animations/MarqueeText'
import Button from '@/components/ui/Button'
import CanvasCursor from '@/components/ui/CanvasCursor'

const marqueeItems = [
  'ETロボコン全国大会',
  'シンギュラリティXQ優勝',
  '日本ゲーム大賞U18金賞',
  '技能五輪5年連続出場',
  'AI × Engineering',
  'Unity / C++ / TypeScript',
  'STEM研究部',
]

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#f0eef5] dark:bg-[#030712]">
      {/* Flowing cursor lines (behind text) */}
      <CanvasCursor className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center">
        <FadeInUp>
          <motion.p
            className="uppercase tracking-[0.3em] text-xs text-brand-600/60 dark:text-white/50 mb-6"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            AICHI GENERAL TECHNICAL HIGH SCHOOL
          </motion.p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.15] tracking-tight mb-8">
            好奇心を武器に、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-500 to-indigo-600 dark:from-indigo-200 dark:via-white dark:to-cyan-200">
              全国の舞台へ。
            </span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            愛知総合工科高等学校 STEM研究部。プログラミング、ロボット、ゲーム開発。未経験から始めて、仲間と一緒に全国大会を目指す部活です。
          </p>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" href="#mission">
              部活について知る
            </Button>
            <Button variant="outline" href="#projects">
              班を見る
            </Button>
          </div>
        </FadeInUp>
      </div>

      {/* Marquee ticker */}
      <div className="relative z-10 w-full mb-10">
        <div className="h-px w-full bg-brand-200/30 dark:bg-white/10 mb-4" />
        <MarqueeText
          items={marqueeItems}
          speed={25}
          className="text-brand-600/40 dark:text-white/40 text-xs font-medium tracking-widest uppercase"
          itemClassName="text-brand-600/40 dark:text-white/40"
        />
        <div className="h-px w-full bg-brand-200/30 dark:bg-white/10 mt-4" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[6rem] left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-5 h-5 text-brand-400/50 dark:text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}
