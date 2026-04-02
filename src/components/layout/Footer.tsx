import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/30" />
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <hr className="border-white/10 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold text-xl">STEM研究部</div>
            <div className="text-sm text-white/60 mt-1">愛知総合工科高等学校</div>
            <div className="text-sm text-white/50 mt-2">最先端技術で、全国トップを目指す。</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">リンク</div>
            <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors block mb-1">部活について</a>
            <a href="#projects" className="text-sm text-white/70 hover:text-white transition-colors block mb-1">班・活動</a>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">GitHub</div>
            <a
              href="https://github.com/ASK-STEM-official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              github.com/ASK-STEM-official
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-xs text-white/40">© 2026 STEM研究部 / 愛知総合工科高等学校</span>
          <span className="text-xs text-white/40">最終更新: 2026年4月2日</span>
        </div>
      </div>
    </footer>
  )
}
