'use client'

import { useState, useEffect } from 'react'
import useNavScrolled from '@/hooks/useNavScrolled'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'Mission', href: '#mission' },
  { label: '部活について', href: '#about' },
  { label: '班紹介', href: '#projects' },
  { label: '実績', href: '#awards' },
  { label: '沿革', href: '#history' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navigation() {
  const scrolled = useNavScrolled()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-white/10'
          : ''
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <span
          className="font-bold text-lg tracking-tight text-gray-900 dark:text-white transition-colors"
        >
          STEM研究部
        </span>
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop links */}
          <ul className="hidden md:flex gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] font-medium text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'md:hidden relative w-6 h-5 flex flex-col justify-between transition-colors text-gray-900 dark:text-white'
            )}
            aria-label="メニュー"
          >
            <span className={cn(
              'block h-0.5 w-full bg-current rounded transition-transform duration-300 origin-center',
              mobileOpen && 'translate-y-[9px] rotate-45'
            )} />
            <span className={cn(
              'block h-0.5 w-full bg-current rounded transition-opacity duration-300',
              mobileOpen && 'opacity-0'
            )} />
            <span className={cn(
              'block h-0.5 w-full bg-current rounded transition-transform duration-300 origin-center',
              mobileOpen && '-translate-y-[9px] -rotate-45'
            )} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-16 z-40 transition-all duration-300',
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 pb-16">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
