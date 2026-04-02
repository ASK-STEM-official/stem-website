'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const awards = [
  {
    year: '2024',
    event: '日本ゲーム大賞 U18',
    result: '金賞',
    detail: '日本最大規模のゲームコンテストU18部門で金賞を受賞。Unityで制作したオリジナルゲームが高い評価を受けた。',
  },
  {
    year: '2024',
    event: 'シンギュラリティBQ データクエスト',
    result: '2位 + PE-BANK賞',
    detail: '第5回 全国高等学校AIアスリート選手権大会 データクエストで準優勝。3名がデータ分析のスキルを発揮した。',
  },
  {
    year: '2023',
    event: 'シンギュラリティBQ Xクエスト',
    result: '3位 + PE-BANK賞',
    detail: '第4回 全国高等学校AIアスリート選手権大会 Xクエストで3位入賞。PE-BANK賞も同時受賞した。',
  },
  {
    year: '2024',
    event: 'ETロボコン',
    result: '全国大会 出場',
    detail: '組込みシステム技術を競う全国大会に出場。C/C++で制御アルゴリズムを実装し、自律走行ロボットを完成させた。',
  },
  {
    year: '5年連続',
    event: '技能五輪全国大会',
    result: '5年連続 出場',
    detail: 'ウェブデザイン職種で5年連続出場。高度な技術力と継続的な訓練の成果を全国で証明し続けている。',
  },
  {
    year: '2025',
    event: 'WRO Japan',
    result: '浜松予選 3位',
    detail: 'World Robot Olympiad浜松予選会ROBO MISSIONシニア部門で3位入賞。チームでロボット制御技術を競った。',
  },
]

export default function AwardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} id="awards" className="relative text-gray-900 dark:text-white pt-32 pb-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-[1]" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"
        style={{ y: bgY, maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-200/20 dark:bg-violet-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-brand-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">Awards & Records</p>
          <h2 className="text-4xl md:text-6xl font-bold">
            全国で証明する、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500 dark:from-indigo-400 dark:to-cyan-400">
              圧倒的な技術力。
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={`${award.event}-${award.year}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 cursor-default hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg dark:hover:shadow-brand-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1 rounded-md">
                  {award.year}
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-white/50 bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-md">
                  {award.result}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">{award.event}</h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{award.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 dark:text-white/40 text-sm tracking-wider">
            — 挑戦は続く。次の全国制覇へ。 —
          </p>
        </motion.div>
      </div>
    </section>
  )
}
