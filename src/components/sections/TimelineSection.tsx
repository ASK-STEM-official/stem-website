'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ── Timeline data ────────────────────────────────────
const milestones = [
  {
    year: '2025',
    items: [
      'シンギュラリティBQ 出場',
      'WRO Japan 浜松予選 シニア3位',
      '若年者ものづくり競技大会 出場',
    ],
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
  },
  {
    year: '2023',
    items: [
      'シンギュラリティBQ Xクエスト3位 + PE-BANK賞',
      '若年者ものづくり ウェブデザイン 銅賞',
      '若年者ものづくり 業務用IT 敢闘賞',
      '技能五輪全国大会 ウェブデザイン 出場',
    ],
  },
  {
    year: '2022',
    items: [
      'ETロボコン 初参戦',
      'LEGOロボット班 新設',
    ],
  },
  {
    year: '2021',
    items: [
      '技能五輪全国大会 初出場',
      '日本ゲーム大賞 U18部門 ファイナリスト',
    ],
  },
  {
    year: '2019',
    items: ['若年者ものづくり ウェブデザイン 銅賞'],
  },
  {
    year: '2017',
    items: ['STEM研究部 創部'],
  },
]

// ── Tech stack ───────────────────────────────────────
const CATEGORY_STYLE: Record<string, { heading: string; pill: string }> = {
  lang:     { heading: 'text-cyan-400',    pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  platform: { heading: 'text-purple-400',  pill: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  hardware: { heading: 'text-orange-400',  pill: 'bg-orange-500/10 text-orange-300 border-orange-500/20' },
  infra:    { heading: 'text-emerald-400', pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
}

const techStack = [
  { name: 'Languages',      type: 'lang',     items: ['C#', 'JavaScript', 'TypeScript', 'Python', 'C', 'HTML / CSS', 'SQL'] },
  { name: 'Platforms',       type: 'platform', items: ['Unity', '.NET', 'Blender', 'MySQL'] },
  { name: 'Hardware',        type: 'hardware', items: ['Arduino', 'Raspberry Pi', '3D Printer', 'Meta Quest'] },
  { name: 'Infrastructure',  type: 'infra',    items: ['Linux', 'Network', 'GitHub'] },
]

// ── Sub-components ───────────────────────────────────
function YearEntry({ data, index }: { data: (typeof milestones)[number] & { highlight?: boolean }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex items-start gap-4 sm:gap-6"
    >
      {/* Node */}
      <div className="w-4 shrink-0 flex justify-center pt-[7px]">
        {data.highlight ? (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.06 + 0.1 }}
            className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 shadow-[0_0_16px_4px_rgba(99,102,241,0.4)]"
          />
        ) : (
          <div className="w-3 h-3 rounded-full border-2 border-brand-500/60 bg-gray-950" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-8 sm:pb-10">
        <span
          className={`text-lg sm:text-xl font-bold tabular-nums ${
            data.highlight ? 'text-brand-400' : 'text-white/70'
          }`}
        >
          {data.year}
        </span>
        <ul className="mt-2 space-y-1">
          {data.items.map((item, j) => (
            <li
              key={j}
              className={`text-sm leading-relaxed ${data.highlight ? 'text-white/80' : 'text-white/60'}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────
export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ['0%', '100%'])

  return (
    <section ref={ref} id="history" className="relative bg-gray-950 py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-brand-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">History</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            沿革
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-[7px] bottom-[7px] w-[2px] bg-white/10 rounded-full" />
          <motion.div
            className="absolute left-[7px] top-[7px] w-[2px] rounded-full bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600 origin-top"
            style={{ height: lineHeight }}
          />

          {milestones.map((m, i) => (
            <YearEntry key={m.year} data={m} index={i} />
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-28"
        >
          <p className="text-brand-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">Tech Stack</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10">
            使用技術
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {techStack.map((cat, i) => {
              const c = CATEGORY_STYLE[cat.type]
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
        </motion.div>
      </div>
    </section>
  )
}
