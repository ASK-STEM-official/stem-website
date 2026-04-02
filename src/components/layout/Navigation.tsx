'use client'

import useNavScrolled from '@/hooks/useNavScrolled'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: '部活について', href: '#about' },
  { label: 'プロジェクト', href: '#projects' },
  { label: '実績', href: '#awards' },
  { label: '沿革', href: '#history' },
]

export default function Navigation() {
  const scrolled = useNavScrolled()

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <span
          className={cn(
            'font-bold text-xl transition-colors',
            scrolled ? 'text-brand-900' : 'text-white'
          )}
        >
          STEM研究部
        </span>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-500',
                  scrolled ? 'text-gray-700' : 'text-white/90'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
