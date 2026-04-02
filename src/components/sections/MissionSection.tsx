'use client'

import { motion } from 'framer-motion'

export default function MissionSection() {
  return (
    <section id="mission" className="relative bg-brand-50 dark:bg-gray-950 text-gray-900 dark:text-white py-24 sm:py-36 overflow-hidden">
      {/* Subtle indigo tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100/60 via-brand-50/30 to-transparent dark:from-brand-900/40 dark:via-brand-900/20 dark:to-transparent" />

      {/* Top/bottom fades for seamless blending */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-[1]" />

      {/* animated gradient blobs */}
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

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        {/* MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-brand-600 dark:text-brand-200 text-xs font-bold uppercase tracking-[0.3em] mb-8">
            Mission
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-[1.3] tracking-tight">
            技術と好奇心を掛け合わせ、
            <br className="hidden sm:block" />
            <span className="text-brand-600 dark:text-brand-200">
              自分たちのアイデアを形にする。
            </span>
          </h2>
        </motion.div>

        {/* divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-px bg-gray-200 dark:bg-white/20 origin-left mb-12 sm:mb-20"
        />

        {/* VISION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-20"
        >
          <p className="text-brand-600 dark:text-brand-200 text-xs font-bold uppercase tracking-[0.3em] mb-6 sm:mb-8">
            Vision
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-[1.3] tracking-tight">
            全部員がAIを使いこなす技術集団となり、
            <br className="hidden sm:block" />
            <span className="text-brand-600 dark:text-brand-200">
              競技会で全国トップレベルの実績を勝ち取る。
            </span>
          </h2>
        </motion.div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-20">
          {[
            { label: 'Skill Up', desc: '技術力の向上', sub: '各班の専門技術を深め、大会・競技・自主制作を通じて実践的なスキルを身につける' },
            { label: 'Team First', desc: 'チームで作る', sub: 'GitHubを活用して成果を共有・管理。コードレビューやドキュメント整備の文化を育成する' },
            { label: 'Output', desc: '形にして届ける', sub: '公式Webサイト・ドキュメントサイトの充実、大会発表を通じて成果を外へ発信する' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-brand-400/50 hover:bg-brand-50 dark:hover:bg-white/5 transition-all duration-300"
            >
              <div className="text-brand-600 dark:text-brand-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">{item.label}</div>
              <div className="text-gray-900 dark:text-white text-xl font-bold mb-3 tracking-tight">{item.desc}</div>
              <div className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
