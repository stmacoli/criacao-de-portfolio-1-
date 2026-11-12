import Link from 'next/link'
import { Home } from 'lucide-react'
import { ProjectCatalog } from '@/components/projects/project-catalog'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <main className={'container page-main'}>
      <nav className={'breadcrumbs'} aria-label={'Navegação estrutural'}>
        <Link href={'/'}><Home aria-hidden={'true'} /> Início</Link>
        <span aria-hidden={'true'}>/</span>
        <span aria-current={'page'}>Projetos</span>
      </nav>

      <div className={'page-intro'}>
        <p className={'eyebrow'}>PROJETOS / 2026</p>
        <h1>Projetos e experiências<br /><em>de desenvolvimento.</em></h1>
        <p>
          Uma seleção de aplicações, ferramentas e projetos autorais. Cada estudo apresenta
          o contexto, as tecnologias utilizadas e os desafios envolvidos.
        </p>
      </div>

      <ProjectCatalog projects={projects} />
    </main>
  )
}
