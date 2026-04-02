'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import ScrollDecodeCode from '@/components/ui/ScrollDecodeCode'

// ── Timeline data (chronological: oldest → newest) ───
const milestones = [
  {
    year: '2017',
    items: ['STEM研究部 創部'],
    hash: '0a1b2c3',
  },
  {
    year: '2019',
    items: ['若年者ものづくり ウェブデザイン 銅賞'],
    hash: '5f8a4c1',
  },
  {
    year: '2021',
    items: [
      '技能五輪全国大会 初出場',
      '日本ゲーム大賞 U18部門 ファイナリスト',
    ],
    hash: 'c7d2b6e',
  },
  {
    year: '2022',
    items: [
      'ETロボコン 初参戦',
      'LEGOロボット班 新設',
    ],
    hash: '91a5e3f',
  },
  {
    year: '2023',
    items: [
      'シンギュラリティBQ Xクエスト3位 + PE-BANK賞',
      '若年者ものづくり ウェブデザイン 銅賞',
      '若年者ものづくり 業務用IT 敢闘賞',
      '技能五輪全国大会 ウェブデザイン 出場',
    ],
    hash: '4d9c8b2',
  },
  {
    year: '2024',
    items: [
      '日本ゲーム大賞 U18部門 金賞',
      'シンギュラリティBQ データクエスト2位 + PE-BANK賞',
      'ETロボコン 全国大会出場',
      '若年者ものづくり 業務用IT 銅賞',
      '技能五輪全国大会 ウェブデザイン 出場',
    ],
    highlight: true,
    hash: 'b3e7f1a',
  },
  {
    year: '2025',
    items: [
      'シンギュラリティBQ 出場',
      'WRO Japan 浜松予選 シニア3位',
      '若年者ものづくり競技大会 出場',
    ],
    hash: 'f8c2a1d',
  },
]

// ── Tech stack ───────────────────────────────────────
const CATEGORY_STYLE: Record<string, { heading: string; pill: string }> = {
  lang:     { heading: 'text-cyan-600 dark:text-cyan-400',    pill: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/20' },
  platform: { heading: 'text-purple-600 dark:text-purple-400',  pill: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/20' },
  hardware: { heading: 'text-orange-600 dark:text-orange-400',  pill: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-500/20' },
  infra:    { heading: 'text-emerald-600 dark:text-emerald-400', pill: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20' },
}

const techStack = [
  { name: 'Languages',      type: 'lang',     items: ['C#', 'JavaScript', 'TypeScript', 'Python', 'C', 'HTML / CSS', 'SQL'] },
  { name: 'Platforms',       type: 'platform', items: ['Unity', '.NET', 'Blender', 'MySQL'] },
  { name: 'Hardware',        type: 'hardware', items: ['Arduino', 'Raspberry Pi', '3D Printer', 'Meta Quest'] },
  { name: 'Infrastructure',  type: 'infra',    items: ['Linux', 'Network', 'GitHub'] },
]

const SPRING = { stiffness: 80, damping: 28, mass: 0.8 }

// ── Scroll-driven timeline row ───────────────────────
function TimelineRow({
  data,
  index,
  total,
  scrollYProgress,
}: {
  data: (typeof milestones)[number]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const perItem = 0.84 / total
  const start = 0.04 + index * perItem
  const end = start + perItem * 0.78

  const rawOpacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const rawX = useTransform(scrollYProgress, [start, end], [100, 0])
  const rawBlur = useTransform(scrollYProgress, [start, end], [4, 0])

  const opacity = useSpring(rawOpacity, SPRING)
  const x = useSpring(rawX, SPRING)
  const blur = useSpring(rawBlur, SPRING)
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.div
      style={{ opacity, x, filter }}
      className="flex items-start gap-2 sm:gap-4 md:gap-5"
    >
      {/* Year */}
      <div className="shrink-0 w-12 sm:w-[4.5rem] md:w-24 text-right">
        <span
          className={`text-lg sm:text-2xl md:text-4xl font-black font-mono leading-none select-none tabular-nums ${
            data.highlight
              ? 'text-brand-600 dark:text-brand-400'
              : 'text-gray-300 dark:text-white/15'
          }`}
        >
          {data.year}
        </span>
      </div>

      {/* Node */}
      <div className="shrink-0 flex justify-center w-3 sm:w-4 pt-[3px] sm:pt-[5px]">
        {data.highlight ? (
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-brand-500 shadow-[0_0_12px_3px_rgba(99,102,241,0.4)]" />
        ) : (
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border-[1.5px] sm:border-2 border-brand-500/40 bg-white dark:bg-gray-950" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <ul className="space-y-0">
          {data.items.map((item, j) => (
            <li
              key={j}
              className={`text-[10px] sm:text-xs md:text-sm leading-relaxed ${
                data.highlight
                  ? 'text-gray-700 dark:text-white/80'
                  : 'text-gray-500 dark:text-white/55'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Ghost commit hash */}
      <span className="hidden md:block shrink-0 text-[11px] font-mono text-gray-200 dark:text-white/[0.06] select-none tabular-nums">
        {data.hash}
      </span>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────
export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end'],
  })

  // Decode code resolves over roughly the same range as timeline entries
  const decodeProgress = useTransform(scrollYProgress, [0.02, 0.88], [0, 1])

  // Connecting line grows as entries appear
  const lineRaw = useTransform(scrollYProgress, [0.04, 0.88], [0, 1])
  const lineScale = useSpring(lineRaw, SPRING)

  return (
    <section id="history" className="relative">
      {/* Background — clip decorative elements here, NOT on section */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          }}
        />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ── PART 1: Sticky scroll timeline ── */}
      <div ref={timelineRef} style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden" style={{ height: '100dvh' }}>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-6 sm:p-10">
            <ScrollDecodeCode
              scrollProgress={decodeProgress}
              className="text-[9px] sm:text-[11px] md:text-xs leading-[1.9] text-gray-900/[0.06] dark:text-white/[0.04]"
            />
          </div>

          {/* Timeline content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl w-full">
            <p className="text-brand-600 dark:text-brand-400 text-xs font-mono font-bold uppercase tracking-[0.3em] mb-2">
              History
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6 sm:mb-10">
              沿革
            </h2>

            <div className="relative space-y-2 sm:space-y-3 md:space-y-4">
              {/* Static guide line */}
              <div className="absolute left-[3.875rem] sm:left-[6rem] md:left-[7.75rem] top-1 bottom-1 w-px bg-gray-200/50 dark:bg-white/[0.06]" />
              {/* Animated progress line */}
              <motion.div
                className="absolute left-[3.875rem] sm:left-[6rem] md:left-[7.75rem] top-1 bottom-1 w-px bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600 origin-top"
                style={{ scaleY: lineScale }}
              />
              {milestones.map((m, i) => (
                <TimelineRow
                  key={m.year}
                  data={m}
                  index={i}
                  total={milestones.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2: Tech Stack (normal scroll) ── */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl pt-16 sm:pt-20 pb-28 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-600 dark:text-brand-400 text-xs font-mono font-bold uppercase tracking-[0.3em] mb-4">
            Tech Stack
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">
            使用技術
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {techStack.map((cat, i) => {
            const c = CATEGORY_STYLE[cat.type]
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${c.heading}`}>
                  {cat.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className={`text-xs px-3 py-1.5 rounded-full border ${c.pill}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-[1]" />
    </section>
  )
}
