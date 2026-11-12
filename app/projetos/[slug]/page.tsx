import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { ProjectArchitecture } from '@/components/projects/project-architecture'
import { ProjectDecisions } from '@/components/projects/project-decisions'
import { ProjectHeader } from '@/components/projects/project-header'
import { ProjectLearnings } from '@/components/projects/project-learnings'
import { ProjectNavigation, type ProjectNavigationItem } from '@/components/projects/project-navigation'
import { ProjectNextSteps } from '@/components/projects/project-next-steps'
import { ProjectOverview } from '@/components/projects/project-overview'
import { ProjectProblems } from '@/components/projects/project-problems'
import { ProjectResults } from '@/components/projects/project-results'
import { ProjectSolutions } from '@/components/projects/project-solutions'
import { ProjectTechnologies } from '@/components/projects/project-technologies'
import { getProjectBySlug, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(projects, slug)
  if (!project) notFound()

  const projectIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const problems = project.caseStudy?.problems ?? []
  const solutions = project.caseStudy?.solutions ?? []
  const decisions = project.caseStudy?.decisions ?? []
  const results = project.caseStudy?.results ?? []
  const learnings = project.caseStudy?.learnings ?? []

  const navigationItems: ProjectNavigationItem[] = [
    { id: 'visao-geral', label: 'Visão geral' },
    ...(problems.length ? [{ id: 'problemas', label: 'Problemas' }] : []),
    ...(solutions.length ? [{ id: 'solucoes', label: 'Soluções' }] : []),
    { id: 'tecnologias', label: 'Tecnologias' },
    { id: 'arquitetura', label: 'Arquitetura' },
    ...(decisions.length ? [{ id: 'decisoes', label: 'Decisões' }] : []),
    ...(results.length ? [{ id: 'resultados', label: 'Resultados' }] : []),
    ...(learnings.length ? [{ id: 'aprendizados', label: 'Aprendizados' }] : []),
    { id: 'proximos-passos', label: 'Próximos passos' },
  ]

  return (
    <main id={'top'} className={'container case-study'}>
      <div className={'breadcrumbs'}>
        <Link href={'/'}>Início</Link>
        <span>/</span>
        <Link href={'/projetos'}>Projetos</Link>
        <span>/</span>
        <span aria-current={'page'}>{project.title}</span>
      </div>

      <Link href={'/projetos'} className={'back-link'}>
        <ArrowLeft aria-hidden />
        Voltar aos projetos
      </Link>

      <ProjectHeader project={project} />

      <div className={'case-layout'}>
        <ProjectNavigation items={navigationItems} />
        <div className={'case-content'}>
          <ProjectOverview project={project} />
          {!!problems.length && <ProjectProblems problems={problems} solutions={solutions} />}
          {!!solutions.length && <ProjectSolutions solutions={solutions} problems={problems} />}
          <ProjectTechnologies project={project} />
          <ProjectArchitecture project={project} />
          {!!decisions.length && <ProjectDecisions decisions={decisions} />}
          {!!results.length && <ProjectResults results={results} />}
          {!!learnings.length && <ProjectLearnings learnings={learnings} />}
          <ProjectNextSteps />

          <div className={'case-next'}>
            <span className={'mono'}>PRÓXIMO PROJETO</span>
            <Link href={'/projetos/' + nextProject.slug}>
              <span>{nextProject.title}</span>
              <ArrowRight aria-hidden />
            </Link>
          </div>

          <div className={'case-cta'}>
            <p>Quer conversar sobre desenvolvimento, sistemas ou automação?</p>
            <Link href={'/contato'} className={'button primary'}>
              Entrar em contato
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
