import type { Feature } from '@/types'
import { Cpu, GraduationCap, Trophy, Users2 } from 'lucide-react'

export const features: Feature[] = [
  {
    id: '1',
    icon: Cpu,
    title: '幅広い技術分野',
    description: 'プログラミング、ロボット制御、ゲーム開発、Web制作、AI活用まで。自分の興味に合った分野を見つけて取り組める。',
  },
  {
    id: '2',
    icon: GraduationCap,
    title: '未経験からスタート',
    description: '部員の多くがゼロからのスタート。先輩や仲間に教わりながら、自分のペースで技術を身につけていける。',
  },
  {
    id: '3',
    icon: Trophy,
    title: '大会への挑戦',
    description: '若年者ものづくり競技大会、ETロボコン、技能五輪など。日々の活動の成果を全国の舞台で発揮する。',
  },
  {
    id: '4',
    icon: Users2,
    title: '仲間と一緒に作る',
    description: 'チームで協力して一つのものを作り上げる経験。GitHubで成果を共有し、互いに学び合う文化がある。',
  },
]
