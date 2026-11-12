import type { ReactNode } from 'react'

interface ProjectSectionProps {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  className?: string
}

export function ProjectSection({
  id,
  eyebrow,
  title,
  children,
  className = '',
}: ProjectSectionProps) {
  return (
    <section id={id} className={className}>
      <p className={'eyebrow'}>{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
