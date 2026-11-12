import type { ProjectVersion, RoadmapItem } from '@/lib/projects'
import { ProjectSection } from './project-section'
import {
  roadmapCommitmentLabels,
  roadmapPriorityLabels,
  roadmapStatusLabels,
} from './project-labels'
import {
  formatCivilDate,
  resolveRoadmapDependencies,
  toAnchorFragment,
} from './project-lifecycle-utils'

interface ProjectRoadmapProps {
  roadmap: RoadmapItem[]
  versions: ProjectVersion[]
}

export function ProjectRoadmap({ roadmap, versions }: ProjectRoadmapProps) {
  const versionExists = (reference: string) =>
    versions.some((version) => version.version === reference)

  return (
    <ProjectSection
      id={'roadmap'}
      eyebrow={'ROADMAP'}
      title={'Próximas etapas e possibilidades.'}
    >
      <ol className={'lifecycle-timeline roadmap-timeline'}>
        {roadmap.map((item) => {
          const expectedAt = formatCivilDate(item.expectedAt)
          const dependencies = resolveRoadmapDependencies(item, roadmap)

          return (
            <li
              key={item.id}
              id={'roadmap-' + toAnchorFragment(item.id)}
              className={'lifecycle-entry roadmap-entry'}
            >
              <span className={'timeline-marker'} aria-hidden />
              <article>
                <div className={'roadmap-heading'}>
                  <div>
                    <span className={'mono lifecycle-code'}>{item.id}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <span className={'status-badge roadmap-' + item.status}>
                    {roadmapStatusLabels[item.status]}
                  </span>
                </div>
                <p>{item.description}</p>
                <dl className={'roadmap-meta'}>
                  <div>
                    <dt>Natureza</dt>
                    <dd>{roadmapCommitmentLabels[item.commitment]}</dd>
                  </div>
                  {item.priority && (
                    <div>
                      <dt>Prioridade</dt>
                      <dd>{roadmapPriorityLabels[item.priority]}</dd>
                    </div>
                  )}
                  {expectedAt && (
                    <div>
                      <dt>Previsão</dt>
                      <dd><time dateTime={item.expectedAt}>{expectedAt}</time></dd>
                    </div>
                  )}
                </dl>
                {item.relatedVersion && (
                  <div className={'roadmap-relation'}>
                    <strong>Versão relacionada</strong>
                    {versionExists(item.relatedVersion)
                      ? (
                        <a href={'#versao-' + toAnchorFragment(item.relatedVersion)}>
                          {item.relatedVersion}
                        </a>
                      )
                      : <span>{item.relatedVersion}</span>}
                  </div>
                )}
                {!!dependencies.length && (
                  <div className={'roadmap-dependencies'}>
                    <strong>Dependências</strong>
                    <ul>
                      {dependencies.map((dependency) => (
                        <li key={dependency.id}>
                          {dependency.item
                            ? (
                              <a href={'#roadmap-' + toAnchorFragment(dependency.id)}>
                                {dependency.item.title}
                              </a>
                            )
                            : <span>Referência: {dependency.id}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </ProjectSection>
  )
}
