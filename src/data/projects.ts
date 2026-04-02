import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'ETロボコン班',
    description: 'ET Robot Contestに向けて組込みソフトウェアを開発する班。WRO Japanでも全国上位の実績を持つ。センサーフュージョンやリアルタイム制御の技術を磨いている。',
    tags: ['C/C++', '組込みシステム', 'ロボット制御'],
    gradient: 'from-violet-600 to-indigo-700',
    status: '進行中',
  },
  {
    id: '2',
    title: 'Unity班',
    description: 'Unityを使ったゲームアプリの制作・研究を行う班。日本ゲーム大賞U18で金賞を受賞するなど、本格的なゲーム開発に挑戦し続けている。',
    tags: ['Unity', 'C#', 'ゲーム開発'],
    gradient: 'from-rose-500 to-pink-700',
    status: '進行中',
  },
  {
    id: '3',
    title: 'IT班',
    description: '業務ITアプリケーションの企画・開発と競技参加を行う班。技能五輪ウェブデザイン部門に5年連続出場中。',
    tags: ['TypeScript', 'React', 'システム設計'],
    gradient: 'from-sky-500 to-cyan-600',
    status: '進行中',
  },
  {
    id: '4',
    title: 'Web班',
    description: 'WebサイトやWebアプリの企画・設計・実装から大会出場まで行う班。シンギュラリティバトルクエストで優勝するなど、最新技術を活用したWeb開発で結果を残している。',
    tags: ['Next.js', 'TypeScript', 'Web開発'],
    gradient: 'from-brand-500 to-indigo-600',
    status: '進行中',
  },
  {
    id: '5',
    title: 'LEGOロボット班',
    description: 'LEGOロボットで課題をクリアする競技に参加する班。プログラミングと機械設計の両方を学びながら、WRO Japanなどのロボット競技大会で全国上位を目指す。',
    tags: ['Python', 'LEGO Mindstorms', 'ロボット'],
    gradient: 'from-amber-500 to-orange-600',
    status: '進行中',
  },
  {
    id: '6',
    title: 'ガーデニング班',
    description: '農地で植物を育てながらIoTデータ活用にも挑戦するユニークな班。センサーで環境データを収集・分析し、農業と最先端技術を融合させた研究に取り組む。',
    tags: ['IoT', 'データ分析', '農業×技術'],
    gradient: 'from-emerald-500 to-teal-600',
    status: '進行中',
  },
]
