'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import GlitchCode from '@/components/ui/GlitchCode'

const SPRING = { stiffness: 80, damping: 28, mass: 0.8 }

function useScrollReveal(progress: MotionValue<number>, start: number, end: number) {
  const rawOpacity = useTransform(progress, [start, end], [0, 1])
  const rawY = useTransform(progress, [start, end], [40, 0])
  const rawBlur = useTransform(progress, [start, end], [3, 0])
  const opacity = useSpring(rawOpacity, SPRING)
  const y = useSpring(rawY, SPRING)
  const blur = useSpring(rawBlur, SPRING)
  const filter = useTransform(blur, (v) => `blur(${v}px)`)
  return { opacity, y, filter }
}

const pillarsData = [
  { label: 'Skill Up', desc: '技術力の向上', sub: '各班の専門技術を深め、大会や自主制作を通じて実践的なスキルを身につける' },
  { label: 'Team First', desc: 'チームで作る', sub: 'GitHubで成果を共有・管理。コードレビューやドキュメント整備の文化を育てる' },
  { label: 'Output', desc: '形にして届ける', sub: '公式Webサイトやドキュメントの充実、大会発表を通じて成果を外へ発信する' },
]

export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const missionStyle = useScrollReveal(scrollYProgress, 0.00, 0.14)

  const dividerRaw = useTransform(scrollYProgress, [0.14, 0.24], [0, 1])
  const dividerScale = useSpring(dividerRaw, SPRING)

  const visionStyle = useScrollReveal(scrollYProgress, 0.24, 0.42)

  const pillar0 = useScrollReveal(scrollYProgress, 0.50, 0.62)
  const pillar1 = useScrollReveal(scrollYProgress, 0.56, 0.68)
  const pillar2 = useScrollReveal(scrollYProgress, 0.62, 0.74)
  const pillarStyles = [pillar0, pillar1, pillar2]

  return (
    <section ref={containerRef} id="mission" className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-brand-50 dark:bg-gray-950 text-gray-900 dark:text-white" style={{ height: '100dvh' }}>
        {/* Decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-100/60 via-brand-50/30 to-transparent dark:from-brand-900/40 dark:via-brand-900/20 dark:to-transparent" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-[1]" />
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-200/30 dark:bg-brand-600/15 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <GlitchCode className="absolute top-16 right-6 sm:right-16 text-[10px] sm:text-xs font-mono text-brand-400/15 dark:text-brand-300/10 leading-relaxed select-none pointer-events-none whitespace-pre" />
        <GlitchCode className="absolute bottom-28 left-6 sm:left-12 text-[10px] sm:text-xs font-mono text-brand-400/15 dark:text-brand-300/10 leading-relaxed select-none pointer-events-none whitespace-pre hidden sm:block" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 max-w-5xl w-full">
          {/* MISSION */}
          <motion.div style={missionStyle} className="mb-4 sm:mb-8">
            <p className="text-brand-600 dark:text-brand-200 text-xs font-bold uppercase tracking-[0.3em] mb-3 sm:mb-6">
              Mission
            </p>
            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold leading-[1.3] tracking-tight">
              技術と好奇心を掛け合わせ、
              <br className="hidden sm:block" />
              <span className="text-brand-600 dark:text-brand-200">
                自分たちのアイデアを形にする。
              </span>
            </h2>
          </motion.div>

          {/* Divider */}
          <motion.div
            style={{ scaleX: dividerScale }}
            className="h-px bg-gray-200 dark:bg-white/20 origin-left mb-4 sm:mb-8"
          />

          {/* VISION */}
          <motion.div style={visionStyle} className="mb-6 sm:mb-10">
            <p className="text-brand-600 dark:text-brand-200 text-xs font-bold uppercase tracking-[0.3em] mb-3 sm:mb-6">
              Vision
            </p>
            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold leading-[1.3] tracking-tight">
              全部員がAIを使いこなす技術集団となり、
              <br className="hidden sm:block" />
              <span className="text-brand-600 dark:text-brand-200">
                競技会で全国トップレベルの実績を勝ち取る。
              </span>
            </h2>
          </motion.div>

          {/* 3 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6">
            {pillarsData.map((item, i) => (
              <motion.div
                key={item.label}
                style={pillarStyles[i]}
                className="border border-gray-200 dark:border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-8 hover:border-brand-400/50 hover:bg-brand-50 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="text-brand-600 dark:text-brand-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-1 sm:mb-3">
                  {item.label}
                </div>
                <div className="text-gray-900 dark:text-white text-sm sm:text-xl font-bold mb-1 sm:mb-3 tracking-tight">
                  {item.desc}
                </div>
                <div className="text-gray-600 dark:text-white/60 text-[10px] sm:text-sm leading-relaxed">
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
