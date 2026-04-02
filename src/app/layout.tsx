import type { Metadata } from 'next'
import { Noto_Sans_JP, Inter, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import ThemeProvider from '@/components/ThemeProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'STEM研究部',
  description:
    'STEM研究部の公式Webサイト。科学・技術・工学・数学の探究活動を行う部活動です。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn(notoSansJP.variable, inter.variable, jetbrainsMono.variable, 'font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300')}>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
