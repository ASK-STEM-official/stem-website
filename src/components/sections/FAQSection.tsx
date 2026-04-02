'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'プログラミングやロボットの経験がなくても大丈夫ですか？',
    answer:
      'もちろんです。部員の多くが未経験からスタートしています。仲間と協力しながら切磋琢磨できる環境が整っており、近年では生成AIも活用することで、従来は挑戦しにくかった高度な課題にも初心者のうちから取り組むことができます。',
  },
  {
    question: '活動日・活動時間を教えてください。',
    answer:
      '平日（月〜金）は基本的に活動可能で、18時頃まで活動しています。毎日必ず出席する必要はなく、自宅で作業を進めるスタイルでも構いません。夏休みなどの長期休暇中や大会前には、土日に活動する場合もあります。',
  },
  {
    question: '活動にかかる費用はどれくらいですか？',
    answer:
      '基本的に無料です。部室にはパソコンが用意されており、プロジェクトに必要な機材は部費から支出します。マウスなどの周辺機器は自費での用意を推奨しています。自分専用のPCがあるとより快適ですが、なくても全く問題ありません。',
  },
  {
    question: 'どの班に入るかはどう決まりますか？',
    answer:
      '入部後にまず各班の活動を体験していただき、その上で希望する班に所属できます。ロボット班・IT班・Web制作班・Unity班・ETロボ班・ガーデニング班から選ぶことができます。',
  },
  {
    question: '複数の班を兼任することはできますか？',
    answer:
      'はい、兼班は可能です。興味のある分野が複数ある場合は、複数の班に所属して幅広く活動できます。なお、ガーデニング班に所属する場合は、必ず他の班にも所属していただきます。',
  },
]

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group"
      >
        <div className="flex items-start gap-4 py-5 border-b border-gray-200 dark:border-white/10">
          <span className="shrink-0 mt-0.5 font-mono text-sm text-brand-600 dark:text-brand-400 select-none">
            Q{index + 1}
          </span>
          <span className="flex-1 text-gray-900 dark:text-white font-medium text-base sm:text-lg leading-relaxed group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 mt-1 text-gray-400 dark:text-white/40 text-xl leading-none select-none"
          >
            +
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-10 sm:pl-12 pr-4 py-4 text-gray-600 dark:text-white/70 leading-relaxed text-sm sm:text-base">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-16">
        <span className="inline-block font-mono text-xs text-brand-600 dark:text-brand-400 tracking-[0.3em] uppercase mb-4">
          FAQ
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          よくある質問
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <FAQItemComponent key={index} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
