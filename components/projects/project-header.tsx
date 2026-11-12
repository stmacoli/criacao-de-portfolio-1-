import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import {
  classificationLabels,
  lifecycleLabels,
  publicationLabels,
} from './project-labels'

export function ProjectHeader({ project }: { project: Project }) {
  const caseStudy = project.caseStudy
  const client = caseStudy?.client
  const lead = caseStudy?.context ?? project.description
  const featuredMedia = caseStudy?.media?.find((item) => item.kind === 'cover')
    ?? caseStudy?.media?.find((item) => item.kind === 'screenshot')

  return (
    <header className={'case-header'}>
      <p className={'eyebrow'}>{project.id} / {project.category.toUpperCase()}</p>
      <h1>{project.title}</h1>
      <p className={'case-lead'}>{lead}</p>

      <dl className={'case-meta'}>
        <div>
          <dt>Status</dt>
          <dd>{project.lifecycleStatus ? lifecycleLabels[project.lifecycleStatus] : project.status}</dd>
        </div>
        {project.classification && (
          <div>
            <dt>Classificação</dt>
            <dd>{classificationLabels[project.classification]}</dd>
          </div>
        )}
        {project.publicationStatus && (
          <div>
            <dt>Publicação</dt>
            <dd>{publicationLabels[project.publicationStatus]}</dd>
          </div>
        )}
        <div>
          <dt>Tecnologias</dt>
          <dd>{project.technologies.join(' · ')}</dd>
        </div>
      </dl>

      {client?.disclosure.authorized && (
        <div className={'client-disclosure'}>
          <span className={'mono'}>PROJETO COMERCIAL</span>
          <p>
            {client.commercialName} — divulgação autorizada pelo cliente.
            {client.disclosure.publicNotes && ' ' + client.disclosure.publicNotes}
          </p>
        </div>
      )}

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

      {featuredMedia && (
        <figure className={'case-hero-media'}>
          <img
            src={featuredMedia.src}
            alt={featuredMedia.alt}
            width={1600}
            height={1000}
          />
          {featuredMedia.caption && <figcaption>{featuredMedia.caption}</figcaption>}
        </figure>
      )}
    </header>
  )
}
