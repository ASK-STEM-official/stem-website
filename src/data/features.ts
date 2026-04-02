import type { Feature } from '@/types'
import { Cpu, GraduationCap, Trophy, Users2 } from 'lucide-react'

export const features: Feature[] = [
  {
    id: '1',
    icon: Cpu,
    title: 'AI × 技術開発',
    description: '全班でAIを活用した開発に取り組む。プログラミング・ロボット・ゲーム・Webなど幅広い分野で最先端技術を学べる。',
  },
  {
    id: '2',
    icon: GraduationCap,
    title: '未経験者大歓迎',
    description: 'プログラミング経験ゼロからスタート可能。入部前に各班を体験してから自分に合った班を選べる。',
  },
  {
    id: '3',
    icon: Trophy,
    title: '全国大会で実績',
    description: 'ETロボコン・技能五輪・シンギュラリティ・日本ゲーム大賞など、多くの全国大会で活躍してきた実績がある。',
  },
  {
    id: '4',
    icon: Users2,
    title: 'チームで作る',
    description: 'GitHubを活用して成果を共有・管理。コードレビューやドキュメント整備の文化を大切にしている。',
  },
]
