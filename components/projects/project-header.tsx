import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { ProjectMediaCarousel } from './project-media-carousel'
import {
  classificationLabels,
  getDistinctPublicationLabel,
  getProjectStateLabel,
} from './project-labels'

export function ProjectHeader({ project }: { project: Project }) {
  const caseStudy = project.caseStudy
  const client = caseStudy?.client
  const carouselMedia = caseStudy?.media?.filter(
    (item) => item.device && (item.kind === 'cover' || item.kind === 'screenshot'),
  ) ?? []
  const featuredMedia = caseStudy?.media?.find(
    (item) => !item.device && item.kind === 'cover',
  ) ?? caseStudy?.media?.find(
    (item) => !item.device && item.kind === 'screenshot',
  )
  const publication = getDistinctPublicationLabel(project)
  const hasCarousel = carouselMedia.length > 0

  return (
    <header className={hasCarousel ? 'case-header has-media' : 'case-header'}>
      <div className={hasCarousel ? 'case-header-layout has-media' : 'case-header-layout'}>
        <div className={'case-header-copy'}>
          <p className={'eyebrow'}>{project.id} / {project.category.toUpperCase()}</p>
          <h1>{project.title}</h1>
          <p className={'case-lead'}>{project.description}</p>

          <dl className={'case-meta'}>
            <div>
              <dt>Status</dt>
              <dd>{getProjectStateLabel(project)}</dd>
            </div>
            {project.classification && (
              <div>
                <dt>Classificação</dt>
                <dd>{classificationLabels[project.classification]}</dd>
              </div>
            )}
            {publication && (
              <div>
                <dt>Publicação</dt>
                <dd>{publication}</dd>
              </div>
            )}
            <div>
              <dt>Tecnologias</dt>
              <dd>{project.technologies.join(' · ')}</dd>
            </div>
          </dl>

          {!!project.links.length && (
            <div className={'case-links'} aria-label={'Links do projeto'}>
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target={'_blank'} rel={'noreferrer'}>
                  {link.label}
                  <ArrowUpRight aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>

        {hasCarousel && (
          <ProjectMediaCarousel media={carouselMedia} projectTitle={project.title} />
        )}
      </div>

      {client?.disclosure.authorized && (
        <div className={'client-disclosure'}>
          <span className={'mono'}>PROJETO COMERCIAL</span>
          <p>
            {client.commercialName} — divulgação autorizada pelo cliente.
            {client.disclosure.publicNotes && ' ' + client.disclosure.publicNotes}
          </p>
        </div>
      )}

      {featuredMedia && (
        <figure className={'case-hero-media'}>
          <img
            src={featuredMedia.src}
            alt={featuredMedia.alt}
            width={featuredMedia.width ?? 1600}
            height={featuredMedia.height ?? 1000}
          />
          {featuredMedia.caption && <figcaption>{featuredMedia.caption}</figcaption>}
        </figure>
      )}
    </header>
  )
}
