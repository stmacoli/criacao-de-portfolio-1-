import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  classificationLabels,
  getDistinctPublicationLabel,
  getProjectStateLabel,
} from './project-labels'
import { getProjectTechnologies, type Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = getProjectTechnologies(project)
  const visibleTechnologies = technologies.slice(0, 4)
  const remainingTechnologies = technologies.length - visibleTechnologies.length
  const state = getProjectStateLabel(project)
  const publication = getDistinctPublicationLabel(project)
  const cover = project.caseStudy?.media?.find(
    (item) => item.kind === 'cover' && item.src,
  )

  return (
    <article className={'catalog-card'}>
      {cover ? (
        <div className={'catalog-card-media'}>
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width ?? 1600}
            height={cover.height ?? 900}
            loading={'lazy'}
            decoding={'async'}
          />
        </div>
      ) : null}
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
          {publication ? (
            <span>{publication}</span>
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
