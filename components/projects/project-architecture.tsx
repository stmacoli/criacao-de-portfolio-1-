import { ArrowRight, Circle } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { ProjectSection } from './project-section'

export function ProjectArchitecture({ project }: { project: Project }) {
  const architecture = project.caseStudy?.architecture
  const diagrams = project.caseStudy?.media?.filter((item) => item.kind === 'diagram') ?? []

  return (
    <ProjectSection
      id={'arquitetura'}
      eyebrow={'ARQUITETURA'}
      title={'Visão técnica do sistema.'}
    >
      {architecture?.summary && <p className={'section-intro'}>{architecture.summary}</p>}

      <div className={'architecture-list'}>
        {project.architecture.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Circle aria-hidden />
            <strong>{item}</strong>
            {index < project.architecture.length - 1 && <ArrowRight aria-hidden />}
          </div>
        ))}
      </div>

      {!!architecture?.components?.length && (
        <div className={'architecture-block'}>
          <h3>Componentes</h3>
          <dl className={'component-list'}>
            {architecture.components.map((component) => (
              <div key={component.id}>
                <dt>{component.name}</dt>
                <dd>
                  <p>{component.responsibility}</p>
                  {!!component.technologyNames?.length && (
                    <small>{component.technologyNames.join(' · ')}</small>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {!!architecture?.dataFlows?.length && architecture.dataFlows.map((flow) => (
        <div className={'architecture-block'} key={flow.id}>
          <h3>{flow.name}</h3>
          <p>{flow.description}</p>
          {!!flow.steps?.length && (
            <div className={'case-flow'} aria-label={flow.name}>
              {flow.steps.map((step, index) => (
                <span className={'flow-step'} key={step}>
                  <b>{step}</b>
                  {index < flow.steps!.length - 1 && <ArrowRight aria-hidden />}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {!!architecture?.integrations?.length && (
        <div className={'architecture-block'}>
          <h3>Integrações</h3>
          <ul className={'technical-list'}>
            {architecture.integrations.map((integration) => (
              <li key={integration.id}>
                <strong>{integration.name}</strong>
                <p>{integration.description}</p>
                {integration.externalDependency && <small>{integration.externalDependency}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!!architecture?.externalDependencies?.length && (
        <div className={'architecture-block'}>
          <h3>Dependências externas</h3>
          <ul className={'inline-list'}>
            {architecture.externalDependencies.map((dependency) => <li key={dependency}>{dependency}</li>)}
          </ul>
        </div>
      )}

      {!!architecture?.notes?.length && (
        <div className={'architecture-notes'}>
          {architecture.notes.map((note) => <p key={note}>{note}</p>)}
        </div>
      )}

      {!!diagrams.length && (
        <div className={'architecture-diagrams'}>
          {diagrams.map((diagram) => (
            <figure key={diagram.src}>
              <img src={diagram.src} alt={diagram.alt} width={1600} height={1000} />
              {diagram.caption && <figcaption>{diagram.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </ProjectSection>
  )
}
