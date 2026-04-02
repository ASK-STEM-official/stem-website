import type { ElementType } from 'react'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  imageSrc?: string
  gradient?: string
  status: '進行中' | '完了' | '計画中'
}

export interface Feature {
  id: string
  icon: ElementType
  title: string
  description: string
}

export interface NavItem {
  label: string
  href: string
}
