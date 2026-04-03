'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'

const stemData = [
  { letter: 'S', word: 'Science', jp: '科学', desc: '仮説を立て、実験し、検証する。論理的な思考の土台。' },
  { letter: 'T', word: 'Technology', jp: '技術', desc: 'プログラミングやAIなど、アイデアを実現するための道具。' },
  { letter: 'E', word: 'Engineering', jp: '工学', desc: 'ロボットやシステムを設計し、実際に動くものを作る力。' },
  { letter: 'M', word: 'Mathematics', jp: '数学', desc: 'アルゴリズムやデータ分析を支える、すべての基礎。' },
]

const SPRING = { stiffness: 200, damping: 28, mass: 0.5 }

function StemLetterRow({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof stemData)[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = 0.01 + index * 0.15
  const end = start + 0.14

  const rawOpacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const rawX = useTransform(scrollYProgress, [start, end], [60, 0])
  const rawBlur = useTransform(scrollYProgress, [start, end], [2, 0])

  const opacity = useSpring(rawOpacity, SPRING)
  const x = useSpring(rawX, SPRING)
  const blurSpring = useSpring(rawBlur, SPRING)
  const filter = useTransform(blurSpring, (v) => `blur(${v}px)`)

  return (
    <motion.div
      style={{ opacity, x, filter }}
      className="flex items-center gap-4 sm:gap-8"
    >
      {/* Large letter */}
      <div className="shrink-0 w-14 sm:w-24 md:w-28">
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

      {/* Ghost index */}
      <span className="hidden md:block shrink-0 text-6xl font-black text-gray-100 dark:text-white/[0.04] font-mono select-none tabular-nums">
        0{index + 1}
      </span>
    </motion.div>
  )
}

export default function StemSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const subtitleRaw = useTransform(scrollYProgress, [0.62, 0.72], [0, 1])
  const subtitleOpacity = useSpring(subtitleRaw, SPRING)

  return (
    <section ref={containerRef} className="relative bg-dot-pattern" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950" style={{ height: '100dvh' }}>
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl w-full">
          <p className="text-brand-600 dark:text-brand-400 font-mono text-xs uppercase tracking-[0.3em] mb-2 sm:mb-3">
            What is STEM?
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-8 tracking-tight">
            4つの分野を横断して学ぶ
          </h3>

          <div className="space-y-5 sm:space-y-8">
            {stemData.map((item, i) => (
              <StemLetterRow
                key={item.letter}
                item={item}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="text-gray-500 dark:text-white/50 text-xs sm:text-sm mt-8 sm:mt-10 leading-relaxed max-w-2xl"
          >
            Science, Technology, Engineering, Mathematics の頭文字。
            これらの分野を横断的に学び、実践することがSTEM研究部の活動の基盤になっています。
          </motion.p>
        </div>
      </div>
    </section>
  )
}
