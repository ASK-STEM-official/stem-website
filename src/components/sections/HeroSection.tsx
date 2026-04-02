'use client'

import { motion } from 'framer-motion'
import ParallaxLayer from '@/components/animations/ParallaxLayer'
import FadeInUp from '@/components/animations/FadeInUp'
import MarqueeText from '@/components/animations/MarqueeText'
import Button from '@/components/ui/Button'

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
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-600 to-indigo-800" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-10 -left-20 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[140px]"
        animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Geometric decorations with parallax */}
      <ParallaxLayer speed={0.1} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-brand-200/10 rounded-full blur-2xl" />
      </ParallaxLayer>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center">
        <FadeInUp>
          <motion.p
            className="uppercase tracking-[0.3em] text-xs text-white/50 mb-6"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            AICHI GENERAL TECHNICAL HIGH SCHOOL
          </motion.p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            最先端技術と創造力で、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-cyan-200">
              全国トップを目指す。
            </span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            愛知総合工科高等学校 STEM研究部。プログラミング未経験からでも始められる、全国大会を本気で目指す技術系部活です。
          </p>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" href="#about">
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
        <div className="h-px w-full bg-white/10 mb-4" />
        <MarqueeText
          items={marqueeItems}
          speed={25}
          className="text-white/40 text-xs font-medium tracking-widest uppercase"
          itemClassName="text-white/40"
        />
        <div className="h-px w-full bg-white/10 mt-4" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[6rem] left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-5 h-5 text-white/40"
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
