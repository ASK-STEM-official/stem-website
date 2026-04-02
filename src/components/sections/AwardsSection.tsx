'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const awards = [
  {
    year: '2024',
    event: '日本ゲーム大賞 U18',
    result: '金賞',
    detail: '日本最大規模のゲームコンテストU18部門で金賞を受賞。Unityで制作したオリジナルゲームが高い評価を受けた。',
    color: 'from-amber-500 to-yellow-400',
    accent: 'text-yellow-200',
  },
  {
    year: '2024',
    event: 'シンギュラリティBQ データクエスト',
    result: '2位 + PE-BANK賞',
    detail: '第5回 全国高等学校AIアスリート選手権大会 データクエストで準優勝。3名がデータ分析のスキルを発揮した。',
    color: 'from-rose-600 to-orange-500',
    accent: 'text-orange-300',
  },
  {
    year: '2023',
    event: 'シンギュラリティBQ Xクエスト',
    result: '3位 + PE-BANK賞',
    detail: '第4回 全国高等学校AIアスリート選手権大会 Xクエストで3位入賞。PE-BANK賞も同時受賞した。',
    color: 'from-pink-600 to-rose-500',
    accent: 'text-pink-300',
  },
  {
    year: '2024',
    event: 'ETロボコン',
    result: '全国大会 出場',
    detail: '組込みシステム技術を競う全国大会に出場。C/C++で制御アルゴリズムを実装し、自律走行ロボットを完成させた。',
    color: 'from-violet-600 to-indigo-600',
    accent: 'text-violet-300',
  },
  {
    year: '5年連続',
    event: '技能五輪全国大会',
    result: '5年連続 出場',
    detail: 'ウェブデザイン職種で5年連続出場。高度な技術力と継続的な訓練の成果を全国で証明し続けている。',
    color: 'from-indigo-600 to-cyan-600',
    accent: 'text-cyan-300',
  },
  {
    year: '2025',
    event: 'WRO Japan',
    result: '浜松予選 3位',
    detail: 'World Robot Olympiad浜松予選会ROBO MISSIONシニア部門で3位入賞。チームでロボット制御技術を競った。',
    color: 'from-emerald-600 to-teal-500',
    accent: 'text-emerald-300',
  },
]

export default function AwardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} id="awards" className="relative text-gray-900 dark:text-white pt-32 pb-16 overflow-hidden">
      {/* Top fade for seamless blending */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-[1]" />
      {/* Parallax background grid with edge fade */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"
        style={{ y: bgY, maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
      />

      {/* Glow spots - softer for seamless blending */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-200/20 dark:bg-violet-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Header */}
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

        {/* Award cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={`${award.event}-${award.year}`}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm p-8 cursor-default shadow-sm dark:shadow-none"
            >
              {/* Gradient bar top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${award.color}`} />

              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest ${award.accent}`}>
                    {award.year}
                  </span>
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                    className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${award.color} text-white`}
                  >
                    {award.result}
                  </motion.span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{award.event}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">{award.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
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
