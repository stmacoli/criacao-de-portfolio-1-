import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  classificationLabels,
  lifecycleLabels,
  publicationLabels,
} from './project-labels'
import { getProjectTechnologies, type Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = getProjectTechnologies(project)
  const visibleTechnologies = technologies.slice(0, 4)
  const remainingTechnologies = technologies.length - visibleTechnologies.length
  const state = project.lifecycleStatus
    ? lifecycleLabels[project.lifecycleStatus]
    : project.status

  return (
    <article className={'catalog-card'}>
      <div className={'catalog-card-header'}>
        <span className={'mono catalog-index'}>{project.id}</span>
        <span className={'catalog-category'}>{project.category}</span>
      </div>

      <div className={'catalog-content'}>
        <div className={'catalog-badges'} aria-label={'Metadados do projeto'}>
          {project.classification ? (
            <span>{classificationLabels[project.classification]}</span>
          ) : null}
          <span className={'catalog-state'}>{state}</span>
          {project.publicationStatus ? (
            <span>{publicationLabels[project.publicationStatus]}</span>
          ) : null}
        </div>

        <h2>{project.title}</h2>
        <p className={'catalog-description'}>{project.description}</p>

        {visibleTechnologies.length ? (
          <div className={'tag-list catalog-technologies'} aria-label={'Tecnologias principais'}>
            {visibleTechnologies.map((technology) => <span key={technology}>{technology}</span>)}
            {remainingTechnologies > 0 ? (
              <span aria-label={`Mais ${remainingTechnologies} tecnologias`}>+${remainingTechnologies}</span>
            ) : null}
          </div>
        ) : null}

        <Link
          className={'text-link catalog-link'}
          href={`/projetos/${project.slug}`}
          aria-label={`Ver estudo de caso de ${project.title}`}
        >
          Ver estudo de caso <ArrowRight aria-hidden={'true'} />
        </Link>
      </div>
    </article>
  )
}
