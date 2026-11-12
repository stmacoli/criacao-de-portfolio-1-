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
  isTouchRevealed?: boolean
  onTouchRevealToggle?: () => void
}

export function ProjectCard({
  project,
  isTouchRevealed = false,
  onTouchRevealToggle,
}: ProjectCardProps) {
  const technologies = getProjectTechnologies(project)
  const visibleTechnologies = technologies.slice(0, 4)
  const remainingTechnologies = technologies.length - visibleTechnologies.length
  const state = getProjectStateLabel(project)
  const publication = getDistinctPublicationLabel(project)
  const cover = project.caseStudy?.media?.find(
    (item) => item.kind === 'cover' && item.src,
  )
  const mobileCover = project.caseStudy?.media?.find(
    (item) => item.device === 'mobile' && item.src,
  )
  const hasTouchReveal = !!(cover && mobileCover && onTouchRevealToggle)
  const cardClassName = [
    'catalog-card',
    cover ? 'has-cover-reveal' : '',
    hasTouchReveal ? 'has-touch-reveal' : '',
    hasTouchReveal && isTouchRevealed ? 'is-touch-revealed' : '',
  ].filter(Boolean).join(' ')

  return (
    <article className={cardClassName}>
      {cover ? (
        <div className={'catalog-card-reveal'} aria-hidden={'true'}>
          <picture>
            {mobileCover ? (
              <source
                media={'(hover: none) and (pointer: coarse)'}
                srcSet={mobileCover.src}
              />
            ) : null}
            <img
              src={cover.src}
              alt={''}
              width={cover.width ?? 1600}
              height={cover.height ?? 900}
              loading={'lazy'}
              decoding={'async'}
            />
          </picture>
        </div>
      ) : null}
      {hasTouchReveal ? (
        <button
          type={'button'}
          className={'catalog-card-touch-toggle'}
          aria-label={
            isTouchRevealed
              ? `Ocultar capa de ${project.title}`
              : `Mostrar capa de ${project.title}`
          }
          aria-pressed={isTouchRevealed}
          onClick={onTouchRevealToggle}
        />
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
